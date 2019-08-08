const express = require("express");
const cors = require("cors");
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

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(cors(corsOptions));

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

const server = https.createServer(
  {
    key: fs.readFileSync("./server.key"),
    cert: fs.readFileSync("./server.cert")
  },
  app
);

server.listen(5000);

module.exports = app;
