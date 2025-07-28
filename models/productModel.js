const db = require('../db');

// ✅ 모든 상품 조회
async function getAllProducts() {
  const [rows] = await db.query('SELECT * FROM Products');
  return rows;
}

// ✅ 특정 상품 상세 조회
async function getProductById(productId) {
  const [rows] = await db.query('SELECT * FROM Products WHERE ProductID = ?', [productId]);
  return rows[0];
}

// ✅ 상품 등록
async function createProduct(product) {
  const {
    productType,
    productName,
    description,
    productCnt,
    price,
    stock,
    imagePath
  } = product;

  const [result] = await db.query(
    `INSERT INTO Products 
     (ProductType, ProductName, Description, ProductCnt, Price, Stock, ImagePath)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [productType, productName, description, productCnt, price, stock, imagePath]
  );
  return result;
}

async function updateProduct(id, updatedProduct) {
  const sql = `
    UPDATE Products
    SET
      ProductType = ?,
      ProductName = ?,
      Description = ?,
      ProductCnt = ?,
      Price = ?,
      Stock = ?,
      ImagePath = ?
    WHERE ProductID = ?
  `;

  const values = [
    updatedProduct.productType,
    updatedProduct.productName,
    updatedProduct.description,
    updatedProduct.productCnt,
    updatedProduct.price,
    updatedProduct.stock,
    updatedProduct.imagePath,
    id,
  ];

  const [result] = await db.query(sql, values);  // 🔧 conn → db 로 통일
  return result;
}


// ✅ 상품 삭제
async function deleteProduct(productId) {
  const [result] = await db.query(
    'DELETE FROM Products WHERE ProductID = ?',
    [productId]
  );
  return result;
}

async function searchProducts(keyword) {
  const [rows] = await db.query(
    `SELECT * FROM Products WHERE ProductName LIKE ?`,
    [`%${keyword}%`]
  );
  return rows;
}


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  searchProducts,
  updateProduct
};
