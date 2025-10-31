# Indian Culture Hub - MERN Stack Application

A comprehensive web application showcasing the rich cultural heritage of India, including festivals, traditions, recipes, and cultural artifacts.

## Features

- **Festivals**: Explore Indian festivals with details about significance, traditions, and foods
- **Traditions**: Learn about ancient customs and rituals from different regions
- **Recipes**: Discover authentic Indian cuisine with detailed cooking instructions
- **Culture**: Immerse yourself in Indian art, music, dance, and architecture

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React** - Frontend framework
- **Material-UI** - UI component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with Indian-inspired theme

## Project Structure

```
fedf-app/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── server.js        # Express server
│   ├── seedData.js      # Database seeding script
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── App.js       # Main App component
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/indian-culture
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. Start MongoDB (if running locally):
   ```bash
   mongod
   ```

5. Seed the database with sample data:
   ```bash
   node seedData.js
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```

The backend will be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be running on `http://localhost:3000`

## API Endpoints

### Festivals
- `GET /api/festivals` - Get all festivals
- `GET /api/festivals/:id` - Get festival by ID
- `POST /api/festivals` - Create new festival
- `PUT /api/festivals/:id` - Update festival
- `DELETE /api/festivals/:id` - Delete festival
- `GET /api/festivals/region/:region` - Get festivals by region
- `GET /api/festivals/category/:category` - Get festivals by category

### Traditions
- `GET /api/traditions` - Get all traditions
- `GET /api/traditions/:id` - Get tradition by ID
- `POST /api/traditions` - Create new tradition
- `PUT /api/traditions/:id` - Update tradition
- `DELETE /api/traditions/:id` - Delete tradition
- `GET /api/traditions/region/:region` - Get traditions by region
- `GET /api/traditions/category/:category` - Get traditions by category

### Recipes
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get recipe by ID
- `POST /api/recipes` - Create new recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe
- `GET /api/recipes/cuisine/:cuisine` - Get recipes by cuisine
- `GET /api/recipes/region/:region` - Get recipes by region
- `GET /api/recipes/difficulty/:difficulty` - Get recipes by difficulty

### Culture
- `GET /api/culture` - Get all culture items
- `GET /api/culture/:id` - Get culture item by ID
- `POST /api/culture` - Create new culture item
- `PUT /api/culture/:id` - Update culture item
- `DELETE /api/culture/:id` - Delete culture item
- `GET /api/culture/category/:category` - Get culture items by category
- `GET /api/culture/region/:region` - Get culture items by region

## Features Overview

### Home Page
- Welcome section with Indian-inspired design
- Feature cards for easy navigation
- Statistics display
- Responsive design

### Festivals Page
- Grid layout of festival cards
- Filter by category (Religious, Harvest, Seasonal, etc.)
- Detailed festival information
- Region and significance display

### Traditions Page
- Traditional practices and customs
- Filter by category (Wedding, Birth, Religious, etc.)
- Practices and significance information
- Regional variations

### Recipes Page
- Authentic Indian recipes
- Filter by difficulty level
- Detailed ingredients and instructions
- Cooking time and serving information

### Culture Page
- Indian art, music, dance, and architecture
- Filter by category
- Historical context and notable figures
- Related festivals and examples

## Design Features

- **Indian-inspired color scheme**: Saffron orange, green, and warm tones
- **Responsive design**: Works on desktop, tablet, and mobile
- **Material-UI components**: Modern, accessible UI components
- **Smooth animations**: Hover effects and transitions
- **Typography**: Clean, readable fonts with proper hierarchy

## Future Enhancements

- User authentication and profiles
- Favorites and bookmarking system
- User-generated content and reviews
- Advanced search and filtering
- Multi-language support
- Image upload functionality
- Social sharing features
- Mobile app development

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Indian cultural heritage and traditions
- Open source community
- Material-UI team for the excellent component library
- Unsplash for beautiful images
# FEDF_APP
