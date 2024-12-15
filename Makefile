.PHONY: install

install:
	@make create-network
	@make run-mongodb
	@make run-backend
	@make run-frontend

create-network:
	docker network create appfyt-network || true

run-mongodb:
	docker pull paulperigault/mongodb:latest
	docker run -d --name mongodbappfyt --network appfyt-network -p 27017:27017 paulperigault/mongodb:latest

run-backend:
	docker pull paulperigault/backendfytapp:latest
	docker run -d --name backendappfyt --network appfyt-network -p 3000:3000 paulperigault/backendfytapp:latest

run-frontend:
	docker pull paulperigault/frontendfytapp:latest
	docker run -d --name frontendappfyt --network appfyt-network -p 80:80 paulperigault/frontendfytapp:latest
