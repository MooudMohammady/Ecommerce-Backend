import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route';

//For env File 
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// setup middelware
app.use(express.json())

// setup routes
app.use("/auth", authRoute)

app.get('*', (req, res) => {
  res.status(404).send('Endpoint notfound 404 !');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});