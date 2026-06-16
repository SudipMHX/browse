# Architecture — browse.pro.bd

## Content Flow

```
Contributor
    ↓
GitHub Pull Request
    ↓
MDX File
    ↓
Validation
    ↓
Merge
    ↓
Vercel Deploy
    ↓
Live Site
```

---

## Folder Structure

### Recommended Project Structure

```
app/
components/
content/
lib/
types/
styles/
config/
public/
```

---

## Content Organization

```
content/
 ├── projects/
 ├── portfolios/
 ├── tools/
 └── libraries/
```

---

## Images

```
public/
 └── images/
      ├── projects/
      ├── portfolios/
      ├── tools/
      └── libraries/
```

---

## URL Structure

```
/

/projects
/projects/[slug]

/portfolios
/portfolios/[slug]

/tools
/tools/[slug]

/libraries
/libraries/[slug]

/submit
/about
/contributors

/privacy
/terms
/contact
/faq
```

---

## MDX File Structure

### Example Project MDX

```mdx
---
title: "Our Social"
description: "Lightweight social platform."
coverImage: "/images/projects/our-social.png"  # optional
github: "https://github.com/example/project"
website: "https://example.com"
author: "Sudip"
tags:
  - nextjs
  - social
  - open-source
featured: true
status: active
year: 2026
---

# About

Project details here...
```

### MDX Schema Fields

- **title** — Project name
- **description** — Short description
- **github** — GitHub repository URL
- **website** — Live website URL (optional)
- **author** — Creator name
- **tags** — Array of categories/technologies
- **featured** — Boolean for homepage feature
- **status** — active/archived
- **year** — Launch year
