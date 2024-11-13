const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Middleware для обработки CORS и JSON
app.use(cors());
app.use(bodyParser.json());

// Обработчик POST-запросов на /login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log('Received username:', username);
  console.log('Received password:', password);

  // Отправка ответа на клиент
  res.json({ message: 'Login data received successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

