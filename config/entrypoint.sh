#!/bin/sh


# Replace env vars in JavaScript files
echo "Replacing env constants in JS"
for file in /usr/share/nginx/html/assets/*.js*;
do
  echo "Processing $file ...";

  sed -i 's|localhost:3000|'${backend}'|g' $file

done

echo "Starting Nginx"

nginx -g 'daemon off;' &
node /crm/api/dist/main.js