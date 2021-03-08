FROM node:latest

COPY . /app
WORKDIR /app

EXPOSE 8080

RUN yarn install

CMD ["node","src/index.js"]
