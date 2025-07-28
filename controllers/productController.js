const productModel = require('../models/productModel');
const path = require('path');



// ✅ 전체 상품 조회
async function getAllProducts(req, res) {
  try {
    const products = await productModel.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('상품 목록 조회 오류:', error);
    res.status(500).json({ message: '서버 오류 발생' });
  }
}

// ✅ 상품 상세 조회
async function getProductById(req, res) {
  try {
    const productId = req.params.id;
    const product = await productModel.getProductById(productId);

    if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    res.json(product);
  } catch (error) {
    console.error('상품 상세 조회 오류:', error);
    res.status(500).json({ message: '서버 오류 발생' });
  }
}

// ✅ 상품 등록
async function createProduct(req, res) {
  console.log('🟡 req.body 도착 여부:', req.body);
  try {
    console.log('요청 body:', req.body);
    console.log('업로드된 파일:', req.file);
    const {
      productType,
      productName,
      description,
      productCnt,
      price,
      stock,
    } = req.body;

    const imageFile = req.file;  // multer가 파싱한 이미지 정보
    const imagePath = imageFile ? `uploads/${imageFile.filename}` : null;

    console.log('상품 데이터:', req.body);
    console.log('파일 정보:', imageFile);

    if (
      !productType || !productName || !description ||
      productCnt == null || price == null || stock == null || !imagePath
    ) {
      return res.status(400).json({ message: '모든 항목을 입력해 주세요.' });
    }

    const result = await productModel.createProduct({
      productType,
      productName,
      description,
      productCnt,
      price,
      stock,
      imagePath
    });

    res.status(201).json({
      message: '상품이 등록되었습니다.',
      productId: result.insertId
    });
  } catch (error) {
    console.error('상품 등록 오류:', error);
    res.status(500).json({ message: '서버 오류 발생' });
  }
}

async function updateProduct (req, res) {
  try {
    const id = req.params.id;
    const {
      productType,
      productName,
      description,
      productCnt,
      price,
      stock
    } = req.body;

    const existingProduct = await productModel.getProductById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: '상품이 존재하지 않습니다.' });
    }

    const imagePath = req.file
      ? `/uploads/${req.file.filename}`
      : existingProduct.ImagePath;


    const updateResult = await productModel.updateProduct(id, {
      productType,
      productName,
      description,
      productCnt,
      price,
      stock,
      imagePath,
    });

    res.status(200).json({ message: '상품이 성공적으로 수정되었습니다.', result: updateResult });
  } catch (err) {
    console.error('상품 수정 오류:', err);
    res.status(500).json({ message: '서버 오류로 수정에 실패했습니다.' });
  }
};

// ✅ 상품 삭제
async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;

    const result = await productModel.deleteProduct(productId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '삭제할 상품이 존재하지 않습니다.' });
    }

    res.json({ message: '상품이 삭제되었습니다.' });
  } catch (error) {
    console.error('상품 삭제 오류:', error);
    res.status(500).json({ message: '서버 오류 발생' });
  }
}

const searchProducts = async (req, res) => {
  const keyword = req.query.q;

  try {
    const products = await productModel.searchProducts(keyword);
    res.json(products);
  } catch (err) {
    console.error('🔍 검색 오류:', err);
    res.status(500).json({ error: '검색 중 오류 발생' });
  }
};



module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  searchProducts,
};
