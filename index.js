const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const stripe = require("stripe")("sk_test_51PTJlY09CkmCoFiaammEH7o8pVBA5vHUutfKyBGObywKD7DNZmhpyF0IZil3uNIZllHYsVtBPqbXh01LBURdhqAU00IPbqMj0j")

console.log("dirname",__dirname);

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use auth routes
app.use('/api/auth', authRoutes);

// Product Routes

const productRoutes = require('./routes/productRoutes');
const { fileURLToPath } = require('url');
app.use('/api/products', productRoutes);

// CheckOut Api

app.post("/api/create-checkout-session",async(req,res)=>{
   
   const {products} = req.body;
   console.log(products);
   
   const lineItems = products.map((product)=>({
    price_data:{
      currency: "inr",
      product_data:{
         name:product.name
      },
      unit_amount:product.price * 100,
    },
    quantity: product.quantity
   }))

   const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel"
   });

   res.json({id:session.id})
   
})

// app.get('/', (req, res) => {
//     res.send('Hello World');
//   });


  // Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back the React app.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});



// Routes
// app.use('/api/products', require('./routes/product'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//Change the node version from 20 to 18 it will resolve the vercel 500 internal error