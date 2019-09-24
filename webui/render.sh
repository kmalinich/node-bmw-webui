#!/usr/bin/env bash


USE_TIDY="1"

if ! hash php > /dev/null 2>&1; then
	echo "Error : php binary required, cannot continue"
	exit 1
fi

if ! hash tidy > /dev/null 2>&1; then
	echo "Warning : tidy binary not found, will not be used"
	echo
	USE_TIDY="0"
fi


for FILE_PHP in ./*.php; do
	echo "Rendering '${FILE_PHP}'"
	FILE_HTML="${FILE_PHP/\.php/}.html"

	case "${USE_TIDY}" in
		0) php "${FILE_PHP}" > "${FILE_HTML}" ;;
		1) php "${FILE_PHP}" | tidy -i -w 200 -ashtml -utf8 2> /dev/null > "${FILE_HTML}" ;;
	esac
done

echo
echo "Complete"
