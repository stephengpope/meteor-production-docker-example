FROM nginx

MAINTAINER Stephen Pope, spope@projectricochet.com

RUN apt-get update -q
RUN apt-get install curl -y

RUN curl https://install.meteor.com/ | sh

RUN curl https://nodejs.org/dist/v0.10.40/node-v0.10.40-linux-x64.tar.gz > /root/node-linux-x64.tar.gz
RUN cd /usr/local && tar --strip-components 1 -xzf /root/node-linux-x64.tar.gz

RUN npm install -g forever
RUN npm install -g iron-meteor

RUN mkdir /home/meteorapp

WORKDIR /home/meteorapp

ADD . ./meteorapp

RUN cd meteorapp && iron build

RUN cd meteorapp/build/bundle/programs/server && npm install

# Create SSL certificates
#RUN mkdir /etc/nginx/ssl
#RUN openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 -subj "/C=/ST=/L=/O=/CN=meteor.example.com" -keyout "/etc/nginx/ssl/load-balancer-server.key" -out "/etc/nginx/ssl/load-balancer-server.crt"

# Copy custom configuration file from the current directory
#RUN rm -f /etc/nginx/conf.d/default.conf
#COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
#EXPOSE 443

CMD forever --minUptime 1000 --spinSleepTime 1000 meteorapp/build/bundle/main.js
