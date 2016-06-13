# meteor-production-docker-example

This image runs an example meteor app in a production setup

## Build:
    docker build -t meteor-production-docker-example

## Push:
    docker push user/meteor-production-docker-example:tag
If you want to push the image to one of your repositories at https://hub.docker.com, replace user with your own username and set the correct tag


## Usage:

    docker run -d \
        --env MONGO_OPLOG_URL=mongodb://list,of,ips/local?authSource=admin \
        --env MONGO_URL=mongodb://list,of,ips:mongoport/db-name?replicaSet=rs0&readPreference=primaryPreferred&w=majority \
        --env ROOT_URL=http://localhost \
        meteor-production-docker-example

Replace `list,of,ips` with your list of mongodb IPs in your replica set, if you do not have a mongo server, you may use compose.io for testing, or setup a mongo replica set using [mongo-replica-set](https://github.com/popestepheng/mongo-replica-set "mongo-replica-set") 

Replace `mongoport` accordingly, most likely default port of `27017`

Replace `http://localhost` with your app url

Alternatively you can set it up via [cloud.docker](https://cloud.docker.com/, "cloud.docker.com") once you have pushed the image in one of your repositories

## Parameters

### Minimum requirements

    MONGO_OPLOG_URL the oplog url for a mongodb replica set
    MONGO_URL       the mongo connection url used for a meteor production deployment
    ROOT_URL        the url of the meteor app

### Haproxy requirements - to be used in a cloud.docker.com in combination with haproxy load balancer
    COOKIE          for haproxy, this is set to `SRV insert indirect nocache`
    FORCE_SSL       true or false, indicates if http access should redirect to https 
    VIRTUAL_HOST    the hostname for the app, if using ssl, provide both protocols as `http://my-app.com,https://my-app.com`

### Any meteor environment variables

You can add any other environment variables you might need, oauth service keys like googleClientId and googleSecret, MAIL_URL etc.
