# Restaurant Menu App - Server 🍽️

Backend API for the Restaurant Menu application.  
Handles menu data management, authentication, and service logic.

---

## 📖 Overview
This is the backend service for the Restaurant Menu App.  
It uses **Firebase Authentication** for secure user sign-up/login and **Cloud Firestore** for storing and managing menu data.  
The server works seamlessly with the [Restaurant Menu Client](https://github.com/siddhesh494/restaurant_menu_client).

---

## ✨ Features
- **Authentication**: Firebase Authentication (email/password or other supported providers)
- **Database**: Firestore for menu items and related data
- Organized controller, service, and route structure
- Middleware for authentication token verification
- Scalable architecture with clean separation of logic

---

## 🛠 Tech Stack
- **Node.js** with **Express.js**
- **Firebase Admin SDK** (Authentication + Firestore)
- JavaScript (server-side)
- MVC-inspired modular folder structure

---

### Create a `.env` file in the root directory and add:
```env
PORT=4000

PROJECT_KEY="your_project_key"
FIREBASE_API_KEY="your_firebase_api_key"

type="service_account"
project_id="your_project_id"
private_key_id="your_private_key_id"
private_key="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
client_email="your_client_email"
client_id="your_client_id"
auth_uri="https://accounts.google.com/o/oauth2/auth"
token_uri="https://oauth2.googleapis.com/token"
auth_provider_x509_cert_url="https://www.googleapis.com/oauth2/v1/certs"
client_x509_cert_url="your_client_x509_cert_url"
universe_domain="googleapis.com"
```

## 📦 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/siddhesh494/restaurant_menu_server.git
cd restaurant_menu_server

# Install dependencies
npm install

# To start the project
npm start
```



