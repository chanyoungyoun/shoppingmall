const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // ✅ 추가
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'; // ✅ 시크릿 키

// ✅ 회원가입
async function signup(req, res) {
  try {
    const {
      userType,
      userName,
      id,
      pwd,
      email,
      contact,
      address
    } = req.body;

    if (!userType || !userName || !id || !pwd || !email || !contact || !address) {
      return res.status(400).json({ message: '모든 항목을 입력해 주세요.' });
    }

    const hashedPwd = await bcrypt.hash(pwd, 10);

    const result = await userModel.createUser({
      userType,
      userName,
      id,
      pwd: hashedPwd,
      email,
      contact,
      address
    });

    res.status(201).json({
      message: '회원가입이 완료되었습니다.',
      userNumber: result.insertId
    });
  } catch (error) {
    console.error('회원가입 오류:', error);
    res.status(500).json({ message: '서버 오류 발생' });
  }
}

// ✅ 로그인
async function login(req, res) {
  try {
    const { id, pwd } = req.body;

    if (!id || !pwd) {
      return res.status(400).json({ message: '아이디와 비밀번호를 입력해 주세요.' });
    }

    const user = await userModel.findUserByID(id);
    if (!user) {
      return res.status(404).json({ message: '존재하지 않는 사용자입니다.' });
    }

    const passwordMatch = await bcrypt.compare(pwd, user.PWD);
    if (!passwordMatch) {
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    // ✅ JWT 생성
    const token = jwt.sign(
      {
        userId: user.UserNumber,
        role: user.UserType
      },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({
      message: '로그인 성공',
      token, // ✅ 추가됨
      user: {
        userNumber: user.UserNumber,
        userName: user.UserName,
        userType: user.UserType,
        email: user.Email,
        contact: user.Contact,
        address: user.Address
      }
    });
  } catch (error) {
    console.error('로그인 오류:', error);
    res.status(500).json({ message: '서버 오류 발생' });
  }
}

// ✅ 특정 사용자 조회
async function getUserByNumber(req, res) {
  try {
    const userNumber = req.params.userNumber;

    const user = await userModel.getUserByNumber(userNumber);
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    res.json(user);
  } catch (error) {
    console.error('사용자 조회 오류:', error);
    res.status(500).json({ message: '서버 오류 발생' });
  }
}

// ✅ 전체 사용자 조회 (관리자용)
async function getAllUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('전체 사용자 조회 오류:', error);
    res.status(500).json({ message: '서버 오류 발생' });
  }
}

async function updateUser(req, res) {
  try {
    const userNumber = req.params.userNumber;
    const updates = req.body;

    const result = await userModel.updateUser(userNumber, updates);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    res.json({ message: '정보가 성공적으로 수정되었습니다.' });
  } catch (error) {
    console.error('정보 수정 오류:', error);
    res.status(500).json({ message: '서버 오류 발생', error: error.message });
  }
}

module.exports = {
  signup,
  login,
  getUserByNumber,
  getAllUsers,
  updateUser
};
