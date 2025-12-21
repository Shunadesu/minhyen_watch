require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zuna-watch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  clearProducts();
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

async function clearProducts() {
  try {
    console.log('\n⚠️  WARNING: This will delete ALL products from database!\n');
    
    // Confirm deletion
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const answer = await new Promise(resolve => {
      rl.question('Are you sure you want to delete all products? (yes/no): ', resolve);
    });

    rl.close();

    if (answer.toLowerCase() !== 'yes') {
      console.log('❌ Operation cancelled.');
      process.exit(0);
    }

    // Count products before deletion
    const countBefore = await Product.countDocuments();
    console.log(`\n📊 Found ${countBefore} products to delete\n`);

    // Delete all products
    const result = await Product.deleteMany({});
    
    console.log(`✅ Deleted ${result.deletedCount} products`);
    console.log(`\n✅ Database cleared! You can now run scrape script.`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

