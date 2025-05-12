CRUD API
A simple CRUD API built with TypeScript, Express, and an in-memory database, featuring horizontal scaling with a load balancer.
Features

Running the Application
The application supports three modes: development, production, and multi-instance (clustered).
Development Mode
Runs the application with ts-node-dev for auto-reloading.
npm run start:dev


Access the API at http://localhost:4000/api/users.

Production Mode
Builds the application with TypeScript and Webpack, then runs the bundled file.
npm run start:prod


Access the API at http://localhost:4000/api/users.

Multi-Instance Mode (Clustered)
Runs multiple instances using Node.js Cluster API with a round-robin load balancer.
npm run start:multi


Load balancer listens on http://localhost:4000/api.
Workers listen on http://localhost:4001/api, http://localhost:4002/api, etc., based on available CPU cores minus one.

API Endpoints
All endpoints are prefixed with /api/users.



Method
Endpoint
Description
Status Codes



GET
/
Get all users
200


GET
/:userId
Get user by ID
200, 400, 404


POST
/
Create a new user
201, 400


PUT
/:userId
Update an existing user
200, 400, 404


DELETE
/:userId
Delete a user
204, 400, 404


Request/Response Examples
POST /api/users
Request:
{
  "username": "John Doe",
  "age": 30,
  "hobbies": ["reading", "gaming"]
}

Response (201):
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "username": "John Doe",
  "age": 30,
  "hobbies": ["reading", "gaming"]
}

GET /api/users/:userId
Response (200):
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "username": "John Doe",
  "age": 30,
  "hobbies": ["reading", "gaming"]
}

Response (404):
{ "message": "User not found" }

Testing
Run the test suite using Jest:
npm test

The tests cover:

Retrieving all users
Creating a user
Retrieving a user by ID
Updating a user
Deleting a user
Verifying deletion

Linting and Formatting

Linting: Run ESLint to check code style:npm run lint
Formatting: Run Prettier to format code:npm run format



Project Structure
crud-api/
├── src/
│   ├── index.ts          # Main API implementation
│   ├── cluster.ts        # Clustering and load balancer
├── tests/
│   ├── api.test.ts       # API tests
├── .env                  # Environment variables
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
├── jest.config.js        # Jest configuration
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── webpack.config.js     # Webpack configuration