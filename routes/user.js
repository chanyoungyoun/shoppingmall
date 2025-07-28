const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// ✅ 사용자 회원가입
router.post('/signup', userController.signup);

// ✅ 사용자 로그인
router.post('/login', userController.login);

// ✅ 사용자 단건 조회
router.get('/:userNumber', userController.getUserByNumber);

// ✅ 전체 사용자 목록 조회 (관리자 전용)
router.get('/', userController.getAllUsers);

// 사용자 정보 수정
router.put('/:userNumber', userController.updateUser);

module.exports = router;
