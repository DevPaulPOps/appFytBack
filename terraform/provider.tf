provider "google" {
  credentials = file("account.json")
  project     = var.projectID
  region      = var.region
}
