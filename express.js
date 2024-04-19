const express = require('express');
const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());


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



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
