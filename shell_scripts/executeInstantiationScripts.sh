#!/bin/bash
sh ./createParts.sh &
process_id=$!
wait $process_id
sh ./createSubAssem.sh &
sh ./createCompletePens.sh