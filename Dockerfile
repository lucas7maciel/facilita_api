FROM node:latest

WORKDIR /api

COPY . .
COPY ./.env.production ./.env

RUN npm install --quiet --no-optional --no-fund --loglevel=error

EXPOSE 3001

CMD ["node", "index"]