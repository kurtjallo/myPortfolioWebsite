# Portfolio Website Design Specification

## Color Palette

**Light Mode:**
- Background: Gradient from gray-50 via white to gray-100
- Cards: White
- Text: gray-900
- Borders: gray-200

**Dark Mode:**
- Background: gray-950
- Cards: gray-800
- Text: white/gray-200
- Borders: gray-700

**Accent Colors:**
- Primary: Blue (500) to Cyan (500)
- Secondary: Purple (500) to Pink (500)
- Tertiary: Orange (500) to Red (500)
- Success: Green (500) to Emerald (500)
- Gradient Icons: Indigo (500) to Blue (500), Pink (500) to Rose (500)

---

## Typography

**Font Family:** Inter (weights: 300, 400, 500, 600, 700, 800)

**Font Sizes & Weights:**
- H1 (Hero): 48px (md: 56px), font-bold (700), bg-clip-text with gradient
- H2 (Section Headings): 36px (md: 48px), font-bold (700)
- H3 (Cards): 20px, font-bold (700)
- Body: 16px, font-normal (400), line-height 150%
- Small: 12px, font-normal (400)
- Label: 14px, font-medium (500)

**Line Heights:**
- Headings: 120%
- Body: 150%
- Relaxed: 180%

---

## Layout & Spacing

**Container:**
- Max width: 6xl (72rem / 1152px)
- Centered with mx-auto
- Side padding: px-6 (24px)

**Section Padding:**
- Vertical: py-32 (128px top/bottom)
- Horizontal: px-6 (24px sides)

**Gap System:**
- Elements: gap-2 to gap-8
- Common: gap-6

**Spacing Units (8px base):**
- px-2: 8px
- px-3: 12px
- px-4: 16px
- px-6: 24px
- py-2: 8px
- py-3: 12px
- py-4: 16px
- mb-6: 24px margin-bottom
- mb-12: 48px margin-bottom
- mb-16: 64px margin-bottom

---

## Components

### Navigation Bar
- **Position:** Fixed top, z-50
- **Height:** py-4 (16px padding)
- **Light Mode (Scrolled):** bg-white/80 with border-b border-gray-200
- **Dark Mode (Scrolled):** bg-gray-950/80 with border-b border-gray-800
- **Glass Effect:** backdrop-blur-lg
- **Transition:** duration-300
- **Logo/Brand:** font-semibold text-lg, hover:text-gray-600
- **Links:** Hidden on mobile (md:flex), text-sm font-medium, gap-6
- **Dark Toggle:** Button with Moon/Sun icon, p-2, rounded-lg

### Hero Section
- **Height:** min-h-screen
- **Layout:** Flex center items-center justify-center
- **Avatar:** w-32 h-32, rounded-full, gradient border (blue→purple→pink) p-1
- **Avatar Inner:** bg-gray-200 dark:bg-gray-800, flex items-center justify-center
- **Initials:** text-4xl font-bold
- **Main Heading:** text-5xl (md: text-7xl), gradient text (light: gray-900→gray-700→gray-900, dark: white→gray-200→white)
- **Tagline:** text-xl (md: text-2xl), font-light, text-gray-600 dark:text-gray-400
- **Description:** text-base (md: text-lg), text-gray-500 dark:text-gray-500, max-w-2xl
- **Social Icons:** flex gap-4, centered, p-3 rounded-xl boxes with hover:scale-110
- **Down Arrow:** animate-bounce, text-gray-400 hover:text-gray-600, size-32
- **Animation:** Fade-in on load (opacity-0 translate-y-8 → opacity-100 translate-y-0), duration-1000

### About Section
- **Layout:** md:grid-cols-2 gap-12
- **Left Column:** space-y-6 (paragraphs)
- **Right Column:** Info cards with gradients
- **Info Cards:** p-6, rounded-2xl, bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800, border
- **Interest Tags:** px-3 py-1, text-sm, rounded-full, bg-white dark:bg-gray-800, border

### Project Cards
- **Grid:** md:grid-cols-2 gap-8
- **Card:** relative, rounded-2xl, overflow-hidden, bg-white dark:bg-gray-800, border
- **Hover:** shadow-2xl, hover:-translate-y-2, transition-all duration-300
- **Header:** h-48, gradient background with color variants
- **Header Overlay:** bg-white/10 backdrop-blur-sm, flex center
- **Icon Bubble:** w-20 h-20, rounded-full, bg-white/20 backdrop-blur-md, flex center, text-white text-2xl font-bold
- **Content:** p-6
- **Title:** text-xl font-bold mb-3
- **Description:** text-base, text-gray-600 dark:text-gray-400, leading-relaxed, mb-4
- **Tags:** flex flex-wrap gap-2, px-3 py-1, text-xs, rounded-full, bg-gray-100 dark:bg-gray-700
- **Buttons:** 2 button row with flex gap-3
  - GitHub: bg-gray-100 dark:bg-gray-700, hover:bg-gray-200 dark:hover:bg-gray-600, text-gray-700 dark:text-gray-300
  - Live Demo: bg-gray-900 dark:bg-white, hover:bg-gray-800 dark:hover:bg-gray-100, text-white dark:text-gray-900
- **Animation:** Header scale-110 on hover (duration-500)

### Skills Section
- **Grid:** md:grid-cols-2 lg:grid-cols-3 gap-6
- **Card:** p-6, rounded-2xl, bg-white dark:bg-gray-800, border, hover:shadow-xl hover:-translate-y-1
- **Animation:** fadeInUp 0.6s ease-out with staggered delay (index * 0.1s)
- **Icon:** inline-flex p-3, rounded-xl, gradient bg, text-white, group-hover:scale-110 duration-300
- **Category:** text-xl font-bold mb-4
- **List:** space-y-2, bullet points with small dots (w-1.5 h-1.5 rounded-full)

### Contact Section
- **Background:** bg-gray-50 dark:bg-gray-900/50
- **Info Cards:** md:grid-cols-2 gap-8, mb-12, p-6, rounded-2xl, border, hover:shadow-lg
- **Info Icon:** p-3, rounded-xl, gradient bg, text-white
- **Form:** p-8, rounded-2xl, bg-white dark:bg-gray-800, border, shadow-xl
- **Form Spacing:** space-y-6
- **Inputs:** w-full, px-4 py-3, rounded-xl, border, focus:ring-2 focus:ring-blue-500, focus:border-transparent
- **Submit Button:** w-full, gradient from-blue-600 to-cyan-600, hover:from-blue-700 hover:to-cyan-700, text-white, font-medium, rounded-xl, hover:shadow-xl hover:-translate-y-0.5
- **Footer:** mt-20, pt-8, border-t, text-center, text-gray-500 dark:text-gray-500 text-sm

---

## Animations & Effects

**Fade-In Up:**
- @keyframes fadeInUp
- from: opacity-0, transform translateY(30px)
- to: opacity-100, transform translateY(0)
- Duration: 0.6s

**Hover Effects:**
- Icon scale: hover:scale-110, transition-transform duration-300
- Card shadow: hover:shadow-2xl
- Card lift: hover:-translate-y-2 (projects), hover:-translate-y-1 (skills)
- Button lift: hover:-translate-y-0.5

**Global:**
- scroll-smooth on all elements
- Color transitions: transition-colors duration-300 to duration-500
- All transitions: transition-all duration-300

**Bounce Animation:**
- Down arrow: animate-bounce (Tailwind default)

---

## Responsive Breakpoints

**Mobile First:**
- Default: Single column, hidden nav links
- md: (768px) 2 columns, show nav links
- lg: (1024px) 3 columns (skills)

**Text Scaling:**
- Headings: text-5xl (md: text-7xl)
- Hero subtitle: text-xl (md: text-2xl)
- Hero description: text-base (md: text-lg)

---

## Dark Mode Implementation

**Activation:** 
- Add class="dark" to document.documentElement
- Triggered by button in navbar

**Color Scheme:**
- Use dark: prefix for dark mode classes
- Transition: duration-500

**Theme Toggle:**
- Moon icon for light mode (shows dark option)
- Sun icon for dark mode (shows light option)
- Button styling: bg-gray-100 text-gray-700 (light), bg-gray-800 text-yellow-400 (dark)

---

## Section Order

1. Navigation (fixed)
2. Hero Section
3. About Section
4. Projects Section (bg-gray-50 dark:bg-gray-900/50)
5. Skills Section
6. Contact Section (bg-gray-50 dark:bg-gray-900/50)
7. Footer

---

## Color Gradients (Project/Skill Cards)

- Blue→Cyan: from-blue-500 to-cyan-500
- Purple→Pink: from-purple-500 to-pink-500
- Orange→Red: from-orange-500 to-red-500
- Green→Emerald: from-green-500 to-emerald-500
- Indigo→Blue: from-indigo-500 to-blue-500
- Pink→Rose: from-pink-500 to-rose-500

---

## Additional Details

**Border Radius:**
- Cards: rounded-2xl (16px)
- Inputs: rounded-xl (12px)
- Buttons: rounded-lg or rounded-xl
- Icons: rounded-xl (12px)
- Social buttons: rounded-xl (12px)

**Border Style:**
- All cards: 1px solid border

**Box Shadows:**
- Card hover: shadow-2xl
- Form: shadow-xl
- Button hover: hover:shadow-xl

**Misc:**
- Section IDs: hero, about, projects, skills, contact
- Smooth scroll behavior on all links
- Form validation: required fields
- Focus states: ring-2 ring-blue-500, border-transparent on inputs