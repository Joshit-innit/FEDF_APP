const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Festival = require('./models/Festival');
const Tradition = require('./models/Tradition');
const Recipe = require('./models/Recipe');
const Culture = require('./models/Culture');

// Connect to MongoDB and verify data
async function verifyDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/indian-culture');
    console.log('✅ Connected to MongoDB\n');

    // Count documents in each collection
    const festivalCount = await Festival.countDocuments();
    const traditionCount = await Tradition.countDocuments();
    const recipeCount = await Recipe.countDocuments();
    const cultureCount = await Culture.countDocuments();

    console.log('📊 Database Statistics:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Festivals:  ${festivalCount} documents`);
    console.log(`Traditions: ${traditionCount} documents`);
    console.log(`Recipes:    ${recipeCount} documents`);
    console.log(`Culture:    ${cultureCount} documents`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Show sample data from each collection
    if (festivalCount > 0) {
      console.log('🎉 Sample Festivals:');
      const festivals = await Festival.find().limit(3).select('name images region');
      festivals.forEach(fest => {
        console.log(`  - ${fest.name} (${fest.region})`);
        if (fest.images && fest.images.length > 0) {
          console.log(`    Image: ${fest.images[0].substring(0, 60)}...`);
        }
      });
      console.log('');
    }

    if (traditionCount > 0) {
      console.log('🙏 Sample Traditions:');
      const traditions = await Tradition.find().limit(3).select('title region');
      traditions.forEach(trad => {
        console.log(`  - ${trad.title} (${trad.region})`);
      });
      console.log('');
    }

    if (recipeCount > 0) {
      console.log('🍽️  Sample Recipes:');
      const recipes = await Recipe.find().limit(3).select('name cuisine region');
      recipes.forEach(rec => {
        console.log(`  - ${rec.name} (${rec.cuisine}, ${rec.region})`);
      });
      console.log('');
    }

    if (cultureCount > 0) {
      console.log('🎨 Sample Culture Items:');
      const cultures = await Culture.find().limit(3).select('title category region');
      cultures.forEach(cult => {
        console.log(`  - ${cult.title} (${cult.category}, ${cult.region})`);
      });
      console.log('');
    }

    // Check for images
    console.log('🖼️  Image Verification:');
    const festivalsWithImages = await Festival.find({ images: { $exists: true, $ne: [] } });
    const festivalsWithoutImages = await Festival.find({ $or: [{ images: { $exists: false } }, { images: [] }] });
    
    console.log(`  Festivals with images: ${festivalsWithImages.length}`);
    console.log(`  Festivals without images: ${festivalsWithoutImages.length}`);
    
    if (festivalsWithImages.length > 0) {
      console.log('\n  Sample image URLs:');
      festivalsWithImages.slice(0, 3).forEach(fest => {
        if (fest.images && fest.images.length > 0) {
          console.log(`    ${fest.name}: ${fest.images[0]}`);
        }
      });
    }

    console.log('\n✅ Database verification complete!');

  } catch (error) {
    console.error('❌ Error verifying database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the verification function
verifyDatabase();

