const { Telegraf } = require('telegraf');
const express = require('express');

// Конфигурация
const BOT_TOKEN = process.env.BOT_TOKEN || '8480976603:AAEcYvQ51AEQqeVtaJDypGfg_xMcO7ar2rI';
const PORT = process.env.PORT || 3000;

// Google Drive изображения
const DRIVE_FILE_IDS = {
  '1': '1BvQZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8',
  '2': '1CvQZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8',
  '3': '1DvQZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8',
  '4': '1EvQZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8',
  '5': '1FvQZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8',
  '6': '1GvQZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8',
  '7': '1HvQZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8',
  '8': '1IvQZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8',
  '9': '1JvQZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8',
  '10': '1KvQZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8'
};

// Создание бота
const bot = new Telegraf(BOT_TOKEN);

// Создание Express приложения
const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// Функция получения URL изображений
function getImageUrls() {
  const urls = {};
  for (const [key, fileId] of Object.entries(DRIVE_FILE_IDS)) {
    urls[key] = `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  return urls;
}

// Маршруты Express
app.get('/', (req, res) => {
  res.json({
    status: 'Bot is running!',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      images: '/api/images'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/images', (req, res) => {
  const imageUrls = getImageUrls();
  res.json({
    status: 'success',
    images: imageUrls,
    count: Object.keys(imageUrls).length
  });
});

// Обработчики бота
bot.start((ctx) => {
  ctx.reply('🎮 Добро пожаловать в игру "Энергия Денег"!\n\nИспользуйте /game для начала игры.');
});

bot.command('game', (ctx) => {
  const imageUrls = getImageUrls();
  const randomKey = Math.floor(Math.random() * Object.keys(imageUrls).length) + 1;
  const imageUrl = imageUrls[randomKey.toString()];
  
  ctx.replyWithPhoto(imageUrl, {
    caption: `🎯 Игровая карта #${randomKey}\n\nИспользуйте /game для следующей карты!`
  });
});

bot.command('images', (ctx) => {
  const imageUrls = getImageUrls();
  let message = '🖼️ Доступные изображения:\n\n';
  
  for (const [key, url] of Object.entries(imageUrls)) {
    message += `${key}: ${url}\n`;
  }
  
  ctx.reply(message);
});

bot.command('help', (ctx) => {
  ctx.reply(`
🎮 Команды бота:

/start - Начать работу с ботом
/game - Получить случайную игровую карту
/images - Показать все доступные изображения
/help - Показать эту справку

🌐 Веб-интерфейс:
https://botenergy-7to1.onrender.com/
  `);
});

// Обработка ошибок
bot.catch((err, ctx) => {
  console.error('Bot error:', err);
  ctx.reply('❌ Произошла ошибка. Попробуйте позже.');
});

// Запуск Express сервера
app.listen(PORT, () => {
  console.log(`🚀 Express server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`📸 Images API: http://localhost:${PORT}/api/images`);
});

// Запуск бота
bot.launch()
  .then(() => {
    console.log('🤖 Bot started successfully!');
    console.log(`📱 Bot token: ${BOT_TOKEN.substring(0, 10)}...`);
  })
  .catch((err) => {
    console.error('❌ Bot failed to start:', err);
    process.exit(1);
  });

// Graceful shutdown
process.once('SIGINT', () => {
  console.log('🛑 Shutting down bot...');
  bot.stop('SIGINT');
  process.exit(0);
});

process.once('SIGTERM', () => {
  console.log('🛑 Shutting down bot...');
  bot.stop('SIGTERM');
  process.exit(0);
});
