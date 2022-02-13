start :
	json-server data/ebetor.json -p 3001 >> ./json-server.log 2>&1 </dev/null &
	npm run start
