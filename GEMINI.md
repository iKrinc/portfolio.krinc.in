# Project Details and Context

## Overall Goal
To create a modern, smooth, and animated frontend developer portfolio website for Srinivas Krishna S K, showcasing his skills and projects.

## Key Knowledge
- Project is a React application built with Vite.
- Uses SCSS for styling.
- Uses Framer Motion for animations.
- Dynamic navbar: Name appears when scrolling past Hero, disappears when scrolling back. On project detail pages, only a Home icon is shown.
- Hero section animation plays once on initial scroll into view.
- Other sections (About, Projects, Skills, Contact) re-animate every time they are scrolled into view.
- Color palette: dark grey background, blue and purple accents.
- Fonts: Poppins for headings, Open Sans for body.
- Personal details, project details, and skills are integrated into respective components.
- Font Awesome CDN is used for icons.
- Project cards have a flip effect on hover, showing a short description on the back and linking to a dedicated detail page.
- Profile image has a dynamic gradient border.

## Project Structure

```
D:\Dev\Krinc\portfolio.krinc.in\
├───.git
├───node_modules
├───dist
├───public
├───src
│   ├───assets
│   │   ├───Loaders
│   │   ├───logo
│   │   ├───Profile
│   │   └───Resume
│   ├───components
│   │   ├───Footer
│   │   ├───Header
│   │   ├───Loader
│   │   ├───ScrollToTop
│   │   └───sections
│   │       ├───About
│   │       ├───Contact
│   │       ├───Hero
│   │       ├───Projects
│   │       └───Skills
│   ├───pages
│   │   └───ProjectDetailPage
│   ├───App.jsx
│   ├───globalStyles.scss
│   ├───index.scss
│   └───main.jsx
├───.gitignore
├───index.html
├───package.json
├───postcss.config.cjs
├───README.md
├───tailwind.config.cjs
├───vite.config.js
└───yarn.lock
```

## Core Functionality
- **Full-screen Loader:** Displays a loader while assets are loading, with a smooth fade-out.
- **Dynamic Navbar:** Adapts based on the current page (full navigation vs. Home icon).
- **Hero Section:** Displays profile, social links, and CV download, with animations and a gradient border for the profile image.
- **About Section:** Presents personal introduction with animations.
- **Projects Section:** Features interactive flip cards with short descriptions and links to detailed project pages.
- **Project Detail Page:** Provides comprehensive information for each project.
- **Skills Section:** Showcases categorized skills with animations.
- **Contact Section:** Includes contact information and a call-to-action.
- **Footer:** Contains copyright and social media links.
- **Scroll to Top:** Automatically scrolls the page to the top on route changes.