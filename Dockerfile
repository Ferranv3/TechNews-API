# Stage 1 - the build process
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2 - the production environment
FROM node:14 as deploy
WORKDIR /app
COPY --from=build /app .
EXPOSE 8080
CMD ["node", "server.js"]
