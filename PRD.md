# Life Calculator - Product Requirements Document

Calculate the time you've lived and visualize your remaining time across different periods.

**Experience Qualities**: 
1. **Contemplative** - Encourages thoughtful reflection on time and mortality
2. **Precise** - Provides accurate calculations down to weeks and days
3. **Visual** - Clear presentation of time data that's easy to understand

**Complexity Level**: Micro Tool (single-purpose)
- Focused solely on time calculations between birth date and target lifespan

## Essential Features

**Date Input Form**
- Functionality: Accept birthday and target lifespan (numeric age) inputs
- Purpose: Gather birth date and desired lifespan for all calculations
- Trigger: User lands on the page
- Progression: Enter birthday → Enter target age → See calculations automatically
- Success criteria: Date and age are validated and calculations update in real-time

**Time Lived Display**
- Functionality: Shows total time lived in years, months, weeks, and days
- Purpose: Provides perspective on life already experienced
- Trigger: Valid dates are entered
- Progression: Automatic calculation → Display in organized sections
- Success criteria: Accurate calculations with clear visual hierarchy

**Remaining Time Breakdown**
- Functionality: Shows remaining time in years, quarters, months, and weeks
- Purpose: Visualizes future time in meaningful chunks
- Trigger: Valid dates are entered
- Functionality: Calculate remaining time → Break into periods → Display with progress indicators
- Success criteria: Clear presentation of remaining time based on target lifespan

**Life Progress Visualization**
- Functionality: Visual progress bar showing percentage of life completed
- Purpose: Provides immediate visual context of life stage
- Trigger: Valid dates are entered
- Progression: Calculate percentage based on target lifespan → Display progress bar → Show exact percentage
- Success criteria: Intuitive progress bar with percentage display

## Edge Case Handling

- **Future Birthday**: Show message if birthday is in the future
- **Invalid Target Age**: Validate that target age is reasonable (1-150 years)
- **Invalid Dates**: Clear error messages for malformed date inputs
- **Target Age Too Low**: Handle cases where current age exceeds target lifespan
- **Leap Years**: Accurate calculations accounting for leap years

## Design Direction

The design should feel contemplative and elegant, encouraging thoughtful reflection rather than morbid fixation on mortality. Clean, minimal interface with generous whitespace and a sophisticated color palette that feels timeless rather than clinical.

## Color Selection

Analogous color scheme using deep blues and purples to convey depth, wisdom, and contemplation.

- **Primary Color**: Deep Blue (oklch(0.4 0.15 240)) - Represents depth, stability, and time
- **Secondary Colors**: Muted Purple (oklch(0.5 0.12 280)) for supporting elements
- **Accent Color**: Warm Gold (oklch(0.7 0.15 60)) - Highlights important metrics and progress
- **Foreground/Background Pairings**: 
  - Background (White oklch(1 0 0)): Dark Blue text (oklch(0.2 0.1 240)) - Ratio 8.2:1 ✓
  - Primary (Deep Blue oklch(0.4 0.15 240)): White text (oklch(1 0 0)) - Ratio 5.1:1 ✓
  - Accent (Warm Gold oklch(0.7 0.15 60)): Dark Blue text (oklch(0.2 0.1 240)) - Ratio 4.8:1 ✓

## Font Selection

Use Inter for its exceptional readability and modern, timeless feel that conveys precision and clarity.

- **Typographic Hierarchy**: 
  - H1 (App Title): Inter Bold/32px/tight letter spacing
  - H2 (Section Headers): Inter Semibold/24px/normal spacing
  - H3 (Metric Labels): Inter Medium/18px/normal spacing
  - Body (Values): Inter Regular/16px/relaxed spacing
  - Small (Descriptions): Inter Regular/14px/normal spacing

## Animations

Subtle, purposeful animations that enhance the contemplative experience without being distracting.

- **Purposeful Meaning**: Gentle transitions communicate the flow of time and create a meditative quality
- **Hierarchy of Movement**: Progress bars animate on load, number counters increment smoothly, form transitions are gentle

## Component Selection

- **Components**: 
  - Card components for organizing different time periods
  - Input components with date picker for birthday and number input for target age
  - Progress components for life completion visualization
  - Badge components for time period labels
- **Customizations**: 
  - Custom progress rings for visual time representation
  - Animated number counters for metric displays
- **States**: 
  - Input fields have clear focus states with subtle blue glow
  - Buttons have gentle hover animations
  - Cards have subtle shadows and hover elevations
- **Icon Selection**: 
  - Calendar icons for date inputs
  - Clock icons for time metrics
  - Progress indicators for completion status
- **Spacing**: Consistent 6-unit (24px) spacing between major sections, 4-unit (16px) for related elements
- **Mobile**: Single column layout with full-width cards, larger touch targets for inputs, condensed spacing