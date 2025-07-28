const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const verifyToken = require('../middlewares/authMiddleware'); // ✅ JWT 검증 미들웨어

// ✅ 로그인한 사용자의 장바구니 목록 조회
router.get('/me', verifyToken, cartController.getMyCart);

// ✅ 장바구니에 상품 추가
router.post('/', verifyToken, cartController.addToCart);

// ✅ 장바구니 항목 삭제
router.delete('/:cartId', verifyToken, cartController.removeFromCart);

module.exports = router;
