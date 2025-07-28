const cartModel = require('../models/cartModel');

// ✅ 장바구니에 상품 추가
async function addToCart(req, res) {
  try {
    const userId = req.user.userId; // ✅ 토큰에서 추출된 userId
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'productId와 quantity를 모두 입력하세요.' });
    }

    const result = await cartModel.addToCart(userId, productId, quantity);
    res.status(201).json({ message: '장바구니에 추가되었습니다.', cartId: result.insertId });
  } catch (error) {
    console.error('장바구니 추가 오류:', error);
    res.status(500).json({ message: '서버 오류 발생' });
  }
}


// ✅ 로그인한 사용자의 장바구니 조회
async function getMyCart(req, res) {
  try {
    const userId = req.user.userId; // JWT에서 추출
    const cartItems = await cartModel.getCartByUser(userId);
    res.json(cartItems);
  } catch (error) {
    console.error('장바구니 조회 오류:', error);
    res.status(500).json({ message: '서버 오류 발생' });
  }
}

// ✅ 장바구니 항목 삭제
async function removeFromCart(req, res) {
  try {
    const cartId = req.params.cartId;

    const result = await cartModel.removeFromCart(cartId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '해당 항목이 존재하지 않습니다.' });
    }

    res.json({ message: '장바구니 항목이 삭제되었습니다.' });
  } catch (error) {
    console.error('장바구니 삭제 오류:', error);
    res.status(500).json({ message: '서버 오류 발생' });
  }
}

module.exports = {
  addToCart,
  getMyCart,
  removeFromCart
};
