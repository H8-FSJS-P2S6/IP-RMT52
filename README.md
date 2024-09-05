# IP-RMT52

# Yugioh Card List Documentation

## Endpoints

List of available endpoints:

- POST /register
- POST /login

Routes below need authentication:

- GET /cards
- GET /cards/favorite
- GET /cards/:id
- POST /cards/favorite/add/:cardId
- PUT /cards/favorite/edit/:favoriteId
- DELETE /cards/favorite/delete/:favoriteId
- GET /archetype
- GET /randomcard
- GET /minigames

## 1. POST /register

Description:

- Register an account

Request:

- body

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": "number",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Validation error message"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 2. POST /login

Description:

- Login to Application

Request:

- body

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Validation error message"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 3. GET /cards

Description:

- Get all cards from database

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
{
  "totalCards": "number",
  "totalPages": "number",
  "currentPage": "number",
  "pageSize": "number",
  "cards": [
    {
      "id": "number",
      "name": "string",
      "type": "string",
      "frameType": "spell",
      "desc": "string",
      "atk": "number",
      "def": "number",
      "level": "number",
      "race": "string",
      "archetype": "string",
      "attribute": "string",
      "image_url": "string",
      "price": "float"
    },
    {
      "id": "number",
      "name": "string",
      "type": "string",
      "frameType": "spell",
      "desc": "string",
      "atk": "number",
      "def": "number",
      "level": "number",
      "race": "string",
      "archetype": "string",
      "attribute": "string",
      "image_url": "string",
      "price": "float"
    },
    ...
  ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 4. GET /cards/favorite

Description:

- Get all favorite cards based on user
  Request:
- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "favoriteId": "number",
    "stock": "number",
    "id": "number",
    "name": "string",
    "type": "string",
    "frameType": "spell",
    "desc": "string",
    "atk": "number",
    "def": "number",
    "level": "number",
    "race": "string",
    "archetype": "string",
    "attribute": "string",
    "image_url": "string",
    "price": "float"
  },
  ...
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 5. GET /cards/:id

Description:

- Get detail card
  Request:
- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
{
  "id": "number",
  "name": "string",
  "type": "string",
  "frameType": "spell",
  "desc": "string",
  "atk": "number",
  "def": "number",
  "level": "number",
  "race": "string",
  "archetype": "string",
  "attribute": "string",
  "image_url": "string",
  "price": "float"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "No card matching was found in the database"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 6. POST /cards/favorite/add/:cardId

Description:

- Add new favorite card

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (201 - Created)_

```json
{
  "id": "number",
  "userId": "number",
  "cardId": "number",
  "updatedAt": "string",
  "createdAt": "string",
  "stock": "number"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "No card matching was found in the database"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Can't add same card to favorites"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 7. PUT /cards/favorite/edit/:favoriteId

Description:

- Update stock favorite card

Request:

- params:

```json
{
  "cardId": "number (required)"
}
```

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "stock": "number"
}
```

_Response (200 - OK)_

```json
{
  "data": {
    "id": "number",
    "userId": "number",
    "cardId": "number",
    "updatedAt": "string",
    "createdAt": "string",
    "stock": "number"
  },
  "message": "Stock updated"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Favorite Card not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 8. DELETE /cards/favorite/delete/:favoriteId

Description:

- Delete favorite card by id

Request:

- params:

```json
{
  "favoriteId": "number (required)"
}
```

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
{
  "message": "Favorite Card deleted"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "message": "Favorite Card not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 9. GET /archetype

Description:

- Get all archetype from database

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "name": "string"
  },
  ...
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 10. GET /randomcard

Description:

- Get one random card from database

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "name": "string",
    "type": "string",
    "frameType": "string",
    "race": "string",
    "desc": "string",
    "archetype": "string",
    "card_images": "string",
    "cardtype": "string",
    "atk": "number",
    "def": "number",
    "level": "number",
    "attribute": "string",
    "rarity": "string"
  },
  ...
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 11. GET /minigames

Description:

- Get one random card from database with hint from openAI

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "name": "string",
    "cardName": "string",
    "cardImage": "string",
  },
  ...
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```
