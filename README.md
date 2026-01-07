# E-commerce Full-Stack Demo

A full-stack e-commerce demo application built with React (TypeScript) and Node.js (Express + Prisma).

## Live Demo

- **Frontend**: [https://ecommerce-tau-lovat-47.vercel.app/](https://ecommerce-tau-lovat-47.vercel.app/)
- **Backend API**: [https://ecommerce-api-lu4k.onrender.com](https://ecommerce-api-lu4k.onrender.com)
- **GitHub Repository**: [https://github.com/dawid-kozlowski/ecommerce](https://github.com/dawid-kozlowski/ecommerce)


## Project Structure

- **`/client`** - React frontend with TailwindCSS
- **`/server`** - Node.js REST API with Prisma ORM

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- Context API (state management)

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- SQLite (database)
- Zod (validation)

## Quick Start

### Backend
```bash
cd server
npm install
npx prisma db seed  # Optional: seed the database
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## Documentation

See individual README files in each directory for detailed documentation:
- [Client README](./client/README.md) - Frontend architecture and responsiveness
- [Server README](./server/README.md) - Complete API documentation

## Integration

- [x] Frontend consumes backend API
- [x] Dynamic stock availability updates
- [x] Category filtering integration
- [x] Add to Cart with local state management
- [x] Full deployment (Vercel + Render)

## Deployment

Both frontend and backend are deployed and fully functional (auto-deploys on push to main):
- Frontend hosted on **Vercel** 
- Backend hosted on **Render** 