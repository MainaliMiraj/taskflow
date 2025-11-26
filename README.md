# Task Management App

A clean, modern, multi-page Task Management App built with Next.js 14+ (App Router) and Tailwind CSS. This application is designed for testing practice including Manual Testing, API Testing, Database Testing, and Playwright Automation.

## Features

- **Dashboard Page** (`/`)
  - Display all tasks in card layout
  - Filter by status and priority
  - Search by title and description
  - Sort by due date, priority, or created date
  - Edit, delete, and change task status
  - Add new task button

- **Add Task Page** (`/add`)
  - Form to create new tasks
  - Validation for required fields
  - Responsive design

- **Edit Task Page** (`/edit/[id]`)
  - Pre-filled form with existing task data
  - Same validation as add form
  - Cancel and save functionality

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Testing**: Playwright (configured and ready)

## Project Structure

```
taskflow/
├── app/                             # Next.js App Router entrypoint
│   ├── globals.css                  # Global styles
│   ├── layout.tsx                   # Root layout with nav + providers
│   ├── page.tsx                     # Marketing/landing page
│   ├── dashboard/page.tsx           # Dashboard with task list + filters
│   ├── add/page.tsx                 # Add task form
│   ├── edit/[id]/page.tsx           # Edit task form
│   ├── login/page.tsx               # Login form
│   ├── register/page.tsx            # Registration form
│   ├── forgot-password/page.tsx     # Forgot password flow
│   └── reset-password/[token]/page.tsx # Reset password flow
├── components/                      # Shared UI components
│   ├── DashboardHeader.tsx
│   ├── FilterBar.tsx
│   ├── SearchBar.tsx
│   ├── SortControls.tsx
│   ├── TaskCard.tsx
│   └── TaskForm.tsx
├── context/                         # React context providers
│   └── TaskContext.tsx
├── reducer/                         # Reducers for shared state
│   └── taskReducer.ts
├── types/                           # Reusable TypeScript definitions
│   └── task.ts
├── tests/                           # Playwright specs and docs
│   ├── README.md
│   └── example.spec.ts
├── playwright.config.ts             # Playwright configuration
├── tailwind.config.js               # Tailwind setup
├── tsconfig.json                    # TypeScript configuration
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-management-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Testing

### Playwright Setup

1. Install Playwright browsers:
```bash
npx playwright install
```

2. Run tests:
```bash
npm test          # Run all tests
npm test -- --ui  # Run with UI mode
```

### Test Data

The app comes with pre-loaded mock data for testing:
- 5 sample tasks with different priorities and statuses
- Realistic due dates and descriptions
- Various test scenarios covered

## Test-Friendly Features

### Data Attributes

All interactive elements have `data-testid` attributes for reliable test automation:

**Navigation:**
- `app-header` - Main header
- `nav-dashboard` - Dashboard link
- `nav-add-task` - Add task link

**Task Cards:**
- `task-card-{id}` - Individual task card
- `task-title-{id}` - Task title
- `task-description-{id}` - Task description
- `task-priority-{id}` - Priority badge
- `task-status-{id}` - Status badge
- `task-due-date-{id}` - Due date
- `task-created-date-{id}` - Created date
- `edit-task-{id}` - Edit button
- `delete-task-{id}` - Delete button
- `change-status-{id}` - Status change button

**Forms:**
- `task-form` - Main form
- `task-title-input` - Title input field
- `task-description-input` - Description textarea
- `task-priority-select` - Priority dropdown
- `task-status-select` - Status dropdown
- `task-due-date-input` - Due date picker
- `submit-button` - Form submit button
- `cancel-button` - Form cancel button

**Filters and Search:**
- `status-filter` - Status filter dropdown
- `priority-filter` - Priority filter dropdown
- `clear-filters` - Clear filters button
- `search-input` - Search input field
- `clear-search` - Clear search button
- `sort-by-select` - Sort dropdown
- `sort-order-button` - Sort order toggle

### Test Scenarios

The app is designed to support various testing scenarios:

1. **CRUD Operations**
   - Create new tasks
   - Read/view tasks
   - Update existing tasks
   - Delete tasks

2. **Filtering and Sorting**
   - Filter by status and priority
   - Search functionality
   - Sort by different criteria

3. **Form Validation**
   - Required field validation
   - Date validation (no past dates)
   - Error message display

4. **Status Workflow**
   - Status cycling (Todo → In Progress → Done)
   - Visual status indicators

5. **Responsive Design**
   - Mobile-friendly layout
   - Touch-friendly interactions

## Development Guidelines

### Code Style

- TypeScript for type safety
- Functional components with hooks
- Consistent naming conventions
- Comprehensive comments

### Component Structure

Each component follows this pattern:
- Props interface definition
- Main component function
- Helper functions
- Event handlers
- Render method

### State Management

- Local state with `useState`
- Global state with custom hooks
- Mock data store for development
- Easy to replace with real API

## Customization

### Styling

- Tailwind CSS utility classes
- Custom color palette in `tailwind.config.js`
- Responsive design classes
- Hover and focus states

### Adding New Features

1. Update type definitions in `types/task.ts`
2. Modify the `useTaskStore` hook
3. Update components as needed
4. Add appropriate test IDs
5. Write Playwright tests

## Deployment

The app is ready for deployment on various platforms:

- **Vercel**: One-click deployment
- **Netlify**: Static site deployment
- **Docker**: Containerized deployment
- **Traditional hosting**: Build and serve

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues:
- Check the documentation
- Open an issue on GitHub
- Review the test files for examples
