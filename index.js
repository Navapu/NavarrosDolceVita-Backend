import express from 'express'
import { connectDB } from './db/mongoose.js';
import { PORT, BACKEND_URL } from './config/config.js';
import userRouter from './routes/users.routes.js';

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("Navarro's Dolce Vita API – Ready to serve your Italian orders")
})



app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server running at: ${BACKEND_URL}${PORT}`)
})