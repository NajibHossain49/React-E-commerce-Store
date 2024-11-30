# React E-commerce Store

This project is a simple e-commerce store built with React, where users can browse products, add them to the cart, and proceed to checkout. It also features **Firebase authentication**, allowing **users to sign up**, **log in**, and **access private routes**.

## Features

- **Dynamic Cart Management**: Users can add products to the cart dynamically.
- **React Context**: The cart state is managed globally using React Context for easy state sharing across components.
- **Firebase Authentication**: Users can sign up, log in, and log out with Firebase authentication.
- **Private Route**: Certain routes are accessible only when users are logged in, ensuring private access to specific parts of the application.
  
## React Concepts Used

### 1. **React Context API**
React Context API is used to manage global state for the shopping cart. By using Context, we avoid passing props down through several layers of components, making it easy to access the cart state anywhere in the app.

Key Features:
- **Context Provider**: The `CartProvider` wraps the root component to provide global access to the cart state.
- **useContext Hook**: Components use `useContext` to consume the global state and trigger updates to the cart.

### 2. **Dynamically Adding to Cart**
- Products can be added to the cart by clicking an "Add to Cart" button. 
- Each product has a button that, when clicked, triggers a function that adds the product to the cart. 
- The cart state is updated dynamically, reflecting changes in the UI.

### 3. **Firebase Authentication (Login & Signup)**
Firebase authentication is used to handle user login and signup. It allows users to securely register, log in, and log out.

Key Firebase Features:
- **Login**: Users can sign in using their email and password.
- **Signup**: New users can create an account with an email and password.
- **Logout**: Authenticated users can log out of their account.
  
Firebase Authentication manages the user's session and is integrated into the application for seamless login and signup.

### 4. **Private Routes**
- Private routes are protected using React Router. If a user is not logged in, they will be redirected to the login page.
- The `PrivateRoute` component checks the user’s authentication status before allowing access to a specific route.

## Project Setup

To get started with the project, follow these steps:

### 1. Clone the repository:
```bash
git clone https://github.com/NajibHossain49/React-E-commerce-Store.git
cd React-E-commerce-Store
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Setup Firebase:
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
- Add Firebase config to your project in the `.env.local` file (make sure to replace these placeholders with your actual Firebase config values):

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

Make sure that the `.env.local` file is added to `.gitignore` so your Firebase credentials are kept private.

### 4. Run the application:
```bash
npm run dev 
```

The app will now run on `http://localhost:5173/`.

## Key Components

### `CartContext.js`
Manages the global cart state using React Context. This file defines the `CartContext` and the `CartProvider` that wraps the app's root.

### `PrivateRoute.js`
A component that wraps a route and checks if the user is authenticated. If the user is not logged in, they are redirected to the login page.

### `firebaseConfig.js`
Contains the Firebase project configuration, and provides functions for signing up, logging in, and logging out users.

## How it Works

1. **Adding Items to the Cart:**
   - Each product is displayed on the homepage, with an "Add to Cart" button.
   - When clicked, the product is added to the cart, which is managed by the `CartContext`.

2. **Firebase Authentication:**
   - Users can sign up or log in using Firebase Authentication.
   - Once logged in, they can access private routes such as their profile page.

3. **Private Routes:**
   - Routes such as the user profile are protected. If a user is not authenticated, they are redirected to the login page.

## Future Enhancements

- Implementing a checkout system.
- Adding a payment gateway (e.g., Stripe).
- Allowing users to view past orders.
