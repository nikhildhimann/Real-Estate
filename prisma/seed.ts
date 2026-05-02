import "dotenv/config";
import { PrismaClient, UserRole, PropertyStatus, PropertyType } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";

// Test basic PostgreSQL connection first
import pg from "pg";

async function testConnection() {
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("❌ Missing DIRECT_URL or DATABASE_URL in environment");
    return false;
  }

  const pool = new pg.Pool({ 
    connectionString
  });
  
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful:', result.rows[0]);
    await pool.end();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error instanceof Error ? error.message : String(error));
    await pool.end();
    return false;
  }
}

const prismaConnectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;
if (!prismaConnectionString) {
  throw new Error("Missing DATABASE_URL or DIRECT_URL in environment");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg(new pg.Pool({ connectionString: prismaConnectionString })),
  log: ["query", "info", "warn", "error"],
});

async function main() {
  // Test database connection first
  console.log('🔍 Testing database connection...');
  const connectionOk = await testConnection();
  if (!connectionOk) {
    console.error('❌ Cannot proceed with seeding due to database connection failure');
    process.exit(1);
  }

  // 1. Create Admin
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      email: "admin@gmail.com",
      name: "Admin User",
      password: hashedPassword,
      role: UserRole.ADMIN,
    },
  });

  console.log({ admin });

  // 2. Sample Properties
  const properties = [
    {
      title: "Luxury Oceanfront Villa",
      description: "A stunning villa with private beach access and infinity pool.",
      price: 4500000,
      status: PropertyStatus.AVAILABLE,/*  */
      type: PropertyType.VILLA,
      bedrooms: 6,
      bathrooms: 5,
      area: 6000,
      address: "101 Coral Way",
      city: "Malibu",
      state: "CA",
      zip: "90265",
      country: "USA",
      amenities: ["Pool", "Gym", "Private Beach", "Wine Cellar"],
      featured: true,
      agentName: "Stackron Real Estate Solutions",
      agentEmail: "nikhilstackron@gmail.com",
      agentPhone: "+91 94644 02648"
    },
    {
      title: "Modern Downtown Penthouse",
      description: "Experience urban luxury with 360-degree city views.",
      price: 12000,
      status: PropertyStatus.RENTED,
      type: PropertyType.APARTMENT,
      bedrooms: 3,
      bathrooms: 3,
      area: 2500,
      address: "88 Skyline Ave",
      city: "Manhattan",
      state: "NY",
      zip: "10001",
      country: "USA",
      amenities: ["Concierge", "Rooftop Deck", "Smart Home", "Parking"],
      featured: true,
      agentName: "Stackron Real Estate Solutions",
      agentEmail: "nikhilstackron@gmail.com",
      agentPhone: "+91 94644 02648"
    },
    {
      title: "Charming Suburban Cottage",
      description: "Perfect family home in a quiet, tree-lined neighborhood.",
      price: 850000,
      status: PropertyStatus.AVAILABLE,
      type: PropertyType.HOUSE,
      bedrooms: 4,
      bathrooms: 2,
      area: 2200,
      address: "245 Maple Lane",
      city: "Austin",
      state: "TX",
      zip: "73301",
      country: "USA",
      amenities: ["Large Backyard", "Fireplace", "Updated Kitchen"],
      featured: false,
      agentName: "Stackron Real Estate Solutions",
      agentEmail: "nikhilstackron@gmail.com",
      agentPhone: "+91 94644 02648"
    },
    {
      title: "Industrial Tech Office Space",
      description: "High ceilings and open floor plan ideal for startups.",
      price: 15000,
      status: PropertyStatus.RENTED,
      type: PropertyType.COMMERCIAL,
      bedrooms: 0,
      bathrooms: 2,
      area: 3500,
      address: "500 Innovation Drive",
      city: "San Francisco",
      state: "CA",
      zip: "94101",
      country: "USA",
      amenities: ["Fiber Internet", "Meeting Rooms", "Cafeteria"],
      featured: false,
      agentName: "Stackron Real Estate Solutions",
      agentEmail: "nikhilstackron@gmail.com",
      agentPhone: "+91 94644 02648"
    }
  ];

  for (const p of properties) {
    const slug = p.title.toLowerCase().replace(/ /g, "-") + "-" + Math.random().toString(36).substring(7);
    
    await prisma.property.create({
      data: {
        ...p,
        slug,
        authorId: admin.id,
        images: {
          create: [
            {
              url: `https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200`,
              publicId: `seed-${Math.random()}`,
              order: 0
            }
          ]
        }
      }
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
