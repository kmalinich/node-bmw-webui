#!/usr/bin/env bash

for FILE_PHP in $(ls *.php); do
	echo "Rendering '${FILE_PHP}'"
	FILE_HTML="${FILE_PHP/\.php/}.html"
	php ${FILE_PHP} | tidy -i -w 200 -ashtml -utf8 2> /dev/null > ${FILE_HTML}
done

echo
echo "Complete"
