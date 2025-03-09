# Note Taking API

A simple RESTful API for managing notes built with Express.js, TypeScript, and MongoDB.

## Features

- Create, read, update, and delete notes
- MongoDB database integration
- TypeScript support
- Error handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm (or pnpm) package manager

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your MongoDB connection string:

```plaintext
DATABASE_URL=your_mongodb_connection_string
```

## Development

To start the development server with hot-reload:

```bash
npm run dev
```

The server will start on port 5000 by default. You can change this by setting the `PORT` environment variable.

## API Endpoints

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/api/notes`     | Get all notes       |
| GET    | `/api/notes/:id` | Get a specific note |
| POST   | `/api/notes`     | Create a new note   |
| PATCH  | `/api/notes/:id` | Update a note       |
| DELETE | `/api/notes/:id` | Delete a note       |

### Note Schema

```typescript
{
  title: string; // required
  content: string; // required
  author: string; // optional
}
```

## Build

The project uses TypeScript and compiles to JavaScript in the `build` directory.

## Project Structure

```plaintext
note-taking-api/
├── build/              # Compiled typescript files
├── app.ts              # Application entry point
├── note.controller.ts  # Note controller logic
├── note.model.ts       # Note mongoose model
├── utils.ts           # Utility functions
├── tsconfig.json      # TypeScript configuration
└── package.json       # Project dependencies
```
