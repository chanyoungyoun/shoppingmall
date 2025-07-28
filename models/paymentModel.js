const db = require('../db');

// ✅ 결제 생성 (주문 처리)
async function createPayment({
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
}) {
  const [result] = await db.query(
    `INSERT INTO Payments 
     (UserNumber, ProductID, ProductName, ProductCnt, CreditCardNumber, CreditCardPwd, Address, Contact, TotalPrice, imagePath)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
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
    ]
  );
  return result;
}

// ✅ 사용자별 결제 내역 조회
async function getPaymentsByUser(userNumber) {
  const [rows] = await db.query(
    `SELECT * FROM Payments WHERE UserNumber = ?`,
    [userNumber]
  );
  return rows;
}

module.exports = {
  createPayment,
  getPaymentsByUser
};
