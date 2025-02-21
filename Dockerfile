FROM node:19 AS builder

WORKDIR /app

COPY package*.json ./
COPY /swagger ./swagger
COPY config ./config
COPY migrations ./migrations
COPY seeders ./seeders

RUN npm install

COPY . .

RUN npm run build


FROM node:19-alpine AS production

WORKDIR /app

COPY package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/swagger ./dist/swagger
COPY --from=builder /app/config ./dist/config
COPY --from=builder /app/migrations ./dist/migrations
COPY --from=builder /app/seeders ./dist/seeders

EXPOSE 3000

CMD ["node", "dist/src/app.js"]