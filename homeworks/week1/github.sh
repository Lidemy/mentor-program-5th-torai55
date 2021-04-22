#!/bin/bash

curl https://api.github.com/users/$1 \
| grep -E "[^a-z]name|bio|location|blog" \
| cut -d ":" -f 2 \
| awk -F '"' {'print $2'}


# https://docs.github.com/en/rest/reference/users#get-a-user