const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Define User Schema inline
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['CLIENT', 'STAFF', 'MANAGER', 'ADMIN'], default: 'CLIENT' },
    avatar: { type: String, default: null },
    phone: { type: String, default: null },
    isActive: { type: Boolean, default: true },
    emailVerified: { type: Date, default: null }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

const testUsers = [
  {
    name: 'Client Test',
    email: 'client@test.com',
    password: 'Password123',
    role: 'CLIENT',
    phone: '+33 6 12 34 56 78'
  },
  {
    name: 'Staff Test',
    email: 'staff@test.com',
    password: 'Password123',
    role: 'STAFF',
    phone: '+33 6 12 34 56 79'
  },
  {
    name: 'Manager Test',
    email: 'manager@test.com',
    password: 'Password123',
    role: 'MANAGER',
    phone: '+33 6 12 34 56 80'
  },
  {
    name: 'Admin Test',
    email: 'admin@test.com',
    password: 'Password123',
    role: 'ADMIN',
    phone: '+33 6 12 34 56 81'
  }
];

async function seedUsers() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }

    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing test users
    console.log('🗑️  Clearing existing test users...');
    await User.deleteMany({ email: { $in: testUsers.map(u => u.email) } });

    // Create test users
    console.log('👥 Creating test users...');

    for (const userData of testUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 12);

      const user = await User.create({
        ...userData,
        password: hashedPassword,
        isActive: true
      });

      console.log(`✅ Created user: ${user.email} (${user.role})`);
    }

    console.log('\n📋 Test Users Created:');
    console.log('════════════════════════════════════════════════════════');
    testUsers.forEach(user => {
      console.log(`Role: ${user.role.padEnd(10)} | Email: ${user.email.padEnd(20)} | Password: ${user.password}`);
    });
    console.log('════════════════════════════════════════════════════════\n');

    console.log('✨ Seed completed successfully!');

    // Disconnect
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
}

seedUsers();
