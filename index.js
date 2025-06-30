import express from 'express'
import { connectDB } from './db/mongoose.js';
import { PORT, BACKEND_URL } from './config/config.js';
const app = express();

app.get("/", (req, res) => {
    res.send("Navarro's Dolce Vita API – Ready to serve your Italian orders")
})

connectDB();

app.listen(PORT, () => {
    console.log(`Server running at: ${BACKEND_URL}${PORT}`)
})