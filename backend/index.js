const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Optional: to enable CORS if needed
const connectDB = require('./src/db');
const questionRoutes = require('./src/routes/questionRoutes');
// Initialize Express app and connect to database
connectDB();
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()); // Optional: allow cross-origin requests

// Routes
app.use('/api/question', questionRoutes);

// Port configuration
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
