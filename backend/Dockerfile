FROM node:22

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV PORT=3000

ENV DATABASE_URL="mysql://root:password@host.docker.internal:3307/campaignview"

EXPOSE 3000

CMD [ "npm", "run", "init" ]
