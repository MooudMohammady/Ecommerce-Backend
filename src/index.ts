import express from 'express';
import dotenv from 'dotenv';

//For env File 
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.get('*', (req, res) => {
  res.status(404).send('Endpoint notfound 404 !');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});