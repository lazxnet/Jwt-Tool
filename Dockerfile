FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --silent

COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=build /app/dist ./dist
RUN npm install -g serve --silent
EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80"]