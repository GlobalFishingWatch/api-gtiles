locals {
  cloudrun_name = "${var.short_environment != "pro" ? "${var.short_environment}-" : ""}${var.api_name}"
}

resource "google_cloudbuild_trigger" "trigger" {
  name     = "${var.api_name}-${var.push_config.branch != null ? var.push_config.branch : "tag"}"
  location = "us-central1"


  github {
    name  = "api-gtiles"
    owner = "GlobalFishingWatch"
    push {
      tag          = var.push_config.tag
      branch       = var.push_config.branch
      invert_regex = var.push_config.invert_regex
    }
  }

  service_account = "projects/gfw-int-infrastructure/serviceAccounts/cloudbuild@gfw-int-infrastructure.iam.gserviceaccount.com"
  build {

    step {
      id   = "docker build"
      name = "gcr.io/cloud-builders/docker"
      args = [
        "build",
        "-t",
        "${var.docker_image}",
        "."
      ]

    }

    step {
      id   = "docker push"
      name = "gcr.io/cloud-builders/docker"
      args = [
        "push",
        "${var.docker_image}"
      ]

    }

    step {
      id   = "cloud run deploy"
      name = "gcr.io/cloud-builders/gcloud"
      args = [
        "beta",
        "run",
        "deploy",
        "${local.cloudrun_name}",
        "--project",
        "${var.project_id}",
        "--image",
        "${var.docker_image}",
        "--region",
        "us-central1",
        "--no-allow-unauthenticated",
        "--platform",
        "managed",
        "--set-env-vars",
        "${join(",", var.set_env_vars)}",
        "--set-secrets",
        "${join(",", var.set_secrets)}",
        "${var.vpc_connector != null ? "--vpc-connector=${var.vpc_connector}" : "--clear-vpc-connector"}",
        "--max-instances", "${var.max_instances}",
        "--min-instances", "0",
        "--concurrency", "${var.concurrency}",
        "--timeout", "${var.timeout}",
        "--service-account", "${var.service_account}",
        "--memory", "${var.memory}",
        "--cpu", "${var.cpu}",
        "--labels", "${join(",", [for k, v in var.labels : "${k}=${v}"])}",
        "${length(var.cloud_sql_instances) > 0 ? "--set-cloudsql-instances=${join(",", var.cloud_sql_instances)}" : "--clear-cloudsql-instances"}",
      ]

    }

    step {
      id         = "clean revisions"
      name       = "gcr.io/cloud-builders/gcloud"
      entrypoint = "bash"
      args = [
        "-c",
        <<-EOF
          gcloud --project ${var.project_id} \
           run revisions list --service ${local.cloudrun_name} --region us-central1 \
           --format="value(metadata.name)" \
           --sort-by="~metadata.creationTimestamp" | tail -n +4 | xargs -n1 \
            -r gcloud --project ${var.project_id} run revisions delete --quiet --region us-central1
        EOF
      ]
    }
    options {
      logging = "CLOUD_LOGGING_ONLY"
    }
    timeout = "1200s"
  }
}
