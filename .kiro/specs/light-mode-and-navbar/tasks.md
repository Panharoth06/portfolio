# Implementation Plan: Light Mode and Navigation Bar

## Overview

This plan implements a dual-theme system (light/dark mode) and a fixed navigation bar for the Next.js portfolio site. The approach starts with foundational theming infrastructure (CSS variables, inline script, ThemeProvider), then builds the navigation bar with scroll-spy, and finishes by adapting existing components to use CSS variable-based colors instead of hardcoded values.

## Tasks

- [x] 1. Set up theming infrastructure
  - [x] 1.1 Add light mode CSS variables to globals.css
    - Add a `.light` class selector block in `src/app/globals.css` with all light mode CSS variable values as specified in the design (--background, --foreground, --card, --card-foreground, --primary, --primary-foreground, --secondary, --muted, --muted-foreground, --accent, --border, --input, --ring, etc.)
    - Update the existing `:root` block to serve as the dark mode default (already effectively dark)
    - Ensure the `@custom-variant dark` directive continues to work with the `.dark` class
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.7, 2.8_

  - [x] 1.2 Add inline theme script to prevent FOUC
    - Add a synchronous `<script dangerouslySetInnerHTML>` in the `<head>` section of `src/app/layout.tsx`
    - The script reads `localStorage.getItem("theme")`, validates it is "light" or "dark", falls back to `matchMedia("(prefers-color-scheme: dark)")`, defaults to "dark" if neither available
    - Sets `document.documentElement.className` to the resolved value
    - Remove the hardcoded `className="dark"` from the `<html>` element
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [x] 1.3 Create ThemeProvider context component
    - Create `src/components/ThemeProvider.tsx` with a React context providing `{ theme: "light" | "dark", toggle: () => void }`
    - Initialize state by reading `document.documentElement.className` on mount (matching the inline script's applied class)
    - On toggle: flip the theme, update `<html>` class attribute, persist to localStorage with try/catch
    - Handle localStorage unavailability gracefully (memory-only mode)
    - Discard invalid localStorage values and fall back to system preference
    - Wrap the app with ThemeProvider in `src/app/layout.tsx`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 7.5_

- [ ] 2. Checkpoint - Verify theming infrastructure
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Implement Navigation Bar
  - [x] 3.1 Create useScrollSpy hook
    - Create `src/hooks/useScrollSpy.ts`
    - Use IntersectionObserver with rootMargin to detect which section is closest to the top of the viewport (within 100px threshold, offset by navbar height)
    - Return the id of the currently active section
    - Handle IntersectionObserver unavailability gracefully (return null)
    - _Requirements: 6.3_

  - [x] 3.2 Create NavigationBar component
    - Create `src/components/NavigationBar.tsx` as a fixed-position element at the top of the viewport
    - Max height 64px, z-index above all other content (z-50)
    - Apply backdrop-blur (min 8px) and semi-transparent background (70-90% opacity)
    - Include home link (site owner's name "Panharoth") on the left that scrolls to top
    - Include navigation links (Home, Skills, Projects) in the center
    - Include ThemeToggle on the right side
    - Use the useScrollSpy hook to highlight the active navigation link with a distinct style using the primary CSS variable
    - Integrate with Lenis `scrollTo` API for smooth scrolling; fall back to native `scrollIntoView` if Lenis unavailable
    - Offset scroll target by navbar height so section content isn't hidden behind the bar
    - Cancel in-progress scroll animation when a new link is clicked
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 6.1, 6.2, 6.3, 6.4, 6.5_

  - [x] 3.3 Implement responsive mobile menu
    - Add hamburger menu button for viewports below 768px with proper ARIA attributes (aria-expanded, aria-label)
    - Implement slide-down mobile menu that reveals navigation links
    - Close menu on: link click, outside click, Escape key press
    - Ensure all links and the hamburger button are keyboard-accessible with visible focus indicators
    - _Requirements: 5.6, 5.7, 5.8_

  - [x] 3.4 Create ThemeToggle component
    - Create `src/components/ThemeToggle.tsx`
    - Display sun icon (from lucide-react) when in dark mode, moon icon when in light mode
    - Minimum 44x44px touch target
    - `aria-label="Toggle color mode"`
    - Keyboard-accessible with visible focus indicator (at least 2px width)
    - Consume ThemeContext and call toggle on activation
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [x] 3.5 Add section IDs to page sections
    - Add `id="hero"` to the hero section in `src/app/page.tsx`
    - Add `id="skills"` to the SkillsShowcase section wrapper
    - Add `id="projects"` to the ProjectExperience section wrapper
    - Ensure each navigation link href corresponds to an existing section id
    - _Requirements: 6.2_

  - [x] 3.6 Integrate NavigationBar into the page layout
    - Add NavigationBar to `src/app/layout.tsx` or `src/app/page.tsx` (inside ThemeProvider)
    - Pass the navigation links configuration
    - Ensure it renders above all page content
    - _Requirements: 5.1, 5.2_

- [ ] 4. Checkpoint - Verify navigation bar functionality
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Adapt existing components for theme support
  - [ ] 5.1 Update SkillsShowcase for theme-aware colors
    - Replace hardcoded `bg-white/90 text-black border-white/90` on active filter buttons with CSS variable classes: `bg-primary text-primary-foreground border-primary`
    - Replace hardcoded `border-white/15 text-white/40` on inactive buttons with: `border-border text-muted-foreground`
    - Replace hardcoded `border-white/10 bg-white/[0.03]` on skill pills with: `border-border bg-card`
    - Replace hardcoded `bg-white/30` dot with `bg-muted-foreground`
    - Replace hardcoded `text-white/95` skill name with `text-foreground`
    - _Requirements: 3.1, 3.2_

  - [ ] 5.2 Update NeuralBackground to respond to theme changes
    - Add a MutationObserver on `document.documentElement` watching for class attribute changes, OR consume ThemeContext
    - When theme changes, re-read `getComputedStyle(document.body).getPropertyValue("--primary")` and use the new color for subsequent animation frames
    - Ensure the color update happens within 1 second of theme change
    - _Requirements: 3.3_

  - [ ] 5.3 Update ProjectExperience for theme-aware colors
    - Ensure card borders use the `border` CSS variable (already using `border-border/40` — verify it resolves correctly in both modes)
    - Ensure card backgrounds use the `card` CSS variable (already using `bg-card/30` and `bg-card/95` — verify)
    - Confirm cards are visually distinct from page background in both modes with minimum 3:1 contrast ratio between card border and page background
    - _Requirements: 3.4_

  - [ ] 5.4 Verify all components update within 500ms on theme change
    - Ensure CSS variable-based theming propagates instantly via class change (no JS delays)
    - Confirm NeuralBackground, SkillsShowcase, ProjectExperience, and NavigationBar all reflect the new theme within 500ms
    - _Requirements: 3.5_

- [ ] 6. Checkpoint - Verify component theme adaptation
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Property-based tests
  - [ ] 7.1 Write property test for toggle state alternation
    - **Property 1: Toggle state alternation**
    - Generate random positive integers N, apply N toggles from an initial state, verify final state matches parity (opposite when N is odd, same when N is even)
    - Use fast-check library with minimum 100 iterations
    - **Validates: Requirements 1.1, 4.4**

  - [ ] 7.2 Write property test for toggle persistence and DOM synchronization
    - **Property 2: Toggle persistence and DOM synchronization**
    - Generate random toggle sequences (1–50 toggles), verify localStorage and html class match current ColorMode after each toggle
    - Use fast-check library with minimum 100 iterations
    - **Validates: Requirements 1.3, 1.5**

  - [ ] 7.3 Write property test for invalid localStorage value rejection
    - **Property 3: Invalid localStorage value rejection**
    - Generate arbitrary strings (excluding "light"/"dark"), set in localStorage, initialize provider, verify fallback to system preference or "dark"
    - Use fast-check library with minimum 100 iterations
    - **Validates: Requirements 1.6, 7.4**

  - [ ] 7.4 Write property test for navigation link-section correspondence
    - **Property 4: Navigation link-section correspondence**
    - Render the page with navigation, verify each nav link href (without #) corresponds to an existing DOM element id
    - Use fast-check library with minimum 100 iterations
    - **Validates: Requirements 6.2**

  - [ ] 7.5 Write property test for scroll-spy active link correctness
    - **Property 5: Scroll-spy active link correctness**
    - Generate random scroll positions within page bounds, verify the highlighted link matches the expected section (closest top edge within 100px below viewport top, offset by navbar height)
    - Use fast-check library with minimum 100 iterations
    - **Validates: Requirements 6.3**

- [ ] 8. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- The project uses TypeScript with Next.js App Router, Tailwind CSS v4, and lucide-react for icons
- Lenis is already integrated for smooth scrolling — navigation should use its API
- The existing `@custom-variant dark` in globals.css means Tailwind's dark: utilities work with the `.dark` class

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2"] },
    { "id": 2, "tasks": ["1.3", "3.1"] },
    { "id": 3, "tasks": ["3.4", "3.5"] },
    { "id": 4, "tasks": ["3.2"] },
    { "id": 5, "tasks": ["3.3", "3.6"] },
    { "id": 6, "tasks": ["5.1", "5.2", "5.3"] },
    { "id": 7, "tasks": ["5.4"] },
    { "id": 8, "tasks": ["7.1", "7.2", "7.3", "7.4", "7.5"] }
  ]
}
```
