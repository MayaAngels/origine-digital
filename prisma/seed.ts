import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
console.log("🌱 Seeding database...");
console.log("✅ Seed complete");
}

main()
.then(() => {
console.log("Seed finished successfully");
})
.catch((e) => {
console.error("❌ Seed failed:", e);
process.exit(1);
})
.finally(async () => {
await prisma.$disconnect();
});