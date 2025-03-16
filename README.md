# Note Taking API

A RESTful API for managing notes and categories built with Express.js, TypeScript, and MongoDB.

## Features

- Create, read, update, and delete notes
- Organize notes with categories
- MongoDB database integration
- TypeScript support
- Request validation middleware
- Comprehensive error handling
- Request logger middleware

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
pnpm install
```

3. Create a `.env` file in the root directory and add your MongoDB connection string:

```plaintext
DATABASE_URL=your_mongodb_connection_string
```

## Development

To start the development server with hot-reload:

```bash
pnpm run dev
```

The server will start on port 8080 by default. You can change this by setting the `PORT` environment variable.

## API Endpoints

### Notes

| Method | Endpoint                          | Description           |
| ------ | --------------------------------- | --------------------- |
| GET    | `/api/notes`                      | Get all notes         |
| GET    | `/api/notes/:noteId`              | Get a specific note   |
| GET    | `/api/notes/category/:categoryId` | Get notes by category |
| POST   | `/api/notes`                      | Create a new note     |
| PATCH  | `/api/notes/:noteId`              | Update a note         |
| DELETE | `/api/notes/:noteId`              | Delete a note         |

### Categories

| Method | Endpoint                      | Description             |
| ------ | ----------------------------- | ----------------------- |
| GET    | `/api/categories`             | Get all categories      |
| GET    | `/api/categories/:categoryId` | Get a specific category |
| POST   | `/api/categories`             | Create a new category   |

### Note Schema

```typescript
{
  title: string; // required
  content: string; // required
  category: string; // optional, references a category ID
  author: string; // optional
}
```

### Category Schema

```typescript
{
  name: string; // required, unique
  description: string; // optional
}
```

## Build

The project uses TypeScript and compiles to JavaScript in the `build` directory.

## Project Structure

```plaintext
simple-note-api/
├── build/                # Compiled typescript files
├── src/
│   ├── app.ts           # Application entry point
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   └── utils/          # Utility functions
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## Error Handling

The API uses a standardized error response format:

```typescript
{
  success: boolean;
  message: string;
  data?: any;
}
```

Common HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 409: Conflict (e.g., duplicate category)
- 500: Internal Server Error
