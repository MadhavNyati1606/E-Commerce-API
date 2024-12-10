const getAllProducts = async (req, res) => {
  res.send("Get All Products");
};

const createProduct = async (req, res) => {
  res.send("Create a Product");
};

const getProduct = async (req, res) => {
  res.send("Get A Product");
};

const updateProduct = async (req, res) => {
  res.send("Update A Product");
};

const deleteProduct = async (req, res) => {
  res.send("Delete A Product");
};

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
