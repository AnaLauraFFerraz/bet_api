# Bet API Documentation

## Overview

Welcome to the Bet API, a simple and efficient betting platform. This API allows users to manage participants, games, and bets. Whether you're looking to create a new game, place a bet, or check the status of participants, the Bet API has got you covered.

**Deployed Version**: [https://bet-api-5dz5.onrender.com](https://bet-api-5dz5.onrender.com)

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Dockerization](#dockerization)
- [API Routes](#api-routes)

## Requirements

- Node.js (v14 or newer)
- npm (v6 or newer)
- Docker (for Dockerization)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AnaLauraFFerraz/bet_api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd bet_api
   ```

3. Install the required packages:

   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

Once you have the server running, you can interact with the API using tools like curl, Postman, or any HTTP client of your choice.

### Exemple

To create a new participant:

```bash
curl -X POST https://bet-api-5dz5.onrender.com/participants -H "Content-Type: application/json" -d '{"name": "John", "balance": 1000}'
```

## Dockerization

To run the project using Docker:

1. Build the Docker image:

   ```bash
   docker build -t bet_api .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 3000:80 bet_api
   ```

Now, the API should be accessible at http://localhost:3000.

## API Routes

### Participants

- **Create a Participant**:

  - **Method**: `POST`
  - **Endpoint**: `/participants`
  - **Body**:
    ```json
    {
      "name": "string",
      "balance": "number"
    }
    ```

- **Get All Participants**:
  - **Method**: `GET`
  - **Endpoint**: `/participants`

### Games

- **Create a Game**:

  - **Method**: `POST`
  - **Endpoint**: `/games`
  - **Body**:
    ```json
    {
      "name": "string",
      "description": "string"
    }
    ```

- **Get All Games**:

  - **Method**: `GET`
  - **Endpoint**: `/games`

- **Finish a Game**:
  - **Method**: `POST`
  - **Endpoint**: `/games/:id/finish`
  - **Parameters**: `id` (ID of the game)

### Bets

- **Place a Bet**:
  - **Method**: `POST`
  - **Endpoint**: `/bets`
  - **Body**:
    ```json
    {
      "participantId": "number",
      "gameId": "number",
      "amountBet": "number"
    }
    ```

## Contributions

Contributions are welcome! Please fork the repository and create a Pull Request with your changes.
