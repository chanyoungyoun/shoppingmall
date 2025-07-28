const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

// ✅ 추가된 인증 미들웨어
const verifyToken = require('../middlewares/authMiddleware');
const checkAdmin = require('../middlewares/checkAdmin'); // 직접 만들어야 함

// ✅ multer 저장 방식 지정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const safeName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueName + ext); // 안전한 파일 이름으로 저장
  }
});

const upload = multer({ storage: storage });

// ✅ 관리자 전용 - 상품 등록
router.post('/', verifyToken, checkAdmin, upload.single('productImage'), productController.createProduct);

// ✅ 상품 전체 조회 (모두 가능)
router.get('/', productController.getAllProducts);

// ✅ 상품 검색
router.get('/search', productController.searchProducts);

// ✅ 상품 상세 조회
router.get('/:id', productController.getProductById);

// ✅ 관리자 전용 - 상품 수정
router.put('/:id', verifyToken, checkAdmin, upload.single('productImage'), productController.updateProduct);

// ✅ 관리자 전용 - 상품 삭제
router.delete('/:id', verifyToken, checkAdmin, productController.deleteProduct);

module.exports = router;
