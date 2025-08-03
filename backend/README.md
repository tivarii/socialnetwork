# LinkedIn Community Platform Backend

A Mini LinkedIn-like Community Platform backend built with Node.js, Express, Prisma, and PostgreSQL.

## Features

### 🔐 User Authentication
- User registration with email and password
- Secure login with JWT tokens
- Password hashing with bcrypt
- Protected routes with middleware

### 👤 User Profiles
- Create and update user profiles
- View user profiles with post count
- User discovery with pagination
- Profile fields: name, email, bio

### 📝 Posts Management
- Create text-only posts
- Public feed with all posts
- View individual posts
- Edit/delete own posts
- User-specific post feeds
- Pagination support

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **CORS**: cors middleware

## Project Structure

```
backend/
├── prisma/
│   └── schema.prisma        # Database schema
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── users.js            # User management routes
│   └── posts.js            # Post management routes
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
└── server.js               # Main server file
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Update the `.env` file with your database credentials:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/linkedin_community?schema=public"
   JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
   PORT=5000
   ```

3. **Set up the database**:
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev --name init
   ```

4. **Start the server**:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users (paginated)
- `GET /api/users/:id` - Get user profile by ID
- `GET /api/users/profile` - Get current user profile (protected)
- `PUT /api/users/profile` - Update current user profile (protected)

### Posts
- `GET /api/posts` - Get all posts (paginated)
- `POST /api/posts` - Create a new post (protected)
- `GET /api/posts/:id` - Get single post by ID
- `PUT /api/posts/:id` - Update post (protected, author only)
- `DELETE /api/posts/:id` - Delete post (protected, author only)
- `GET /api/posts/user/:userId` - Get posts by specific user

## Request/Response Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "bio": "Software developer passionate about technology"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Post
```bash
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Just built an amazing web application! #coding #webdev"
}
```

### Get Posts Feed
```bash
GET /api/posts?page=1&limit=10
```

## Database Schema

### User Model
- `id` - Unique identifier
- `email` - User's email (unique)
- `name` - User's display name
- `bio` - Optional user biography
- `password` - Hashed password
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp

### Post Model
- `id` - Unique identifier
- `content` - Post text content
- `authorId` - Reference to user who created the post
- `createdAt` - Post creation timestamp
- `updatedAt` - Last update timestamp

## Security Features

- **Password Hashing**: Using bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Using express-validator for request validation
- **CORS Protection**: Configured CORS middleware
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **Rate Limiting**: Can be added with express-rate-limit

## Development

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run build` - Install dependencies

### Database Operations
```bash
# Generate Prisma client after schema changes
npx prisma generate

# Create and apply new migration
npx prisma migrate dev --name migration_name

# Reset database (development only)
npx prisma migrate reset

# View database in Prisma Studio
npx prisma studio
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | development |
| `PORT` | Server port | 5000 |
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `JWT_EXPIRES_IN` | JWT token expiration time | 7d |

## Error Handling

The API includes comprehensive error handling:
- Input validation errors
- Authentication errors
- Authorization errors
- Database connection errors
- 404 Not Found errors
- 500 Internal Server errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
