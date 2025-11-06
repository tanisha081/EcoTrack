# EcoTrack Project

## Project Overview

EcoTrack is a full-stack web application designed to help users track their environmental impact and participate in eco-friendly challenges. It consists of a React frontend and a Node.js/Express backend.

**Key Technologies:**

*   **Frontend:** React, React Router, Axios, Tailwind CSS
*   **Backend:** Node.js, Express, MongoDB (with Mongoose), JWT for authentication

**Architecture:**

The application is divided into two main parts:

*   **`frontend`:** A React-based single-page application (SPA) that provides the user interface. It communicates with the backend API to fetch and display data.
*   **`backend`:** A RESTful API built with Node.js and Express. It handles user authentication, data storage, and business logic.

## Building and Running

### Backend

To run the backend server:

1.  Navigate to the `backend` directory.
2.  Install dependencies: `npm install`
3.  Start the development server: `npm run dev`

The server will start on the port specified in your `.env` file (or port 5000 by default).

### Frontend

To run the frontend application:

1.  Navigate to the `frontend` directory.
2.  Install dependencies: `npm install`
3.  Start the development server: `npm start`

The application will be accessible at `http://localhost:3000`.

## Development Conventions

*   **API Routes:** All backend API routes are prefixed with `/api`.
*   **Authentication:** The backend uses JSON Web Tokens (JWT) for authentication. Authenticated routes are protected by the `protect` middleware.
*   **Styling:** The frontend uses Tailwind CSS for styling.
*   **Frontend Components:** The frontend is structured into components for different functionalities. The main components are:
    *   `Dashboard`: The main page for authenticated users.
    *   `Header`: The navigation bar.
    *   `Footer`: The footer.
    *   `ChallengeList`: Displays a list of challenges.
    *   `ActivityLogger`: Allows users to log their activities.
    *   `CarbonFootprintCalculator`: Allows users to calculate their carbon footprint.
    *   `UserSettings`: Allows users to update their profile information.