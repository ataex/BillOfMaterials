#!/bin/bash
#Get All Parts
curl -X GET \
  http://localhost:3000/parts \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: cbdd85c7-e980-47b0-bd89-ea6144460003' \
  -H 'cache-control: no-cache'