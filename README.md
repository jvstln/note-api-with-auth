# Note API with Authentication

A robust RESTful API for note-taking built with TypeScript, Express, and MongoDB. This API includes user authentication, note management, and category organization features.

## Features

- User authentication (register, login, logout)
- JWT-based authentication with cookie storage
- CRUD operations for notes
- Category management for notes
- Request validation using Joi
- Password hashing with bcrypt
- Request logger middleware
- Error handling middleware (Errors are handled using throw..catch pattern)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or pnpm package manager

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=8080
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Running the Application

### Development mode

```bash
pnpm dev
```

### Production mode

```bash
pnpm build
pnpm start
```

The server will start on port 8080 by default. You can change this by setting the `PORT` environment variable.

## API Endpoints

### Authentication

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/auth/register` | Register a new user     |
| POST   | `/api/auth/login`    | Login and get JWT token |

### Notes

| Method | Endpoint                          | Description           | Authentication |
| ------ | --------------------------------- | --------------------- | -------------- |
| GET    | `/api/notes`                      | Get all notes         | Required       |
| GET    | `/api/notes/:noteId`              | Get a specific note   | Required       |
| GET    | `/api/notes/category/:categoryId` | Get notes by category | Required       |
| POST   | `/api/notes`                      | Create a new note     | Required       |
| PATCH  | `/api/notes/:noteId`              | Update a note         | Required       |
| DELETE | `/api/notes/:noteId`              | Delete a note         | Required       |

### Categories

| Method | Endpoint                      | Description             | Authentication |
| ------ | ----------------------------- | ----------------------- | -------------- |
| GET    | `/api/categories`             | Get all categories      | Required       |
| GET    | `/api/categories/:categoryId` | Get a specific category | Required       |
| POST   | `/api/categories`             | Create a new category   | Required       |

## Data Models

### User Registration Schema/Body

```typescript
{
  email: string; // required, unique, lowercase, trimmed
  password: string; // required, hashed before saving too db
  name: string; // required
}
```

### User Login Schema/Body

```typescript
{
  email: string; // required, unique, lowercase, trimmed
  password: string; // required
}
```

### Note Creation Schema/Body

```typescript
{
  title: string; // required
  content: string; // required
  category?: string; // The name of category to reference. optional
}
```

### Category Schema

```typescript
{
  name: string; // required, unique, lowercase, trimmed
  description?: string; // optional
  // noteCount: number; // virtual, populated on demand. Not needed/required
}
```

## Project Structure

```plaintext
note-api-with-auth/
├── build/                # Compiled typescript files
├── src/
│   ├── app.ts            # Application entry point
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware
│   │   ├── auth.middleware.ts    # Authentication middleware
│   │   ├── error.middleware.ts   # Error handling middleware
│   │   └── logger.middleware.ts  # Request logging middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── schemas/          # Validation schemas
│   ├── services/         # Business logic
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## Error Handling

Express ^5 catches all errors thrown in route handlers and passes them to the error handling middleware. The error handling middleware logs the error and sends a standardized error response to the client.

## Error Response Format

The API uses a standardized error response format:

```typescript
{
  success: boolean;
  message: string;
  error?: any;  // Additional error details (mostly present when Joi validation fails)
}
```

## Authentication Flow

1. User registers with email, password, and name
2. User logs in with email and password
3. Server validates credentials and returns JWT token in HTTP-only cookie
4. Protected routes check for valid JWT token in cookies
