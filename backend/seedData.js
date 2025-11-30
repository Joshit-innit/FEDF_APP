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
    description: 'The Festival of Lights, celebrating the victory of light over darkness, good over evil, and knowledge over ignorance. It is one of the most popular festivals of Hinduism.',
    date: 'October/November (Kartik Amavasya)',
    significance: 'Commemorates the return of Lord Rama to Ayodhya after 14 years of exile and his victory over Ravana. Also honors Goddess Lakshmi.',
    traditions: ['Lighting oil lamps (diyas)', 'Creating colorful Rangoli', 'Bursting fireworks', 'Lakshmi Puja', 'Exchanging gifts and sweets'],
    foods: ['Gulab Jamun', 'Kaju Katli', 'Soan Papdi', 'Chakli', 'Besan Ladoo'],
    images: ['https://images.stockcake.com/public/0/4/9/049d73e7-bd4c-4527-94e6-658e017f8d3b_large/diwali-celebration-sparkle-stockcake.jpg'],
    region: 'Pan-India',
    category: 'Religious'
  },
  {
    name: 'Holi',
    description: 'The vibrant Festival of Colors, celebrating the arrival of spring, the end of winter, and the blossoming of love. It is a festive day to meet others, play and laugh, forget and forgive.',
    date: 'March (Phalguna Purnima)',
    significance: 'Celebrates the divine love of Radha and Krishna, and the victory of Vishnu as Narasimha Narayana over Hiranyakashipu.',
    traditions: ['Holika Dahan (Bonfire)', 'Playing with colored powders (Gulal) and water', 'Drinking Thandai', 'Singing and dancing to folk songs'],
    foods: ['Gujiya', 'Thandai', 'Malpua', 'Dahi Vada', 'Puran Poli'],
    images: ['https://images.unsplash.com/photo-1603228254119-e6a4d095dc59?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9saSUyMGZlc3RpdmFsfGVufDB8fDB8fHww'],
    region: 'Pan-India',
    category: 'Religious'
  },
  {
    name: 'Pongal',
    description: 'A multi-day harvest festival celebrated by the Tamil community. It is dedicated to the Sun God, Surya, and corresponds to Makar Sankranti.',
    date: 'January 14-17 (Thai month)',
    significance: 'Thanksgiving to the Sun God and nature for a bountiful harvest. Marks the start of the sun\'s six-month-long journey northwards (Uttarayana).',
    traditions: ['Boiling the first rice of the season', 'Drawing Kolam', 'Jallikattu (Bull taming)', 'Worshipping cattle (Mattu Pongal)'],
    foods: ['Sakkarai Pongal (Sweet)', 'Ven Pongal (Savory)', 'Vadai', 'Payasam'],
    images: ['https://utsav.gov.in/public/uploads/event_picture_image/event_501/1658216725936124468.jpg'],
    region: 'Tamil Nadu',
    category: 'Harvest'
  },
  {
    name: 'Durga Puja',
    description: 'A major festival, particularly in West Bengal, celebrating the victory of Goddess Durga over the buffalo demon Mahishasura.',
    date: 'September/October (Ashvin Shukla Paksha)',
    significance: 'Epitomizes the victory of good over evil and the power of female shakti.',
    traditions: ['Pandal hopping', 'Dhunuchi dance', 'Pushpanjali', 'Sindoor Khela', 'Immersion of idols (Visarjan)'],
    foods: ['Khichuri Bhog', 'Labra', 'Luchi', 'Mishti Doi', 'Rasgulla'],
    images: ['https://servdharm.com/cdn/shop/articles/durga-puja-celebrations-story_900x.jpg?v=1657454594'],
    region: 'West Bengal',
    category: 'Religious'
  },
  {
    name: 'Onam',
    description: 'The official state festival of Kerala, a harvest festival that celebrates the return of the mythical King Mahabali.',
    date: 'August/September (Chingam)',
    significance: 'Remembers the golden rule of King Mahabali and celebrates the harvest.',
    traditions: ['Pookalam (Flower carpets)', 'Vallam Kali (Snake Boat Race)', 'Pulikali (Tiger dance)', 'Onam Sadya (Grand feast)'],
    foods: ['Onam Sadya (26+ dishes served on banana leaf)', 'Palada Pradhaman', 'Avial', 'Sambar'],
    images: ['https://twocircles.net/wp-content/uploads/2019/09/Snake-Boat-Race-in-Kerala.jpg'],
    region: 'Kerala',
    category: 'Harvest'
  },
  {
    name: 'Ganesh Chaturthi',
    description: 'A ten-day festival celebrating the birth of the elephant-headed deity Ganesha, the god of prosperity and wisdom.',
    date: 'August/September (Bhadrapada)',
    significance: 'Invoking Lord Ganesha to remove obstacles and bring good fortune.',
    traditions: ['Installation of Ganesha idols', 'Daily prayers and Aarti', 'Public processions', 'Immersion of idols in water'],
    foods: ['Modak (Steamed dumplings)', 'Puran Poli', 'Karanji', 'Ladoo'],
    images: ['https://cdn.abhibus.com/2024/09/Ganesh-Chaturthi-2024.jpg'],
    region: 'Maharashtra',
    category: 'Religious'
  },
  {
    name: 'Eid al-Fitr',
    description: 'The "Festival of Breaking the Fast", marking the end of Ramadan, the Islamic holy month of fasting.',
    date: 'Varies (Shawwal)',
    significance: 'Spiritual reflection, charity, and celebration of the completion of a month of fasting.',
    traditions: ['Special prayers (Salat al-Eid)', 'Zakat al-Fitr (Charity)', 'Wearing new clothes', 'Visiting family and friends'],
    foods: ['Sheer Khurma', 'Biryani', 'Sewaiyan', 'Kebabs'],
    images: ['https://akm-img-a-in.tosshub.com/indiatoday/images/photogallery/202205/Eid__3__IT_1651557763684.JPG?VersionId=r8_HYS98kv.jPvGh6Oj3R6lrPDNSP211&size=686:*'],
    region: 'Pan-India',
    category: 'Religious'
  },
  {
    name: 'Baisakhi',
    description: 'A harvest festival for the Punjab region and the Sikh New Year. It also commemorates the formation of the Khalsa Panth.',
    date: 'April 13 or 14',
    significance: 'Celebrates the harvest and the founding of the Khalsa by Guru Gobind Singh in 1699.',
    traditions: ['Bhangra and Gidda dance', 'Nagar Kirtan processions', 'Visiting Gurdwaras', 'Community lunches (Langar)'],
    foods: ['Sarson da Saag', 'Makki di Roti', 'Lassi', 'Kada Prasad'],
    images: ['https://www.tripsavvy.com/thmb/wBubIr27BAnk4E-qsJ2mCyrg5BY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-90850883-576103365f9b58f22e7dfa14.jpg'],
    region: 'Punjab',
    category: 'Harvest'
  }
];

const sampleTraditions = [
  {
    title: 'Namaste',
    description: 'A customary greeting where palms are pressed together near the heart, often accompanied by a slight bow.',
    region: 'Pan-India',
    category: 'Social',
    practices: ['Folding hands', 'Bowing head slightly', 'Saying "Namaste" or "Namaskar"'],
    significance: 'Means "I bow to the divine in you". It represents respect, humility, and spiritual connection.',
    images: ['https://i.pinimg.com/474x/51/ec/ce/51ecceeaa1d6dcf30412a4a6ce8098e7.jpg']
  },
  {
    title: 'Yoga & Meditation',
    description: 'Ancient physical, mental, and spiritual practices that originated in India.',
    region: 'Pan-India',
    category: 'Spiritual',
    practices: ['Asanas (Postures)', 'Pranayama (Breathing)', 'Dhyana (Meditation)', 'Surya Namaskar'],
    significance: 'Aims to control the body and mind, leading to self-realization and inner peace.',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYBZbycu-HxE8THKG-eJWLM-oRYqnjx4MBRQ&s']
  },
  {
    title: 'Mehendi (Henna)',
    description: 'The art of applying intricate designs on hands and feet using a paste made from powdered dried henna leaves.',
    region: 'Pan-India',
    category: 'Wedding',
    practices: ['Applying henna paste', 'Singing folk songs', 'Hidden name game'],
    significance: 'Symbolizes joy, beauty, spiritual awakening, and offering. Darker stain is often said to indicate deep love.',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4UxWeSpYpFSok0iN5ly9FxgC4K6O-uB8mEg&s']
  },
  {
    title: 'Aarti',
    description: 'A Hindu religious ritual of worship, a part of puja, in which light (from wicks soaked in ghee or camphor) is offered to one or more deities.',
    region: 'Pan-India',
    category: 'Religious',
    practices: ['Circling the lamp', 'Singing hymns', 'Ringing bells', 'Blowing conch shells'],
    significance: 'Symbolizes the removal of darkness (ignorance) and the triumph of light (knowledge/divinity).',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ig0MqC-WUbGgCCBw83RRNHBl0KzXNWyNcw&s']
  },
  {
    title: 'Touching Feet (Charan Sparsh)',
    description: 'A tradition of showing respect to elders by touching their feet.',
    region: 'Pan-India',
    category: 'Social',
    practices: ['Bending down', 'Touching feet with hands', 'Elder blessing the younger'],
    significance: 'Acknowledges the wisdom and experience of elders and seeks their blessings for a prosperous life.',
    images: ['https://c8.alamy.com/comp/W468X6/boy-and-girl-touching-feet-of-his-parents-W468X6.jpg']
  },
  {
    title: 'Saree Draping',
    description: 'The traditional garment worn by women in India, a long piece of cloth draped elegantly around the body.',
    region: 'Pan-India',
    category: 'Clothing',
    practices: ['Nivi drape (Andhra)', 'Bengali drape', 'Nauvari (Maharashtra)', 'Mekhela Sador (Assam)'],
    significance: 'Represents grace, tradition, and cultural identity. Different drapes signify different regions.',
    images: ['https://cdn.shopaccino.com/antarang/articles/blog2-82347594915296_l.jpg?v=627']
  }
];

const sampleRecipes = [
  {
    name: 'Hyderabadi Chicken Biryani',
    description: 'A world-famous rice dish from the royal kitchens of the Nizams. Aromatic basmati rice and tender chicken are cooked together on "dum" (slow steam) with exotic spices.',
    cuisine: 'Mughlai',
    region: 'Hyderabad',
    ingredients: [
      { name: 'Basmati rice', quantity: '2', unit: 'cups' },
      { name: 'Chicken', quantity: '500', unit: 'grams' },
      { name: 'Fried Onions (Birista)', quantity: '1', unit: 'cup' },
      { name: 'Yogurt', quantity: '1', unit: 'cup' },
      { name: 'Saffron milk', quantity: '2', unit: 'tbsp' },
      { name: 'Mint & Coriander', quantity: '1', unit: 'cup' },
      { name: 'Shahi Jeera', quantity: '1', unit: 'tsp' }
    ],
    instructions: [
      'Marinate chicken with yogurt, ginger-garlic paste, spices, and fried onions for 2 hours.',
      'Par-boil soaked basmati rice with whole spices until 70% cooked.',
      'Layer the marinated chicken at the bottom of a heavy pot.',
      'Layer the rice over the chicken. Sprinkle saffron milk, ghee, and herbs.',
      'Seal the pot with dough and cook on low heat (Dum) for 45 minutes.',
      'Let it rest for 10 minutes before serving gently.'
    ],
    prepTime: '30 mins',
    cookTime: '50 mins',
    servings: 4,
    difficulty: 'Hard',
    images: ['https://images.unsplash.com/photo-1633945274405-b6c8069047b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    tags: ['Non-vegetarian', 'Royal', 'Spicy'],
    occasion: 'Special'
  },
  {
    name: 'Masala Dosa',
    description: 'A crispy, golden fermented crepe made from rice and lentil batter, filled with a spiced potato mash. A staple South Indian breakfast.',
    cuisine: 'South Indian',
    region: 'Karnataka',
    ingredients: [
      { name: 'Dosa Rice', quantity: '3', unit: 'cups' },
      { name: 'Urad Dal', quantity: '1', unit: 'cup' },
      { name: 'Potatoes', quantity: '4', unit: 'medium' },
      { name: 'Onions', quantity: '2', unit: 'medium' },
      { name: 'Mustard seeds', quantity: '1', unit: 'tsp' },
      { name: 'Turmeric', quantity: '1/2', unit: 'tsp' }
    ],
    instructions: [
      'Soak rice and dal separately for 6 hours. Grind to a smooth batter and ferment overnight.',
      'Boil and mash potatoes. Sauté with onions, mustard seeds, curry leaves, and turmeric.',
      'Heat a griddle (tawa). Pour a ladle of batter and spread thin.',
      'Drizzle oil/ghee. Cook until golden and crispy.',
      'Place potato filling inside and fold. Serve with coconut chutney and sambar.'
    ],
    prepTime: '12 hours',
    cookTime: '20 mins',
    servings: 6,
    difficulty: 'Medium',
    images: [
      'https://www.indianhealthyrecipes.com/wp-content/uploads/2017/08/masala-dosa-recipe.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5m_cS8nr7kQqpkYwXTr7WcTg2altRaVImkg&s'
    ],
    tags: ['Vegetarian', 'Breakfast', 'Gluten-Free'],
    occasion: 'Daily'
  },
  {
    name: 'Butter Chicken (Murgh Makhani)',
    description: 'Tandoori chicken pieces simmered in a rich, creamy, and buttery tomato gravy. A global ambassador of Indian cuisine.',
    cuisine: 'North Indian',
    region: 'Delhi',
    ingredients: [
      { name: 'Chicken thigh', quantity: '500', unit: 'grams' },
      { name: 'Tomatoes', quantity: '5', unit: 'large' },
      { name: 'Butter', quantity: '50', unit: 'grams' },
      { name: 'Fresh Cream', quantity: '1/2', unit: 'cup' },
      { name: 'Kasuri Methi', quantity: '1', unit: 'tbsp' },
      { name: 'Cashew paste', quantity: '2', unit: 'tbsp' }
    ],
    instructions: [
      'Marinate chicken with yogurt and tandoori masala. Grill or pan-fry.',
      'Cook tomatoes with spices until soft. Blend to a smooth puree.',
      'Heat butter, add ginger-garlic paste and the tomato puree. Cook well.',
      'Add cashew paste, sugar, and salt. Simmer.',
      'Add chicken pieces and fresh cream. Finish with crushed Kasuri Methi.'
    ],
    prepTime: '20 mins',
    cookTime: '40 mins',
    servings: 4,
    difficulty: 'Medium',
    images: ['https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    tags: ['Non-vegetarian', 'Rich', 'Creamy'],
    occasion: 'Dinner'
  },
  {
    name: 'Palak Paneer',
    description: 'Soft cottage cheese cubes in a smooth, nutritious green spinach gravy seasoned with garlic and spices.',
    cuisine: 'North Indian',
    region: 'Punjab',
    ingredients: [
      { name: 'Spinach', quantity: '500', unit: 'grams' },
      { name: 'Paneer', quantity: '250', unit: 'grams' },
      { name: 'Garlic', quantity: '5', unit: 'cloves' },
      { name: 'Green chilies', quantity: '2', unit: '' },
      { name: 'Cream', quantity: '2', unit: 'tbsp' }
    ],
    instructions: [
      'Blanch spinach in boiling water for 2 mins, then plunge in ice water.',
      'Blend spinach with green chilies to a smooth paste.',
      'Sauté cumin and chopped garlic in ghee.',
      'Add spinach puree and spices. Cook for 5 mins.',
      'Add paneer cubes and simmer. Finish with a swirl of cream.'
    ],
    prepTime: '15 mins',
    cookTime: '20 mins',
    servings: 3,
    difficulty: 'Easy',
    images: ['https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    tags: ['Vegetarian', 'Healthy', 'Green'],
    occasion: 'Lunch'
  },
  {
    name: 'Vada Pav',
    description: 'The "Indian Burger" - a spicy potato fritter sandwiched in a soft bun with chutneys. The heartbeat of Mumbai street food.',
    cuisine: 'Street Food',
    region: 'Maharashtra',
    ingredients: [
      { name: 'Potatoes', quantity: '4', unit: 'boiled' },
      { name: 'Besan (Gram flour)', quantity: '1', unit: 'cup' },
      { name: 'Pav (Buns)', quantity: '6', unit: '' },
      { name: 'Green Chutney', quantity: '1/2', unit: 'cup' },
      { name: 'Garlic Chutney', quantity: '2', unit: 'tbsp' }
    ],
    instructions: [
      'Mash boiled potatoes with mustard seeds, curry leaves, garlic, and turmeric.',
      'Shape into balls. Dip in thick gram flour batter.',
      'Deep fry until golden brown.',
      'Slit the pav, spread chutneys, and place the vada inside.',
      'Serve hot with fried green chili.'
    ],
    prepTime: '20 mins',
    cookTime: '15 mins',
    servings: 6,
    difficulty: 'Easy',
    images: ['https://images.unsplash.com/photo-1603614486387-276f74e2cd58?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    tags: ['Vegetarian', 'Spicy', 'Snack'],
    occasion: 'Snack'
  },
  {
    name: 'Rasgulla',
    description: 'Spongy, white cheese balls soaked in light sugar syrup. A beloved sweet from Bengal.',
    cuisine: 'Bengali',
    region: 'West Bengal',
    ingredients: [
      { name: 'Milk', quantity: '1', unit: 'liter' },
      { name: 'Lemon juice', quantity: '2', unit: 'tbsp' },
      { name: 'Sugar', quantity: '1.5', unit: 'cups' },
      { name: 'Water', quantity: '4', unit: 'cups' },
      { name: 'Cardamom', quantity: '2', unit: 'pods' }
    ],
    instructions: [
      'Boil milk and curdle it with lemon juice to make chenna (cheese).',
      'Drain and knead the chenna until smooth and oily.',
      'Shape into small crack-free balls.',
      'Boil sugar and water to make a thin syrup.',
      'Cook the balls in boiling syrup for 15 mins covered. They will double in size.'
    ],
    prepTime: '30 mins',
    cookTime: '20 mins',
    servings: 12,
    difficulty: 'Medium',
    images: ['https://images.unsplash.com/photo-1596386461350-326256f8e269?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    tags: ['Vegetarian', 'Dessert', 'Sweet'],
    occasion: 'Festival'
  }
];

const sampleCulture = [
  {
    title: 'Bharatanatyam',
    category: 'Dance',
    description: 'A classical dance form from Tamil Nadu, known for its fixed upper torso, bent legs, and spectacular footwork. It expresses Hindu religious themes and spiritual ideas.',
    region: 'Tamil Nadu',
    historicalPeriod: 'Ancient (2000+ years)',
    significance: 'A fire dance that manifests the element of fire in the human body. It is a spiritual discipline.',
    notableFigures: ['Rukmini Devi Arundale', 'Padma Subrahmanyam', 'Alarmel Valli'],
    examples: ['Alarippu', 'Varnam', 'Tillana'],
    images: ['https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    relatedFestivals: ['Natyanjali', 'Chidambaram Dance Festival']
  },
  {
    title: 'Taj Mahal',
    category: 'Architecture',
    description: 'An ivory-white marble mausoleum on the right bank of the river Yamuna in Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan.',
    region: 'Uttar Pradesh',
    historicalPeriod: 'Mughal Era (1632-1653)',
    significance: 'A symbol of eternal love, a UNESCO World Heritage Site, and one of the New Seven Wonders of the World.',
    notableFigures: ['Shah Jahan', 'Mumtaz Mahal', 'Ustad Ahmad Lahauri (Architect)'],
    examples: ['The Main Dome', 'The Charbagh Gardens', 'The Pietra Dura Inlay Work'],
    images: ['https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    relatedFestivals: ['Taj Mahotsav']
  },
  {
    title: 'Hindustani Classical Music',
    category: 'Music',
    description: 'The traditional classical music of North India. It emphasizes improvisation and exploring all aspects of a raga.',
    region: 'North India',
    historicalPeriod: 'Vedic origins, developed 12th century onwards',
    significance: 'Focuses on the moral and spiritual well-being of the listener. It is based on Raga (melodic framework) and Tala (rhythm).',
    notableFigures: ['Tansen', 'Pandit Ravi Shankar', 'Ustad Zakir Hussain', 'Bhimsen Joshi'],
    examples: ['Dhrupad', 'Khayal', 'Thumri', 'Dadra'],
    images: ['https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    relatedFestivals: ['Sawai Gandharva Bhimsen Festival', 'Dover Lane Music Conference']
  },
  {
    title: 'Kathakali',
    category: 'Dance',
    description: 'A major form of classical Indian dance from Kerala. It is a "story play" genre of art, distinguished by the elaborately colorful make-up and costumes.',
    region: 'Kerala',
    historicalPeriod: '17th Century',
    significance: 'Combines dance, music, acting, and storytelling to enact episodes from the epics like Mahabharata and Ramayana.',
    notableFigures: ['Kalamandalam Gopi', 'Kottakkal Sivaraman'],
    examples: ['Pacha (Green - Hero)', 'Kathi (Knife - Villain)', 'Thadi (Beard)'],
    images: ['https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    relatedFestivals: ['Onam', 'Temple Festivals of Kerala']
  },
  {
    title: 'Madhubani Art',
    category: 'Art',
    description: 'A style of painting practiced in the Mithila region of India and Nepal. It is done with fingers, twigs, brushes, nib-pens, and matchsticks, using natural dyes.',
    region: 'Bihar',
    historicalPeriod: 'Ancient',
    significance: 'Traditionally done by women on freshly plastered mud walls of their homes. Depicts nature and mythology.',
    notableFigures: ['Sita Devi', 'Ganga Devi'],
    examples: ['Kohbar', 'Religious scenes', 'Nature scenes'],
    images: ['https://images.unsplash.com/photo-1562619371-b67725b6fde2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    relatedFestivals: ['Vivah Panchami', 'Holi']
  },
  {
    title: 'Warli Painting',
    category: 'Art',
    description: 'A style of tribal art mostly created by tribal people from the North Sahyadri Range in Maharashtra.',
    region: 'Maharashtra',
    historicalPeriod: 'Origins 10th Century AD',
    significance: 'Uses geometric shapes like circle, triangle, and square to depict daily social life rather than mythological characters.',
    notableFigures: ['Jivya Soma Mashe'],
    examples: ['Tarpa Dance', 'Harvest scenes', 'Wedding rituals'],
    images: ['https://images.unsplash.com/photo-1628602236238-59c87677695e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    relatedFestivals: ['Harvest Season', 'Weddings']
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
