# Ticktock - Timesheet Management Application

A modern, responsive timesheet management application built with Next.js 16, TypeScript, and TailwindCSS. This application allows users to track their work hours on a weekly basis with an intuitive UI.

## Features

- **Authentication**: Secure login with NextAuth.js (credentials provider)
- **Dashboard**: View all weekly timesheets with filtering and pagination
- **Weekly Detail View**: Track daily tasks with hours for each week
- **Add/Edit Entries**: Modal form with validation for creating and editing timesheet entries
- **Status Tracking**: Automatic status calculation (Completed/Incomplete/Missing)
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Authentication**: NextAuth.js v5 (beta)
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (internal endpoints)
│   │   ├── auth/          # NextAuth.js API routes
│   │   ├── projects/      # Projects API
│   │   └── timesheets/    # Timesheets CRUD API
│   ├── dashboard/         # Dashboard pages
│   │   └── timesheet/[id] # Weekly timesheet detail
│   └── login/             # Login page
├── components/            # React components
│   ├── layout/           # Header, Footer
│   ├── providers/        # Context providers
│   ├── timesheets/       # Timesheet-specific components
│   └── ui/               # Reusable UI components
├── data/                 # Mock data
├── lib/                  # Utilities (auth config)
├── types/                # TypeScript type definitions
└── __tests__/           # Test files
```

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd client-ui
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Update the `.env.local` file with your settings:
```env
AUTH_SECRET=your-secret-key-change-in-production
NEXTAUTH_URL=http://localhost:3000
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Credentials

- **Email**: john@example.com
- **Password**: password123

## Available Scripts

```bash
# Development
npm run dev       # Start development server

# Production
npm run build     # Build for production
npm run start     # Start production server

# Testing
npm run test      # Run tests in watch mode
npm run test:run  # Run tests once
```

## API Endpoints

All API routes are internal (client-side calls go through Next.js API routes):

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/timesheets` | List all timesheets (with pagination & filters) |
| GET | `/api/timesheets/:id` | Get single timesheet details |
| PUT | `/api/timesheets/:id` | Update timesheet |
| POST | `/api/timesheets/:id/entries` | Create new entry |
| PUT | `/api/timesheets/:id/entries/:entryId` | Update entry |
| DELETE | `/api/timesheets/:id/entries/:entryId` | Delete entry |
| GET | `/api/projects` | Get projects and work types |

## Status Logic

- **Completed**: 40 hours logged for the week
- **Incomplete**: Less than 40 hours logged
- **Missing**: No hours logged (0 hours)

## Assumptions & Notes

1. **Mock Data**: All data is stored in-memory for demonstration purposes. Data resets on server restart.

2. **Authentication**: Uses dummy credentials with NextAuth.js. In production, this should be connected to a real authentication provider.

3. **Time Zone**: Dates are handled in local time zone. A production app might need UTC handling.

4. **Week Structure**: Each week is assumed to be a 5-day work week (Monday-Friday) with a target of 40 hours.

5. **No Backend Database**: The application uses in-memory mock data. For production, integrate with a proper database.

## Architecture Decisions

- **App Router**: Using Next.js 14+ App Router for better server components support and improved routing
- **API Routes**: All client-side data fetching goes through internal API routes (not calling mock data directly)
- **Form Validation**: Using Zod schemas for type-safe validation
- **Component Structure**: Separated into UI (reusable), Layout, and Feature-specific components

## Future Improvements

- Add user profile management
- Implement data persistence with a database
- Add export functionality (CSV, PDF)
- Add team/manager views
- Implement notifications for incomplete timesheets
- Add dark mode support

## License

This project is created as part of the TenTwenty Frontend Developer Assessment.
