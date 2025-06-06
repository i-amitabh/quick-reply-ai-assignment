import express, { Request, Response } from 'express';
import { data } from './data';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Changed from TypeScript Express!');
});

app.get('/get-expenses', (req: Request, res: Response) => {
  res.json({
    "success": true,
    "data": data
  })
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
