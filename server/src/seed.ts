import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
    {
        name: "Wireless Headphones",
        price: 99.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        stockQuantity: 50
    },
    {
        name: "Basic Tee",
        price: 25.00,
        category: "Apparel",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        stockQuantity: 100
    },
    {
        name: "Smart Watch",
        price: 199.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        stockQuantity: 0
    },
    {
        name: "Running Shoes",
        price: 80.00,
        category: "Apparel",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        stockQuantity: 15
    },
    {
        name: "Canvas Backpack",
        price: 59.99,
        category: "Accessories",
        image: "https://plus.unsplash.com/premium_photo-1664110691115-790e20a41744?q=80&w=706&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        stockQuantity: 40
    },
    {
        name: "4K Monitor",
        price: 349.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500",
        stockQuantity: 20
    },
    {
        name: "Yoga Mat",
        price: 29.95,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500",
        stockQuantity: 100
    },
    {
        name: "Aviator Sunglasses",
        price: 129.99,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
        stockQuantity: 45
    }
];

async function main() {
    console.log('Start seeding...');

    // Clear existing data to ensure a clean state
    await prisma.product.deleteMany({});
    console.log('Deleted all previous data.');

    // Insert seed data
    for (const p of products) {
        const product = await prisma.product.create({
            data: p
        });
        console.log(`Created product with id: ${product.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
