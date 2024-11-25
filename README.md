# Trek Mate: A Hiking & Camping Companion App

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup Instructions](#setup-instructions)
5. [API Endpoints](#api-endpoints)
6. [Authentication](#authentication)
7. [Protected Routes](#protected-routes)
8. [Troubleshooting](#troubleshooting)
9. [Future Improvements](#future-improvements)
10. [Contributors](#contributors)

## Project Overview
**Trek Mate** is a full-stack application designed for outdoor enthusiasts to find hiking trails, campsites, and nearby amenities, complete with real-time weather updates and maps. The app uses a responsive design, providing users with a seamless experience across devices.

## Features
- **Search Functionality**: Search for trails and campsites by location or keyword.
- **Interactive Maps**: Display hiking trails and campsites using an integrated map feature.
- **Real-time Weather Updates**: Get accurate weather forecasts for selected locations.
- **Authentication**: Secure user login and signup using JWT-based authentication.
- **Wishlist**: Save favorite trails and campsites for easy access later.
- **Feedback System**: Leave and respond to feedback on trails or campsites.

## Technologies Used
### **Frontend**:
- React with TypeScript
- React Router for routing
- Bootstrap for styling

### **Backend**:
- Node.js with Express
- MongoDB with Mongoose for the database
- GraphQL for API management
- JWT for secure user authentication

### **APIs**:
- **Trail & Campsite API**: Provides information about trails, campsites, and webcams.
- **Weather API**: Real-time weather data for outdoor locations.

### **Testing**:
- Cypress for end-to-end and component testing
- GitHub Actions for CI/CD

## Setup Instructions
### Prerequisites
- Node.js (v14+)
- MongoDB database set up
- API keys for trail, campsite, and weather APIs

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/trek-mate.git
   ```
2. Navigate to the project directory:
   ```bash
   cd trek-mate
   ```
3. Install dependencies for both the client and server:
   ```bash
   npm run install
   ```
4. Set up `.env` files:
   - **Server-side**:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     TRAIL_API_KEY=your_trail_api_key
     WEATHER_API_KEY=your_weather_api_key
     ```
   - **Client-side**:
     ```
     VITE_MAPS_API_KEY=your_maps_api_key
     VITE_WEATHER_API_KEY=your_weather_api_key
     ```

5. Start the development environment:
   ```bash
   npm run develop
   ```
6. Access the app at `http://localhost:3000`.

## API Endpoints
### Backend API
- **POST** `/auth/register`: Create a new user.
- **POST** `/auth/login`: Log in and receive a JWT token.
- **GET** `/trails`: Fetch a list of hiking trails.
- **GET** `/campsites`: Fetch a list of campsites.
- **POST** `/feedback`: Add feedback for a trail or campsite.

### Integrated APIs
- **Trails & Campsites**: Fetch trail and campsite data from an external source.
- **Weather**: Fetch weather updates for selected locations.

## Authentication
**JWT Authentication** secures user sessions by issuing tokens at login and storing them in the browser’s local storage. The app validates these tokens before granting access to protected routes, ensuring secure interactions.

## Protected Routes
Certain features, such as the search bar and wishlist, are only accessible to authenticated users. Protected routes use the `PrivateRoutes` component to verify the user’s login status.

## Troubleshooting
- **Database Connection Error**: Ensure the MongoDB URI in the `.env` file is correct.
- **API Errors**: Verify API keys are valid and added to the `.env` file.
- **Cypress Tests Failing**: Check that the development server is running at `http://localhost:3001`.

## Future Improvements
- **Enhanced Search Filters**: Allow users to filter results by difficulty, amenities, or distance.
- **Social Features**: Add user profiles and the ability to share favorite trails and campsites.
- **Mobile App**: Expand functionality to mobile platforms for offline access.

## Contributors
We extend our gratitude to all contributors who made this project possible:
- [Victor Roman](https://github.com/Romantech91)
- [Jesse Anderson](https://github.com/Vtencouchclimbr)
- [Kevin Kerman](https://github.com/KevinKerman1)

Want to contribute? Fork the repository and submit a pull request or open an issue.  
