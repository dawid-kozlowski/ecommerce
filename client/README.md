# Client - E-commerce Frontend

React + TypeScript frontend for the e-commerce demo.

## Layout Approach

The application uses a component-based architecture with a sticky header and a responsive grid layout for product cards. The main layout leverages TailwindCSS utilities for flexbox and grid systems, ensuring clean separation between the header (cart management) and the product listing area.

## Responsiveness Considerations

The design is mobile-first and fully responsive. Product grids adapt from 1 column on mobile to 4 columns on large screens using Tailwind's responsive grid classes (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`). The header and category filters stack vertically on smaller viewports for optimal usability.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **TailwindCSS** for styling
- **Context API** for state management

## Setup & Run

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Environment Variables

Create a `.env` file:

```
VITE_API_BASE_URL=http://localhost:3000
```
