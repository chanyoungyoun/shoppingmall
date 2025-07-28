const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
require('dotenv').config();

// 📦 라우터 연결
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const paymentRoutes = require('./routes/payment');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ logs 디렉토리 없으면 생성
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// ✅ access.log 파일에 기록할 write stream 생성
const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), { flags: 'a' });


morgan.token('originalUrl', (req) => req.originalUrl);

// ✅ 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ morgan 미들웨어 (이미지 등 제외)
app.use(morgan(
  ':remote-addr :date[iso] ":method :originalUrl HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
  {
    skip: (req) =>
      req.url.startsWith('/uploads'),
    stream: accessLogStream
  }
));


// ✅ 미들웨어 등록
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ 라우팅 등록
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/payment', paymentRoutes);

// ✅ 루트 접속 시 index.html 제공
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
