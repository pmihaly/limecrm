# Common build stage
FROM node:14.14.0-alpine3.12

COPY . ./app

WORKDIR /app

RUN npm install
RUN npm run build

ENV NODE_ENV production

ENV UPLOADS_DIR /var/www/public
RUN mkdir -p "$UPLOADS_DIR"

EXPOSE 3000

CMD ["npm", "run", "start"]
