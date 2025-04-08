variable "project_id" {
  description = "The project ID to deploy to"
  type        = string
}

variable "docker_image" {
  description = "The docker image to deploy"
  type        = string
}

variable "service_account" {
  description = "The service account to use"
  type        = string
}

variable "api_name" {
  description = "The name of the api"
  type        = string
}

variable "short_environment" {
  description = "The short environment (dev, staging)"
  type        = string
}

variable "set_env_vars" {
  description = "The environment variables to set"
  type        = list(string)
  default     = []
}

variable "set_secrets" {
  description = "The environment secrets to set"
  type        = list(string)
  default     = []
}
variable "cloud_sql_instances" {
  description = "The cloud sql instances to set"
  type        = list(string)
  default     = []
}

variable "labels" {
  description = "The labels to set"
  type        = map(string)
}

variable "push_config" {
  description = "The push config"
  type = object({
    branch       = optional(string)
    invert_regex = bool
    tag          = optional(string)
  })
}

variable "memory" {
  description = "The memory to use"
  type        = string
  default     = "2Gi"
}

variable "cpu" {
  description = "The CPU to use"
  type        = number
  default     = 1
}

variable "max_instances" {
  description = "Max instances to use in cloud run"
  type        = number
  default     = 100
}

variable "vpc_connector" {
  description = "The vpc connector to set"
  type        = string
  default     = null
}

variable "timeout" {
  description = "Max seconds of timeout to use in cloud run"
  type        = number
  default     = 300
}

variable "concurrency" {
  description = "Concurrency"
  type        = number
  default     = 80
}



