# Timesheet Management App

A SaaS-style Timesheet Management Application built for the TenTwenty Frontend Developer Assessment.

## Overview

This application allows users to track and manage their work hours on a weekly basis. It features a clean, responsive UI with authentication, timesheet listing, and detailed entry management.

## Quick Start

```bash
cd client-ui
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and login with:
- **Email**: john@example.com
- **Password**: password123

## Documentation

For detailed documentation, see [client-ui/README.md](./client-ui/README.md)

## Tech Stack

- Next.js 16 + TypeScript
- TailwindCSS 4
- NextAuth.js v5
- React Hook Form + Zod
- Vitest + React Testing Library

## Features

- Login with session management
- Dashboard with timesheet list, filtering & pagination
- Weekly timesheet detail view
- Add/Edit/Delete timesheet entries
- Form validation
- Unit tests

## Project Structure

```
Timesheet-Management-App/
└── client-ui/          # Next.js application
    ├── src/
    │   ├── app/       # Pages and API routes
    │   ├── components/# UI components
    │   ├── data/      # Mock data
    │   ├── lib/       # Auth configuration
    │   └── types/     # TypeScript types
    └── ...
```
