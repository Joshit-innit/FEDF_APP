const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Festival = require('./models/Festival');
const Tradition = require('./models/Tradition');
const Recipe = require('./models/Recipe');
const Culture = require('./models/Culture');

// Sample data
const sampleFestivals = [
  {
    name: 'Diwali',
    description: 'The Festival of Lights, celebrating the victory of light over darkness and good over evil.',
    date: 'October/November (Varies by lunar calendar)',
    significance: 'Celebrates the return of Lord Rama to Ayodhya after 14 years of exile',
    traditions: ['Lighting diyas', 'Rangoli making', 'Fireworks', 'Exchanging sweets'],
    foods: ['Gulab jamun', 'Kaju katli', 'Barfi', 'Ladoo'],
    images: ['https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&h=600&fit=crop'],
    region: 'Pan-India',
    category: 'Religious'
  },
  {
    name: 'Holi',
    description: 'The Festival of Colors, celebrating the arrival of spring and the victory of good over evil.',
    date: 'March (Varies by lunar calendar)',
    significance: 'Celebrates the divine love of Radha and Krishna',
    traditions: ['Playing with colors', 'Bonfire (Holika Dahan)', 'Singing and dancing'],
    foods: ['Gujiya', 'Thandai', 'Puran poli', 'Malpua'],
    images: ['https://images.unsplash.com/photo-1617038220319-276d7f70d7b3?w=800&h=600&fit=crop'],
    region: 'Pan-India',
    category: 'Religious'
  },
  {
    name: 'Pongal',
    description: 'A harvest festival celebrated in Tamil Nadu, marking the end of the winter solstice.',
    date: 'January 14-17',
    significance: 'Thanksgiving to the Sun God for a bountiful harvest',
    traditions: ['Cooking Pongal rice', 'Kolam designs', 'Cattle decoration'],
    foods: ['Ven Pongal', 'Sakkarai Pongal', 'Vadai', 'Payasam'],
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'],
    region: 'Tamil Nadu',
    category: 'Harvest'
  },
  {
    name: 'Durga Puja',
    description: 'A major festival celebrating the victory of Goddess Durga over the demon Mahishasura.',
    date: 'September/October (Varies by lunar calendar)',
    significance: 'Celebrates the power of feminine divinity and good over evil',
    traditions: ['Pandal visits', 'Aarti', 'Cultural programs', 'Immersion'],
    foods: ['Bhog', 'Khichuri', 'Labra', 'Payesh'],
    images: ['https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop'],
    region: 'West Bengal',
    category: 'Religious'
  },
  {
    name: 'Onam',
    description: 'A harvest festival of Kerala, celebrating the homecoming of King Mahabali.',
    date: 'August/September',
    significance: 'Celebrates prosperity, unity, and the harvest season',
    traditions: ['Pookalam', 'Vallamkali', 'Onam Sadya', 'Cultural dances'],
    foods: ['Onam Sadya', 'Payasam', 'Avial', 'Erissery'],
    images: ['https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&h=600&fit=crop'],
    region: 'Kerala',
    category: 'Harvest'
  },
  {
    name: 'Ganesh Chaturthi',
    description: 'Festival celebrating the birth of Lord Ganesha, the remover of obstacles.',
    date: 'August/September (Varies by lunar calendar)',
    significance: 'Worships Lord Ganesha for wisdom, prosperity, and good fortune',
    traditions: ['Ganpati installation', 'Modak preparation', 'Aarti', 'Immersion'],
    foods: ['Modak', 'Ladoo', 'Puran Poli', 'Karanji'],
    images: ['https://images.unsplash.com/photo-1601648764666-c397bb97e0b2?w=800&h=600&fit=crop'],
    region: 'Maharashtra',
    category: 'Religious'
  }
];

const sampleTraditions = [
  {
    title: 'Mehendi Ceremony',
    description: 'The application of henna designs on hands and feet, typically done before weddings.',
    region: 'Pan-India',
    category: 'Wedding',
    practices: ['Henna application', 'Singing traditional songs', 'Dancing'],
    significance: 'Symbolizes joy, beauty, and spiritual awakening',
    images: ['https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop']
  },
  {
    title: 'Namkaran Ceremony',
    description: 'The naming ceremony for newborns, usually performed on the 12th day after birth.',
    region: 'Pan-India',
    category: 'Birth',
    practices: ['Choosing auspicious name', 'Prayers and blessings', 'Feast'],
    significance: 'Formally introduces the child to the world and community',
    images: ['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=600&fit=crop']
  },
  {
    title: 'Ganga Aarti',
    description: 'Evening prayer ceremony performed on the banks of the Ganges River.',
    region: 'Uttar Pradesh',
    category: 'Religious',
    practices: ['Oil lamps offering', 'Chanting mantras', 'Flower offerings'],
    significance: 'Honoring the sacred Ganges River and seeking blessings',
    images: ['https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop']
  },
  {
    title: 'Raksha Bandhan',
    description: 'A festival celebrating the bond between brothers and sisters.',
    region: 'Pan-India',
    category: 'Social',
    practices: ['Tying rakhi', 'Sister\'s prayer', 'Brother\'s gift', 'Sweets exchange'],
    significance: 'Strengthens the bond of protection and love between siblings',
    images: ['https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&h=600&fit=crop']
  },
  {
    title: 'Karva Chauth',
    description: 'A festival where married women fast for the longevity of their husbands.',
    region: 'North India',
    category: 'Religious',
    practices: ['Fasting', 'Moon sighting', 'Prayers', 'Breaking fast together'],
    significance: 'Expresses love and dedication between married couples',
    images: ['https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&h=600&fit=crop']
  }
];

const sampleRecipes = [
  {
    name: 'Biryani',
    description: 'A fragrant rice dish cooked with meat, spices, and aromatic basmati rice.',
    cuisine: 'Mughlai',
    region: 'Hyderabad',
    ingredients: [
      { name: 'Basmati rice', quantity: '2', unit: 'cups' },
      { name: 'Chicken', quantity: '500', unit: 'grams' },
      { name: 'Onions', quantity: '3', unit: 'large' },
      { name: 'Yogurt', quantity: '1', unit: 'cup' },
      { name: 'Garam masala', quantity: '2', unit: 'tablespoons' }
    ],
    instructions: [
      'Marinate chicken with yogurt and spices',
      'Fry onions until golden brown',
      'Layer rice and chicken in a heavy-bottomed pot',
      'Cook on dum (steam) for 30 minutes',
      'Serve hot with raita'
    ],
    prepTime: '30 minutes',
    cookTime: '45 minutes',
    servings: 4,
    difficulty: 'Medium',
    images: ['https://images.unsplash.com/photo-1563379091339-03246963d4d0?w=800&h=600&fit=crop'],
    tags: ['Non-vegetarian', 'Spicy', 'Festival'],
    occasion: 'Festival'
  },
  {
    name: 'Masala Dosa',
    description: 'A crispy crepe filled with spiced potato mixture, served with coconut chutney.',
    cuisine: 'South Indian',
    region: 'Karnataka',
    ingredients: [
      { name: 'Rice flour', quantity: '2', unit: 'cups' },
      { name: 'Urad dal', quantity: '1', unit: 'cup' },
      { name: 'Potatoes', quantity: '4', unit: 'medium' },
      { name: 'Onions', quantity: '2', unit: 'medium' },
      { name: 'Curry leaves', quantity: '10', unit: 'leaves' }
    ],
    instructions: [
      'Soak rice and dal overnight',
      'Grind to make smooth batter',
      'Ferment for 8-10 hours',
      'Make thin crepes on hot griddle',
      'Fill with spiced potato mixture'
    ],
    prepTime: '15 minutes',
    cookTime: '20 minutes',
    servings: 6,
    difficulty: 'Hard',
    images: ['https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop'],
    tags: ['Vegetarian', 'Breakfast', 'Street Food'],
    occasion: 'Daily'
  },
  {
    name: 'Butter Chicken',
    description: 'Creamy tomato-based curry with tender chicken pieces, a North Indian favorite.',
    cuisine: 'North Indian',
    region: 'Delhi',
    ingredients: [
      { name: 'Chicken', quantity: '500', unit: 'grams' },
      { name: 'Tomatoes', quantity: '4', unit: 'large' },
      { name: 'Butter', quantity: '3', unit: 'tablespoons' },
      { name: 'Cream', quantity: '1/2', unit: 'cup' },
      { name: 'Garam masala', quantity: '1', unit: 'tablespoon' }
    ],
    instructions: [
      'Marinate chicken in yogurt and spices',
      'Grill or pan-fry chicken pieces',
      'Make tomato-based gravy',
      'Add cream and butter',
      'Simmer with chicken until tender'
    ],
    prepTime: '20 minutes',
    cookTime: '40 minutes',
    servings: 4,
    difficulty: 'Medium',
    images: ['https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&h=600&fit=crop'],
    tags: ['Non-vegetarian', 'Rich', 'Restaurant'],
    occasion: 'Special'
  },
  {
    name: 'Samosas',
    description: 'Crispy fried pastries filled with spiced potatoes and peas, served with chutney.',
    cuisine: 'North Indian',
    region: 'Pan-India',
    ingredients: [
      { name: 'All-purpose flour', quantity: '2', unit: 'cups' },
      { name: 'Potatoes', quantity: '4', unit: 'medium' },
      { name: 'Peas', quantity: '1/2', unit: 'cup' },
      { name: 'Garam masala', quantity: '1', unit: 'teaspoon' },
      { name: 'Oil', quantity: 'For frying', unit: '' }
    ],
    instructions: [
      'Make dough with flour and oil',
      'Boil and mash potatoes',
      'Mix with spices and peas',
      'Fill and seal samosas',
      'Deep fry until golden'
    ],
    prepTime: '30 minutes',
    cookTime: '20 minutes',
    servings: '12 pieces',
    difficulty: 'Easy',
    images: ['https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop'],
    tags: ['Vegetarian', 'Snack', 'Street Food'],
    occasion: 'Daily'
  },
  {
    name: 'Paneer Tikka',
    description: 'Marinated and grilled cottage cheese cubes with vegetables, a vegetarian delight.',
    cuisine: 'North Indian',
    region: 'Punjab',
    ingredients: [
      { name: 'Paneer', quantity: '250', unit: 'grams' },
      { name: 'Bell peppers', quantity: '2', unit: 'medium' },
      { name: 'Yogurt', quantity: '1/2', unit: 'cup' },
      { name: 'Garam masala', quantity: '1', unit: 'tablespoon' },
      { name: 'Lemon juice', quantity: '2', unit: 'tablespoons' }
    ],
    instructions: [
      'Cut paneer and vegetables into cubes',
      'Marinate in spiced yogurt',
      'Skewer paneer and vegetables',
      'Grill or bake until charred',
      'Serve with mint chutney'
    ],
    prepTime: '15 minutes',
    cookTime: '20 minutes',
    servings: 4,
    difficulty: 'Easy',
    images: ['https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&h=600&fit=crop'],
    tags: ['Vegetarian', 'Grilled', 'Appetizer'],
    occasion: 'Special'
  },
  {
    name: 'Gulab Jamun',
    description: 'Sweet, soft milk-based dumplings soaked in sugar syrup, a classic Indian dessert.',
    cuisine: 'North Indian',
    region: 'Pan-India',
    ingredients: [
      { name: 'Milk powder', quantity: '1', unit: 'cup' },
      { name: 'All-purpose flour', quantity: '1/4', unit: 'cup' },
      { name: 'Sugar', quantity: '1', unit: 'cup' },
      { name: 'Cardamom', quantity: '3', unit: 'pods' },
      { name: 'Ghee', quantity: '2', unit: 'tablespoons' }
    ],
    instructions: [
      'Make dough with milk powder and flour',
      'Shape into small balls',
      'Deep fry until golden brown',
      'Make sugar syrup with cardamom',
      'Soak fried balls in warm syrup'
    ],
    prepTime: '20 minutes',
    cookTime: '30 minutes',
    servings: '15 pieces',
    difficulty: 'Medium',
    images: ['https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&h=600&fit=crop'],
    tags: ['Vegetarian', 'Dessert', 'Sweet'],
    occasion: 'Festival'
  }
];

const sampleCulture = [
  {
    title: 'Bharatanatyam',
    category: 'Dance',
    description: 'One of the oldest classical dance forms of India, originating from Tamil Nadu.',
    region: 'Tamil Nadu',
    historicalPeriod: 'Ancient (2000+ years)',
    significance: 'Sacred dance form dedicated to Hindu deities, expressing spiritual themes',
    notableFigures: ['Rukmini Devi Arundale', 'Balasaraswati', 'Padma Subrahmanyam'],
    examples: ['Alarippu', 'Jatiswaram', 'Varnam', 'Padam', 'Tillana'],
    images: ['https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop'],
    relatedFestivals: ['Natyanjali', 'Margazhi Festival']
  },
  {
    title: 'Carnatic Music',
    category: 'Music',
    description: 'Classical music tradition of South India, known for its complex rhythmic patterns.',
    region: 'South India',
    historicalPeriod: 'Medieval (1000+ years)',
    significance: 'Spiritual and devotional music tradition with deep philosophical roots',
    notableFigures: ['Tyagaraja', 'Muthuswami Dikshitar', 'Syama Sastri'],
    examples: ['Kriti', 'Ragam Tanam Pallavi', 'Varnam', 'Tillana'],
    images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop'],
    relatedFestivals: ['Tyagaraja Aradhana', 'Cleveland Thyagaraja Festival']
  },
  {
    title: 'Taj Mahal',
    category: 'Architecture',
    description: 'Iconic white marble mausoleum, considered one of the Seven Wonders of the World.',
    region: 'Uttar Pradesh',
    historicalPeriod: 'Mughal Era (1632-1653)',
    significance: 'Symbol of eternal love and architectural perfection',
    notableFigures: ['Shah Jahan', 'Mumtaz Mahal', 'Ustad Ahmad Lahauri'],
    examples: ['Main dome', 'Minarets', 'Gardens', 'Reflecting pool'],
    images: ['https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop'],
    relatedFestivals: ['Mughal Heritage Festival']
  },
  {
    title: 'Kathakali',
    category: 'Dance',
    description: 'Classical dance-drama from Kerala, known for elaborate costumes and facial expressions.',
    region: 'Kerala',
    historicalPeriod: '17th Century',
    significance: 'Narrative art form combining dance, music, and acting',
    notableFigures: ['Kalamandalam Krishnan Nair', 'Guru Gopinath', 'Kalamandalam Ramankutty Nair'],
    examples: ['Vellathadi', 'Kathi', 'Minukku', 'Thadi'],
    images: ['https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop'],
    relatedFestivals: ['Onam', 'Kerala Tourism Festival']
  },
  {
    title: 'Hindustani Classical Music',
    category: 'Music',
    description: 'Classical music tradition of North India, emphasizing raga and tala.',
    region: 'North India',
    historicalPeriod: 'Medieval (1000+ years)',
    significance: 'Spiritual and meditative music tradition with Persian influences',
    notableFigures: ['Tansen', 'Ustad Bade Ghulam Ali Khan', 'Pandit Ravi Shankar'],
    examples: ['Dhrupad', 'Khayal', 'Thumri', 'Ghazal'],
    images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop'],
    relatedFestivals: ['Saptak Music Festival', 'Sawai Gandharva Festival']
  },
  {
    title: 'Red Fort',
    category: 'Architecture',
    description: 'Historic fort in Delhi, a symbol of Mughal power and Indian independence.',
    region: 'Delhi',
    historicalPeriod: 'Mughal Era (1639-1648)',
    significance: 'UNESCO World Heritage Site and symbol of India\'s independence',
    notableFigures: ['Shah Jahan', 'Bahadur Shah Zafar'],
    examples: ['Diwan-i-Aam', 'Diwan-i-Khas', 'Moti Masjid', 'Lahori Gate'],
    images: ['https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop'],
    relatedFestivals: ['Independence Day', 'Republic Day']
  },
  {
    title: 'Meenakshi Temple',
    category: 'Architecture',
    description: 'Historic Hindu temple in Madurai, known for its towering gopurams and intricate carvings.',
    region: 'Tamil Nadu',
    historicalPeriod: 'Ancient (2000+ years, rebuilt 16th-17th century)',
    significance: 'One of the most sacred temples in South India',
    notableFigures: ['Thirumalai Nayakkar', 'Vishwanatha Nayak'],
    examples: ['Gopurams', 'Hall of Thousand Pillars', 'Golden Lotus Pond'],
    images: ['https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop'],
    relatedFestivals: ['Meenakshi Tirukalyanam', 'Chithirai Festival']
  }
];

// Connect to MongoDB and seed data
async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/indian-culture');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Festival.deleteMany({});
    await Tradition.deleteMany({});
    await Recipe.deleteMany({});
    await Culture.deleteMany({});

    // Insert sample data
    await Festival.insertMany(sampleFestivals);
    await Tradition.insertMany(sampleTraditions);
    await Recipe.insertMany(sampleRecipes);
    await Culture.insertMany(sampleCulture);

    console.log('Database seeded successfully!');
    console.log(`Added ${sampleFestivals.length} festivals`);
    console.log(`Added ${sampleTraditions.length} traditions`);
    console.log(`Added ${sampleRecipes.length} recipes`);
    console.log(`Added ${sampleCulture.length} culture items`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seeding function
seedDatabase();
