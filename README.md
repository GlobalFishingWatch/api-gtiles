# API GTiles

An API microservice which serves as a proxy to the new Google Maps Tiles API.

## Tech stack

This is a [nodejs](https://nodejs.org/en/) express application built using [swagger-node](https://github.com/swagger-api/swagger-node).

## Development

### Prerequisites

We use a dockerized development environment, so you will need [docker](https://www.docker.com/) on your machine and also [docker-compose](https://docs.docker.com/compose/install/). No other dependencies are required in your machine.

### Configuration

The `dev` folder is ignored in git, and is expected to contain private configuration settings and files. At the bare minimum you'll need to:

* Create an environment file at `dev/env`, where you define environment variables available inside the docker container. Most configuration settings already contain a default, sensible value, but some settings are private (api keys and such), and so you need to set them up yourself. Start the application and it will guide you through the different settings that you need to define.  This file is a [standard docker environment file](https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables-e-env-env-file).

* Create a service account to allow your development server access to the Google Cloud services, and download the json key file into `dev/key.json`.  See [here](https://googlecloudplatform.github.io/gcloud-node/#/docs/v0.36.0/guides/authentication) for more information on how to generate a json key file.

### Common tasks

This is a standard docker-compose project, so you can start all the necessary connected containers using `docker-compose up`. This will build images as needed and start a docker cluster with the webserver running on your local port 8080, and the debugging port open on your local port 5858.

If you need to run any npm-specific commands, run them inside the cluster with `docker-compose run web [COMMAND]`.

## License

Copyright 2017 Global Fishing Watch

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

