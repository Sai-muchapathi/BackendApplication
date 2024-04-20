------ Install Dependencies ------
npm install mongoose axios

add cors origin to accept request from the front end application
app.use(cors(origin: 'http://localhost:3000'));

Postman example data
set body type to raw JSON and header content type to application/json if not set automatically.
I) add new product: http://localhost:3000/api/products
data:
{
"id": 100,
"title": "Fjallraven - Foldsack No. 100 Backpack, Fits 15 Laptops",
"price": 119.95,
"description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the
padded sleeve, your everyday",
"category": "men's clothing",
"image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
"rating": {
"rate": 3.9,
"count": 120
}
}
II) add new user: http://localhost:3000/api/users
data:
{
    "address": {
        "geolocation": {
            "lat": "-37.3159",
            "long": "81.1496"
        },
        "city": "kilcoole",
        "street": "new road",
        "number": 7682,
        "zipcode": "12926-3874"
    },
    "id": 1,
    "email": "john@gmail.com",
    "username": "johnd",
    "password": "m38rmF$",
    "name": {
        "firstname": "john",
        "lastname": "doe"
    },
    "phone": "1-570-236-7033",
    "__v": 0
}

------ Documentation ------
https://mongoosejs.com/docs/
