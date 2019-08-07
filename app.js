const express = require("express");
const categories = require("./src/categories.json");
const products = require("./src/products.json");
const https = require("https");
const app = express();
const router = express.Router();
const fs = require("fs");
const {
  getCategoryByID,
  getAllCategories,
  getProductsByCategoryID
} = require("./controller/categories");
const { getProductByID, getAllProducts } = require("./controller/products");
const {
  getUserByIDSchema,
  validatePathParams
} = require("./middleware/middleware.js");

const server = https.createServer(
  {
    key: fs.readFileSync("./server.key"),
    cert: fs.readFileSync("./server.cert")
  },
  app
);

router.get("/categories", getAllCategories);
router.get("/products", getAllProducts);
router.get(
  "/products/:id",
  validatePathParams(getUserByIDSchema),
  getProductByID
);
router.get(
  "/categories/:id",
  validatePathParams(getUserByIDSchema),
  getCategoryByID
);
router.get("/categories/:id/products", getProductsByCategoryID);
app.use("/", router);

server.listen(5000);

module.exports = app;
