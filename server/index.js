import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '.env') });

import categoriesRouter from './routes/categories.js';
import productsRouter from './routes/products.js';
import offersRouter from './routes/offers.js';
import contactRouter from './routes/contact.js';
import ordersRouter from './routes/orders.js';
import uploadRouter from './routes/upload.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/categories', categoriesRouter);
app.use('/api/products', productsRouter);
app.use('/api/offers', offersRouter);
app.use('/api/contact', contactRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/upload', uploadRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
