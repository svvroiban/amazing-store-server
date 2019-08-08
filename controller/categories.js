const categories = require("../src/categories.json");
const products = require("../src/products.json");
const getCategoryByID = (req, res) => {
  const category = categories.filter(category => {
    return category.id === req.params.id;
  });
  if (category.length > 0) {
    res.status(200).json(category);
  } else {
    res.status(400).json("You introduced an invalid ID");
  }
};

const getAllCategories = (req, res) => {
  res.status(200).json(categories);
};

const getProductsByCategoryID = (req, res) => {
  const productsCategory = products.filter(product => {
    return product.categories.indexOf(parseInt(req.params.id)) !== -1;
  });
  res.status(200).json(productsCategory);
};

module.exports = { getCategoryByID, getAllCategories, getProductsByCategoryID };
