
# docker-nodejs-tsc-starter

A template for server-side node.js web apps written in TypeScript. Includes development and production modes which run as separate docker containers.

## Requirements

Newer versions of:
* docker
* docker-compose


## Usage
Clone this repository.


## Configuration

Set environment variable `PROJECT_NAME` in `project.env`. This serves as a prefix for the resultant docker containers.


## Build Containers
### Development
```
./docker/build-dev && ./docker/stop-dev && ./docker/start-dev
```

### Production
```
./docker/build && ./docker/stop && ./docker/start
```


## Start in Development Mode
```
./docker/start-dev
```
This fires up [tsc-watch](https://www.npmjs.com/package/tsc-watch) that monitors TypeScript files in `./app/src` directory for changes. On compilation of `.ts` files, `node` is run in the `./app/dist` directory with the debugger enabled (`--inspect=0.0.0.0:9229`). See [Attach to Docker](https://github.com/shirish87/docker-nodejs-tsc-starter/blob/03025a5/.vscode/launch.json) VS Code task.


## Start in Production Mode
```
./docker/start
```
Runs `tsc` to compile `.ts` in `./app/src` to `.js` in `./app/dist` and runs the node server (`NODE_ENV=production`).


## Other scripts

* `./docker/stop[-dev]` Stops the docker container(s)
* `./docker/logs[-dev]` Tail logs from container(s)
* `./docker/shell[-dev] <service_name>` Starts bash in the specified container (`${PROJECT_NAME}_<service_name>_1`)


## Credits

* [node-docker-good-defaults](https://github.com/BretFisher/node-docker-good-defaults)
