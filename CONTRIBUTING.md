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
1.  Fork this repository
         ↓
2.  Create your MDX file in the right content/ folder
         ↓
3.  Copy the template below for your content type
         ↓
4.  Fill in your details — delete optional fields you don't need
         ↓
5.  (Optional) Add a cover image — follow the image guide below
         ↓
6.  Open a Pull Request to main
         ↓
7.  GitHub Actions auto-validates + auto-merges content-only PRs
         ↓
8.  GitHub Actions fetches your live GitHub stats and writes them into your file
         ↓
9.  Your entry goes live on the site ✅
```

---

## Content Templates

Copy the template for your content type. Fill in your own values. **Delete any optional fields you don't have.**

---

### 👤 Portfolio Template

**File location:** `content/portfolios/your-github-username.mdx`

````mdx
---
title: "Your Full Name"
name: "Your Full Name"
description: "One or two sentences about who you are, what you build, and where you're from."
website: "https://yourwebsite.com"              # optional — your personal site
github: "https://github.com/yourusername"       # required — used to fetch stats automatically
twitter: "https://twitter.com/yourhandle"       # optional
linkedin: "https://linkedin.com/in/yourhandle"  # optional
avatar: "/images/portfolios/your-name.jpg"      # optional — see Adding Images section below
tags:
  - react
  - typescript
  - nextjs
  - open-source
# Allowed values: frontend | backend | fullstack | designer | student | other
type: fullstack
featured: false
year: 2026
---

# Hi, I'm Your Name 👋

Write a few paragraphs about yourself. What do you build? What problems do you love solving?
Tell the community what makes your work interesting.

## What I Build

- Something cool you've built
- Another project or product you maintain

## Currently Working On

- Your current project or goal

## Skills & Tech

List your main technologies and tools here.
````

> **Stats auto-fetched:** After your PR merges, GitHub Actions reads your `github:` URL and automatically adds `totalStars`, `followers`, and `publicRepos` to your frontmatter. **Do not add these fields yourself.**

---

### 🚀 Project Template

**File location:** `content/projects/your-project-name.mdx`

````mdx
---
title: "Your Project Name"
description: "One punchy sentence describing what your project does and who it helps."
github: "https://github.com/yourusername/your-project"  # required — used to fetch stats automatically
website: "https://yourproject.com"                       # optional
author: "Your Name"
tags:
  - react
  - nodejs
  - open-source
featured: false
# Allowed values: active | archived | wip
status: active
year: 2026
coverImage: "/images/projects/your-project.jpg"  # optional — see Adding Images section below
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
cd your-project
npm install
npm run dev
```

Add any other quick-start info here.
````

> **Stats auto-fetched:** After merging, GitHub Actions adds `stars`, `forks`, `lastUpdated`, and `language` to your frontmatter automatically.

---

### 🛠️ Tool Template

**File location:** `content/tools/your-tool-name.mdx`

````mdx
---
title: "Your Tool Name"
description: "One sentence: what the tool does and who it's for."
website: "https://yourtool.com"                          # required — tool homepage or docs
github: "https://github.com/yourusername/your-tool"     # optional — used to fetch stars/forks if provided
author: "Your Name"
tags:
  - api
  - cli
  - developer-tool
featured: false
free: true    # true = free to use · false = paid or freemium
year: 2026
coverImage: "/images/tools/your-tool.jpg"  # optional — see Adding Images section below
---

# Your Tool Name

Describe what problem the tool solves. Keep it direct — developers want to know if this is for them in 10 seconds.

## What It Does

- Capability one
- Capability two

## Usage

```bash
# Quick example
curl https://yourtool.com/api/endpoint
```

## Pricing

Free / Freemium / Paid — describe briefly.
````

> **Stats auto-fetched:** If you include a `github:` URL, stars and forks are added automatically after merge.

---

### 📦 Library Template

**File location:** `content/libraries/your-library-name.mdx`

````mdx
---
title: "Your Library Name"
description: "One sentence: what the library does and what problem it solves."
github: "https://github.com/yourusername/your-library"  # required — used to fetch stats automatically
npm: "https://www.npmjs.com/package/your-library"        # optional — npm package page
author: "Your Name"
tags:
  - nodejs
  - typescript
  - utility
featured: false
year: 2026
---

# Your Library Name

A short intro paragraph explaining what the library does and why someone would use it over alternatives.

## Installation

```bash
npm install your-library
# or
yarn add your-library
# or
pnpm add your-library
```

## Usage

```js
import { yourFunction } from 'your-library'

const result = yourFunction('example')
console.log(result)
```

## API

Describe the main exports and functions briefly.

## Why This Exists

Optional: explain what gap this fills that other libraries don't.
````

> **Stats auto-fetched:** After merging, GitHub Actions adds `stars`, `forks`, `lastUpdated`, and `language` to your frontmatter automatically.

---

## Adding Images

Images are **optional** but highly recommended — they make your card stand out on the directory.

### Where to put your image

Place your image file inside `public/images/<content-type>/`:

| Content type | Folder path                     |
| ------------ | ------------------------------- |
| Portfolio    | `public/images/portfolios/`     |
| Project      | `public/images/projects/`       |
| Tool         | `public/images/tools/`          |
| Library      | `public/images/libraries/`      |

### Image requirements

| Rule            | Detail                                                               |
| --------------- | -------------------------------------------------------------------- |
| **Format**      | `.jpg`, `.jpeg`, `.png`, or `.webp`                                  |
| **Max size**    | **500 KB** — compress before uploading                               |
| **Dimensions**  | Recommended **1200 × 630 px** (16:9 ratio)                          |
| **Filename**    | Lowercase, hyphens only — e.g. `my-cool-project.jpg`                |
| **Content**     | Screenshot, logo, or banner related to your work — no stock photos  |

### How to reference the image in your MDX

```yaml
# Portfolio — use the avatar field:
avatar: "/images/portfolios/your-name.jpg"

# Project / Tool / Library — use the coverImage field:
coverImage: "/images/projects/your-project.jpg"
```

> ⚠️ **Paths start with `/images/...`** — do **not** include `public/` in the path.

### Compressing your image (free tools)

- [Squoosh](https://squoosh.app) — in-browser, no upload limit, best quality
- [TinyPNG](https://tinypng.com) — drag and drop
- [ImageOptim](https://imageoptim.com) — macOS app

### Avatar / profile photo (Portfolios only)

The `avatar` field is **optional** — if you skip it, the site automatically uses your GitHub avatar.

If you do provide one:
- Square crop recommended (1:1 ratio)
- Minimum **400 × 400 px**
- Place in `public/images/portfolios/your-name.jpg`

---

## Content Guidelines

### ✅ Required for all content types

| Field | Requirement |
| ----- | ----------- |
| `title` | Name of your project / portfolio / tool / library |
| `description` | One clear sentence, max 160 characters |
| `github` or `website` | At least one valid, publicly accessible URL |
| `tags` | At least 2 relevant tags (lowercase, hyphen-separated) |
| `year` | The year you created or launched it |
| Body | Markdown content below the frontmatter — minimum ~50 words |

### ❌ Not allowed

- Placeholder or test submissions
- Duplicate entries — search the site before submitting
- Referral links or affiliate URLs in any field
- Content unrelated to Bangladeshi developers
- Images larger than 500 KB
- Private or inaccessible GitHub repositories

### Tags

Use **lowercase**, **hyphen-separated** tags. Good examples:

```
react  nextjs  typescript  nodejs  python  django  api  cli  open-source
ui-kit  design-system  developer-tool  library  mobile  android  ios
tailwindcss  mongodb  postgresql  redis  docker  aws  firebase  supabase
```

Avoid vague tags like `cool`, `awesome`, or `my-project`.

---

## File Naming Rules

Your MDX filename becomes the URL slug. Follow these rules:

| Rule | Example |
| ---- | ------- |
| ✅ Lowercase only | `my-cool-project.mdx` |
| ✅ Hyphens between words | `bd-payment-sdk.mdx` |
| ✅ Short and descriptive | `nid-verify-api.mdx` |
| ✅ Must end in `.mdx` | `rahim-hossain.mdx` |
| ❌ No spaces | ~~`my cool project.mdx`~~ |
| ❌ No underscores | ~~`my_cool_project.mdx`~~ |
| ❌ No special characters | ~~`my@project!.mdx`~~ |

**Full path examples:**

```
content/projects/bd-payment-sdk.mdx
content/portfolios/rahim-hossain.mdx
content/tools/nid-verify-api.mdx
content/libraries/shadcn-bd.mdx
```

---

## Auto-Merge & GitHub Stats

### Auto-merge

Pull Requests that **only touch files inside `content/`** are automatically merged without manual review — no waiting required.

If your PR also modifies source code, configuration, or any other file outside `content/`, it will require a maintainer to review it manually.

### GitHub Stats enrichment

After your PR is merged, a GitHub Actions workflow automatically:

1. Reads the `github:` URL from your MDX frontmatter
2. Fetches live stats from the GitHub API
3. Writes the stats back into your MDX file and commits them

| Content type | Stats added automatically |
| ------------ | ------------------------- |
| Portfolio | `totalStars`, `followers`, `publicRepos` |
| Project / Tool / Library | `stars`, `forks`, `lastUpdated`, `language` |

> If the GitHub API is unavailable during the workflow run, all stats default to `0` and will be updated on the next run. **You never need to add `githubStats` to your file manually.**

---

Thank you for contributing to browse.pro.bd! 🇧🇩  
Questions? Open a [GitHub Discussion](https://github.com/SudipMHX/browse/discussions) or file an [Issue](https://github.com/SudipMHX/browse/issues).
