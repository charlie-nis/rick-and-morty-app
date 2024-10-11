# Rick and Morty Character Search

Welcome to the Rick and Morty Character Search project! This application allows users to search through characters from the popular TV show "Rick and Morty," displaying relevant information about each character, their locations, and episodes.

## Features

- **Character Search**: Search for characters by name.
- **Character Details**: View detailed information about each character, including status, species, gender, and origin.
- **Location Information**: See the locations associated with characters.
- **Episode Listings**: Explore episodes featuring the selected characters.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Vite**: Build tool that offers fast development and optimized production builds.
- **TanStack Query**: For efficient data fetching and state management.
- **React Hook Form**: For easy form management and validation.
- **Firebase**: For user authentication
- **React Router**: For handling routing in the application.
- **TypeScript**: For static type checking and better development experience.

## Getting Started

To get started with the project, follow these steps:

### Prerequisites

Ensure you have the following installed:

- Node.js (version 14 or higher)
- npm or Yarn

### Clone the Repository

1. Clone the repository to your local machine:

```bash
   git clone https://github.com/charlie-nis/rick-and-morty-app.git
```

2. Navigate to the project directory:

```bash
   cd rick-and-morty-app
```

3. Install Dependencies
   Install the project dependencies using npm or Yarn:

```bash
   npm install
```

or

```bash
   yarn install
```

4. Set Up Firebase
   Go to the Firebase Console.
   Create a new project and enable the Authentication feature.
   Add a web app to your project and copy the Firebase configuration.
   In your project, create a .env file in the root directory and add your Firebase configuration:
   plaintext

   VITE_BASE_URL="https://rickandmortyapi.com/api"
   VITE_API_KEY=your_api_key
   VITE_AUTH_DOMAIN=your_auth_domain
   VITE_PROJECT_ID=your_project_id
   VITE_STORAGE_BUCKET=your_storage_bucket
   VITE_MESSAGE_SENDER_ID=your_message_sender_id
   VITE_APP_ID=your_app_id
   VITE_MEASUREMENT_ID=your_measurement_id

5. Run the Development Server
   Start the development server:

```bash
   npm run dev
```

or

```bash
   yarn dev
```

6. Open your browser and navigate to http://localhost:5173 to see the application in action!

7. API Reference
   This project utilizes the Rick and Morty API to fetch character, location, and episode data. Refer to the API documentation for details on available endpoints.

8. License
   This project is licensed under the MIT License. See the LICENSE file for details.

9. Acknowledgments
   Special thanks to the creators of Rick and Morty
