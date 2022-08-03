start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

deploy:
	git push heroku main
install:
	npm ci
	make -C frontend install
build:
	make -C frontend build