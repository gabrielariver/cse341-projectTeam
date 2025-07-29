function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized. Please sign in with GitHub.' });
}

module.exports = ensureAuth;
