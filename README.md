# SecureConnect - Authentication System

Welcome to **SecureConnect**, a secure and user-friendly authentication system built for the **Xcelerate** hackathon. This project includes a **signup** and **login** system with proper validation, error handling, and session management.

---

## Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Setup Instructions](#setup-instructions)
4. [Database Configuration](#database-configuration)
5. [API Endpoints](#api-endpoints)
6. [Assumptions](#assumptions)
7. [Additional Features](#additional-features)
8. [Team](#team)

---

## Features
### Signup Page
- Input fields: Username, Password, Confirm Password.
- Real-time validation:
  - Username must be unique and at least 8 characters long.
  - Password must contain:
    - At least one uppercase letter.
    - At least one lowercase letter.
    - At least one special character.
  - Confirm Password must match Password.
- Error messages displayed under each field if validation fails.
- Successful signup redirects to the login page after 2 seconds.

### Login Page
- Input fields: Username, Password.
- Validation:
  - Prevent login if fields are empty.
  - Check if the username exists and the password is correct.
- Successful login redirects to a landing page with a personalized message: `Hello, <username>!`.

### Session Management
- Users remain logged in until they click the "Logout" button.
- Logout redirects users to the login page.

---

## Tech Stack
- **Frontend**: Next.js, React
- **Backend**: Next.js API Routes.
- **Database**: MySQL.

---

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/KSDeshappriya/SpiritX_CypherX_01.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database (see [Database Configuration](#database-configuration)).
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.

---

## Database Configuration

---

## API Endpoints

---

## Additional Features

---

## Team
- **Team Name**: CypherX
- **Members**:

---

## Contact

---

Good luck, and happy coding! 🚀