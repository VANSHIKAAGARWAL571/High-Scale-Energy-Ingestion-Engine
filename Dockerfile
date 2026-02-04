# Build stage
FROM node:22.16.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]
