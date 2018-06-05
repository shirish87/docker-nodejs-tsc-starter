
# docker-nodejs-tsc-starter

A template for server-side node.js web apps written in TypeScript. Includes development and production modes which run as separate docker containers.

> node, npm, node_modules are installed and stored in docker containers.

## Requirements

Newer versions of:
* docker
* docker-compose
* npm on host (only if you want `node_modules` stored on the host &ndash; for linters, debugging)


## Usage
```
* git clone git@github.com:shirish87/docker-nodejs-tsc-starter.git
* cd docker-nodejs-tsc-starter
* [OPTIONAL] Install node modules on the host so that IDEs can use it for code completion and linting
  - cd app && npm install && cd -
* ./docker/rebuild
```

## Configuration

* Set environment variable `PROJECT_NAME` in `project.env`. This serves as a prefix for the resultant docker containers
* Configure ports in `docker-compose.yml` (production) or `docker-compose.dev.yml` (development)


## Start in Development Mode
```
./docker/rebuild-dev
```
This fires up [tsc-watch](https://www.npmjs.com/package/tsc-watch) that monitors TypeScript files in `./app/src` directory for changes. On compilation of `.ts` files, `node` is run in the `./app/dist` directory with the debugger enabled (`--inspect=0.0.0.0:9229`). See [Attach to Docker](https://github.com/shirish87/docker-nodejs-tsc-starter/blob/03025a5/.vscode/launch.json) VS Code task.


## Start in Production Mode
```
./docker/rebuild
```
Runs `tsc` to compile `.ts` in `./app/src` to `.js` in `./app/dist` and runs the node server (`NODE_ENV=production`).


## Other scripts

* `./docker/start[-dev]` Starts the docker container(s)
* `./docker/stop[-dev]` Stops the docker container(s)
* `./docker/logs[-dev]` Tail logs from container(s)
* `./docker/shell[-dev] <service_name>` Starts bash in the specified container (`${PROJECT_NAME}_<service_name>_1`)


## Credits

* [node-docker-good-defaults](https://github.com/BretFisher/node-docker-good-defaults)
