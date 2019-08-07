const products = require("../src/products.json");

const getProductByID = (req, res) => {
  const product = products.filter(product => {
    return product.id === req.params.id;
  });
  if (product.length > 0) {
    res.status(200).json(product);
  } else {
    res.status(200).json("You introduced an invalid ID");
  }
};

const getAllProducts = (req, res) => {
  res.status(200).json(products);
};

module.exports = { getProductByID, getAllProducts };
