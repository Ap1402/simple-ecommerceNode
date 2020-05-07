**Simple e-commerce Api**
----

A simple e-commerce Api I made for learning purposes, it's built with Nodejs, Express and Joi for validations.

# Register

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

## Success Response

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

## Error Response

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
# Login

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
