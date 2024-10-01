# LeCard

## Introduction

LeCard is a frontend web application developed for the HackerU Bootcamp. It allows users to create, manage, and explore digital business cards. The application is designed to provide a seamless and interactive experience with features such as model caching, URL-based pagination, sorting, searching, and robust user management functionalities.

## Features

- **Model Caching:** Caches models retrieved via the API to prevent repetitive loading times, enhancing performance and user experience.
- **URL-Based Pagination:** Supports URL-based pagination on both Cards and Users pages, allowing easy navigation through large datasets.
- **URL-Based Sorting:** Enables URL-based sorting on the Users page, providing flexible data organization.
- **URL-Based Search (Filter):** Facilitates URL-based search on Cards and Users pages, allowing users to filter results efficiently.
- **User Profile Management:** Users can edit their own profiles to update personal information.
- **Login Security:** Failing to log in successfully 3 times in a short period results in a 24-hour ban, enforced locally to prevent unauthorized access attempts.
- **CRM Functionalities:** The CRM supports multiple actions such as changing business/non-business status and deleting users. However, deleting admins is not supported to maintain system integrity.
- **Interactive UI:** The web application is highly interactive, featuring page loading states, notifications, and popups to enhance user engagement.
- **Card Interactions:** Business cards have action buttons for interaction and can be clicked to access detailed info pages. These info pages include action buttons accessible to the card owner and admins.

## Technologies Used

- **Vite:** Used as the build tool for a fast and optimized development experience.
- **React:** JavaScript library for building user interfaces.
- **Material UI:** Provides a set of accessible and customizable UI components.
- **jwt-decode:** Decodes JSON Web Tokens for authentication purposes.
- **Axios:** Handles HTTP requests to interact with APIs.
- **Joi:** Validates data schemas to ensure data integrity.
- **Content Generation:** Content generated with the assistance of ChatGPT by OpenAI.

## Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/roshiroku/cards-project.git
    ```

2. **Navigate to the Project Directory**

    ```bash
    cd cards-project
    ```

3. **Install Dependencies**

    ```bash
    npm install
    ```

4. **Clear Local Storage**

    The application utilizes local storage for caching purposes. It is recommended to clear your browser's local storage before running the application to prevent potential conflicts or outdated data.

## Usage

1. **Start the Development Server**

    ```bash
    npm run dev
    ```

2. **Open the Application**

    Navigate to `http://localhost:5173` in your web browser to view the application.
