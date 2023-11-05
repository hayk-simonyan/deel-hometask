# DEEL Task

This repository includes a Node.js/Express.js backend API, complemented by a simple React frontend demo, unit tests, and security enhancements.

[🚀 Live Demo](https://deel-frontend.web.app/)
[🚀 Live Backend](https://deel-backend.cyclic.cloud/contracts)

While the primary task is focused on the backend API, additional efforts were made to showcase the usage of it in a simple React app.

## Table of Contents

- [Project Overview](#project-overview)
- [Repository Structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [Security](#security)
- [Going Above and Beyond](#going-above-and-beyond)
- [License](#license)

## Project Overview

This repository consists of the following main components:

- **Backend API**: A RESTful API developed using Node.js and Express.js for managing profiles, contracts, and jobs.
- **Frontend Demo**: A basic React application that demonstrates API interactions.
- **Unit Tests**: A set of unit and integration tests in the backend for validating core functionalities.

## Repository Structure

- `frontend/`: Contains the React application code and related documentation.
- `backend/`: Contains the Node.js/Express.js backend code, data models, and API documentation.
- `REQUIREMENTS.md`: Requirements provided by Deel.

## Getting Started

1. Clone the repository.
2. Follow the instructions in [backend/README.md](backend/README.md) to set up the backend.
3. Follow the instructions in [frontend/README.md](frontend/README.md) to set up the frontend.

## Testing

For detailed testing instructions and information, refer to [backend/README.md](backend/README.md).

## Security

Security advancements have been implemented to enhance the application's robustness. For detailed information, refer to the Security section in [backend/README.md](backend/README.md).

## Going Above and Beyond

In addition to the core requirements, this project includes:

- **Frontend Demo**: A simple React frontend to demonstrate calls to the backend APIs.
- **Unit Tests**: A collection of unit and integration tests for verifying the system's integrity.
- **Security Enhancements**: Additional measures to ensure the application's security, including rate limiting, validation, and secure headers.
- **Deployment**: Both frontend and backend are deployed and are available for live demo:
  Backend is deployed to AWS using Cyclic: https://deel-backend.cyclic.cloud/contracts

  Frontend is deployed to Firebase: https://deel-frontend.web.app/

## License

[MIT License](LICENSE.md)
