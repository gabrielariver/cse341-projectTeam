const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();
require('./services/passport');

const app = express();

app.set('trust proxy', 1);

app.use(
  cors({
    origin: 'https://cse341-projectteam.onrender.com',
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,     
      sameSite: 'none',
    },
  })
);

// Passport init + sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
const oauthRoutes = require('./routes/oauth');
app.use('/auth', oauthRoutes);

const recipeRoutes = require('./routes/recipes');
app.use('/api/recipes', recipeRoutes);

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const categoryRoutes = require('./routes/category');
app.use('/api/category', categoryRoutes);

const favoriteRoutes = require('./routes/favorite');
app.use('/api/favorite', favoriteRoutes);

// Simple home + logged-out pages
app.get('/', (req, res) => res.send('MyRecipe API is running'));
app.get('/logged-out', (req, res) =>
  res.send('<h2>You have been logged out.</h2><a href="/auth/github">Login again</a>')
);

// Logout route 
app.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid', {
        path: '/',
        sameSite: 'none',
        secure: true,
      });
      return res.redirect('/logged-out');
    });
  });
});

// MongoDB connection
const connectDB = require('./data/db');
connectDB();

// Swagger docs
require('./swagger')(app);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export for testing
module.exports = app;
