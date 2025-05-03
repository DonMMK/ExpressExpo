const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS middleware for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    return res.status(200).json({});
  }
  next();
});

// Routes
app.get('/api/config', (req, res) => {
  // Return non-sensitive config values
  res.json({
    posthogPublicKey: process.env.POSTHOG_PUBLIC_KEY,
    apiUrl: process.env.API_URL,
    environment: process.env.NODE_ENV
  });
});

// Secret API keys route (requires authentication)
app.get('/api/keys', (req, res) => {
  // This would normally validate a token in the Authorization header
  // For demo purposes, this is simplified
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // In a real implementation, verify the token against Firebase Auth
  // or other authentication service
  
  // Return keys - in production these would be fetched from AWS KMS or similar
  res.json({
    revenuecatApiKeyIos: process.env.REVENUECAT_API_KEY_IOS,
    revenuecatApiKeyAndroid: process.env.REVENUECAT_API_KEY_ANDROID
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});