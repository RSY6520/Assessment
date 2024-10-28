FROM node:16.13.2
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
ENTRYPOINT [ "node", "/app/src/index.js" ]