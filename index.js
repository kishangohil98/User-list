import express from 'express'
import { DatabaseConnection } from './DatabaseConnection.js'
import * as dotenv from 'dotenv';
import { router as userRoutes } from './routes/user.js'
dotenv.config();

const app = express();

app.use(express.json({ extended: false }));

const db = new DatabaseConnection();
db.connectToDatabase();
  
// Defining routes
app.use("/api/user", userRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});