resource "google_cloud_run_service" "backend" {
  name     = var.serviceName
  location = var.region

  template {
    spec {
      containers {
        image = var.imageBackend
      }
    }
  }

  autogenerate_revision_name = true
}
