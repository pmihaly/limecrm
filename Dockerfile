# Common build stage
FROM node:14.14.0-alpine3.12 as common-build-stage

COPY . ./app

WORKDIR /app

RUN npm install

RUN test -e frontend/.env || echo 'SKIP_PREFLIGHT_CHECK=true' > frontend/.env
RUN npm install --prefix frontend

EXPOSE 3000

# Development build stage
# FROM common-build-stage as development-build-stage

# ENV NODE_ENV development

# CMD ["npm", "run", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

ENV UPLOADS_DIR /var/www/public
RUN mkdir -p "$UPLOADS_DIR"

CMD ["npm", "run", "start"]
