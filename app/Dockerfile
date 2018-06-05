FROM node:8-slim

ENV TSC_VERSION 2.9.1

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT

RUN mkdir -p /opt/app /opt/node_modules
RUN npm install -g typescript@$TSC_VERSION

ENV PATH /opt/node_modules/.bin:$PATH
ENV NODE_PATH /opt/app:/opt/node_modules

WORKDIR /opt
COPY ./package.json ./package-lock*.json ./
RUN npm install --quiet --production

WORKDIR /opt/app
COPY . .

CMD [ "npm", "run", "start" ]
