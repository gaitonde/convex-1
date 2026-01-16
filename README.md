# URL Summarizer

A simple Next.js app that uses Convex as a backend to store and manage URLs. Future enhancement: AI-powered page summarization.

## Tech Stack

- **Frontend**: Next.js 15 with React 18 and TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Convex (serverless backend)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- A Convex account (free at [convex.dev](https://convex.dev))

### Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Convex project:
   ```bash
   npx convex auth
   npx convex dev
   ```

4. Copy `.env.local.example` to `.env.local` and add your Convex URL:
   ```bash
   cp .env.local.example .env.local
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the app.

## Features

- ✅ Add URLs to a database
- ✅ View all stored URLs
- ✅ Delete URLs
- 🚧 AI-powered page summarization (coming soon)

## Development

### Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

- `app/` - Next.js app directory with pages and layouts
- `convex/` - Convex backend code (schema and functions)
- `public/` - Static assets

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the `NEXT_PUBLIC_CONVEX_URL` environment variable
4. Deploy!

For more details, see [Vercel's Next.js deployment docs](https://vercel.com/docs/frameworks/nextjs).

## Next Steps

- Add AI summarization using an LLM API
- Add user authentication
- Add ability to tag and filter URLs
- Add search functionality
