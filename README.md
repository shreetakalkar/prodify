Prodify - Product Management Dashboard 🛒

Overview

Prodify is a web-based Admin Dashboard built with React.js & Material-UI for managing products. It fetches product data from a MongoDB backend and allows syncing with Shopify. The backend is powered by Node.js & Express with JWT authentication for secure API communication.

Features

✅ View Products – Fetches product list from MongoDB.✅ Sync Shopify – Syncs product data with Shopify in real-time.✅ Secure Authentication – Uses JWT for API security.✅ Modern UI – Clean Material-UI design with smooth interactions.

Tech Stack

Frontend: React.js, Material-UI, Axios

Backend: Node.js, Express.js, MongoDB

Authentication: JWT (JSON Web Token)

API Integration: Shopify API

Installation & Setup

Prerequisites

Ensure you have Node.js and MongoDB installed on your system.

Clone the Repository

git clone https://github.com/yourusername/prodify.git
cd prodify

Backend Setup

Navigate to the backend folder:

cd backend

Install dependencies:

npm install

Create a .env file and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
SHOPIFY_API_KEY=your_shopify_api_key
SHOPIFY_SECRET=your_shopify_secret

Start the backend server:

npm start

Frontend Setup

Navigate to the frontend folder:

cd frontend

Install dependencies:

npm install

Create a config.js file inside src folder:

export const API_BASE_URL = "http://localhost:8080/products";

Start the frontend application:

npm start

Usage

View Products: Automatically fetches the product list on page load.

Sync Shopify: Click the Sync Shopify button to update products.

Authentication: Ensure you're logged in before syncing.

How to Add a README File if Not Created Initially

If a README file was not created during project setup, follow these steps:

Navigate to your project root folder.

Run the following command:

touch README.md

Open the file in an editor:

nano README.md  # or use VSCode, Notepad++, etc.

Copy-paste this README content and save the file.

License

This project is licensed under the MIT License.