output "backend_service_url" {
  value       = google_cloud_run_service.backend.status[0].url
  description = "The URL of the deployed backend Cloud Run service."
}

output "backend_service_project_id" {
  value       = var.projectID
  description = "The Project ID associated with the backend Cloud Run service."
}

output "backend_service_location" {
  value       = var.region
  description = "The region where the backend Cloud Run service is deployed."
}
