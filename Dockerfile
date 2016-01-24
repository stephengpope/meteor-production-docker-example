FROM ubuntu:14.04

MAINTAINER Stephen Pope, spope@projectricochet.com

RUN mkdir /home/meteorapp

WORKDIR /home/meteorapp

ADD . ./meteorapp

RUN apt-get update -q && apt-get clean

RUN apt-get install curl -y \
  && (curl https://install.meteor.com/ | sh) \

  # Build the app
  && cd /home/meteorapp/meteorapp/app \
  && meteor build ../build --directory \

  # Install the version of Node.js we need.
  && cd /home/meteorapp/meteorapp/build/bundle \
  && bash -c 'curl "https://nodejs.org/dist/$(<.node_version.txt)/node-$(<.node_version.txt)-linux-x64.tar.gz" > /root/node-linux-x64.tar.gz' \
  && cd /usr/local && tar --strip-components 1 -xzf /root/node-linux-x64.tar.gz \
  && rm /root/node-linux-x64.tar.gz \

  && cd /home/meteorapp/meteorapp/build/bundle/programs/server \
  && npm install \

  # Get rid of Meteor. We're done with it.
  && rm /usr/local/bin/meteor \
  && rm -rf ~/.meteor \

  #no longer need curl
  && apt-get --purge autoremove curl -y

RUN npm install -g forever

EXPOSE 80
ENV PORT 80

CMD ["forever", "--minUptime", "1000", "--spinSleepTime", "1000", "meteorapp/build/bundle/main.js"]
