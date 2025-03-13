const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');  
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();
const app = express();  

app.use(cors());  
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/prodify")
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err));

app.use('/users', userRoutes);
app.use('/products', productRoutes);

const port = 8080;  
app.listen(port, () => console.log(`Server running on port ${port}`));
