const express = require('express');
const serverless = require('serverless-http');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

// Cấu hình kết nối MySQL từ biến môi trường
const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'techtop-journey',
  port: process.env.DB_PORT || 3306,
};

// Endpoint để lấy danh sách tour (tương tự fetchTours trong Swiper.tsx)
app.get('/tours', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT id, name AS title, description, thumbnail AS imageSrc FROM tours WHERE status = "active" LIMIT 4');
    await connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tours', details: error.message });
  }
});

// Export handler cho Netlify
module.exports.handler = serverless(app);