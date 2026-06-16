# Contribution System — browse.pro.bd

## Submission System Overview

The platform uses a **GitHub PR-based** contribution system.

---

## Contribution Workflow

```
Fork Repository
    ↓
Create content/projects/your-project.mdx
    ↓
Add Project Details
    ↓
Create Pull Request
    ↓
Community Review
    ↓
Maintainer Approval
    ↓
Merge to Main
    ↓
Auto Deploy to Vercel
    ↓
Live on Platform
```

---

## Submit Page

The `/submit` page contains:

### 1. Quick Start Guide
- Contribution guide
- Requirements
- Code of conduct

### 2. MDX Template
Ready-to-copy template with all fields explained

### 3. Links
- Fork repository button
- GitHub issues
- Discord/community chat
- GitHub discussions

---

## Requirements for Submission

### Project/Portfolio Requirements
- ✅ Public GitHub repository (or can be made public)
- ✅ Clear README
- ✅ Active or documented project
- ✅ No spam or malicious content
- ✅ Respectful community

### MDX File Requirements
- ✅ Correct filename format: `title-slug.mdx`
- ✅ All required frontmatter fields
- ✅ Working GitHub link
- ✅ Valid markdown
- ✅ Max 500 words description

---

## GitHub Actions Automation

### Validation Steps

Auto-run on every PR:

1. **MDX Validation**
   - Check YAML frontmatter
   - Validate all required fields
   - Check markdown syntax

2. **Schema Validation**
   - Ensure correct field types
   - Validate URLs
   - Check tags format

3. **Broken Links Check**
   - Verify GitHub URLs
   - Verify website URLs
   - Check for 404s

4. **Image Checks**
   - Validate image URLs
   - Check image sizes
   - Optimize images

5. **Duplicate Check**
   - No duplicate projects
   - No spam submissions
   - Quality threshold check

---

## Review Process

### Reviewer Checklist
- [ ] Follows CONTRIBUTING.md
- [ ] Valid MDX format
- [ ] GitHub repo is active/legitimate
- [ ] High quality content
- [ ] No spam/malicious
- [ ] Proper tags
- [ ] Unique project

### Approval Flow
- Automated checks pass ✅
- Manual review by maintainer 👀
- Suggestions for improvements (if needed) 💬
- Approval & merge 🎉
- Auto-deploy to production ⚡
