
# Pathology Solution Online+

Overview

Pathology Solution Online+ is a web application designed to streamline the process of booking pathology tests. Users can create an account, browse available labs, book a test, and complete payments online with ease. The platform offers multiple pathology labs to choose from, allowing users to select the best option for their needs. The application also provides a seamless experience with pages for user registration, login, profile management, and more.

Built using the MERN stack, Pathology Solution Online leverages React.js, Redux Toolkit, and TailwindCSS on the frontend, with a backend powered by Node.js, Express.js, and MongoDB. Razorpay is integrated as the payment gateway, and JWT authentication with email verification ensures secure user accounts. Additionally, Cloudinary is used for image storage, allowing for efficient handling of user-uploaded images.


## Demo

https://pathology-solutions-online-1.onrender.com/


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Features

-User Registration and Login:

    Secure registration and login process with JWT-based authentication and email verification.

-Browse and Book Tests:

    Users can explore multiple labs and easily book tests from their preferred lab.

-Cart System:

    Add selected tests to a cart for a simplified booking and checkout process.

-Online Payment:

    Integrated with Razorpay for secure and convenient online payments.

-User Profile Management:

    Manage personal information and view booking history.

-Image Upload:

    Users can upload images related to their tests or profiles, stored securely using Cloudinary.

-Search Functionality:

    Search for specific tests, labs, or categories.

-Pages

    Register: Create an account to access features.
    Login: Sign in to access your profile, bookings, and more.
    Home: Overview of the application and test categories.
    Lab Home: View details of different labs.
    Test: Explore available tests and add them to the cart.
    Cart: Review and complete your test booking.
    Profile: Manage your account and view booking history.
    Search: Quickly find labs, tests, or categories.


## Tech Stack

- Frontend:
    - React.js
    - Redux Toolkit
    - TailwindCSS
    
- Backend:
    - Node.js
    - Express.js

- Database:
    - MongoDB

- Payment Integration:
    - Razorpay for handling secure online transactions

- Image Storage:
    - Cloudinary for managing and serving user-uploaded images

- Authentication and Security:
    - JWT (JSON Web Tokens) for authentication
    - Bcrypt for password encryption
    - Email verification for account security


## Pipeline

The application includes a MongoDB aggregation pipeline for efficient data handling across multiple collections such as Cart, Tests, Categories, and Labs. This enhances performance and organizes data flow within the app.


## Installation

Install my-project with npm

Make sure you have the following installed:

- Node.js
- MongoDB or use MongoDB atlas

Setup

1.  Clone the repository:
```bash
  git clone https://github.com/Md-Kutub-Islam/pathology-solutions-online.git
```
2. Install dependencies for both frontend and backend:
```bash
  # Install backend dependencies
  cd server
  npm install

# Install frontend dependencies
  cd ../client
  npm install
```

3. Configure environment variables:
Create a .env file in the server directory and add the following:
```bash
  MONGO_URI=your-mongodb-uri
  JWT_SECRET=your-jwt-secret
  RAZORPAY_KEY=your-razorpay-key
  RAZORPAY_SECRET=your-razorpay-secret
  CLOUDINARY_URL=your-cloudinary-url
  FRONTEND_URL= your-frontend-url
```
Create a .env file in the client directory and add the following:
```bash
  server_URL= your-frontend-url
```
4. Run the application:
```bash
  # Start the backend server
  cd server
  npm start

  # Start the frontend server
  cd ../client
  npm run dev
```


## Usage

- User Registration and Login
    - Users can sign up and verify their email to start using the application.

- Booking a Test
    - Choose a pathology lab, select tests, add them to the cart, and proceed to checkout.

- Payment
    - Complete payment securely through Razorpay.

- Profile Management
    - Users can view their booking history, edit profile information, and manage bookings.

- Image Upload
    - Users can upload relevant images that will be stored on Cloudinary.

- Searching
    - Use the search functionality to quickly locate labs or specific tests.
 
    - 
## security

- JWT-based Authentication
    - Token-based authentication provides secure access to user accounts.

- Password Encryption
    - Passwords are stored securely using Bcrypt.

- Email Verification
    - Ensures only verified users have access to the platform.
 

## Future Enhancements

- Add test result download functionality for users.
- Implement notifications for booking confirmations and payment receipts.
- Add review and rating system for labs.

  
## Contributing

Contributions are welcome! Feel free to submit issues or pull requests if you have ideas for improvement.


## License

This project is licensed under the ISC License

