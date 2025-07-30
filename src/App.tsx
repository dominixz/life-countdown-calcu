import React from 'react'
import { Calendar, Clock } from '@phosphor-icons/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { useKV } from '@github/spark/hooks'

interface TimeCalculations {
  lived: {
    years: number
    quarters: number
    months: number
    weeks: number
    days: number
    totalDays: number
  }
  remaining: {
    years: number
    quarters: number
    months: number
    weeks: number
    days: number
    totalDays: number
  }
  lifeProgress: number
}

function calculateTime(birthday: string, deathDay: string): TimeCalculations | null {
  const birth = new Date(birthday)
  const death = new Date(deathDay)
  const today = new Date()
  
  if (birth > today || death <= birth || death <= today) {
    return null
  }

  // Calculate lived time
  const livedMs = today.getTime() - birth.getTime()
  const livedDays = Math.floor(livedMs / (1000 * 60 * 60 * 24))
  const livedYears = Math.floor(livedDays / 365.25)
  const livedQuarters = Math.floor(livedDays / (365.25 / 4))
  const livedMonths = Math.floor(livedDays / 30.44)
  const livedWeeks = Math.floor(livedDays / 7)

  // Calculate remaining time
  const remainingMs = death.getTime() - today.getTime()
  const remainingDays = Math.floor(remainingMs / (1000 * 60 * 60 * 24))
  const remainingYears = Math.floor(remainingDays / 365.25)
  const remainingQuarters = Math.floor(remainingDays / (365.25 / 4))
  const remainingMonths = Math.floor(remainingDays / 30.44)
  const remainingWeeks = Math.floor(remainingDays / 7)

  // Calculate life progress
  const totalLifeMs = death.getTime() - birth.getTime()
  const lifeProgress = (livedMs / totalLifeMs) * 100

  return {
    lived: {
      years: livedYears,
      quarters: livedQuarters,
      months: livedMonths,
      weeks: livedWeeks,
      days: livedDays,
      totalDays: livedDays
    },
    remaining: {
      years: remainingYears,
      quarters: remainingQuarters,
      months: remainingMonths,
      weeks: remainingWeeks,
      days: remainingDays,
      totalDays: remainingDays
    },
    lifeProgress: Math.min(100, Math.max(0, lifeProgress))
  }
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  return (
    <span className="font-bold text-2xl text-primary">
      {value.toLocaleString()}{suffix}
    </span>
  )
}

function MetricCard({ title, value, suffix, description, color = "primary" }: {
  title: string
  value: number
  suffix?: string
  description: string
  color?: "primary" | "secondary" | "accent"
}) {
  const colorClasses = {
    primary: "border-primary/20 bg-primary/5",
    secondary: "border-secondary/20 bg-secondary/5", 
    accent: "border-accent/20 bg-accent/5"
  }

  return (
    <Card className={`${colorClasses[color]} transition-all duration-300 hover:shadow-lg`}>
      <CardContent className="p-6">
        <div className="space-y-2">
          <Badge variant="outline" className="text-xs font-medium">
            {title}
          </Badge>
          <div className="space-y-1">
            <AnimatedNumber value={value} suffix={suffix} />
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function App() {
  const [birthday, setBirthday] = useKV("birthday", "")
  const [deathDay, setDeathDay] = useKV("deathDay", "")

  const calculations = birthday && deathDay ? calculateTime(birthday, deathDay) : null

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString()
  }

  const isValidInput = birthday && deathDay && calculations !== null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Life Calculator
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover how much time you've lived and visualize your remaining journey through life's chapters.
          </p>
        </div>

        {/* Input Form */}
        <Card className="mb-8 border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar size={24} className="text-primary" />
              Enter Your Dates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="birthday" className="text-sm font-medium">
                  Birthday
                </Label>
                <Input
                  id="birthday"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="w-full"
                />
                {birthday && (
                  <p className="text-xs text-muted-foreground">
                    {formatDate(birthday)}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="deathday" className="text-sm font-medium">
                  Projected End Date
                </Label>
                <Input
                  id="deathday"
                  type="date"
                  value={deathDay}
                  onChange={(e) => setDeathDay(e.target.value)}
                  className="w-full"
                />
                {deathDay && (
                  <p className="text-xs text-muted-foreground">
                    {formatDate(deathDay)}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Messages */}
        {birthday && deathDay && !calculations && (
          <Card className="mb-8 border-destructive/20 bg-destructive/5">
            <CardContent className="p-6">
              <p className="text-destructive text-center">
                Please ensure your birthday is in the past and your projected end date is in the future and after your birthday.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {isValidInput && calculations && (
          <div className="space-y-8">
            {/* Life Progress */}
            <Card className="border-accent/20 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock size={24} className="text-accent" />
                  Life Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-accent">
                      {calculations.lifeProgress.toFixed(1)}%
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">
                      of your projected life completed
                    </p>
                  </div>
                  <Progress 
                    value={calculations.lifeProgress} 
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Time Lived */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-foreground">
                Time You've Lived
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <MetricCard
                  title="Years"
                  value={calculations.lived.years}
                  description="Years on this Earth"
                  color="primary"
                />
                <MetricCard
                  title="Quarters"
                  value={calculations.lived.quarters}
                  description="Quarters experienced"
                  color="primary"
                />
                <MetricCard
                  title="Months"
                  value={calculations.lived.months}
                  description="Months of experiences"
                  color="primary"
                />
                <MetricCard
                  title="Weeks"
                  value={calculations.lived.weeks}
                  description="Weeks of memories"
                  color="primary"
                />
                <MetricCard
                  title="Days"
                  value={calculations.lived.days}
                  description="Days of existence"
                  color="primary"
                />
              </div>
            </div>

            {/* Time Remaining */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-foreground">
                Time Remaining
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <MetricCard
                  title="Years"
                  value={calculations.remaining.years}
                  description="Years ahead"
                  color="secondary"
                />
                <MetricCard
                  title="Quarters"
                  value={calculations.remaining.quarters}
                  description="Seasons to experience"
                  color="secondary"
                />
                <MetricCard
                  title="Months"
                  value={calculations.remaining.months}
                  description="Months to cherish"
                  color="secondary"
                />
                <MetricCard
                  title="Weeks"
                  value={calculations.remaining.weeks}
                  description="Weeks to make count"
                  color="secondary"
                />
                <MetricCard
                  title="Days"
                  value={calculations.remaining.days}
                  description="Days left to live"
                  color="secondary"
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm">
            Remember: These calculations are estimates based on your projections. 
            Make every moment count.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App