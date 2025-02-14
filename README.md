# Twitter Clone

Welcome to the **Twitter Clone** project! This application replicates core features of Twitter, allowing users to post tweets, like, comment. It's built with modern web technologies to ensure a seamless and responsive user experience.

## [Live Link](https://cloned-twitter.vercel.app/)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Post Tweets**: Share your thoughts with the world in real-time.
- **Like and Comment**: Engage with posts by liking and commenting.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend**:
  - [React](https://react.dev/): A JavaScript library for building user interfaces.
  - [Vite](https://vitejs.dev/): A fast build tool and development server for modern web projects.
  - [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
  - [React Router](https://reactrouter.com/): Declarative routing for React applications.
  - [Lucide React](https://lucide.dev/docs/lucide-react): Beautiful & consistent icon toolkit.
  - [Emoji Picker React](https://www.npmjs.com/package/emoji-picker-react): A simple emoji picker for React applications.

- **Development Tools**:
  - [ESLint](https://eslint.org/): A tool for identifying and fixing linting issues in JavaScript code.
  - [Prettier](https://prettier.io/): An opinionated code formatter.
  - [Vite](https://vitejs.dev/): Also serves as the build tool and development server.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.18+ or 16+)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/twitter-clone.git
   cd twitter-clone

# Running the Application

## To start the development server:

### Using npm:
```bash
npm run dev
```

### Or using Yarn:
```bash
yarn dev
```

The application will be available at [http://localhost:5173](http://localhost:5173).

---

# Building for Production

## To create an optimized production build:

### Using npm:
```bash
npm run build
```

### Or using Yarn:
```bash
yarn build
```

The production-ready files will be in the `dist` directory.

---

# Project Structure

```
twitter-clone/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .eslintrc.js
├── .prettierrc
├── package.json
└── vite.config.js
```

### Directory and File Overview:
- **public/**: Contains static assets like the `index.html` file.
- **src/**: Contains the source code.
  - **assets/**: Images and other media files.
  - **components/**: Reusable React components.
  - **pages/**: React components representing different pages.
  - `App.jsx`: The root React component.
  - `main.jsx`: Entry point for the React application.
  - `index.css`: Global CSS styles.
- **.eslintrc.js**: ESLint configuration.
- **.prettierrc**: Prettier configuration.
- **package.json**: Project metadata and dependencies.
- **vite.config.js**: Vite configuration.

---

# Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

---

# License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.


