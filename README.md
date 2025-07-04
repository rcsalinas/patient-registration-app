# Patient Registration Application

This is a full-stack patient registration application built with Node.js/TypeScript on the backend and React/TypeScript on the frontend. The entire development environment is containerized using Docker and Docker Compose for easy setup and consistency.

---

## Features

### Backend

- REST API for patient registration (create and list patients).
- Handles multipart/form-data for document photo uploads.
- Server-side data validation.
- Asynchronous email notifications upon successful registration.
- Comprehensive unit and integration test suite using Jest and `pg-mem`.

### Frontend

- Displays a list of patients in expandable cards.
- Handles loading, empty, and error states for the patient list.
- A complete registration form with client-side validation using Formik and Yup.
- Custom drag-and-drop component for `.jpg` file uploads.
- Animated modals for success and error notifications using SweetAlert2.
- Auto-refreshes the patient list after a new patient is added.
- Component tests using Vitest and React Testing Library.

---

## Tech Stack

- **Backend**: Node.js, Express, TypeScript, PostgreSQL
- **Frontend**: React, TypeScript, Vite, Formik, Yup, Axios
- **Database**: PostgreSQL
- **DevOps & Tooling**: Docker, Docker Compose, Nginx, ESLint, Prettier

---

## Project Structure

The project is set up as a monorepo with two main directories:

```
/patient-registration-app
|-- backend/   # Contains the Node.js/Express API
|-- frontend/  # Contains the React application
|-- docker-compose.yml  # Orchestrates all services
|-- README.md
```

## Prerequisites

You must have **Docker Desktop** installed and running on your machine.

- [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)

---

## Setup and Installation

### Step 1: Clone the Repository

Clone this project to your local machine.

```sh
git clone https://github.com/rcsalinas/patient-registration-app.git
cd patient-registration-app
```

### Step 2: Create Environment File

The backend requires an environment file for email service credentials.

Navigate into the backend directory:

```sh
cd backend
```

Create a file named `.env`. You can copy the example below.

#### `.env.example`

```env
# Mailtrap Credentials for development email testing
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=587
MAIL_USER=your_mailtrap_user
MAIL_PASS=your_mailtrap_password
MAIL_FROM="NoReply <noreply@patientapp.com>"
```

> **Note:** You need to get your own credentials from [Mailtrap.io](https://mailtrap.io/) for email sending to work.

### Step 3: Build and Run the Application

Navigate back to the project's root directory:

```sh
cd ..
```

and run the following command. This will build the images for the frontend and backend and start all services.

```sh
docker-compose up --build
```

The initial build may take a few minutes.

### Step 4: Access the Application

Once all the containers are running, you can access the application:

- **Frontend Application:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** The API is available at [http://localhost:3001](http://localhost:3001), but all requests from the frontend are proxied through Nginx.

---

## Available Scripts

You can run various scripts from within the frontend and backend directories for development purposes.

### Backend Scripts

(Navigate to the backend directory)

```sh
# Run the backend development server with hot-reloading
npm run dev

# Run the test suite
npm run test

# Check for linting issues
npm run lint

# Automatically format all code
npm run format
```

### Frontend Scripts

(Navigate to the frontend directory)

```sh
# Run the frontend development server with hot-reloading
npm run dev

# Run the component test suite
npm run test

# Check for linting issues
npm run lint

# Automatically format all code
npm
```
