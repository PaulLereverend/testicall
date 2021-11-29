# Stage 1 - the build process
FROM node:12.22-buster as compile-server
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

CMD [ "npm", "start" ]