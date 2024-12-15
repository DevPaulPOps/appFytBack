docker network create appfyt-network || true
docker pull paulperigault/mongodb:latest
docker run -d --name mongodbappfyt --network appfyt-network -p 27017:27017 paulperigault/mongodb:latest
docker pull paulperigault/backendfytapp:latest
docker run -d --name backendappfyt --network appfyt-network -p 3000:3000 paulperigault/backendfytapp:latest
docker pull paulperigault/frontendfytapp:latest
docker run -d --name frontendappfyt --network appfyt-network -p 80:80 paulperigault/frontendfytapp:latest
docker build -t paulperigault/frontendfytapp:latest .
docker tag paulperigault/frontendfytapp:latest paulperigault/frontendfytapp:latest
docker push paulperigault/frontendfytapp:latest 