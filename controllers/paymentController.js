const paymentModel = require('../models/paymentModel');

// ✅ 결제 생성
async function createPayment(req, res) {
  try {
    const {
      userNumber,
      productID,
      productName,
      productCnt,
      creditCardNumber,
      creditCardPwd,
      address,
      contact,
      totalPrice,
      imagePath
    } = req.body;

    // 필수 항목 검증
    if (
      !userNumber || !productID || !productName || !productCnt ||
      !creditCardNumber || !creditCardPwd || !address || !contact || !totalPrice
    ) {
      return res.status(400).json({ message: '모든 필드를 입력해 주세요.' });
    }

    const result = await paymentModel.createPayment({
      userNumber,
      productID,
      productName,
      productCnt,
      creditCardNumber,
      creditCardPwd,
      address,
      contact,
      totalPrice,
      imagePath
    });

    res.status(201).json({
      message: '결제가 성공적으로 처리되었습니다.',
      paymentId: result.insertId
    });
  } catch (error) {
    console.error('결제 처리 오류:', error);
    res.status(500).json({ message: '서버 오류 발생' });
  }
}

// ✅ 특정 사용자 결제 내역 조회
async function getPaymentsByUser(req, res) {
  try {
    const userNumber = req.params.userNumber;

    const payments = await paymentModel.getPaymentsByUser(userNumber);
    res.json(payments);
  } catch (error) {
    console.error('결제 내역 조회 오류:', error);
    res.status(500).json({ message: '서버 오류 발생' });
  }
}

module.exports = {
  createPayment,
  getPaymentsByUser
};
