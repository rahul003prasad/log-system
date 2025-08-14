# Build stage
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy build output to nginx html folder
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copy custom nginx config if needed or use default

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
