port=$1
map_name=$2

node vehicle.js $port $map_name 2>log_vehicle_$map_name.log
