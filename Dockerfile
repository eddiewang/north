FROM node:boron

RUN groupadd -r nodejs && useradd -m -r -g nodejs nodejs
USER nodejs
RUN mkdir -p /home/nodejs/app
WORKDIR /home/nodejs/app

COPY package.json /home/nodejs/app/package.json
COPY yarn.lock /home/nodejs/app/yarn.lock
# Install app dependencies
RUN yarn

COPY . /home/nodejs/app

# RUN npm rebuild node-sass

EXPOSE 3000
CMD [ "npm", "start" ]
