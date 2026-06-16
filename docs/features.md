# Core Features & Components — browse.pro.bd

## Important Features

### 1. Search
**Must-have feature** using **Pagefind**
- Works perfectly with static sites
- Zero configuration needed
- Fast & indexed at build time

### 2. Tags & Filters
Users can filter by:
- Technology: Next.js, React, Python, Rust, Go, etc.
- Category: AI, SaaS, Open Source, Portfolio, Tool, Library
- Type: App, Library, Tool, Portfolio
- Year, Status, Featured

### 3. Featured Projects
Manually selected projects displayed on homepage

### 4. GitHub Stats
Build-time fetch:
- Repository stars
- Forks count
- Last updated date

### 5. SEO
Critical for growth. Implement:
- Dynamic sitemap
- robots.txt
- Metadata tags
- Open Graph images
- JSON-LD structured data

---

## Core Components

```
Navbar
Footer
SearchBar
Tag
ProjectCard
PortfolioCard
ToolCard
LibraryCard
FilterSidebar
MDXRenderer
ThemeToggle
Hero
Stats
```

---

## Homepage Structure

```
Hero Section
   ↓
Featured Projects (3-4)
   ↓
Latest Added (6-8 items)
   ↓
Popular Tags Cloud
   ↓
Featured Developers
   ↓
Trending Tools
   ↓
Stats Section
   ↓
CTA to Submit
```

---

## Detail Page Structure

Example: `/projects/our-social`

Contains:
- Cover image
- Screenshots/demo
- Detailed description (from MDX)
- GitHub link
- Live website link
- Tags (clickable filters)
- Author/Creator
- Related projects (3-4)
- Created date
- Last updated date
