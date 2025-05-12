# 🚀 CRUD API with TypeScript, Express & Clustering

A simple, scalable RESTful API built with TypeScript, Express, and an in-memory database. Supports horizontal scaling using Node.js Clustering and a built-in load balancer.

---

## 📦 Features

- Fully functional **CRUD** operations for user data
- Built with **TypeScript** and **Express**
- **In-memory storage** for simplicity (no external DB)
- Horizontal scaling using Node.js **Cluster API**
- Auto-reloading in development mode
- Testing with **Jest**
- Code linting and formatting with **ESLint** and **Prettier**

---

## 📂 Project Structure

```
crud-api/
├── src/
│   ├── index.ts          # Main API implementation
│   ├── cluster.ts        # Clustering and load balancer
├── tests/
│   └── api.test.ts       # Jest-based API tests
├── .env                  # Environment config
├── .eslintrc.json        # ESLint rules
├── .prettierrc           # Prettier formatting
├── jest.config.js        # Test config
├── package.json          # Scripts & deps
├── tsconfig.json         # TypeScript settings
├── webpack.config.js     # Build config
```

🔗 API Endpoints

| Method | Endpoint   | Description     | Status Codes        |
| ------ | ---------- | --------------- | ------------------- |
| GET    | `/`        | Get all users   | `200`               |
| GET    | `/:userId` | Get user by ID  | `200`, `400`, `404` |
| POST   | `/`        | Create new user | `201`, `400`        |
| PUT    | `/:userId` | Update user     | `200`, `400`, `404` |
| DELETE | `/:userId` | Delete user     | `204`, `400`, `404` |

---

## 🛠️ Running the Application

### 📌 Development Mode

Runs the server with auto-reloading via `ts-node-dev`.

```bash
npm run start:dev
