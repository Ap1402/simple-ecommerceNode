# Simple e-commerce Api

## General info
A simple e-commerce Api made for learning purposes, it's built with Nodejs, Express and Joi for validations.
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Endpoints](#endpoints)
    * [Users related](#user-related)
        * [Register](#register-user)
        * [Login](#login-user)
        * [Get User By Id](#get-user-by-id)
        * [Get All User](#get-all-users)
        
    * [Products related](#products-related)
        * [Create Product](#create-product)
        * [Update Product](#update-product)
        * [Get All Products](#get-all-products)
        
    * [Carts related](#carts-related)
    * [Orders related](#orders-related)
    
	
## Technologies
Project is created with:
* NodeJs
* Express 
* Joi
* Sequelize
* Mysql
	
## Setup
To run this project, install it locally using npm:

```
$ cd ../simple-ecommerceNode
$ npm install
$ npm start
```
You also need a mysql database running and configure it changing the config file that is located in "config/database.js"
```
const Sequelize = require("sequelize");
const sequelize = new Sequelize("e-commerce-nodejs", "admin", "admin", {
  host: "localhost",
  dialect: "mysql"
});
// new Sequelize("Your database name", "database user", "database password"....)
```
If you wish to use a postgres database instead, just change the dialect value to "postgres".

## Endpoints
### User Related
#### Register User
**URL** : `/users/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "name": "[name in plain text]",
    "password": "[password in plain text]",
    "username": "[username in plain text]",
    "email": "[valid email address]",


}
```

**Data example**

```json
{
    "email": "iloveauth@example.com",
    "password": "abcd1234",
    "name": "Juan Garica",
   "username": "Juan2020",


}
```

***Success Response***

**Code** : `200 OK`

**Content example**

```json
{
    "id": 1,
    "name": "Juan Garica",
    "username": "Juan2020",
    "email": "iloveauth@example.com",
}
```

***Error Response***

**Condition** : If any field is empty or it's not an alphanum value

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "errors": [
         //Response 1 
        {"message":"[field] is required"},
        //Response 2
        {"message":"[field value] must be an alphanumeric value"}
    ]
}
```
----
#### Login

**URL** : `/users/login`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "email": "[valid email address]",
    "password": "[password in plain text]"

}
```

**Data example**

```json
{
    "email": "iloveauth@example.com",
    "password": "abcd1234",
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIVy4aWapaiYbgv1ck"
}
```

## Error Response

**Condition** : If any email and password don't match or if user doesn't exists

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "errors": [
        {"message":"There's a problem with your credentials"}
    ]
}
```

----
# Create Product

**URL** : `/products/`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
    "price": "[price]",
    "name": "[name]"
    "description": "[description in plain text]"
    "image": "JPG, GIF OR PNG file"

}
```

**Data example**

```json
{
    "price": "18.09",
    "name": "Test product",
    "description": "A product made for testing purposes",
    "image": "thisIsAnImage.jpg" (Optional)
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "discountAmount": 0,
    "discountPercent": 0,
    "status": 1,
    "id": 1,
    "name": "Test product",
    "price": 18.09,
    "description": "A product made for testing purposes",
    "imageUrl": "img/thisIsAnImage.jpg",
    "vendorID": 1,
    "updatedAt": "2020-05-07T12:07:03.254Z",
    "createdAt": "2020-05-07T12:07:03.254Z"
}
```

## Error Response

**Condition** : If any required field is empty

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "errors": [
        {"message":"[field name] is required"}
    ]
}
```
