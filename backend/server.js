// 1. Import Dependencies
const express = require('express');
const mongoose = require('mongoose'); // Import Mongoose

// 2. Create an Express App
const cors = require('cors');
// ...
const app = express();
app.use(cors()); 
const PORT = 3001;

// --- MONGODB CONNECTION ---
// Replace <username>, <password>, and <dbname> with your actual credentials
const dbURI = 'mongodb+srv://testuser:project12345@cluster0.30lvxqn.mongodb.net/aurastore?retryWrites=true&w=majority';

mongoose.connect(dbURI)
  .then((result) => {
    console.log('Connected to MongoDB');
    // Start the server only after the DB connection is successful
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));

// --- MONGOOSE SCHEMA & MODEL ---
// A Schema defines the structure of our documents in a collection
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

// A Model is a wrapper on the Schema that allows us to interact with the database
const Product = mongoose.model('Product', productSchema);


// --- API ENDPOINTS ---

// This endpoint now fetches products from the MongoDB database
app.get('/api/products', async (req, res) => {
  try {
    // Use the Product model to find all documents in the 'products' collection
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});