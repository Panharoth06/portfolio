# Requirements Document

## Introduction

This feature transforms the existing dark-mode-only Next.js portfolio site into a dual-theme experience with both light and dark modes, and adds a navigation bar component for section-based navigation. The light mode color palette is carefully chosen to complement the existing dark theme while maintaining readability and visual appeal. The navigation bar provides quick access to each portfolio section (Hero, Skills, Projects).

## Glossary

- **Theme_Provider**: A React context provider component that manages the current color mode state (light or dark) and exposes a toggle function to child components.
- **Theme_Toggle**: A UI button component that allows the user to switch between light and dark color modes.
- **Navigation_Bar**: A fixed-position component displayed at the top of the viewport containing navigation links to each section of the portfolio.
- **Section**: A distinct content area of the portfolio page (Hero, Skills Showcase, Project Experience).
- **Color_Mode**: The active visual theme applied to the site, either "light" or "dark".
- **CSS_Variable**: A custom property defined in the stylesheet (e.g., `--background`) that controls theming colors across the site.
- **Neural_Background**: The existing animated canvas-based background component that renders circular wave animations.
- **System_Preference**: The user's operating system-level color scheme preference (prefers-color-scheme media query).

## Requirements

### Requirement 1: Theme State Management

**User Story:** As a visitor, I want the site to remember my theme preference, so that I see my chosen color mode on return visits.

#### Acceptance Criteria

1. THE Theme_Provider SHALL manage the current Color_Mode state and expose both the active Color_Mode value and a toggle function to all child components via React context.
2. WHEN the site loads and no persisted Color_Mode exists in localStorage, THE Theme_Provider SHALL apply the Color_Mode matching the user's System_Preference.
3. WHEN the user selects a Color_Mode via the Theme_Toggle, THE Theme_Provider SHALL persist the selection to localStorage within 1 second of the user action.
4. WHEN the site loads and a persisted Color_Mode exists in localStorage, THE Theme_Provider SHALL apply the persisted Color_Mode instead of the System_Preference.
5. WHEN the Color_Mode changes, THE Theme_Provider SHALL update the `class` attribute on the `<html>` element to either "dark" or "light" and remove the opposite class.
6. IF the persisted Color_Mode value in localStorage is not one of "light" or "dark", THEN THE Theme_Provider SHALL discard the invalid value and fall back to the user's System_Preference.
7. IF localStorage is unavailable, THEN THE Theme_Provider SHALL apply the Color_Mode matching the user's System_Preference and continue operating without persistence.

### Requirement 2: Light Mode Color Palette

**User Story:** As a visitor, I want a visually appealing light mode, so that I can comfortably browse the portfolio in bright environments.

#### Acceptance Criteria

1. WHEN the Color_Mode is "light", THE site SHALL set the CSS_Variables `--background` to oklch(0.98 0.002 260) ±0.02 lightness and `--foreground` to oklch(0.145 0.005 260) ±0.02 lightness.
2. WHEN the Color_Mode is "light", THE site SHALL set the CSS_Variable `--primary` to oklch(0.45 0.15 160) ±0.02 lightness and `--primary-foreground` to a color that achieves at least 4.5:1 contrast ratio against the primary color.
3. WHEN the Color_Mode is "light", THE site SHALL set the CSS_Variables `--card` to oklch(0.96 0.002 260) ±0.02 lightness and `--card-foreground` to a value matching `--foreground`.
4. WHEN the Color_Mode is "light", THE site SHALL set the CSS_Variable `--muted-foreground` to oklch(0.45 0 0) ±0.02 lightness, achieving at least 4.5:1 contrast ratio against both `--background` and `--card` backgrounds.
5. WHEN the Color_Mode is "light", THE site SHALL set the CSS_Variable `--border` to oklch(0.88 0.005 260) ±0.02 lightness and apply the same value to `--input`.
6. THE site SHALL maintain a minimum contrast ratio of 4.5:1 for the following text/background pairings in both Color_Modes: `--foreground` against `--background`, `--foreground` against `--card`, `--card-foreground` against `--card`, and `--muted-foreground` against `--background`.
7. WHEN the Color_Mode is "light", THE site SHALL set the CSS_Variables `--secondary` and `--muted` to a light neutral value between oklch(0.90 0 0) and oklch(0.96 0 0), and set `--ring` and `--accent` to match `--primary`.
8. WHEN the Color_Mode is "light", THE site SHALL apply all light mode CSS_Variable values via a `.light` class selector or `:root` default so that Tailwind utility classes (bg-background, text-foreground, border-border) resolve to the light palette without component-level overrides.

### Requirement 3: Component Theme Adaptation

**User Story:** As a visitor, I want all components to look correct in both themes, so that no element appears broken or unreadable when switching modes.

#### Acceptance Criteria

1. WHEN the Color_Mode is "light", THE SkillsShowcase filter buttons SHALL use CSS_Variable-based colors: the active button SHALL use `primary-foreground` text on a `primary` background with a `primary` border, and inactive buttons SHALL use `muted-foreground` text with a `border` colored border and transparent background.
2. WHEN the Color_Mode is "light", THE SkillsShowcase skill pills SHALL use CSS_Variable-based colors: `border` for the pill border, `card` for the background, `muted-foreground` for the dot indicator, and `foreground` for the skill name text.
3. WHEN the Color_Mode changes, THE Neural_Background canvas animation SHALL re-read the current `--primary` CSS_Variable value and render subsequent strokes using the updated color within 1 second of the theme change completing.
4. WHEN the Color_Mode is "light", THE ProjectExperience card borders SHALL use the `border` CSS_Variable and card backgrounds SHALL use the `card` CSS_Variable, ensuring each card is visually distinct from the page background with a minimum WCAG contrast ratio of 3:1 between card border and page background.
5. WHEN the Color_Mode changes, THE site SHALL apply the new theme colors to all rendered components within 500 milliseconds without requiring a page reload.

### Requirement 4: Theme Toggle Control

**User Story:** As a visitor, I want a clearly visible toggle button, so that I can switch between light and dark modes at any time.

#### Acceptance Criteria

1. THE Theme_Toggle SHALL be placed within the Navigation_Bar and be accessible from any scroll position on the page.
2. WHILE the current Color_Mode is "dark", THE Theme_Toggle SHALL display a sun icon indicating the option to switch to light mode.
3. WHILE the current Color_Mode is "light", THE Theme_Toggle SHALL display a moon icon indicating the option to switch to dark mode.
4. WHEN the user activates the Theme_Toggle, THE Theme_Provider SHALL switch the Color_Mode to the opposite value.
5. THE Theme_Toggle SHALL be keyboard-accessible with a visible focus indicator of at least 2px width and an accessible label of "Toggle color mode".
6. THE Theme_Toggle interactive target area SHALL be at least 44x44 CSS pixels to meet WCAG 2.5.5 target size requirements.

### Requirement 5: Navigation Bar Structure and Layout

**User Story:** As a visitor, I want a navigation bar at the top of the page, so that I can quickly jump to any section of the portfolio.

#### Acceptance Criteria

1. THE Navigation_Bar SHALL be rendered as a fixed-position element at the top of the viewport with a height no greater than 64px and a z-index value that places it above all other page content.
2. THE Navigation_Bar SHALL contain navigation links to each Section: Hero (top), Skills Showcase, and Project Experience.
3. THE Navigation_Bar SHALL include the site owner's name or logo as a home link on the left side that, when activated, scrolls the page to the top (Hero Section).
4. THE Navigation_Bar SHALL include the Theme_Toggle on the right side.
5. THE Navigation_Bar SHALL apply a backdrop-blur effect of at least 8px and a background opacity between 70% and 90% to maintain a minimum contrast ratio of 4.5:1 between navigation text and the blurred background.
6. WHILE the viewport width is below 768px, THE Navigation_Bar SHALL collapse navigation links into a hamburger menu button that reveals links on tap or click activation.
7. WHEN the hamburger menu is open, THE Navigation_Bar SHALL close the menu when the user activates a navigation link, taps outside the menu area, or presses the Escape key.
8. THE Navigation_Bar hamburger menu button and all navigation links SHALL be keyboard-accessible with visible focus indicators and appropriate ARIA attributes (aria-expanded on the menu button, aria-label on the navigation landmark).

### Requirement 6: Navigation Scroll Behavior

**User Story:** As a visitor, I want clicking a navigation link to smoothly scroll me to the corresponding section, so that I can navigate the portfolio without jarring jumps.

#### Acceptance Criteria

1. WHEN the user clicks a navigation link, THE Navigation_Bar SHALL trigger a smooth scroll animation to the corresponding Section's position on the page, completing within 300 to 800 milliseconds.
2. THE Navigation_Bar SHALL reference each Section via anchor hrefs that correspond to unique `id` attributes on each Section target element.
3. WHEN the user scrolls to a Section manually, THE Navigation_Bar SHALL apply a visually distinct style (such as a different text color or underline using the primary CSS_Variable) to the link corresponding to the Section whose top edge is closest to or within 100px below the top of the viewport.
4. THE Navigation_Bar SHALL offset the scroll target position by the height of the fixed Navigation_Bar element, so that the top of the target Section content is not hidden behind the bar.
5. IF the user clicks a navigation link while a previous smooth scroll animation is still in progress, THEN THE Navigation_Bar SHALL cancel the in-progress animation and begin scrolling to the newly selected Section.

### Requirement 7: Prevent Flash of Incorrect Theme

**User Story:** As a visitor, I want the correct theme to appear immediately on page load, so that I do not see a flash of the wrong color scheme.

#### Acceptance Criteria

1. THE site SHALL include a synchronous inline script in the `<head>` element that reads the persisted Color_Mode from localStorage and applies the corresponding class ("light" or "dark") to the `<html>` element before any body content is painted by the browser.
2. IF no persisted Color_Mode exists in localStorage, THEN THE inline script SHALL evaluate the user's System_Preference via the `prefers-color-scheme` media query and apply "dark" when the preference matches dark or "light" when the preference matches light.
3. IF neither localStorage contains a persisted Color_Mode nor the System_Preference media query matches light or dark, THEN THE inline script SHALL apply the "dark" class to the `<html>` element.
4. IF the persisted Color_Mode value in localStorage is not exactly "light" or "dark", THEN THE inline script SHALL discard the invalid value and fall back to the System_Preference resolution described in criterion 2.
5. WHEN the Theme_Provider hydrates on the client, THE Theme_Provider SHALL read the class already applied to the `<html>` element by the inline script and initialize its state to match, rather than re-evaluating or overwriting the class.
