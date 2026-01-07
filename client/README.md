# Client - E-commerce Frontend

React + TypeScript frontend for the e-commerce demo.

## Live Demo

**URL**: [https://ecommerce-tau-lovat-47.vercel.app/](https://ecommerce-tau-lovat-47.vercel.app/)

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling and development server
- **TailwindCSS** for styling
- **Context API** for state management

## Layout Approach

The application uses a component-based architecture with a sticky header and a responsive grid layout for product cards. The main layout leverages TailwindCSS utilities for flexbox and grid systems, ensuring clean separation between the header (cart management) and the product listing area. Components are organized by feature, with shared utilities centralized in dedicated directories.

## Responsiveness Considerations

The design is mobile-first and fully responsive. Product grids adapt from 1 column on mobile to 4 columns on large screens using Tailwind's responsive grid classes (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`). The header and category filters stack vertically on smaller viewports for optimal usability. All interactive elements maintain appropriate touch targets (minimum 44px) for mobile accessibility.

---

## Setup & Run

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Features

### Product Listing
- Responsive grid layout with product cards
- Real-time category filtering (All, Electronics, Apparel, Accessories)
- Loading states and error handling
- Dynamic stock availability display

### Product Card
- Product image with proper aspect ratio
- Product name and price
- Variant selector (dropdown)
- Quantity selector (1-10)
- Stock counter showing available units
- "Add to Cart" button (disabled when out of stock)
- "Out of Stock" state with visual feedback

### Shopping Cart
- Persistent cart state using Context API
- Hover-activated cart dropdown in header
- Cart item count badge
- Item quantity display
- Individual item removal
- Running total calculation
- Thumbnail images for cart items

### Add Product Form
- Modal-based product creation
- Client-side validation
- Category selection
- Stock quantity input
- Image URL validation
- Success/error feedback

---

## Project Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── api/
│   │   └── config.ts   # API base URL configuration
│   ├── components/
│   │   ├── AddProductForm.tsx    # Product creation modal
│   │   ├── CategoryFilter.tsx    # Category filter buttons
│   │   ├── Header.tsx            # App header with cart
│   │   ├── ProductCard.tsx       # Individual product display
│   │   └── ProductListing.tsx    # Main product grid
│   ├── context/
│   │   └── CartContext.tsx       # Cart state management
│   ├── hooks/
│   │   └── useProducts.ts        # Data fetching hook
│   ├── types.ts         # TypeScript interfaces
│   ├── index.css        # Global styles + Tailwind
│   ├── App.tsx          # Root component
│   └── main.tsx         # Application entry point
└── dist/                # Production build output
```

---

## Component Overview

### `App.tsx`
Root component that wraps the application with `CartProvider` and renders the main layout structure.

### `Header.tsx`
Sticky header with:
- Application branding
- Cart icon with item count badge
- Hover-activated cart dropdown
- Cart item management (view, remove)
- Total price calculation

### `ProductListing.tsx`
Main product display component featuring:
- Category filter integration
- Product grid rendering
- "Add Product" button
- Loading and error states
- Empty state handling

### `ProductCard.tsx`
Reusable product card with:
- Responsive image display
- Product information (name, price, category)
- Stock availability indicator
- Variant and quantity selectors
- Add to cart functionality
- Dynamic button states

### `AddProductForm.tsx`
Modal form for creating products with:
- Input validation
- Category dropdown
- Stock quantity control
- Image URL input
- Form submission handling
- Success/error feedback

### `CategoryFilter.tsx`
Filter buttons for product categories with:
- Active state highlighting
- Responsive layout (wraps on mobile)
- All/Electronics/Apparel/Accessories options

---

## State Management

### Cart Context
Centralized cart state using React Context API:

```typescript
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, variant: string, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  total: number;
}
```

**Features:**
- Add items with variant and quantity
- Remove individual items
- Automatic total calculation
- Persistent state during session

---

## Custom Hooks

### `useProducts`
Data fetching hook with:
- Initial product loading
- Category filtering
- Loading state management
- Error handling
- Abort signal support (prevents race conditions)
- Refetch capability

**Usage:**
```typescript
const { products, loading, error, refetch } = useProducts(category);
```

---

## Styling

### TailwindCSS Configuration
Custom color palette and responsive breakpoints configured in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      // Custom color scheme
    }
  }
}
```

### Design System
- **Colors**: Indigo primary, pink/red accents, gray neutrals
- **Typography**: System font stack with proper hierarchy
- **Spacing**: Consistent 4px grid system
- **Shadows**: Subtle elevation for cards and dropdowns
- **Transitions**: Smooth 300ms transitions for interactive elements

---

## Environment Variables

Create a `.env` file in the client directory:

```env
VITE_API_BASE_URL=http://localhost:3000
```

For production (Vercel), set:
```env
VITE_API_BASE_URL=https://ecommerce-api-lu4k.onrender.com
```

**Note:** Vite requires the `VITE_` prefix for environment variables to be exposed to the client.

---

## Build & Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Deployment (Vercel)
The app is configured for automatic deployment on Vercel:

1. Connected to GitHub repository
2. Auto-deploys on push to `main` branch
3. Environment variables configured in Vercel dashboard
4. Build command: `npm run build`
5. Output directory: `dist`

---

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Performance Optimizations

- Vite's fast HMR for development
- Code splitting via dynamic imports
- Optimized production builds with tree-shaking
- Lazy loading for images
- Minimal bundle size (~208KB gzipped)

---

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Sufficient color contrast ratios
- Responsive touch targets (44px minimum)
- Screen reader friendly cart updates
