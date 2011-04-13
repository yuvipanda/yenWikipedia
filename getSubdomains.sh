#!/bin/bash

wget -O - http://www.google.com/supported_domains | sed 's/^\.//g' | awk '{ print "\"http://www." $1  "/search*\"," }'

