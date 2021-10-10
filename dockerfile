FROM node:15.6 AS build-deps
# Add a work directory
WORKDIR /usr/src/app
# Cache and Install dependencies
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
