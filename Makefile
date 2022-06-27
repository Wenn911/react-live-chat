start-backend:
	npx start-server
start-frontend:
	cd frontend && npm start
start: 
	npx start-server && cd frontend && npm start
install: 
	npm install