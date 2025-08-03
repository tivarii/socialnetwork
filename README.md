# MiniLinkedIn - Social Network Platform

A modern, full-stack social networking platform inspired by LinkedIn, built with cutting-edge technologies. This application allows users to create profiles, share posts, and connect with other professionals in a secure and user-friendly environment.

## 🚀 Live Demo
- **Frontend**: [Add your live frontend URL here]
- **Backend API**: [Add your live backend URL here]

## 📋 GitHub Repository
- **Repository**: [https://github.com/tivarii/socialnetwork](https://github.com/tivarii/socialnetwork)

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.3.1 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Radix UI primitives with custom components
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast notifications)
- **State Management**: React Context API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **CORS**: cors middleware

### Development Tools
- **Package Manager**: npm
- **Database Migration**: Prisma Migrate
- **Development Server**: nodemon (backend), Next.js dev server (frontend)

## ✨ Features

### 🔐 Authentication & Security
- User registration with email validation
- Secure login with JWT tokens
- Password hashing with bcrypt (12 salt rounds)
- Protected routes with middleware
- Automatic token verification
- Secure logout functionality

### 👤 User Management
- **Profile Creation**: Complete user profiles with name, email, and bio
- **Profile Editing**: Users can update their information
- **Profile Viewing**: View any user's public profile
- **User Discovery**: Browse all users in the platform
- **Avatar System**: Auto-generated avatars with user initials

### 📝 Post Management
- **Create Posts**: Share text content up to 2000 characters
- **Public Feed**: View all posts in chronological order
- **User-specific Feeds**: View posts from specific users
- **Post Editing**: Edit your own posts
- **Post Deletion**: Delete your own posts
- **Pagination**: Efficient loading with pagination

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Modern UI**: Clean, professional interface with shadcn/ui components
- **Real-time Updates**: Instant feedback on actions
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Success and error notifications

## 📁 Project Structure

```
socialnetwork/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App router pages
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   ├── profile/[id]/   # Dynamic profile pages
│   │   └── users/          # User discovery page
│   ├── components/         # Reusable React components
│   │   ├── ui/            # Base UI components (shadcn/ui)
│   │   ├── navbar.tsx     # Navigation component
│   │   ├── post-feed.tsx  # Post feed component
│   │   └── create-post.tsx # Post creation component
│   ├── contexts/          # React Context providers
│   │   └── auth-context.tsx # Authentication context
│   └── lib/               # Utility functions
└── backend/               # Express.js backend application
    ├── routes/           # API route handlers
    │   ├── auth.js      # Authentication routes
    │   ├── users.js     # User management routes
    │   └── posts.js     # Post management routes
    ├── middleware/      # Express middleware
    │   └── auth.js     # JWT authentication middleware
    ├── prisma/         # Database schema and migrations
    │   ├── schema.prisma # Database schema
    │   └── migrations/   # Database migrations
    └── server.js       # Express server entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm package manager

### 🗄️ Database Setup

1. **Install PostgreSQL** or use a cloud provider like:
   - [Supabase](https://supabase.com/)
   - [Neon](https://neon.tech/)
   - [Railway](https://railway.app/)
   - [PlanetScale](https://planetscale.com/)

2. **Create a database** named `linkedin_community` (or any name you prefer)

### ⚙️ Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters
   JWT_EXPIRES_IN=7d
   DATABASE_URL="postgresql://username:password@localhost:5432/linkedin_community?schema=public"
   ```

4. **Database Setup**:
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Run database migrations
   npm run db:migrate
   ```

5. **Start the backend server**:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

   The backend will be available at `http://localhost:5000`

### 🎨 Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
   ```

4. **Start the frontend development server**:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

## 🔧 Available Scripts

### Backend
- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:reset` - Reset database and run all migrations

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 👥 Demo Users

You can create demo users through the registration page, or use these sample credentials if you've seeded the database:

```json
{
  "email": "demo@example.com",
  "password": "demo123"
}
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Users
- `GET /api/users` - Get all users (paginated)
- `GET /api/users/:id` - Get user profile by ID
- `GET /api/users/profile` - Get current user profile (protected)
- `PUT /api/users/profile` - Update current user profile (protected)

### Posts
- `GET /api/posts` - Get all posts (paginated)
- `POST /api/posts` - Create new post (protected)
- `GET /api/posts/:id` - Get single post by ID
- `PUT /api/posts/:id` - Update post (protected, author only)
- `DELETE /api/posts/:id` - Delete post (protected, author only)
- `GET /api/posts/user/:userId` - Get posts by specific user

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs with 12 salt rounds
- **Input Validation**: Comprehensive validation using express-validator
- **CORS Protection**: Configured CORS middleware
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **XSS Protection**: Input sanitization and validation
- **Route Protection**: Middleware-based route protection

## 🚀 Deployment

### Backend Deployment (Railway/Heroku/DigitalOcean)
1. Set up environment variables
2. Configure production database
3. Run migrations: `npm run db:deploy`
4. Start with: `npm start`

### Frontend Deployment (Vercel/Netlify)
1. Connect your repository
2. Set environment variables
3. Build command: `npm run build`
4. Deploy automatically on push

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Prisma](https://prisma.io/) for the excellent database toolkit
- [Radix UI](https://radix-ui.com/) for accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components

---

**Built with ❤️ by [Adarsh Tiwari]**