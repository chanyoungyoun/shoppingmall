const productModel = require('../models/productModel');

// 🔍 카테고리별 상품 조회
async function getProductsByCategory(req, res) {
  try {
    const category = req.params.category;
    const products = await productModel.findByCategory(category);
    res.json(products);
  } catch (error) {
    console.error('카테고리 조회 오류:', error);
    res.status(500).json({ message: '서버 오류 발생' });
  }
}

// 💰 가격 범위 필터링
async function getProductsByPriceRange(req, res) {
  try {
    const min = parseInt(req.query.min) || 0;
    const max = parseInt(req.query.max) || Number.MAX_SAFE_INTEGER;
    const products = await productModel.findByPriceRange(min, max);
    res.json(products);
  } catch (error) {
    console.error('가격 필터 오류:', error);
    res.status(500).json({ message: '서버 오류 발생' });
  }
}

// 🔎 키워드 검색
async function searchProducts(req, res) {
  try {
    const keyword = req.query.q;
    const products = await productModel.search(keyword);
    res.json(products);
  } catch (error) {
    console.error('검색 오류:', error);
    res.status(500).json({ message: '서버 오류 발생' });
  }
}

module.exports = {
  getProductsByCategory,
  getProductsByPriceRange,
  searchProducts
};
