
FROM node:10-alpine

RUN mkdir -p /var/www/hurom/client/node_modules && chown -R node:node /var/www/hurom/client

WORKDIR /var/www/hurom/client

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .
RUN npm run build
EXPOSE 3000

CMD [ "npm", "start" ]
