#!/bin/bash
#Create All Ind. Parts necessary to make 4 variations of pens
#Create Top Level Pen Assembly Parts
curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"1","name":"Metal Barrel Red Pen"}'

curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"2","name":"Metal Barrel Black Pen"}'

curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 09265cdb-d401-4b75-8b64-0f01d1f21d91' \
  -H 'cache-control: no-cache' \
  -d '{"id":"3","name":"Plastic Barrel Red Pen"}'

curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"4","name":"Plastic Barrel Black Pen"}'

#Pen Sub Assemblies
curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"5","name":"Black Ink Cartridge"}'

curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"6","name":"Red Ink Cartdridge"}'

curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"7","name":"Metal Barrel Top"}'

curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"8","name":"Plastic Barrel Top"}'

curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"23","name":"Metal Barrel Bottom"}'

curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"9","name":"Plastic Barrel Bottom"}'

#Ink Cartridge Sub Assembly Components
curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"10","name":"Cartridge Body"}'

curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"11","name":"Cartridge Cap"}'

curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"12","name":"Writing Tip"}'

curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"13","name":"Red Ink"}'

curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"14","name":"Black Ink"}'

#Barrel Bottom Components
curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"15","name":"Rubber Grip"}'

#Barrel Top Components
curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"16","name":"Pocket Clip"}'

#Pen Components
curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"17","name":"Thruster"}'

curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"18","name":"Cam"}'

curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"19","name":"Spring"}'

#Orphan Parts (for packaging purposes)
curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"20","name":"Box Top"}'

curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"21","name":"Box Bottom"}'

curl -X POST \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0d7946af-0434-4a9f-b488-fbfbc424c7b6' \
  -H 'cache-control: no-cache' \
  -d '{"id":"22","name":"Box Insert"}'