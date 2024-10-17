# Course Selling Demo Project

This is a demo project for a course-selling platform built using Node.js, Express, and MongoDB. The platform allows users to sign up, browse available courses, purchase courses, and view purchased courses. Admins can create and manage courses.


## Table of Contents
This section provides easy navigation to key parts of the README file, especially for longer files.
- [Project Setup](#project-setup)
- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Testing with Postman](#testing-with-postman)



## Project Setup

Clone the repository:
   ```bash
   git clone https://github.com/ANI-IN Course-purchase-backend
   ```
Navigate to the project directory:

Install dependencies:
```
npm install
```
Set up environment variables (see Environment Variables).

Start the server:

## Technologies Used
Key technologies and frameworks used in the project.

```markdown
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
```
## Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```plaintext
MONGODB_URI=your-mongodb-uri-here
SECRET_KEY=your-secret-key-here
```

## Running the Application
   A simple section for running the app locally and possibly in production.
To start the server, run the following command:
 
```
nodemon index.js
```
The server will be running at http://localhost:4000/.


## Testing with Postman
#### Install Postman
If you don't have Postman installed, follow these steps:

#### 1.1. Download Postman:
Visit the Postman Download Page.
Download the installer for your operating system (Windows, macOS, or Linux).

#### 1.2. Install Postman:

Run the installer and follow the on-screen instructions to install Postman on your machine.

#### 1.3. Launch Postman:

After installation, launch the Postman app.
