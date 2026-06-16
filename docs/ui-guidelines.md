# UI/UX Guidelines — browse.pro.bd

## Design Direction

### Design Style
- Minimal & clean
- Modern aesthetic
- Card-based layout
- Dark mode support
- Clean typography
- High contrast

### Inspiration
Think like a combination of:
```
GitHub
+
Product Hunt
+
Vercel
```

---

## What NOT to Do

❌ Blog-style layouts  
❌ Overly animated interactions  
❌ Cluttered interfaces  
❌ Too many colors  
❌ Complex navigation  
❌ Heavy graphics  

---

## What TO Do

✅ Clean card layouts  
✅ Intuitive navigation  
✅ Fast interactions  
✅ Scannable content  
✅ Responsive design  
✅ Accessible (WCAG AA)  
✅ Dark/Light theme toggle  

---

## Core Design Principles

### 1. Content First
Let the projects shine, not the UI

### 2. Fast & Smooth
Micro-interactions should be snappy, not slow

### 3. Consistent
Use Shadcn UI components for consistency

### 4. Responsive
Mobile-first approach
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

### 5. Accessible
- ARIA labels
- Keyboard navigation
- Color contrast
- Focus states

---

## Typography

- **Headlines:** Clean sans-serif (Geist, Inter, etc.)
- **Body:** Readable sans-serif
- **Code:** Monospace for code blocks

---

## Color Scheme

Light Mode:
- Background: `#ffffff`
- Text: `#1a1a1a`
- Accent: Brand color (use Shadcn defaults)
- Borders: `#e5e7eb`

Dark Mode:
- Background: `#0a0a0a`
- Text: `#f5f5f5`
- Accent: Adjusted brand color
- Borders: `#2a2a2a`

---

## Component Patterns

### Card Pattern
```
┌─────────────────┐
│  Cover Image    │
├─────────────────┤
│ Title           │
│ Description     │
│ Tags            │
│ Meta Info       │
├─────────────────┤
│ GitHub | Website│
└─────────────────┘
```

### Filter Pattern
- Sidebar on desktop
- Collapsible on mobile
- Live filter updates
- Clear all option

### Search Pattern
- Search box in header
- Real-time results
- Highlighted matches
- Filter by type
