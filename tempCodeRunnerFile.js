const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// 📦 라우터 연결
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const paymentRoutes = require('./routes/payment');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ 미들웨어 등록
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ 정적 파일 서빙 (HTML, CSS 등)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ 라우팅 등록
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/payments', paymentRoutes);

// ✅ 루트 접속 시 index.html 제공
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 전하의 쇼핑몰 서버가 ${PORT}번 포트에서 충성스럽게 실행 중입니다.`);
});
