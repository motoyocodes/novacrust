# Novacrust - Crypto Conversion Application

## Overview

Novacrust is a responsive web application built with Next.js and Tailwind CSS that simulates a seamless cryptocurrency-to-fiat exchange flow. It guides users through selecting tokens, entering bank details, providing contact information, and finalizing transactions.

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/motoyocodes/novacrust.git
    cd novacrust
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  **Access the application:**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Assumptions

1.  **Mock Backend:** The application assumes no active backend connection. Exchange rates, wallet options, and bank lists are served via static local data (`data.ts`).
2.  **Account Resolution:** For demonstration purposes, entering any 10-digit account number automatically resolves to the mock account name "ODUTUGA GBEKE".
3.  **Single-Page Flow:** The application assumes a linear progression (Conversion -> Bank -> Contact -> Success).
4.  **Mobile-First Design:** The UI is designed primarily for mobile interfaces but is centered and bounded for desktop viewing to maintain visual integrity.

## Trade-offs

1.  **State Management (useState):**

    - **Decision:** Used React local state (`useState`) instead of a global store (Redux/Zustand) or URL query parameters.
    - **Trade-off:** If the user refreshes the browser, their progress and entered data are lost. This was chosen to keep the application lightweight and reduce boilerplate for this MVP.

2.  **Hardcoded Rates:**

    - **Decision:** Currency conversion rates (e.g., USD to NGN) are static.
    - **Trade-off:** Real-world applications require live API polling (e.g., Chainlink or CoinGecko) to ensure accurate pricing.

3.  **Client-Side Validation:**

    - **Decision:** Basic validation checks (e.g., disabling buttons if fields are empty).
    - **Trade-off:** Does not include deep validation (like checking if an email is truly valid or if a bank account number matches a specific bank's algorithm).

4.  **Asset Optimization:**
    - **Decision:** Images are imported directly.
    - **Trade-off:** In a larger production build, we would likely use a CDN or `next/image` more aggressively for performance optimization.

## Project Structure

- `app/` - Main application routes and pages.
- `components/` - Reusable UI components (Header, ConversionForm).
- `data/` - Static data files (Banks, Tokens, Wallets).
- `types/` - TypeScript interface definitions.
- `public/` - Static assets (Fonts, Images).
