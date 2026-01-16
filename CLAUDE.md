# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

URL Summarizer is a fullstack Next.js application that uses Convex as its backend database. The app allows users to store and manage URLs, with planned AI-powered page summarization features.

**Tech Stack:**
- Next.js 15 (App Router)
- React 18 with TypeScript
- Convex (serverless backend & database)
- Tailwind CSS
- Vercel (deployment target)

## Development Commands

```bash
# Development server (includes Convex local development)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Install dependencies
npm install

# Initialize/setup Convex backend (run once for new projects)
npx convex auth
npx convex dev

# Push schema changes to Convex
npx convex push
```

## Architecture

### Frontend (Next.js App Router)

- **`app/page.tsx`** - Main page with URL list and add/delete functionality
- **`app/layout.tsx`** - Root layout that wraps the Convex provider
- **`app/ConvexClientProvider.tsx`** - Client component that initializes and provides Convex client to the app
- **`app/globals.css`** - Tailwind CSS setup

The app uses Convex React hooks (`useQuery` and `useMutation`) to interact with the backend. All data fetching and mutations are reactive through these hooks.

### Backend (Convex)

Convex is a serverless backend platform. All backend code lives in the `convex/` directory:

- **`convex/schema.ts`** - Database schema definition. Defines the `urls` table with fields for URL and optional summary
- **`convex/urls.ts`** - Backend functions:
  - `listUrls` - Query to fetch all URLs, ordered by creation time (newest first)
  - `addUrl` - Mutation to insert a new URL
  - `deleteUrl` - Mutation to delete a URL by ID

Convex automatically generates the `_generated/` directory with type-safe client functions. This is created by `npx convex dev` or `npx convex push`.

### Data Model

The `urls` table stores:
- `_id` (auto-generated) - Unique identifier
- `url` (string) - The URL to store
- `summary` (optional string) - Placeholder for future AI summarization
- `_creationTime` (auto-generated) - Timestamp of creation

## Key Integration Points

### Convex Setup

1. **Environment**: Create a `.env.local` file with `NEXT_PUBLIC_CONVEX_URL` pointing to your Convex deployment
2. **Local Development**: Run `npx convex dev` in a separate terminal to start Convex local development. This:
   - Starts a local Convex backend
   - Watches for schema changes
   - Generates the `_generated/` directory
3. **Type Safety**: Convex auto-generates types from your schema. After schema changes, the generated types update automatically in development

### Client-Server Communication

- The `ConvexClientProvider` wraps the entire app and provides the Convex client
- Components use `useQuery(api.urls.listUrls)` to subscribe to data (reactive)
- Components use `useMutation(api.urls.addUrl)` to call mutations
- All calls are type-safe thanks to Convex code generation

### Styling

Tailwind CSS is configured in `tailwind.config.ts`. The main layout uses Tailwind classes for a clean, gradient background design.

## Important Notes

### Convex Authentication

- First-time setup: Run `npx convex auth` to authenticate with Convex
- This creates a `.convex/` directory (in `.gitignore`) with your local credentials
- Each developer needs to run `npx convex auth` independently

### Environment Variables

- `.env.local` is in `.gitignore` - each developer creates their own
- Use `.env.local.example` as a template
- `NEXT_PUBLIC_` prefix is required for variables used in the browser

### Future Enhancements

When adding AI summarization:
1. Add a `summary` field update in the `urls.ts` mutation or create a new mutation `summarizeUrl`
2. Consider using an LLM API (OpenAI, Anthropic, etc.)
3. Store API keys securely (as Convex environment variables, not in code)
4. Add error handling for failed summarization attempts

### Production Deployment

For Vercel deployment:
1. Connect the GitHub repo to Vercel
2. Set `NEXT_PUBLIC_CONVEX_URL` environment variable in Vercel project settings
3. Create a production Convex deployment (via Convex dashboard)
4. Push schema to production: `npx convex push --prod`

## Common Tasks

**Adding a new field to the URL model:**
1. Update `convex/schema.ts` to add the field
2. Update relevant functions in `convex/urls.ts`
3. Run `npx convex push` or restart `npx convex dev` to sync
4. Types will auto-update

**Adding a new mutation:**
1. Define in `convex/urls.ts` with proper args validation
2. Export the function
3. Auto-generated types appear in `./_generated/api`
4. Use in React with `useMutation(api.urls.yourFunction)`

**Debugging:**
- Open Convex dashboard to view database contents and real-time function calls
- Check `npm run dev` terminal output for errors
- React DevTools useful for inspecting component state and hooks
