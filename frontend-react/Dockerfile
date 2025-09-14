# Стадия сборки
FROM node:20.9.0-alpine AS build
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build

# Стадия запуска (nginx)
FROM nginx:alpine

# Копируем собранные файлы из предыдущей стадии
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфиг nginx (если он у тебя есть)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
