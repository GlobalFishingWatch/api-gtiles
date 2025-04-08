provider "google" {
  project = "gfw-int-infrastructure"
}


module "develop" {
  source            = "../cloudbuild-template"
  project_id        = "gfw-development"
  docker_image      = "us-central1-docker.pkg.dev/gfw-int-infrastructure/api/api-gtiles:latest-dev"
  api_name          = "api-gtiles"
  short_environment = "dev"
  service_account   = "api-gtiles-dev@gfw-development.iam.gserviceaccount.com"
  push_config = {
    branch       = "develop"
    invert_regex = false
  }
  labels = {
    environment      = "develop"
    resource_creator = "engineering"
    project          = "api"
  }
  vpc_connector = "internal-vpc-connector"
  set_env_vars = [
    "NODE_ENV=production",
    "LOG_LEVEL=warn",
    "REDIS_CONNECTION_STRING=redis://10.233.65.251:6379",
    "REDIS_NAMESPACE=dev-api-gtiles"
  ]
  set_secrets = [
    "ADMIN_TOKEN=projects/706952489382/secrets/ADMIN_TOKEN/versions/latest",
    "GOOGLE_MAPS_API_KEY=projects/706952489382/secrets/ADMIN_TOKEN/versions/latest"
  ]
}

module "staging" {
  source            = "../cloudbuild-template"
  project_id        = "gfw-development"
  docker_image      = "us-central1-docker.pkg.dev/gfw-int-infrastructure/api/api-gtiles:latest-sta"
  api_name          = "api-gtiles"
  short_environment = "sta"
  service_account   = "api-gtiles-sta@gfw-development.iam.gserviceaccount.com"
  push_config = {
    branch       = "staging"
    invert_regex = false
  }
  labels = {
    environment      = "staging"
    resource_creator = "engineering"
    project          = "api"
  }
  vpc_connector = "internal-vpc-connector"
  set_env_vars = [
    "NODE_ENV=production",
    "LOG_LEVEL=warn",
    "REDIS_CONNECTION_STRING=redis://10.233.65.251:6379",
    "REDIS_NAMESPACE=sta-api-gtiles"
  ]
  set_secrets = [
    "ADMIN_TOKEN=projects/706952489382/secrets/ADMIN_TOKEN/versions/latest",
    "GOOGLE_MAPS_API_KEY=projects/706952489382/secrets/ADMIN_TOKEN/versions/latest"
  ]
}


module "production" {
  source            = "../cloudbuild-template"
  project_id        = "gfw-production"
  docker_image      = "us-central1-docker.pkg.dev/gfw-int-infrastructure/api/api-gtiles:latest-pro"
  api_name          = "api-gtiles"
  short_environment = "pro"
  service_account   = "api-gtiles-pro@gfw-production.iam.gserviceaccount.com"
  push_config = {
    branch       = "master"
    invert_regex = false
  }
  labels = {
    environment      = "production"
    resource_creator = "engineering"
    project          = "api"
  }
  vpc_connector = "internal-vpc-connector"
  set_env_vars = [
    "NODE_ENV=production",
    "LOG_LEVEL=warn",
    "REDIS_CONNECTION_STRING=redis://10.97.70.99:6379",
    "REDIS_NAMESPACE=pro-api-gtiles"
  ]
  set_secrets = [
    "ADMIN_TOKEN=projects/674016975526/secrets/ADMIN_TOKEN/versions/latest",
    "GOOGLE_MAPS_API_KEY=projects/674016975526/secrets/ADMIN_TOKEN/versions/latest"
  ]
}
