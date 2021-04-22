#!/bin/bash

for (( i=0; i<$1; i++ ))
do
    touch "$((${i}+1)).js"
done

echo "檔案建立完成"

# http://linux.vbird.org/linux_basic/0340bashshell-scripts.php#for
# http://linux.vbird.org/linux_basic/0340bashshell-scripts.php#ex_cal