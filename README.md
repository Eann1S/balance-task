# Balance Management API

Микросервис для управления балансом пользователей с поддержкой конкурентных операций

## Особенности
- Обработка 10 000+ одновременных запросов
- ACID-совместимые транзакции с PostgreSQL
- Автоматическая документация API через Swagger
- Контейнеризация с Docker
- Миграции и сидирование базы данных

## Технологии
- Node.js
- Express
- PostgreSQL
- Sequelize
- Docker

## Требования
- Node.js 18+
- Docker 24+ (опционально)
- PostgreSQL 15+

## Установка

1. Клонировать репозиторий:
```bash
git clone https://github.com/yourusername/balance-task.git
cd balance-task
```

2. Установить зависимости:
```bash
npm install
```

3. Настроить окружение:
```bash
cp .env.example .env
```

## Запуск приложения

### С использованием Docker
```bash
docker-compose up --build
```

### Без Docker
1. Запустить PostgreSQL
2. Выполнить миграции:
```bash
npm run migrate
npm run seed
```
3. Запустить приложение:
```bash
npm run start:dev
```


## API Endpoints
- `POST /api/update-balance` - Обновление баланса пользователя

Пример запроса:
```json
{
"userId": 1,
"amount": -2
}
```

Пример ответа:
```json
{
"balance": 100
}
```

Документация API доступна по адресу:  
`http://localhost:3000/api-docs`

## Тестирование
### e2e-тесты
```bash
npm run test:e2e
```
