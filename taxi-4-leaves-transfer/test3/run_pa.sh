port=$1
map_name=$2

node pa.js $port $map_name 2>log_passenger_$map_name.log
