const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Обслуговування статичних файлів з поточної директорії
app.use(express.static(__dirname));

// Маршрут для головної сторінки
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="uk">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bootstrap Project Home</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-md-8 text-center">
                        <h1 class="mb-4">Проєкт адаптивної розмітки Bootstrap</h1>
                        <p class="lead mb-4">Оберіть завдання для перегляду:</p>
                        <div class="d-grid gap-3 d-md-block">
                            <a href="/task1" class="btn btn-primary btn-lg me-md-3">
                                Завдання 1 - Базова адаптивна розмітка
                            </a>
                            <a href="/task2" class="btn btn-success btn-lg">
                                Завдання 2 - Розширена адаптивна розмітка
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `);
});

// Маршрут для Завдання 1
app.get('/task1', (req, res) => {
    res.sendFile(path.join(__dirname, 'task1.html'));
});

// Маршрут для Завдання 2
app.get('/task2', (req, res) => {
    res.sendFile(path.join(__dirname, 'task2.html'));
});

// Обробник 404 помилки
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="uk">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 - Сторінку не знайдено</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-md-6 text-center">
                        <h1 class="display-1">404</h1>
                        <h2>Сторінку не знайдено</h2>
                        <p class="lead">Вибачте, запитувана сторінка не існує.</p>
                        <a href="/" class="btn btn-primary">Повернутися на головну</a>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `);
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
    console.log('Доступні маршрути:');
    console.log('- http://localhost:' + PORT + '/ (Головна сторінка)');
    console.log('- http://localhost:' + PORT + '/task1 (Завдання 1)');
    console.log('- http://localhost:' + PORT + '/task2 (Завдання 2)');
});

// Коректне завершення роботи
process.on('SIGINT', () => {
    console.log('\nЗавершення роботи сервера...');
    process.exit(0);
});