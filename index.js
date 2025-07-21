import express from 'express'
import cors from 'cors';
import { connectDB } from './db/mongoose.js';
import { PORT, BACKEND_URL } from './config/config.js';
import { errorMiddleware, notFoundHandler } from './middleware/error.middleware.js';
import userRouter from './routes/users.routes.js';
import productRouter from './routes/products.routes.js';
import orderRouter from './routes/orders.routes.js';

const app = express();
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("Navarro's Dolce Vita API – Ready to serve your Italian orders")
})



app.use('/user', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.use(notFoundHandler);
app.use(errorMiddleware);


app.listen(PORT, () => {
    console.log(`Server running at: ${BACKEND_URL}${PORT}`)
})