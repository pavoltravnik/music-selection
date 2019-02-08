# React app for voting for the good music tracks

This simple application is designed to simply to choose the best Creative Commons music tracks.

Available at [popoluska.paralelnapolis.sk](http://popoluska.paralelnapolis.sk)

Dependencies:
- nodejs
- npm
- mongodb

and run `npm i` for installing npm dependencies in parend and be directory.

## npm start

For hot reload developing

```
npm start
```

## npm build

You can simply build this app by

```
npm run build
```



## install MongoDB and Node on Debian 9
```
apt install curl
curl https://www.mongodb.org/static/pgp/server-4.0.asc |  apt-key add -
echo "deb http://repo.mongodb.org/apt/debian stretch/mongodb-org/4.0 main" >> /etc/apt/sources.list.d/mongodb-org-4.0.list

apt update
apt-get install mongodb-org nodejs libcurl3 openssl -y
systemctl enable mongod
systemctl start mongod
systemctl status mongod
```