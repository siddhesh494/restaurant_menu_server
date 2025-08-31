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
```bash
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY="your_private_key"
PORT=5000
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



