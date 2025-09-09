# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve with Apache
FROM httpd:2.4
COPY --from=build /app/dist/ /usr/local/apache2/htdocs/
EXPOSE 80
