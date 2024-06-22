Contacto Backend
This repository contains the backend code for the Contacto app, a contact management system. The backend is built using Node.js, Express, and MongoDB, and is deployed on Render. The backend handles user authentication, and contact creation, editing, and searching via a set of RESTful APIs.

Hosted Backend
The backend is hosted on Render and can be accessed at:
https://contacto-backend.onrender.com

API Endpoints
1. Login API
Endpoint: https://contacto-backend.onrender.com/api/auth/login

Method: POST

Request Body:

json
Copy code
{
  "username": "saltman",
  "password": "oai1122"
}
Response:

On success:
json
Copy code
{
  "token": "YOUR_JWT_TOKEN"
}
On failure:
json
Copy code
{
  "error": "Invalid credentials"
}
2. Create Contact API
Endpoint: https://contacto-backend.onrender.com/api/contacts/create

Method: POST

Request Body:

json
Copy code
{
  "token": "YOUR_JWT_TOKEN",
  "name": "Billy Butcher",
  "phone": 144888,
  "email": "billy@example.com",
  "linkedin": "billy_linkedin",
  "twitter": "billy_twitter"
}
Response:

On success:
json
Copy code
{
  "message": "Contact created successfully"
}
On failure (e.g., invalid token):
json
Copy code
{
  "error": "Invalid token"
}
3. Edit Contact API
Endpoint: https://contacto-backend.onrender.com/api/contacts/edit

Method: PUT

Request Body:

json
Copy code
{
  "token": "YOUR_JWT_TOKEN",
  "name": "Billy Butcher",
  "email": "new_billy@example.com" // You can also use "linkedin" or "twitter" instead of "email"
}
Response:

On success:
json
Copy code
{
  "message": "Contact updated successfully"
}
On failure (e.g., invalid token, contact not found):
json
Copy code
{
  "error": "Invalid token" or "Contact not found"
}
4. Search Contact API
Endpoint: https://contacto-backend.onrender.com/api/contacts/search

Method: POST

Request Body:

json
Copy code
{
  "token": "YOUR_JWT_TOKEN",
  "search_token": "raj"
}
Response:

On success:
json
Copy code
[
  {
    "name": "Raj Singh",
    "phone": 123456,
    "email": "raj@example.com",
    "linkedin": "raj_linkedin",
    "twitter": "raj_twitter"
  },
  {
    "name": "Vanraj Mehta",
    "phone": 654321,
    "email": "vanraj@example.com",
    "linkedin": "vanraj_linkedin",
    "twitter": "vanraj_twitter"
  }
]
On failure (e.g., invalid token):
json
Copy code
{
  "error": "Invalid token"
}
