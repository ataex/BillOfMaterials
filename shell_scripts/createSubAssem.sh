#!/bin/bash
#Create Sub Assemblies
#Black Ink Cartdridge
curl -X PUT \
  http://localhost:3000/assemblies/5 \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 916d3d4e-d0b0-4e99-bb76-61414523f876' \
  -H 'cache-control: no-cache' \
  -d '{"child":{"id":"10"}}'

curl -X PUT \
  http://localhost:3000/assemblies/5 \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 916d3d4e-d0b0-4e99-bb76-61414523f876' \
  -H 'cache-control: no-cache' \
  -d '{"child":{"id":"11"}}'

curl -X PUT \
  http://localhost:3000/assemblies/5 \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 916d3d4e-d0b0-4e99-bb76-61414523f876' \
  -H 'cache-control: no-cache' \
  -d '{"child":{"id":"12"}}'

curl -X PUT \
  http://localhost:3000/assemblies/5 \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 916d3d4e-d0b0-4e99-bb76-61414523f876' \
  -H 'cache-control: no-cache' \
  -d '{"child":{"id":"14"}}'

#Red Ink Cartdridge
curl -X PUT \
  http://localhost:3000/assemblies/6 \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 916d3d4e-d0b0-4e99-bb76-61414523f876' \
  -H 'cache-control: no-cache' \
  -d '{"child":{"id":"10"}}'

curl -X PUT \
  http://localhost:3000/assemblies/6 \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 916d3d4e-d0b0-4e99-bb76-61414523f876' \
  -H 'cache-control: no-cache' \
  -d '{"child":{"id":"11"}}'

curl -X PUT \
  http://localhost:3000/assemblies/6 \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 916d3d4e-d0b0-4e99-bb76-61414523f876' \
  -H 'cache-control: no-cache' \
  -d '{"child":{"id":"12"}}'

curl -X PUT \
  http://localhost:3000/assemblies/6 \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 916d3d4e-d0b0-4e99-bb76-61414523f876' \
  -H 'cache-control: no-cache' \
  -d '{"child":{"id":"13"}}'

#Metal Barrel Top
curl -X PUT \
  http://localhost:3000/assemblies/7 \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 916d3d4e-d0b0-4e99-bb76-61414523f876' \
  -H 'cache-control: no-cache' \
  -d '{"child":{"id":"16"}}'

#Metal Barrel Bottom
curl -X PUT \
  http://localhost:3000/assemblies/23 \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 916d3d4e-d0b0-4e99-bb76-61414523f876' \
  -H 'cache-control: no-cache' \
  -d '{"child":{"id":"15"}}'

#Plastic Barrel Top
curl -X PUT \
  http://localhost:3000/assemblies/8 \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 916d3d4e-d0b0-4e99-bb76-61414523f876' \
  -H 'cache-control: no-cache' \
  -d '{"child":{"id":"16"}}'

#Plastic Barrel Bottom
curl -X PUT \
  http://localhost:3000/assemblies/9 \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 916d3d4e-d0b0-4e99-bb76-61414523f876' \
  -H 'cache-control: no-cache' \
  -d '{"child":{"id":"15"}}'
