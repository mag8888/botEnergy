# 🤖 BotEnergy - Telegram Bot для игры "Энергия Денег"

## 📋 Описание
Telegram бот для игры "Энергия Денег" с интеграцией Google Drive для хранения изображений.

## 🚀 Возможности
- 🎮 Игровые карты через команду `/game`
- 🖼️ Интеграция с Google Drive для изображений
- 🌐 Веб-интерфейс с API
- 📊 Health check и мониторинг
- 🔄 Graceful shutdown

## 📦 Установка

### 1. Клонирование репозитория
```bash
git clone https://github.com/mag8888/botEnergy.git
cd botEnergy
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Настройка переменных окружения
Создайте файл `.env`:
```env
BOT_TOKEN=your_telegram_bot_token_here
PORT=3000
```

## 🎯 Использование

### Запуск бота
```bash
npm start
```

### Команды бота
- `/start` - Начать работу с ботом
- `/game` - Получить случайную игровую карту
- `/images` - Показать все доступные изображения
- `/help` - Показать справку

### Веб-интерфейс
- **Главная страница**: `http://localhost:3000/`
- **Health check**: `http://localhost:3000/health`
- **API изображений**: `http://localhost:3000/api/images`

## 🌐 Развертывание на Render

### 1. Создание сервиса
1. Перейдите на [Render Dashboard](https://dashboard.render.com)
2. Создайте новый **Web Service**
3. Подключите GitHub репозиторий

### 2. Настройки
- **Build Command**: `npm install`
- **Start Command**: `node bot.js`
- **Environment Variables**:
  - `BOT_TOKEN`: ваш токен Telegram бота
  - `PORT`: 3000 (автоматически устанавливается Render)

### 3. Переменные окружения
```env
BOT_TOKEN=8480976603:AAEcYvQ51AEQqeVtaJDypGfg_xMcO7ar2rI
```

## 📁 Структура проекта
```
botEnergy-final/
├── bot.js              # Основной файл бота
├── package.json        # Зависимости и скрипты
├── README.md          # Документация
└── .env               # Переменные окружения (создать)
```

## 🔧 Настройка Google Drive

### 1. Загрузка изображений
1. Загрузите изображения в Google Drive
2. Сделайте их доступными по ссылке
3. Извлеките ID файлов из ссылок

### 2. Обновление ID файлов
В файле `bot.js` обновите объект `DRIVE_FILE_IDS`:
```javascript
const DRIVE_FILE_IDS = {
  '1': 'your_google_drive_file_id_1',
  '2': 'your_google_drive_file_id_2',
  // ... остальные файлы
};
```

## 🛠️ Разработка

### Локальная разработка
```bash
npm run dev
```

### Логирование
Бот выводит подробные логи:
- Запуск сервера
- Статус бота
- Ошибки и предупреждения

## 📊 Мониторинг

### Health Check
```bash
curl https://your-app.onrender.com/health
```

### API изображений
```bash
curl https://your-app.onrender.com/api/images
```

## 🔒 Безопасность
- Токен бота хранится в переменных окружения
- Graceful shutdown для корректного завершения
- Обработка ошибок и исключений

## 📞 Поддержка
При возникновении проблем:
1. Проверьте логи в Render Dashboard
2. Убедитесь в правильности переменных окружения
3. Проверьте доступность Google Drive изображений

## 📄 Лицензия
MIT License

## 👨‍💻 Автор
Aurelia (@Aurelia_8888)
