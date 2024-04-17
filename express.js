const express = require('express');
const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const app = express();
const port = 3000;


mongoose.connect('mongodb://localhost:27017/ecommerceDB')
    .then(r => console.log(r))
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



app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/api/products/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.log("Unable to fetch products data from the DB....");
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
