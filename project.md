# Project Plan: Personal Portfolio Website

This document outlines the step-by-step plan to build, and deploy a personal portfolio website.

## Phase 1: Project Setup & Initialization

1.  **Navigate to Project Directory:**
    *   Open your terminal and navigate to the project folder.
    ```bash
    cd /Users/kurt/Documents/projectWebsite
    ```

2.  **Initialize Next.js Project:**
    *   Use `create-next-app` to set up a new Next.js project in the current directory. We will use TypeScript, Tailwind CSS, and the `src` directory structure.
    ```bash
    npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
    ```

3.  **Install Additional Dependencies:**
    *   Install `framer-motion` for animations.
    ```bash
    npm install framer-motion
    ```

4.  **Clean Up Boilerplate:**
    *   Delete the contents of `src/app/page.tsx` and replace it with a minimal "Hello World" to start.
    *   Delete the contents of `src/app/globals.css` and add base styling.
    *   Remove any default Next.js or Vercel logos from the `public` folder.

5.  **Verify Installation:**
    *   Start the development server to ensure the project runs correctly.
    ```bash
    npm run dev
    ```
    *   Open `http://localhost:3000` in your browser. You should see your minimal starting page.

## Phase 2: Component Scaffolding

1.  **Create Component Directory:**
    *   Create a new folder for our reusable components.
    ```bash
    mkdir src/components
    ```

2.  **Create Component Files:**
    *   Create empty files for each component of the website.
    ```bash
    touch src/components/Navbar.tsx
    touch src/components/Hero.tsx
    touch src/components/About.tsx
    touch src/components/Projects.tsx
    touch src/components/Contact.tsx
    touch src/components/Footer.tsx
    ```

3.  **Add Placeholder Content:**
    *   For each component file, add a basic React functional component that returns a simple div with the component's name. This helps in verifying that all components are correctly imported and rendered.

    *Example for `Navbar.tsx`:*
    ```tsx
    import React from 'react';

    const Navbar = () => {
      return (
        <nav>
          <div>Navbar</div>
        </nav>
      );
    };

    export default Navbar;
    ```

4.  **Integrate Components into Main Page:**
    *   Open `src/app/page.tsx`.
    *   Import all the newly created components.
    *   Add them in the correct order within the main `Home` component's return statement.

## Phase 3: Content and Styling

1.  **Update Global Styles:**
    *   Edit `tailwind.config.ts` to add any custom theme colors, fonts, or other design tokens.
    *   Edit `src/app/globals.css` to define base styles for the `body`, such as background color and default text color.

2.  **Implement Navbar Component:**
    *   Add navigation links (`Home`, `About`, `Projects`, `Contact`).
    *   Style the navbar to be fixed at the top of the page with a transparent background that becomes opaque on scroll.

3.  **Implement Hero Component:**
    *   Add a compelling headline.
    *   Add links to your GitHub and LinkedIn profiles, complete with icons.
    *   Use Framer Motion to animate the entrance of the headline and links.

4.  **Implement About Component:**
    *   Write a concise paragraph about your skills, interests, and background.
    *   Style the section with a clear heading.

5.  **Implement Projects Component:**
    *   Create a data structure (e.g., an array of objects) to hold your project information (title, description, technologies, demo link, source link).
    *   Map over this data to render a card for each project.
    *   Style the project cards with hover effects using Framer Motion.

6.  **Implement Contact Component:**
    *   Add your professional email address.
    *   Consider adding a "copy to clipboard" button for user convenience.

7.  **Implement Footer Component:**
    *   Add a simple footer with copyright information and the current year.

## Phase 4: Final Touches

1.  **Implement Smooth Scrolling:**
    *   Create a custom hook or utility function that uses the `react-scroll` library or a similar solution to handle smooth scrolling when a navbar link is clicked.

2.  **Add Scroll-Based Animations:**
    *   Use Framer Motion's `useInView` hook to trigger subtle animations as the user scrolls down and different sections come into view.

3.  **Responsive Design:**
    *   Thoroughly test the website on different screen sizes (mobile, tablet, desktop).
    *   Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`) to adjust layouts, font sizes, and spacing as needed.

4.  **Accessibility (a11y) Review:**
    *   Ensure all images have `alt` tags.
    *   Check for sufficient color contrast.
    *   Ensure interactive elements are keyboard-navigable.

## Phase 5: Deployment

1.  **Initialize Git Repository:**
    *   If you haven't already, initialize a git repository for your project.
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```

2.  **Push to GitHub:**
    *   Create a new repository on GitHub.
    *   Add the remote and push your code.
    ```bash
    git remote add origin <your-github-repo-url>
    git branch -M main
    git push -u origin main
    ```

3.  **Deploy with Vercel:**
    *   Sign up for a free account at [vercel.com](https://vercel.com).
    *   Connect your GitHub account to Vercel.
    *   Import your project repository. Vercel will automatically detect that it's a Next.js project.
    *   Click "Deploy". Vercel will build and deploy your site, providing you with a public URL.
