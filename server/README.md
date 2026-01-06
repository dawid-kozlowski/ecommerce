# Server - E-commerce API

REST API for the e-commerce demo built with Node.js, Express, and Prisma.

## Tech Stack

This server uses **Node.js** with **TypeScript** for type safety, **Express** for the web framework, and **Prisma** as the ORM with SQLite for data persistence. The architecture follows a modular pattern with separate routes, controllers, and middleware for maintainability.

## How to Run

```bash
npm install
npx prisma db seed  # Optional: seed the database
npm run dev
```

The API will be available at `http://localhost:3000`.

## API Documentation

### Endpoints

#### `GET /products`
Fetch all products or filter by category.

**Query Parameters:**
- `category` (optional): Filter by category (e.g., `Electronics`, `Apparel`, `Accessories`)

**Sample Request:**
```bash
curl http://localhost:3000/products
curl http://localhost:3000/products?category=Electronics
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Wireless Headphones",
    "price": 99.99,
    "category": "Electronics",
    "image": "https://images.unsplash.com/...",
    "stockQuantity": 50
  }
]
```

---

#### `GET /products/:id`
Fetch a single product by ID.

**Sample Request:**
```bash
curl http://localhost:3000/products/1
```

**Response:**
```json
{
  "id": 1,
  "name": "Wireless Headphones",
  "price": 99.99,
  "category": "Electronics",
  "image": "https://images.unsplash.com/...",
  "stockQuantity": 50
}
```

---

#### `POST /products`
Create a new product.

**Sample Request:**
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Gaming Mouse",
    "price": 49.99,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-example",
    "stockQuantity": 100
  }'
```

**Response:**
```json
{
  "id": 9,
  "name": "Gaming Mouse",
  "price": 49.99,
  "category": "Electronics",
  "image": "https://images.unsplash.com/photo-example",
  "stockQuantity": 100
}
```

**Validation:**
- `name`: Required, non-empty string
- `price`: Required, positive number
- `image`: Required, valid URL
- `category`: Required, non-empty string
- `stockQuantity`: Required, non-negative integer

---

## Environment Variables

Create a `.env` file:

```
PORT=3000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
```

## Database

The project uses SQLite with Prisma. To reset/seed the database:

```bash
npx prisma db push
npx prisma db seed
```
