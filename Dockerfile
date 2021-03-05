FROM node:10

RUN mkdir /bridge

WORKDIR /bridge

COPY ./package.json ./package-lock.json ./
RUN npm install -g serverless
RUN npm install

COPY . .

EXPOSE 4000
CMD [ "serverless", "offline", "--host", "0.0.0.0" ]