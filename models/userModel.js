const db = require('../db');

// ✅ 사용자 생성 (회원가입)
async function createUser(user) {
  const {
    userType,
    userName,
    id,
    pwd,
    email,
    contact,
    address
  } = user;

  const [result] = await db.query(
    `INSERT INTO Users 
     (UserType, UserName, ID, PWD, Email, Contact, Address) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [userType, userName, id, pwd, email, contact, address]
  );
  return result;
}

// ✅ ID로 사용자 조회 (로그인용)
async function findUserByID(id) {
  const [rows] = await db.query(
    'SELECT * FROM Users WHERE ID = ?',
    [id]
  );
  return rows[0];
}

// ✅ 전체 사용자 조회 (관리자 전용)
async function getAllUsers() {
  const [rows] = await db.query('SELECT * FROM Users');
  return rows;
}

// ✅ 사용자 번호로 조회
async function getUserByNumber(userNumber) {
  const [rows] = await db.query(
    'SELECT * FROM Users WHERE UserNumber = ?',
    [userNumber]
  );
  return rows[0];
}

async function updateUser(userNumber, updates) {
  const sql = `
    UPDATE Users 
    SET UserName = ?, Email = ?, Contact = ?, Address = ? 
    WHERE UserNumber = ?
  `;
  const values = [updates.userName, updates.email, updates.contact, updates.address, userNumber];

  try {
    const [result] = await db.query(sql, values);
    return result; // 또는 result.affectedRows 확인해도 됨
  } catch (err) {
    console.error("DB updateUser 오류:", err.message);
    throw err; // 컨트롤러에서 catch 하게 위임
  }
}


module.exports = {
  createUser,
  findUserByID,
  getAllUsers,
  getUserByNumber,
  updateUser
};
