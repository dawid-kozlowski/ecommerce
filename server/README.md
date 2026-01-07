# Server - E-commerce API

REST API for the e-commerce demo built with Node.js, Express, and Prisma.

## Live API

**Base URL**: [https://ecommerce-api-lu4k.onrender.com](https://ecommerce-api-lu4k.onrender.com)

## Tech Stack

This server uses **Node.js** with **TypeScript** for type safety, **Express** for the web framework, and **Prisma** as the ORM with SQLite for data persistence. The architecture follows a modular pattern with separate routes, controllers, and middleware for maintainability and scalability.

## How to Run

**1. Create `.env` file in the server directory:**

```env
PORT=3000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
```

**2. Install dependencies and run:**

```bash
npm install
npx prisma db push      # Initialize database
npx prisma db seed      # Seed with sample data (optional)
npm run dev
```

The API will be available at `http://localhost:3000`.

---

## API Documentation

### Base URL
- **Local**: `http://localhost:3000`
- **Production**: `https://ecommerce-api-lu4k.onrender.com`

---

### Endpoints

#### `GET /products`
Fetch all products or filter by category.

**Query Parameters:**
- `category` (optional): Filter by category
  - Valid values: `Electronics`, `Apparel`, `Accessories`

**Example Requests:**

```bash
# Get all products
curl https://ecommerce-api-lu4k.onrender.com/products

# Filter by category
curl https://ecommerce-api-lu4k.onrender.com/products?category=Electronics
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Wireless Headphones",
    "price": 99.99,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    "stockQuantity": 50
  },
  {
    "id": 2,
    "name": "Basic Tee",
    "price": 25.00,
    "category": "Apparel",
    "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    "stockQuantity": 100
  }
]
```

---

#### `GET /products/:id`
Fetch a single product by ID.

**Path Parameters:**
- `id` (required): Product ID (integer)

**Example Request:**

```bash
curl https://ecommerce-api-lu4k.onrender.com/products/1
```

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Wireless Headphones",
  "price": 99.99,
  "category": "Electronics",
  "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  "stockQuantity": 50
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Product not found"
}
```

---

#### `POST /products`
Create a new product.

**Request Body:**
```json
{
  "name": "Gaming Mouse",
  "price": 49.99,
  "category": "Electronics",
  "image": "https://images.unsplash.com/photo-example",
  "stockQuantity": 100
}
```

**Field Validation:**
- `name`: Required, non-empty string
- `price`: Required, positive number
- `image`: Required, valid URL
- `category`: Required, non-empty string
- `stockQuantity`: Required, non-negative integer

**Example Request:**

```bash
curl -X POST https://ecommerce-api-lu4k.onrender.com/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Gaming Mouse",
    "price": 49.99,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-example",
    "stockQuantity": 100
  }'
```

**Response (201 Created):**
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

**Error Response (400 Bad Request):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "code": "too_small",
      "minimum": 0,
      "type": "number",
      "inclusive": false,
      "exact": false,
      "message": "Number must be greater than 0",
      "path": ["price"]
    }
  ]
}
```

---

## Testing with Postman

### Import Collection

Create a new Postman collection with these requests:

1. **Get All Products**
   - Method: `GET`
   - URL: `{{baseUrl}}/products`

2. **Get Products by Category**
   - Method: `GET`
   - URL: `{{baseUrl}}/products?category=Electronics`

3. **Get Single Product**
   - Method: `GET`
   - URL: `{{baseUrl}}/products/1`

4. **Create Product**
   - Method: `POST`
   - URL: `{{baseUrl}}/products`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "name": "Test Product",
       "price": 29.99,
       "category": "Electronics",
       "image": "https://images.unsplash.com/photo-example",
       "stockQuantity": 50
     }
     ```

**Environment Variables:**
- `baseUrl`: `https://ecommerce-api-lu4k.onrender.com` (production)
- `baseUrl`: `http://localhost:3000` (local)

---

## Database

The project uses **SQLite** with Prisma ORM. The database schema includes:

```prisma
model Product {
  id            Int     @id @default(autoincrement())
  name          String
  price         Float
  category      String
  image         String
  stockQuantity Int
}
```

### Database Commands

```bash
# Push schema to database
npx prisma db push

# Seed database with sample data
npx prisma db seed

# Open Prisma Studio (GUI)
npx prisma studio
```

---

## Security Features

- **CORS**: Configured to allow frontend domain
- **Security Headers**: 
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `X-XSS-Protection: 1; mode=block`
  - `Strict-Transport-Security`
- **Input Validation**: Zod schema validation on all POST requests
- **Error Handling**: Centralized error middleware with sanitized responses

---

## Response Codes

| Code | Description |
|------|-------------|
| 200  | Success (GET requests) |
| 201  | Created (POST requests) |
| 400  | Bad Request (validation errors) |
| 404  | Not Found (resource doesn't exist) |
| 500  | Internal Server Error |

---

## Environment Variables

Create a `.env` file:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
FRONTEND_URL=https://ecommerce-tau-lovat-47.vercel.app
```

---

## Project Structure

```
server/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── dev.db            # SQLite database
├── src/
│   ├── controllers/      # Business logic
│   ├── middleware/       # Error handling, logging
│   ├── routes/          # API routes
│   ├── db.ts           # Prisma client singleton
│   ├── index.ts        # Express app entry point
│   └── seed.ts         # Database seeding script
└── dist/               # Compiled JavaScript (production)
```

---

## Deployment

The API is deployed on **Render** with automatic deployments on git push.

**Build Command:**
```bash
npm install && npx prisma generate && npm run build && npx prisma db push && npx prisma db seed
```

**Start Command:**
```bash
npm start
```

---

## Notes

- The database auto-seeds on deployment with 8 sample products
- Render's free tier has ephemeral storage, so the database resets on each deploy
- First request after inactivity may take ~30s (cold start)
