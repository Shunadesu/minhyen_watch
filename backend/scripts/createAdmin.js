require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const readline = require('readline');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://phonghaihoang470_db_user:M7GpQOTAji2SmYAa@cluster0.w4p1bxa.mongodb.net/?appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  createAdmin();
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createAdmin() {
  try {
    console.log('\n🔐 Create Admin User\n');
    console.log('═══════════════════════════════════════\n');

    // Get admin details from command line arguments or prompt
    let name, email, password;

    if (process.argv[2] && process.argv[3] && process.argv[4]) {
      // From command line
      name = process.argv[2];
      email = process.argv[3];
      password = process.argv[4];
    } else {
      // Interactive mode
      name = await question('Name: ');
      email = await question('Email: ');
      password = await question('Password (min 6 characters): ');
    }

    if (!name || !email || !password) {
      console.error('❌ All fields are required');
      rl.close();
      process.exit(1);
    }

    if (password.length < 6) {
      console.error('❌ Password must be at least 6 characters');
      rl.close();
      process.exit(1);
    }

    // Check if admin already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      if (existingUser.role === 'admin') {
        console.log(`\n⚠️  Admin user with email ${email} already exists`);
        const update = await question('Do you want to update this user? (y/n): ');
        if (update.toLowerCase() !== 'y') {
          console.log('Cancelled.');
          rl.close();
          process.exit(0);
        }
        
        existingUser.name = name;
        existingUser.password = password; // Will be hashed by pre-save hook
        existingUser.role = 'admin';
        await existingUser.save();
        
        console.log('\n✅ Admin user updated successfully!');
        console.log(`   Name: ${existingUser.name}`);
        console.log(`   Email: ${existingUser.email}`);
        console.log(`   Role: ${existingUser.role}`);
        rl.close();
        process.exit(0);
      } else {
        console.log(`\n⚠️  User with email ${email} exists but is not an admin`);
        const promote = await question('Do you want to promote this user to admin? (y/n): ');
        if (promote.toLowerCase() !== 'y') {
          console.log('Cancelled.');
          rl.close();
          process.exit(0);
        }
        
        existingUser.role = 'admin';
        existingUser.name = name;
        if (password) {
          existingUser.password = password;
        }
        await existingUser.save();
        
        console.log('\n✅ User promoted to admin successfully!');
        console.log(`   Name: ${existingUser.name}`);
        console.log(`   Email: ${existingUser.email}`);
        console.log(`   Role: ${existingUser.role}`);
        rl.close();
        process.exit(0);
      }
    }

    // Create new admin user
    const admin = new User({
      name: name,
      email: email.toLowerCase(),
      password: password,
      role: 'admin'
    });

    await admin.save();

    console.log('\n✅ Admin user created successfully!');
    console.log(`   Name: ${admin.name}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   ID: ${admin._id}`);
    
    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error creating admin:', error.message);
    rl.close();
    process.exit(1);
  }
}

