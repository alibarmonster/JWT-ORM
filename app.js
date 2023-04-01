const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`app listen on ${PORT}`);
});
