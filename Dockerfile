
FROM node:10-alpine

RUN mkdir -p /var/www/hurom/client/node_modules && chown -R node:node /var/www/hurom/client

WORKDIR /var/www/hurom/client

COPY package*.json ./
RUN yarn install
COPY --chown=node:node . .

RUN yarn sitemap
RUN yarn feed
RUN yarn build

EXPOSE 3000

CMD [ "npm", "start" ]
