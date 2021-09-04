# Common build stage
FROM node:14.14.0-alpine3.12 as common-build-stage

COPY . ./app

WORKDIR /app

RUN npm install
RUN npm run build

EXPOSE 3000

# Production build stage
FROM common-build-stage as production-build-stage

RUN mkdir -p "$UPLOADS_DIR"

CMD ["npm", "run", "start"]
