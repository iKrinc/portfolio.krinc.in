import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./projects.scss";

export const projects = [
  {
    project_name: "Book Discovery App (React Native)",
    tl_dr:
      "A fast MVP mobile app to search and discover books using the Google Books API — built end-to-end in 48 hours to validate an idea and deliver a clean, extensible UI.",
    problem_context:
      "Many casual readers struggle to quickly discover books that match their taste. The goal was to build a discovery-first mobile experience with fast search, clear metadata, and easy external links for reading/buying.",
    my_role:
      "Solo developer — I handled product scoping, UI design, API integration, performance tuning, error handling, and shipped the first working APK within ~48 hours as an MVP.",
    approach_and_architecture:
      "• UI: React Native using FlatList for long lists (virtualized rendering). • Data: Google Books API (client-side fetch with debouncing and pagination). • State & navigation: lightweight Redux / Context for saved items, React Navigation for stack flows. • Offline resilience: cached last search results using AsyncStorage; graceful offline UI states. • Delivery: Android APK + iOS build-ready repository; CI pipeline stub for automated build (GitHub Actions placeholder).",
    key_features: [
      "Fast incremental search with input debounce and cancels",
      "Book detail pages (title, authors, publisher, description, related links)",
      "Save / favorites and local persistence",
      "Infinite scroll / pagination with optimized list rendering",
      "Clear empty / error states for unreliable network",
    ],
    quality_and_testing:
      "Unit and component tests (Jest + React Native Testing Library suggested) • Snapshot tests for key screens • Manual accessibility checks (large-font mode, tap targets)",
    workflow_acceleration:
      "Used Gemini CLI templates to scaffold components, Cursor for quick code reviews and lint suggestions, Windsurf snippets to speed up repetitive wiring — reduced time-to-MVP and early bugs.",
    what_to_call_out_for_recruiters:
      "Show code for API pagination & debounce, screenshots of list performance, and a short Lighthouse-like snapshot for mobile (or timing logs). Explain trade-offs (client-side caching vs server caching).",
    technologies: [
      "React Native",
      "Google Books API",
      "JavaScript",
      "React Navigation",
    ],
  },
  {
    project_name: "E-commerce Frontend Revamp (Next.js + React)",
    tl_dr:
      "Modernized a legacy storefront into a fast, SEO-friendly Next.js SPA (SSR/ISR) with a reusable component library and measurable performance improvements — focused on conversion-critical pages.",
    problem_context:
      "The client storefront had slow load times, large bundles, and inconsistent UI components across pages. Business asked for improved conversion rate, faster page loads, and maintainable UI.",
    my_role:
      "Frontend owner / lead contributor: designed component architecture, migrated key pages to Next.js SSR/ISR, implemented state management, and led the performance & accessibility pass.",
    approach_and_architecture:
      "• Framework: Next.js for hybrid SSR/ISR where SEO matters (category and product pages). • State: Redux Toolkit for cart & user flows; RTK Query for caching product API calls. • Assets: next/image or image CDN + responsive images; code-splitting and dynamic imports for non-critical modules. • Component strategy: Storybook-driven development; shared UI tokens and headless components for accessible patterns. • Tooling: bundle analysis (webpack-bundle-analyzer), Lighthouse audits, lighthouse-ci in pipeline.",
    key_features: [
      "Product listing and product detail pages with server-side rendering",
      "Fast cart & checkout flow with optimistic updates and error recovery",
      "Search with suggestions and server-side faceting",
      "Storybook component library and visual regression checks",
      "Accessibility fixes for forms, labels, keyboard order, and ARIA",
    ],
    challenges_and_solutions:
      "• Large third-party vendor scripts: moved essential scripts to defer, lazy-loaded analytics, and replaced heavy widgets with lighter alternatives. • Bundle size: split code by route and isolated heavy vendor modules for on-demand loading. • UX regressions: used Storybook and visual regression tests to catch CSS regressions before release.",
    testing_and_quality:
      "Unit tests: Jest + React Testing Library for components • E2E: Cypress for checkout and critical journey tests • Visual tests: Storybook + Chromatic / Percy for key components",
    ci_cd_and_deploy:
      "GitHub Actions for CI: run lint, tests, storybook build, and lighthouse-ci; deploy to Vercel with preview URLs for each PR.",
    // artifacts: { repo: "<repo-or-case-study-link>", before_after_reports: "<lighthouse-before-after-links-or-notion>", storybook: "<storybook-url>" },
    what_to_call_out_for_recruiters:
      "Include a link to the bundle report, Storybook, and a before/after performance report. In the summary state the exact LCP/CLS/INP changes (if you measured them) — hiring managers look for these metrics.",
    technologies: [
      "React",
      "Next.js",
      "Redux Toolkit",
      "RTK Query",
      "Storybook",
      "Jest",
      "React Testing Library",
    ],
  },
  {
    project_name: "Multi-Tenant Admin Analytics Dashboard",
    tl_dr:
      "A role-based, multi-tenant analytics console with modular widgets and exportable views to help operations teams make faster decisions.",
    problem_context:
      "Operations and BI needed a unified dashboard to track usage, revenue, and health across multiple tenants with saved views and export functionality.",
    my_role:
      "Frontend architect & primary implementer of the widget system and the reusable table/chart primitives. Coordinated with backend for pagination and aggregation endpoints.",
    approach_and_architecture:
      "• Component-driven: modular widget architecture allowing card-level refresh and independent loading. • Data fetching: server pagination + RTK Query with caching & invalidation; optimistic updates for admin actions. • Large dataset handling: virtualization (react-window / react-virtualized) for tables; server-side filters. • Charts: Recharts for quick charts; pluggable adapters for D3 if complex visualizations required.",
    key_features: [
      "Role-based access control and tenant scoping",
      "Saved views and export-to-CSV/PDF features",
      "Widget-level refresh & caching policies",
      "Drill-downs with server pagination and filters",
    ],
    testing_and_quality:
      "Integration tests for exports and saved views • Contract tests (mock API schemas) to reduce backend mismatch bugs",
    deployment_and_ops:
      "Hosted on Vercel / AWS with authentication routed to a secure auth provider (Auth0 / custom JWT)",
    // artifacts: { repo: "<repo-link>", demo_private: "<private-demo-link>" },
    what_to_call_out_for_recruiters:
      "Highlight how you reduced client CPU by virtualizing tables and improved perceived performance by making widgets lazy-load and cache independently (include metrics or logs if you have them).",
    technologies: [
      "React",
      "Redux Toolkit",
      "React Router",
      "Recharts/D3",
      "Axios/RTK Query",
      "Jest",
      "RTL",
    ],
  },
  {
    project_name: "Design System & Component Library",
    tl_dr:
      "A lightweight, accessible design system that reduced UI regressions and cut new feature time by providing documented, reusable components in Storybook.",
    problem_context:
      "Multiple teams shipping inconsistent UI patterns caused rework and visual regressions. The goal: create a single source of truth for components and tokens.",
    my_role:
      "Lead developer: created tokens, built headless accessible components, documented usage in Storybook, and set up visual regression gates for PRs.",
    approach_and_architecture:
      "• Tokens: color, spacing, typography variables; published as an npm package consumed by apps. • Components: headless primitives + presentational wrappers to keep logic accessible and themeable. • Docs: Storybook with usage examples, knobs for props, and autogenerated props tables. • Release: semantic versioning and changelogs for the component package.",
    key_features: [
      "Accessible primitives (modals, menu, combobox, table)",
      "Theming via tokens and CSS variables",
      "Storybook-driven examples and “copy-paste” snippets for engineers",
      "Visual regression CI step (Chromatic/Percy)",
    ],
    why_it_matters:
      "Storybook is widely used as a UI workshop and component directory for teams; shipping this shows mature front-end engineering practices.",
    what_to_call_out_for_recruiters:
      'Link to Storybook and a small demo showing "breaking change prevention" (visual regression screenshots).',
    technologies: [
      "React",
      "Storybook",
      "TypeScript (progressive adoption)",
      "ESLint",
      "Prettier",
      "Husky",
    ],
  },
  {
    project_name: "Service Booking Mobile App (Cross-Platform)",
    tl_dr:
      "A cross-platform booking app focused on reliability and conversion: deep links, offline-friendly browsing, and robust auth + booking flows.",
    problem_context:
      "Booking apps need high completion rates even on spotty networks and mid-range devices; UX must be simple and robust.",
    my_role:
      "Frontend developer: built booking flow, integrated deep links & push notifications, handled offline cache & sync strategies, and improved reliability for mid-range devices.",
    approach_and_architecture:
      "• Navigation & UX: React Navigation with guarded routes and resumable booking flows. • Data: local caching of service lists (AsyncStorage / local DB) and queued booking sync when online. • Reliability: retry strategies for network failures, optimistic UI, clear error recovery. • Observability: integrated crash reporting and performance traces (Sentry / similar).",
    key_features: [
      "Deep link support for promotional links",
      "Offline browsing and sync for bookings",
      "Push notifications for confirmations and reminders",
      "Secure auth flows (OAuth/JWT)",
    ],
    what_to_call_out_for_recruiters:
      "Explain how you reduced failed-booking rates with optimistic updates + retry, and include logs / crash-rate screenshots if available.",
    technologies: [
      "React Native",
      "Redux Toolkit",
      "React Query/RTK Query",
      "React Navigation",
    ],
  },
  {
    project_name: "Performance & Accessibility Hardening Sprint",
    tl_dr:
      "A focused sprint to raise Core Web Vitals scores and close accessibility gaps across several client apps — audit → fix → verify workflow.",
    problem_context:
      "Multiple apps had mediocre Core Web Vitals and a range of accessibility issues impacting SEO, conversions, and legal risk.",
    my_role:
      "Sprint lead: ran audits, prioritized fixes, implemented improvements, and put monitoring in CI to prevent regressions.",
    approach_and_architecture:
      "1. Audit: Lighthouse + Web Vitals reports and manual a11y checks (screen reader & keyboard). 2. Prioritize: cluster fixes by impact → low-effort-high-impact (images, unused JS, lazy loads). 3. Fixes: image optimization/CDN, critical CSS, route-level code-splitting, defer third-party scripts, aria & semantic HTML fixes. 4. Verify: lighthouse-ci in pipeline and regression alerts.",
    why_this_is_important:
      "Core Web Vitals are a standard measure for loading, interactivity and visual stability and directly affect UX and SEO; accessibility reduces legal & user-experience risk — both are expected signals in mature frontend portfolios.",
    what_to_call_out_for_recruiters:
      "If you can, provide before/after LCP/CLS/INP numbers and the exact steps taken — recruiters look for concrete impact and reproducible steps.",
    technologies: [
      "Next.js",
      "React",
      "Lighthouse",
      "Chrome DevTools",
      "Cypress",
      "Jest",
      "RTL",
    ],
  },
];

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <h2>My Projects</h2>
      <motion.div
        className="projects-grid"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, staggerChildren: 0.2 }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </motion.div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      className="project-card-container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="project-card"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="project-card-front">
          <div className="project-info">
            <h3>{project.project_name}</h3>
            <div className="technologies">
              {project.technologies.map((tech, i) => (
                <span key={i}>{tech}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="project-card-back">
          <div className="project-info">
            <p>{project.tl_dr}</p>
            <Link
              to={`/project/${project.project_name
                .replace(/[^a-zA-Z0-9]/g, "")
                .toLowerCase()}`}
              className="view-detail-button"
            >
              View Detail
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;
