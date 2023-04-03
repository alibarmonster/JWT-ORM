const express = require('express');
const app = express();

const router = require('./router/router');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(`${process.env.BASE_URL}`, router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`app listen on ${PORT}`);
});
