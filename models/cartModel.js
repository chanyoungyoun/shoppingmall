const db = require('../db');

// ✅ 장바구니에 상품 추가
async function addToCart(userId, productId, quantity) {
    const [result] = await db.query(
        `INSERT INTO cart (userId, productId, quantity)
         VALUES (?, ?, ?)`,
        [userId, productId, quantity]
    );
    return result;
}

// ✅ 특정 사용자의 장바구니 목록 조회
async function getCartByUser(userId) {
    const [rows] = await db.query(
        `SELECT c.id AS cartId, c.quantity, c.createdAt,
                p.ProductID, p.ProductName, p.Price, p.ImagePath
         FROM cart c
         JOIN products p ON c.productId = p.ProductID
         WHERE c.userId = ?`,
        [userId]
    );
    return rows;
}

// ✅ 장바구니 항목 삭제
async function removeFromCart(cartId) {
    const [result] = await db.query(
        `DELETE FROM cart WHERE id = ?`,
        [cartId]
    );
    return result;
}

module.exports = {
    addToCart,
    getCartByUser,
    removeFromCart
};
