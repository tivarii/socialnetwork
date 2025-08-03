# Deployment Guide for LinkedIn Community Backend

## For Vercel Deployment

### Step 1: Environment Variables
In your Vercel dashboard, add these environment variables:

- `DATABASE_URL` - Your PostgreSQL connection string
- `JWT_SECRET` - A secure secret key (minimum 32 characters)
- `NODE_ENV` - Set to "production"

### Step 2: Project Settings
1. **Framework Preset**: Other
2. **Build Command**: `npm run vercel-build`
3. **Output Directory**: Leave empty (this is for APIs)
4. **Install Command**: `npm install`

### Step 3: Database Setup
Before deploying, make sure your database is set up:

```bash
# Run this locally to create the initial migration
npx prisma migrate dev --name init

# Then deploy the schema to production
npx prisma migrate deploy
```

### Current Vercel Configuration

The `vercel.json` file is configured to:
- Use Node.js runtime
- Route all requests to the API handler
- Set production environment
- Allow 30-second function timeout

### Important Notes

1. **No Public Directory Needed**: This is a backend API, not a frontend app
2. **Database Migrations**: Run `prisma migrate deploy` for production
3. **Environment Variables**: Must be set in Vercel dashboard
4. **Build Process**: Uses `vercel-build` script for deployment

### Troubleshooting

If you see "No Output Directory named 'public' found":
1. Make sure Framework Preset is set to "Other" in Vercel
2. Leave Output Directory empty
3. Ensure `vercel.json` is properly configured

### Local Development

```bash
# Install dependencies
npm install

# Set up database (first time)
npm run db:setup

# Start development server
npm run dev
```

### Production Deployment

```bash
# Deploy to Vercel
vercel --prod

# Or push to connected Git repository
git push origin main
```
