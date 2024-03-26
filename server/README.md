# Server Documentation

Welcome to the server documentation for the Medical Report Tracking System. This document provides details about the endpoints available in the server.

## Endpoints

### 1. Register User

- **Endpoint**: `POST /v1/auth/register`
- **Description**: Register a new user.
- **Request Body**:
  - `username`: String (required)
  - `email`: String (required)
  - `password`: String (required)

### 2. Login User

- **Endpoint**: `POST /v1/auth/login`
- **Description**: Log in an existing user.
- **Request Body**:
  - `email`: String (required)
  - `password`: String (required)

### 3. Add New Report

- **Endpoint**: `POST /v1/user/new-report`
- **Description**: Add a new blood report for the logged-in user.
- **Request Body**:
  - `reportData`: Object (required)

### 4. Get User Reports

- **Endpoint**: `GET /v1/user/get-reports`
- **Description**: Retrieve all blood reports for the logged-in user.

### 5. Search Reports

- **Endpoint**: `GET /v1/user/search`
- **Description**: Search for specific blood reports based on parameters.
- **Query Parameters**:
  - `query`: String (required)

### 6. Delete Report

- **Endpoint**: `DELETE /v1/user/delete/:id`
- **Description**: Delete a specific blood report by its ID.

## Usage

- Use the provided endpoints with appropriate HTTP methods and request bodies to perform various operations such as user registration, login, adding new reports, retrieving reports, searching reports, and deleting reports.

## Note

- Replace `http://localhost:3000` with the actual base URL of your server when making requests.

