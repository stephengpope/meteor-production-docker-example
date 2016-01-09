FROM ubuntu:14.04

MAINTAINER Stephen Pope, spope@projectricochet.com

RUN apt-get update -q
RUN apt-get install curl -y

RUN curl https://install.meteor.com/ | sh

RUN curl https://nodejs.org/dist/v0.10.40/node-v0.10.40-linux-x64.tar.gz > /root/node-linux-x64.tar.gz
RUN cd /usr/local && tar --strip-components 1 -xzf /root/node-linux-x64.tar.gz

RUN npm install -g forever

RUN mkdir /home/meteorapp

WORKDIR /home/meteorapp

ADD app ./app

RUN cd app && meteor build ../build --directory

RUN cd build/bundle/programs/server && npm install

EXPOSE 80
CMD ["forever", "--minUptime", "1000", "--spinSleepTime", "1000", "build/bundle/main.js"]
