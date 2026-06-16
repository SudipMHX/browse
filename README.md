<div align="center">

<h1>browse.pro.bd</h1>
<p><strong>The open directory for Bangladeshi developers, projects, tools, and libraries.</strong></p>

[![Live Site](https://img.shields.io/badge/Live-browse.pro.bd-0ea5e9?style=flat-square&logo=vercel)](https://browse.pro.bd)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](./CONTRIBUTING.md)
[![Content Only PRs Auto-Merged](https://img.shields.io/badge/Content%20PRs-auto--merged-blueviolet?style=flat-square)](./CONTRIBUTING.md#auto-merge--github-stats)

</div>

---

## What is browse.pro.bd?

**browse.pro.bd** is a community-maintained, open-source directory that showcases the work of Bangladeshi developers. It is entirely content-driven — every entry on the site is a single MDX file in this repository.

No sign-ups. No backends. No paywalls. Just a PR.

**Browse at → [https://browse.pro.bd](https://browse.pro.bd)**

---

## What You Can Submit

| Category | What it is |
|---|---|
| 🚀 **Projects** | Open-source projects built by Bangladeshi developers |
| 👤 **Portfolios** | Personal developer/designer portfolio profiles |
| 🛠️ **Tools** | Developer tools, APIs, and utilities |
| 📦 **Libraries** | npm packages, Python packages, SDKs |

---

## How to Add Your Work

1. **Fork** this repository
2. Create a `.mdx` file in the right `content/` folder
3. Copy a template from [CONTRIBUTING.md](./CONTRIBUTING.md) and fill in your details
4. Open a **Pull Request**

Content-only PRs are **automatically merged** — no manual review needed. After merge, a GitHub Actions workflow fetches your live GitHub stats (stars, followers, forks) and writes them directly into your MDX file.

Read the full guide → **[CONTRIBUTING.md](./CONTRIBUTING.md)**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, static export) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| UI Components | [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://radix-ui.com) |
| Content | MDX files parsed with [gray-matter](https://github.com/jonschlinkert/gray-matter) + [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) |
| Search | [Pagefind](https://pagefind.app) (fully static, no server) |
| Automation | GitHub Actions — auto-merge + GitHub stats enrichment |
| Deployment | [Vercel](https://vercel.com) |

---

## Project Structure

```
browse/
├── content/
│   ├── portfolios/        # Developer portfolio MDX files
│   ├── projects/          # Project MDX files
│   ├── tools/             # Tool MDX files
│   └── libraries/         # Library MDX files
├── public/
│   └── images/            # Cover images & avatars uploaded by contributors
│       ├── portfolios/
│       ├── projects/
│       ├── tools/
│       └── libraries/
├── app/                   # Next.js App Router pages
├── components/            # Shared UI components
├── lib/                   # Content loading, GitHub API, sort utilities
├── scripts/
│   └── enrich-stats.js    # GitHub stats enrichment script
└── .github/
    └── workflows/
        ├── auto-merge-content.yml    # Auto-merges content-only PRs
        └── enrich-content-stats.yml  # Fetches & writes GitHub stats post-merge
```

---

## GitHub Stats Enrichment

After every content PR is merged, a workflow automatically runs `scripts/enrich-stats.js`:

- **Portfolios** — fetches `totalStars`, `followers`, `publicRepos` from the GitHub user API
- **Projects / Tools / Libraries** — fetches `stars`, `forks`, `lastUpdated`, `language` from the GitHub repo API
- Stats are written directly into the MDX frontmatter and committed back to `main`
- If the API fails or the token is missing, all values default to `0` — never undefined

This means **zero runtime API calls** — all data is baked into the static files at build time.

---

## Running Locally

```bash
# Clone the repo
git clone https://github.com/SudipMHX/browse.git
cd browse

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other useful commands

```bash
# Enrich GitHub stats for changed files only
npm run enrich

# Enrich GitHub stats for ALL content files
npm run enrich:full

# Type check
npm run typecheck

# Lint
npm run lint
```

---

## Contributing

We welcome all contributions from the Bangladeshi developer community!

- 📖 Read the full guide: **[CONTRIBUTING.md](./CONTRIBUTING.md)**
- 🐛 Report a bug: [GitHub Issues](https://github.com/SudipMHX/browse/issues)
- 💬 Ask a question: [GitHub Discussions](https://github.com/SudipMHX/browse/discussions)
- ⭐ Star the repo if you find it useful!

---

## License

MIT © [browse.pro.bd](https://browse.pro.bd)

---

<div align="center">
  Built with ❤️ for the Bangladeshi developer community 🇧🇩
</div>
