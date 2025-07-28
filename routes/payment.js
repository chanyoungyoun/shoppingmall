const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// ✅ 결제 생성 (주문 처리)
router.post('/', paymentController.createPayment);

// ✅ 결제 내역 조회 (사용자 기준)
router.get('/:userNumber', paymentController.getPaymentsByUser);

module.exports = router;
