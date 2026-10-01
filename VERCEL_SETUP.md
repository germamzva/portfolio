# Vercel Deployment Setup

This project has been restructured for deployment on Vercel with both frontend and backend.

## Changes Made

### Backend Restructuring
- Converted Express app to Vercel serverless functions in the `api/` directory
- Removed session-based authentication (now uses JWT only)
- Removed file upload functionality (multer) - not compatible with serverless
- Removed puppeteer screenshot functionality - not compatible with serverless
- Added CORS headers for proper frontend-backend communication
- All API routes now follow Vercel's serverless function pattern

### Frontend Updates
- Updated API base URL from `http://localhost:3221/api` to `/api` (relative path)
- This allows the frontend to work both locally and on Vercel without configuration changes

### Configuration Files
- `vercel.json` - Vercel deployment configuration
- `.env.example` - Template for required environment variables
- `.gitignore` - Updated to exclude sensitive files

## Environment Variables

Add these to your Vercel project settings:

**Required:**
- `MONGO_URL` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Set to "production"
- `FRONTEND_URL` - Your Vercel app URL (e.g., https://your-app.vercel.app)

**Optional (for Google OAuth):**
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI` - Should be: https://your-app.vercel.app/api/auth/google/callback

**Optional (for Contact Form):**
- `EMAIL_USER` - Gmail address
- `EMAIL_PASS` - Gmail app password

## API Routes

All API routes are now under `/api`:

- `/api/auth/google/url` - Get Google OAuth URL
- `/api/auth/google/callback` - Google OAuth callback
- `/api/user/me` - Get current user
- `/api/personal` - Get/Create/Update personal info
- `/api/personal/primary` - Get profile image
- `/api/skills` - Get/Add skills
- `/api/skills/[id]` - Update/Delete skills
- `/api/experiences` - Get/Add experiences
- `/api/experiences/[id]` - Get/Update/Delete experiences
- `/api/education` - Get/Add education
- `/api/education/[id]` - Get/Update/Delete education
- `/api/projects` - Get/Add projects
- `/api/projects/[id]` - Get/Update/Delete projects
- `/api/contact/create` - Create contact form submission
- `/api/resume/[userId]` - Get resume data for a user

## Removed Features

The following features were removed as they are not compatible with Vercel serverless functions:

1. **File Uploads** - Profile picture upload functionality removed
2. **Project Screenshots** - Automatic screenshot generation removed
3. **Session-based Auth** - Now uses JWT cookies only
4. **CSRF Protection** - Simplified to JWT-based auth
5. **CAPTCHA** - Removed session-dependent CAPTCHA

## Deployment

1. Push changes to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Local Development

For local development, you can still use the old backend:
```bash
cd backend
npm run dev
```

Or test the Vercel serverless functions locally using Vercel CLI:
```bash
vercel dev
```
