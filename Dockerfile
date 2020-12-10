
FROM node:10-alpine

RUN mkdir -p /var/www/hurom/client/node_modules && chown -R node:node /var/www/hurom/client

WORKDIR /var/www/hurom/client

COPY package*.json ./

RUN npm install
RUN npm run build

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm", "start" ]
