const express = require('express');
const cors = require('cors');

const authRoutes = require("./routes/auth.js");

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/', (req,res) => {
  res.send('Hello to Memories API');
})

app.get('/keep-alive', (req, res) => { //ping
  res.status(200).send('OK');
});

app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
