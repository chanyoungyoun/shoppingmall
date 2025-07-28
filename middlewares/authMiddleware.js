const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'; // 환경변수로 분리 추천

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '인증 토큰이 없습니다.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // 여기서 userId 등을 추출
    next();
  } catch (error) {
    console.error('JWT 검증 실패:', error);
    return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
  }
}

module.exports = authenticateJWT;
