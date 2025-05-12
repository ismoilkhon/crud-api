import express, { Request, Response } from 'express';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const users: User[] = [];

app.get('/api/users', (req: Request, res: Response) => {
  res.status(200).json(users);
});

app.get('/api/users/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!uuidValidate(userId)) {
    return res.status(400).json({ message: 'Invalid userId format' });
  }

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
});

app.post('/api/users', (req: Request, res: Response) => {
  const { username, age, hobbies } = req.body;

  if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
    return res
      .status(400)
      .json({ message: 'Missing or invalid required fields' });
  }

  const newUser: User = {
    id: uuidv4(),
    username,
    age,
    hobbies,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/api/users/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  const { username, age, hobbies } = req.body;

  if (!uuidValidate(userId)) {
    return res.status(400).json({ message: 'Invalid userId format' });
  }

  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
    return res
      .status(400)
      .json({ message: 'Missing or invalid required fields' });
  }

  users[userIndex] = { id: userId, username, age, hobbies };
  res.status(200).json(users[userIndex]);
});

app.delete('/api/users/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!uuidValidate(userId)) {
    return res.status(400).json({ message: 'Invalid userId format' });
  }

  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
export const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { users };
