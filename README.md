# HMCTS Task Application Frontend

A task management frontend built in TypeScript. The application connects to a backend REST API to provide a complete task management experience.

## Features

- **View Tasks**: Display all tasks from the backend API
- **Create Tasks**: Add new tasks with title, description, and due date
- **Update Task Status**: Change task status between PENDING, IN_PROGRESS, and COMPLETED
- **Delete Tasks**: Remove tasks from the system

## Prerequisites

- Node.js (v14+)
- Yarn package manager
- Backend API running on `http://localhost:4000`

## Installation & Setup

1) `yarn install`
2) `yarn webpack`
3) `yarn start:dev` or navigate to package.json and run the script manually

The application will be available at `http://localhost:3100`

## Available Scripts

- `yarn start:dev` - Run development server with auto-reload
- `yarn webpack` - Build frontend assets
- `yarn test` - Run all tests
- `yarn lint` - Run ESLint

## API Integration

The frontend communicates with a backend API:
- `GET /tasks` - Fetch all tasks
- `GET /tasks/:id` - Get task details
- `POST /tasks` - Create new task
- `PUT /tasks/:id/status` - Update task status
- `DELETE /tasks/:id` - Delete a task

Ensure the backend API is running on `http://localhost:4000` before starting the frontend. 
