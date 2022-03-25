require('dotenv').config();
const express = require('express');
const productsRouter = require('./routers/productsRouter');
const salesRouter = require('./routers/salesRouter');
const ErrorHandler = require('./middlewares/ErrorHandler');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.use(ErrorHandler);

app.listen(PORT, () => console.log(`On: ${PORT}`));