# Product Requirements Document: Ankle PT Progress Tracker

## 1. Product Overview

A web application designed to help users track their ankle physical therapy exercises and recovery progress. The app provides a daily workout interface, weekly reflection prompts, and motivational tracking of injury-free days.

## 2. Product Goals

- **Primary Goal**: Help users stay consistent with their ankle PT exercises through an intuitive, daily check-in interface
- **Secondary Goal**: Track recovery progress through weekly reflections and injury-free day counting
- **Success Metrics**:
  - Daily exercise completion rate
  - Weekly reflection completion
  - Sustained injury-free periods

## 3. Target User

Individual recovering from ankle injury who:
- Has received a structured PT routine (e.g., from ChatGPT, physical therapist)
- Needs daily accountability and structure
- Wants to track recovery progress over time

## 4. Core Features

### 4.1 Daily Workout Display
**Description**: Shows exercises scheduled for the current day

**Requirements**:
- Display all exercises for today in a clear, readable format
- Include exercise details (name, sets, reps, duration, etc.)
- Automatically updates based on current date
- Shows which week of the program the user is in

**User Stories**:
- As a user, I want to see today's exercises when I open the app
- As a user, I want to know which week I'm currently in

### 4.2 To-Do List Interface
**Description**: Interactive checklist for completing daily exercises

**Requirements**:
- Each exercise appears as a checkable item
- Check/uncheck functionality for each exercise
- Visual indication of completion status (checked/unchecked)
- Persist completion state (daily reset)
- Show progress indicator (e.g., "3/5 exercises completed")

**User Stories**:
- As a user, I want to check off exercises as I complete them
- As a user, I want to see my daily progress at a glance
- As a user, I want my progress to be saved so I can complete exercises throughout the day

### 4.3 Weekly Reflection Prompt
**Description**: End-of-week prompt to record thoughts and notes

**Requirements**:
- Trigger weekly prompt (e.g., every Sunday or at end of 7-day cycle)
- Free-form text input for notes/reflections
- Save and display historical weekly notes
- Optional prompt questions to guide reflection:
  - "How did your ankle feel this week?"
  - "Which exercises were easiest/hardest?"
  - "Any pain or discomfort to note?"
  - "Overall progress assessment"

**User Stories**:
- As a user, I want to record my weekly thoughts about my recovery
- As a user, I want to review my past weekly reflections
- As a user, I want prompts to help me think about my progress

### 4.4 Days Since Last Ankle Roll Counter
**Description**: Prominent counter tracking injury-free days

**Requirements**:
- Display "DAYS SINCE LAST ANKLE ROLL" at top of interface
- Counter increments automatically each day at midnight
- Prominent, easily visible display
- Counter persists across sessions

**Design Notes**:
- Large, bold typography for the counter
- Positioned at top of page for immediate visibility
- Consider celebratory milestones (7 days, 30 days, 90 days, etc.)

**User Stories**:
- As a user, I want to see how many days I've gone without re-injury
- As a user, I want this counter to motivate me to stay careful

### 4.5 Reset Counter Button
**Description**: Manual reset for the injury-free day counter

**Requirements**:
- Red button positioned directly under the counter
- Labeled clearly (e.g., "Reset Counter" or "I Rolled My Ankle")
- Resets counter to 0 when clicked
- Confirmation dialog to prevent accidental resets
- Optional: Log reset events with date/time and optional notes

**Design Notes**:
- Red color to indicate caution
- Positioned below counter for clear association
- Consider hover state that says "Hope you don't need this!"

**User Stories**:
- As a user, I want to reset the counter when I re-injure my ankle
- As a user, I want to avoid accidentally resetting the counter
- As a user, I might want to note circumstances of re-injury

## 5. Data Requirements

### 5.1 Exercise Program Data
- Week number
- Day of week
- Exercise name
- Exercise details (sets, reps, duration, instructions)
- Exercise order

### 5.2 User Progress Data
- Daily exercise completion status
- Completion timestamps
- Weekly reflection entries (text, date)
- Counter value (days since last roll)
- Counter reset history (dates, optional notes)

### 5.3 Data Persistence
- Local storage or database for all user data
- Data should persist across sessions
- Consider export functionality for backup

## 6. User Interface Requirements

### 6.1 Layout Hierarchy
1. **Top Section**: Days Since Last Ankle Roll counter + reset button
2. **Main Section**: Daily workout checklist
3. **Secondary Section**: Week indicator, progress summary
4. **Modal/Overlay**: Weekly reflection prompt

### 6.2 Responsive Design
- Mobile-first approach (likely primary use case)
- Works on phone, tablet, and desktop
- Touch-friendly interactions

### 6.3 Visual Design Principles
- Clean, minimal interface to reduce cognitive load
- Clear visual feedback for interactions
- Motivating, positive tone
- Easy to scan and read

## 7. Technical Considerations

### 7.1 Technology Stack (Proposed)
- **Frontend**: React, Vue, or vanilla JavaScript
- **Styling**: Tailwind CSS, CSS Modules, or styled-components
- **Data Storage**: LocalStorage for MVP, consider IndexedDB or backend for v2
- **State Management**: React Context, Redux, or Pinia (Vue)

### 7.2 Key Technical Requirements
- Date/time handling for counter increments and weekly prompts
- Data persistence across browser sessions
- Notification system for weekly reflections (optional)

### 7.3 Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 8. User Flows

### 8.1 Daily Check-In Flow
1. User opens app
2. Views "Days Since Last Ankle Roll" counter
3. Sees today's exercises
4. Checks off exercises as completed
5. Returns throughout day to complete remaining exercises

### 8.2 Weekly Reflection Flow
1. User completes final day of week
2. Prompted to enter weekly reflection
3. Answers optional guided questions or free-form notes
4. Submits reflection
5. Can view past reflections

### 8.3 Counter Reset Flow
1. User clicks red reset button
2. Confirmation dialog appears: "Did you roll your ankle?"
3. Optional: Add notes about incident
4. Confirms reset
5. Counter returns to 0

## 9. Future Enhancements (V2+)

### 9.1 Analytics & Insights
- Exercise completion trends over time
- Average days between ankle rolls
- Most/least completed exercises
- Recovery progress visualization

### 9.2 Customization
- Add/edit/remove exercises
- Customize weekly schedule
- Set custom reminders
- Choose different PT programs

### 9.3 Advanced Features
- Photo/video progress tracking
- Pain level tracking
- Integration with calendar/reminders
- Share progress with physical therapist
- Multi-device sync with backend
- Export data (PDF, CSV)

### 9.4 Gamification
- Streak tracking
- Achievement badges
- Milestone celebrations
- Progress visualizations

## 10. Success Criteria

### 10.1 MVP Launch Criteria
- All core features implemented and functional
- Data persists correctly across sessions
- Counter increments daily as expected
- Weekly prompts trigger appropriately
- Mobile-responsive design
- No critical bugs

### 10.2 User Success Metrics
- User completes exercises 5+ days per week
- User fills out weekly reflections consistently
- User maintains increasing injury-free periods
- User reports feeling more accountable to PT routine

## 11. Open Questions

1. **Exercise Program Input**: How will users input their PT routine?
   - Manual entry?
   - Copy-paste from ChatGPT?
   - Pre-loaded template?

2. **Weekly Cycle**: When does the week start?
   - Calendar week (Monday-Sunday)?
   - User's start date?
   - Fixed 7-day cycles?

3. **Notification Preferences**: Should the app send reminders?
   - Browser notifications?
   - Just in-app prompts?

4. **Historical Data**: How much history should be accessible?
   - All-time?
   - Last 12 weeks?
   - Current program only?

## 12. Out of Scope (V1)

- User authentication/accounts
- Backend server
- Multi-user support
- Social features
- Exercise video library
- AI-generated workout plans
- Integration with fitness trackers
- Pain level tracking
- Physical therapist portal

---

**Document Version**: 1.0
**Last Updated**: January 7, 2026
**Status**: Draft - Ready for Review
