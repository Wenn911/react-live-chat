start-backend:
	npx start-server
start-frontend:
	make -C frontend start
start:
	make start-backend & make start-frontend
deploy:
	git push heroku main
install: 
	npm install