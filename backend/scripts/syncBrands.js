/**
 * Sync brands: create/update featured brands, remove old ones, and attach products to brands by name match.
 * Usage:
 *   node scripts/syncBrands.js
 * Requires MONGODB_URI in env or defaults to local minh-yen-watch.
 */
const mongoose = require('mongoose');
const Brand = require('../models/Brand');
const Product = require('../models/Product');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://phonghaihoang470_db_user:M7GpQOTAji2SmYAa@cluster0.w4p1bxa.mongodb.net/?appName=Cluster0';

// Whitelist of brands to keep/create
const BRANDS = [
  { name: 'Kudoke', slug: 'kudoke', logo: 'https://bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_8.jpg?1708348422809' },
  { name: 'Andersen Geneve', slug: 'andersen-geneve', logo: 'https://bizweb.dktcdn.net/100/175/988/files/andersen-logo.png?v=1669176280133' },
  { name: 'Laine', slug: 'laine', logo: 'https://static.wixstatic.com/media/cadc3f_fa98efbb35e1474eb8360ddcd729d741~mv2.jpg/v1/crop/x_33,y_10,w_1017,h_303/fill/w_191,h_57,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/LAINE%20-%20Neuchatel%20-%20Switzerland.jpg' },
  { name: 'Tutima Glashütte', slug: 'tutima-glashutte', logo: 'https://bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_9.jpg?1738589945919' },
  { name: 'Vulcain', slug: 'vulcain', logo: 'https://bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_11.jpg?1738589945919' },
  { name: 'Nivada', slug: 'nivada', logo: 'https://bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_10.jpg?1738589945919' },
  { name: 'Schwarz Etienne', slug: 'schwarz-etienne', logo: 'https://bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_13.jpg?1738589945919' },
  { name: 'Hermle', slug: 'hermle', logo: 'https://bizweb.dktcdn.net/100/175/988/themes/592671/assets/doitac_image_2.jpg?1738589945919' }
];

const brandByName = new Map(BRANDS.map((b) => [b.name.toLowerCase(), b]));

// Simple brand synonyms to widen matching
const BRAND_SYNONYMS = {
  'andersen geneve': ['andersen', 'andersen genève', 'andersen geneva'],
  'tutima glashütte': ['tutima', 'tutima glashutte'],
  'schwarz etienne': ['schwarz-etienne', 'schwarz-etienne'],
  vulcain: ['vulcain cricket'],
  nivada: ['nivada grenchen'],
  hermle: ['hermle clock', 'hermle clocks'],
  laine: ['laine watch', 'laine watches'],
  kudoke: ['kudoke watch', 'kudoke watches']
};

async function main() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to Mongo');

  const keepSlugs = BRANDS.map((b) => b.slug);

  // Remove brands not in whitelist
  const deleteResult = await Brand.deleteMany({ slug: { $nin: keepSlugs } });
  console.log(`Removed brands not in whitelist: ${deleteResult.deletedCount}`);

  // Upsert brands in whitelist
  for (const b of BRANDS) {
    const updated = await Brand.findOneAndUpdate(
      { slug: b.slug },
      {
        name: b.name,
        slug: b.slug,
        logo: b.logo,
        description: b.description || '',
        isActive: true
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`Upsert brand: ${updated.name}`);
  }

  // Build map slug -> _id for assignment
  const brands = await Brand.find({ slug: { $in: keepSlugs } });
  const brandIdByName = new Map();
  const brandKeywords = [];
  const validBrandIds = new Set();
  brands.forEach((b) => {
    const key = b.name.toLowerCase();
    brandIdByName.set(key, b._id);
    brandKeywords.push({ key, id: b._id });
    if (BRAND_SYNONYMS[key]) {
      BRAND_SYNONYMS[key].forEach((syn) => brandKeywords.push({ key: syn.toLowerCase(), id: b._id }));
    }
    validBrandIds.add(String(b._id));
  });

  // Attach products whose name contains brand name, if not already set
  let attached = 0;
  const products = await Product.find({});
  for (const p of products) {
    const hasValidBrand = p.brand && validBrandIds.has(String(p.brand));
    if (hasValidBrand) continue;

    const nameLower = (p.name || '').toLowerCase();
    let matchedBrandId = null;
    for (const item of brandKeywords) {
      if (nameLower.includes(item.key)) {
        matchedBrandId = item.id;
        break;
      }
    }
    if (matchedBrandId) {
      p.brand = matchedBrandId;
      await p.save();
      attached += 1;
    }
  }
  console.log(`Attached brand to ${attached} products`);

  await mongoose.disconnect();
  console.log('Done');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


