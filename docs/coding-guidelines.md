# Coding Guidelines

## Core Rules

- Use TypeScript everywhere
- Use Next.js App Router only
- Use Server Components by default
- Use Tailwind CSS for styling
- Use Shadcn UI components when possible
- Avoid client components unless necessary
- Avoid ESLint and TypeScript errors
- Keep components reusable and modular
- Prefer composition over duplication
- Avoid unnecessary dependencies
- Keep pages statically generated when possible
- Use async server functions when needed
- Do not add database/auth unless explicitly requested
- Do not add API routes unless necessary
- Do not use external state libraries unless required

---

# Project Architecture

## Rendering

- Prefer Static Site Generation (SSG)
- Use Server Components first
- Use Client Components only for interactive UI
- Minimize client-side JavaScript

## Content System

- All content must come from MDX files
- Content should be type-safe
- Validate frontmatter fields
- Use local images from `/public/images`

## Search

- Use Pagefind only
- No database-powered search

---

# Naming Conventions

## Files & Folders

- Use `kebab-case`
- Example:
  - `project-card.tsx`
  - `filter-sidebar.tsx`

## Components

- Use `PascalCase`
- Example:
  - `ProjectCard`
  - `SearchBar`

## Functions & Variables

- Use `camelCase`
- Example:
  - `getProjects`
  - `filteredTags`

## Constants

- Use `UPPER_SNAKE_CASE`
- Example:
  - `MAX_IMAGE_SIZE`

---

# Component Structure

Each component should:

- Be reusable
- Accept typed props
- Avoid inline complexity
- Keep logic minimal
- Be split if too large
- Prefer server-safe patterns

---

# Styling Guidelines

- Use Tailwind utility classes
- Avoid custom CSS unless necessary
- Use `cn()` utility for class merging
- Use consistent spacing scale
- Use responsive utilities properly
- Prefer utility-first styling

---

# Performance Rules

- Optimize all images
- Avoid unnecessary animations
- Prefer static rendering
- Lazy load heavy components
- Avoid large client bundles
- Avoid unnecessary re-renders

---

# Accessibility

- Use semantic HTML
- Support keyboard navigation
- Add ARIA labels when needed
- Maintain proper color contrast
- Ensure focus states are visible

---

# SEO Rules

- Use proper metadata
- Add Open Graph tags
- Generate sitemap
- Use descriptive page titles
- Use clean URLs

---

# Dependency Rules

Before adding a package:

- Check if native Next.js can solve it
- Avoid duplicate functionality
- Keep bundle size minimal

Avoid unnecessary packages for:
- animations
- utilities
- icons
- state management

---

# Code Quality

- Keep functions small
- Avoid deeply nested logic
- Extract reusable utilities
- Prefer readability over cleverness
- Write maintainable code

---

# Important Constraints

## DO NOT ADD

- Database
- Authentication
- Admin dashboard
- Express server
- Prisma
- MongoDB
- REST API backend
- Complex caching systems

Unless explicitly requested.

---

# Development Philosophy

- Keep architecture simple
- Build MVP first
- Optimize later
- Prioritize maintainability
- Prioritize developer experience
- Prioritize performance