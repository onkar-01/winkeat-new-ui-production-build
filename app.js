const dotenv = require("dotenv");
const server = require("./server");
const { connectDB, photoCloud } = require("./config/database");

const Razorpay = require("razorpay");

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

//config
dotenv.config({ path: "./config.env" });

// call database connection
connectDB();
// call the cloudinary connection
photoCloud();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


module.exports = instance;

const app = server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Unhandled Error

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise rejection`);
  app.close(() => {
    process.exit(1);
  });
});
