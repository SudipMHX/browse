# Contributing to browse.pro.bd

Thank you for contributing to **browse.pro.bd** — the open directory for Bangladeshi developers, projects, tools, and libraries. Every submission is a single MDX file. No backend access needed. No accounts. Just a PR.

---

## Table of Contents

- [Before You Start](#before-you-start)
- [Step-by-Step Workflow](#step-by-step-workflow)
- [Content Templates](#content-templates)
  - [Portfolio](#-portfolio-template)
  - [Project](#-project-template)
  - [Tool](#-tool-template)
  - [Library](#-library-template)
- [Adding Images](#adding-images)
- [Content Guidelines](#content-guidelines)
- [File Naming Rules](#file-naming-rules)
- [Auto-Merge & GitHub Stats](#auto-merge--github-stats)

---

## Before You Start

- The **creator or author must be a Bangladeshi developer** (or a team led by one).
- All GitHub/website links must be **real and publicly accessible**.
- No spam, duplicate entries, or placeholder content.
- Each submission = **one `.mdx` file** inside the correct `content/` subdirectory.

---

## Step-by-Step Workflow

```
1. Fork this repository
        ↓
2. Create your MDX file in the right content/ folder
        ↓
3. Copy the template for your content type (below)
        ↓
4. Fill in your details — delete any optional fields you don't need
        ↓
5. (Optional) Add a cover image — follow the image guide below
        ↓
6. Open a Pull Request to main
        ↓
7. GitHub Actions auto-validates + auto-merges content-only PRs
        ↓
8. GitHub Actions fetches your live GitHub stats and writes them into your file
        ↓
9. Your entry goes live on the site ✅
```

---

## Content Templates

Copy the template for your content type. Fill in your own values. Delete optional fields you don't have.

---

### 👤 Portfolio Template

**File location:** `content/portfolios/your-name.mdx`

```mdx
---
title: "Your Full Name"
name: "Your Full Name"
description: "One or two sentences about who you are, what you build, and where you're from."
website: "https://yourwebsite.com"          # optional — your personal site
github: "https://github.com/yourusername"   # required — used to fetch stats
twitter: "https://twitter.com/yourhandle"   # optional
linkedin: "https://linkedin.com/in/yourhandle" # optional
avatar: "/images/portfolios/your-name.jpg"  # optional — see Adding Images below
tags:
  - react
  - typescript
  - nextjs
  - open-source
# Allowed types: frontend | backend | fullstack | designer | student | other
type: fullstack
featured: false
year: 2026
---

# Hi, I'm Your Name 👋

Write a few paragraphs about yourself. What do you build? What problems do you love solving?
Tell the community what makes your work interesting.

## What I Build

- Something cool
- Another thing you work on

## Currently Working On

- Your current projects or goals

## Skills

List your main technologies here.
```

> **Stats auto-fetched:** After your PR merges, GitHub Actions will read your `github:` URL and automatically add `totalStars`, `followers`, and `publicRepos` to your file's frontmatter. You don't need to add these yourself.

---

### 🚀 Project Template

**File location:** `content/projects/your-project-name.mdx`

```mdx
---
title: "Your Project Name"
description: "One punchy sentence describing what your project does and who it helps."
github: "https://github.com/yourusername/your-project" # required — used to fetch stats
website: "https://yourproject.com"                      # optional
author: "Your Name"
tags:
  - react
  - nodejs
  - open-source
featured: false
# Allowed statuses: active | archived | wip
status: active
year: 2026
coverImage: "/images/projects/your-project.jpg"  # optional — see Adding Images below
---

# Your Project Name

Describe what your project does in one short paragraph. Be clear and direct.

## Key Features

- Feature one
- Feature two
- Feature three

## Tech Stack

Briefly describe the main technologies used.

## Getting Started

```bash
git clone https://github.com/yourusername/your-project
npm install
npm run dev
```

Add any other quick-start info here.
```

> **Stats auto-fetched:** After merging, GitHub Actions adds `stars`, `forks`, `lastUpdated`, and `language` to your frontmatter automatically.

---

### 🛠️ Tool Template

**File location:** `content/tools/your-tool-name.mdx`

```mdx
---
title: "Your Tool Name"
description: "One sentence: what the tool does and who it's for."
website: "https://yourtool.com"                        # required — the tool's homepage or docs
github: "https://github.com/yourusername/your-tool"   # optional — used to fetch stars/forks if provided
author: "Your Name"
tags:
  - api
  - cli
  - developer-tool
featured: false
free: true      # true if the tool is free to use, false if it's paid/freemium
year: 2026
coverImage: "/images/tools/your-tool.jpg"  # optional — see Adding Images below
---

# Your Tool Name

Describe what problem the tool solves. Keep it direct — developers want to know if this is for them in 10 seconds.

## What It Does

- Capability one
- Capability two

## Usage

```bash
# Quick example of how to use the tool
curl https://yourtool.com/api/endpoint
```

## Pricing

Free / Freemium / Paid — describe briefly.
```

> **Stats auto-fetched:** If you include a `github:` URL, stars and forks are added automatically after merge.

---

### 📦 Library Template

**File location:** `content/libraries/your-library-name.mdx`

```mdx
---
title: "Your Library Name"
description: "One sentence: what the library does and what problem it solves."
github: "https://github.com/yourusername/your-library" # required — used to fetch stats
npm: "https://www.npmjs.com/package/your-library"      # optional — npm package link
author: "Your Name"
tags:
  - nodejs
  - typescript
  - utility
featured: false
year: 2026
---

# Your Library Name

A short intro paragraph explaining what the library does and why someone would use it.

## Installation

```bash
npm install your-library
# or
yarn add your-library
```

## Usage

```js
import { yourFunction } from 'your-library'

const result = yourFunction('example')
console.log(result)
```

## API

Describe the main exports / functions briefly.

## Why This Exists

Optional: explain what gap this fills that other libraries don't.
```

> **Stats auto-fetched:** After merging, GitHub Actions adds `stars`, `forks`, `lastUpdated`, and `language` to your frontmatter automatically.

---

## Adding Images

Images are **optional** but highly recommended for projects, tools, and libraries.

### Where to put your image

Place your image inside `public/images/<content-type>/`:

| Content type | Image folder                    |
|-------------|----------------------------------|
| Portfolio   | `public/images/portfolios/`      |
| Project     | `public/images/projects/`        |
| Tool        | `public/images/tools/`           |
| Library     | `public/images/libraries/`       |

### Image requirements

| Rule | Detail |
|------|--------|
| **Format** | `.jpg`, `.jpeg`, `.png`, or `.webp` |
| **Max size** | **500 KB** — compress before uploading |
| **Dimensions** | Recommended **1200 × 630 px** (16:9 ratio) |
| **Filename** | Use lowercase, hyphens only — e.g. `my-cool-project.jpg` |
| **Content** | Must be a screenshot, logo, or banner related to your submission — no stock photos |

### How to reference the image in your MDX

```yaml
# For portfolio — use the avatar field:
avatar: "/images/portfolios/your-name.jpg"

# For project / tool / library — use the coverImage field:
coverImage: "/images/projects/your-project.jpg"
```

> ⚠️ **Paths start with `/images/...`** — do not include `public/` in the path.

### Compressing your image

Use one of these free tools before uploading:
- [Squoosh](https://squoosh.app) — in-browser, no upload limit
- [TinyPNG](https://tinypng.com) — drag and drop
- [ImageOptim](https://imageoptim.com) — macOS app

### Avatar / profile photo (Portfolios only)

You can skip the `avatar` field entirely — the site will generate an avatar from your GitHub username automatically.

If you do provide one:
- Square crop works best (1:1 ratio)
- Minimum **400 × 400 px**
- File goes in `public/images/portfolios/your-name.jpg`

---

## Content Guidelines

### ✅ Required for all content types
- `title` — name of the project/portfolio/tool/library
- `description` — one clear sentence (max 160 characters)
- At least one valid `github:` or `website:` URL
- At least **2 relevant tags** (lowercase, hyphen-separated)
- `year` — the year you created or launched it
- A body section below the frontmatter (min ~50 words)

### ❌ Not allowed
- Placeholder or test submissions
- Duplicate entries (search first!)
- Referral links or affiliate URLs
- Content unrelated to Bangladeshi developers
- Images larger than 500 KB
- Private/inaccessible GitHub repos

### Tags

Use lowercase, hyphen-separated tags. Good examples:

```
react, nextjs, typescript, nodejs, python, django, api, cli, open-source,
ui-kit, design-system, developer-tool, library, mobile, android, ios,
tailwindcss, mongodb, postgresql, redis, docker, aws
```

Avoid vague tags like `cool`, `awesome`, `my-project`.

---

## File Naming Rules

Your MDX filename becomes the URL slug. Rules:

- ✅ Lowercase only
- ✅ Hyphens to separate words: `my-cool-project.mdx`
- ✅ No spaces, underscores, or special characters
- ✅ Keep it short and descriptive
- ✅ Must end in `.mdx`

Examples:
```
content/projects/bd-payment-sdk.mdx
content/portfolios/rahim-hossain.mdx
content/tools/nid-verify-api.mdx
content/libraries/shadcn-bd.mdx
```

---

## Auto-Merge & GitHub Stats

### Auto-merge

Pull Requests that **only touch files inside `content/`** are automatically merged without manual review. If your PR also touches source code, it will require maintainer approval.

### GitHub Stats enrichment

After your PR is merged, a GitHub Actions workflow automatically:
1. Reads the `github:` URL from your MDX frontmatter
2. Fetches live stats from the GitHub API
3. Writes the stats back into your file

**For portfolios:** `totalStars`, `followers`, `publicRepos`  
**For projects / tools / libraries:** `stars`, `forks`, `lastUpdated`, `language`

If the GitHub API is unavailable during the workflow run, all stats default to `0`. They will be updated on the next enrichment run. **You never need to add these fields manually.**

---

Thank you for contributing to browse.pro.bd! 🇧🇩  
Questions? Open a [GitHub Discussion](https://github.com/SudipMHX/browse/discussions) or file an [Issue](https://github.com/SudipMHX/browse/issues).
