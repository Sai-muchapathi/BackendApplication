const express = require('express');
const router = express.Router();


router.post('/api/products', handleProducts);
router.post('/api/users', handleUsers);
router.get('/api/products', getAllProducts);
router.get('/api/products/:id', getProductById);

function getAllProducts(req, res) {

}
function getProductById() {

}

function handleProducts() {

}

function handleUsers() {
    console.log("I'm called");
}

