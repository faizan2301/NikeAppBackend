const { MongoClient } = require("mongodb");
const uri = process.env.DB;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
let client;
if (!client) {
  client = new MongoClient(uri, options);
  console.log("Connecting");
}

// Connect to the MongoDB server
client.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  }
  console.log("Connected to the database");
});

// Get the reference to the "test" database
const database = client.db("test");

// Get references to the "products" and "orders" collections
const products = database.collection("products");
const orders = database.collection("orders");

// Export the collections
module.exports = { products, orders };
