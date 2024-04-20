const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {Schema} = require("mongoose");
const app = express();
const port = 3001;

// Middleware to parse JSON data
app.use(express.json());

// Define CORS options to allow requests only from port 3000
const corsOptions = {
    origin: 'http://localhost:3000',
};

// Enable CORS with specified options
app.use(cors(corsOptions));


// For some reason mongoose is working only with the 0.0.0.0
mongoose.connect('mongodb://0.0.0.0:27017/ecommerceDB')
    .then(r => console.log(r, 'Connected to DB....'))
    .catch(error => console.log("Unable to connect to DB....", error));



const userSchema = new Schema({
    address: {
        geolocation: {
            lat: String,
            long: String
        },
        city: String,
        street: String,
        number: Number,
        zipcode: String
    },
    id: Number,
    email: String,
    username: String,
    password: String,
    name: {
        firstname: String,
        lastname: String
    },
    phone: String,
    __v: Number
});

// Define the schema for the product
const productSchema = new Schema({
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    rating: {
        rate: Number,
        count: Number
    }
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const { ObjectId } = require('mongodb'); // Import ObjectID from MongoDB


app.get('/api/products/', async (req, res) => {
    try {
        console.log('Inside try block');
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.log("Unable to fetch products data from the DB....");
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(500).json();
    }
});

// POST API endpoint to create a new product
app.post('/api/product', async (req, res) => {
    try {
        const product = new Product(req.body);
        const result = await product.save();
        res.status(201).send(result);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).send('Error inserting the new product record.');
    }
});

// POST API endpoint to create a new user
app.post('/api/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        res.status(201).send(result);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error inserting the new user record.');
    }
});

app.delete('/api/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        if (!ObjectId.isValid(productId)) {
            return res.status(400).send('Invalid product ID');
        }
        const deletedProduct =
            await Product.findByIdAndDelete(productId);
        if(!deletedProduct) {
            return res.status(404).send('Product not found');
        }
        res.status(200).send('Product deleted successfully');
    } catch(error) {
        console.log("ERROR in deleting record: ", error);
        res.status(500).send('ERROR in deleting record.');
    }
})

app.delete('/api/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        if (!ObjectId.isValid(userId)) {
            return res.status(400).send('Invalid user ID');
        }
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.log("ERROR in deleting record: ", error);
        res.status(500).send('ERROR in deleting record.');
    }
});

app.delete('/api/user', async (req, res) => {
    try {
        const userIds = req.body.selectedIndexes; // Expect an array of user IDs in the request body
        const deletedUserIds = [];

        for (const userId of userIds) {
            // Find and delete the user with the given ID
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                console.log(`Failed to delete user with ID ${userId}`);
                continue; // Skip to the next user ID if deletion fails
            }
            deletedUserIds.push(deletedUser._id);
        }

        res.status(200).json({ deletedUserIds, message: 'Data deleted successfully' });
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ error: 'Error deleting data' });
    }
});


app.delete('/api/product', async (req, res) => {
    try {
        const productIds = req.body.selectedIndexes; // Expect an array of user IDs in the request body
        const deletedProductIds = [];

        for (const productId of productIds) {
            // Find and delete the product with the given ID
            const deletedProduct = await Product.findByIdAndDelete(productId);
            if (!deletedProduct) {
                console.log(`Failed to delete product with ID ${productId}`);
                continue; // Skip to the next product ID if deletion fails
            }
            deletedProductIds.push(deletedProduct._id);
        }

        res.status(200).json({ deletedProductIds, message: 'Data deleted successfully' });
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ error: 'Error deleting data' });
    }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
