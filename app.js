const express = require("express");
const categories = require("./src/categories.json");
const products = require("./src/products.json");
const http = require("http");
const app = express();
const router = express.Router();

router.get("/categories", (req, res) => {
  res.status(200).json(categories);
});
router.get("/products", (req, res) => {
  if (req.query == undefined) {
    res.status(200).json(products);
  } else {
    res.status(200).json(
      products.filter(product => {
        return (
          product.categories.includes(req.query.category) &&
          product.manufacturerId == req.query.manufacturer
        );
      })
    );
  }
});
router.get("/products/:id", (req, res) => {
  const product = products.filter(product => {
    return product.id === req.params.id;
  });
  if (product.length > 0) {
    res.status(200).json(product);
  } else {
    res.status(200).json("You introduced an invalid ID");
  }
});
router.get("/categories/:id", (req, res) => {
  const category = categories.filter(category => {
    return category.id === req.params.id;
  });
  if (category.length > 0) {
    res.status(200).json(category);
  } else {
    res.status(200).json("You introduced an invalid ID");
  }
});
router.get("/categories/:id/products", (req, res) => {
  const productsCategory = products.filter(product => {
    return product.categories.indexOf(parseInt(req.params.id)) !== -1;
  });
  res.status(200).json(productsCategory);
});
app.use("/", router);

const server = http.createServer(app);
server.listen(5000);
