
# Blog

Application created by [ThinkJS](http://www.thinkjs.org)

## Install dependencies

```
npm install
```

## Start server

```
npm start
```

## Deploy with pm2

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload pm2.json
```

## Deploy manual

```
# `disown` is for zsh shell
nohup node production.js & disown
```

## Deploy with docker

```
ENV=prod ./deploy.sh up
```

## Get ssl certification

```
./cert.sh run
```
