# CLAUDE.md - Project Context

## Project Overview

**atghj** is a Next.js 16 web application for a digital journal/magazine platform (atghj.africa). The project manages articles, issues, announcements, submissions, and various informational pages.

## Technology Stack

- **Framework**: Next.js 16.1.1 with React 19.2.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.18 with PostCSS
- **Utilities**:
  - `axios` 1.13.1 - HTTP client
  - `date-fns` 4.1.0 - Date manipulation
  - `framer-motion` 12.23.24 - Animations
  - `lucide-react` 0.554.0 - Icon library
  - `react-icons` 5.5.0 - Additional icons
  - `hamburger-react` 2.5.2 - Mobile menu
- **Code Quality**:
  - ESLint 9 with Next.js config
  - Strict TypeScript mode enabled

## Project Structure

```
app/
├── globals.css                 # Global styles
├── layout.tsx                  # Root layout
├── page.tsx                    # Home page
├── api/                        # API routes
│   ├── announcements/
│   ├── articles/[articleId]/
│   ├── archive/
│   ├── debug-ojs/
│   ├── header/
│   ├── issues/[issueId]/
│   │   ├── current/
│   │   └── submissions/
│   └── submissions/[submissionId]/
├── pages/                      # Feature pages
│   ├── about/
│   ├── announcements/
│   ├── archive/
│   ├── articles/[articleId]/
│   ├── contact/
│   ├── ethics/
│   ├── guidelines/
│   ├── issues/[issueId]/
│   ├── masthead/
│   ├── policy/
│   ├── submissions/
│   └── (policy subpages)
├── components/                 # Reusable React components
│   ├── layout/                 # Header, Footer, Hero, etc.
│   ├── archive/                # Archive-specific components
│   ├── issues/                 # Issue-specific components
│   └── articles/               # Article display components
├── types/                      # TypeScript type definitions
│   ├── journal.ts
│   └── index.ts
└── utils/                      # Utility functions
    └── date.ts
```

## Key Features

### Content Management
- **Articles**: Individual article pages with viewing capabilities
- **Issues**: Management of journal issues with current/archive states
- **Submissions**: User submission system with publication tracking
- **Announcements**: News/update announcements

### API Endpoints
- `/api/articles/[articleId]` - Article data
- `/api/issues/current` - Current issue info
- `/api/issues/[issueId]` - Specific issue data
- `/api/issues/[issueId]/submissions` - Issue submissions
- `/api/submissions/[submissionId]/publications/[publicationsId]` - Publication details
- `/api/announcements` - Announcements list
- `/api/archive` - Archive data
- `/api/header` - Header configuration
- `/api/debug-ojs` - Debug endpoint

### Pages
- Home, About, Contact
- Ethics, Guidelines, Masthead, Policy
- Cookie Policy, Terms of Service
- Archive (filterable)
- Issue listings and details
- Article viewer
- Submission tracker

## Configuration

### Image Sources
Remote patterns configured for:
- `dashboard.atghj.africa` (HTTP/HTTPS) - Dashboard images
- `cdn.pixabay.com` (HTTPS) - Stock photos

### TypeScript
- Path aliases: `@/*` maps to project root
- Strict mode enabled
- ES2017 target
- JSX: react-jsx

## Development Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Common Development Tasks

### Adding New Pages
1. Create page file in `app/[featureName]/page.tsx`
2. Use layout.tsx for consistent structure
3. Import shared components from `app/components/`

### Creating API Routes
1. Create route file at `app/api/[resource]/route.ts`
2. Define GET/POST handlers
3. Return JSON responses
4. Utilize types from `app/types/`

### Styling
- Use Tailwind CSS utility classes
- Global styles in `app/globals.css`
- Component-scoped styles: inline Tailwind or CSS modules
- Animation: Use Framer Motion for dynamic effects

### Date Handling
- Import from `app/utils/date.ts`
- Use `date-fns` for date operations
- Ensure consistent date formatting across UI

## Important Notes

- **Remote Images**: Must be added to `next.config.ts` remote patterns
- **TypeScript**: Strict mode is enabled; all types should be properly defined
- **SSR/SSG**: App router structure supports both static and dynamic rendering
- **File Naming**: Use camelCase for files and PascalCase for components

## Related Resources

- Dashboard: https://dashboard.atghj.africa
- Deployment: Compatible with Vercel
- Next.js 16 docs: https://nextjs.org/docs

## Integration Points

- External dashboard API at `dashboard.atghj.africa`
- Pixabay CDN for image assets
- Open Journal Systems (OJS) integration (debug endpoint suggests OJS compatibility)
