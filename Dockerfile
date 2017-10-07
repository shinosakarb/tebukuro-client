FROM node:7-alpine

RUN mkdir /client
WORKDIR /client
ADD package.json /client/package.json
ADD yarn.lock /client/yarn.lock
RUN yarn install
ADD . /client
