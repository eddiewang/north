FROM node:boron

# Bundle APP files
COPY . / src/
COPY package.json src/

WORKDIR src
# Install app dependencies
RUN npm install && npm run build

EXPOSE 3000
CMD [ "npm", "start" ]
