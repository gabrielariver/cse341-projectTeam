const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();
require('./services/passport');

const app = express();
app.set('trust proxy', 1); 

app.use(cors());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    sameSite: 'none'
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
const oauthRoutes = require('./routes/oauth');
app.use('/auth', oauthRoutes);

const recipeRoutes = require('./routes/recipes');
app.use('/api/recipes', recipeRoutes);

const categoryRoutes = require('./routes/category');
app.use('/api/category', categoryRoutes);

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// Home and logout views
app.get('/', (req, res) => res.send('MyRecipe API is running'));
app.get('/logged-out', (req, res) => res.send('<h2>You have been logged out.</h2><a href="/auth/github">Login again</a>'));

// MongoDB connection
const connectDB = require('./data/db'); 
connectDB();

// Swagger documentation
require('./swagger')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
