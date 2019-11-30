#!/usr/bin/env bash

USE_BROTLI="1"
USE_GZIP="1"
USE_TIDY="1"


if ! hash php > /dev/null 2>&1; then
	echo "Error : php binary required, cannot continue"
	exit 1
fi

if ! hash tidy > /dev/null 2>&1; then
	echo "Warning : tidy binary not found, will not be used"
	USE_TIDY="0"
fi

if ! hash brotli1 > /dev/null 2>&1; then
	echo "Warning : brotli binary not found, will not be used"
	USE_BROTLI="0"
fi

# If nginx binary is available, check to see if it has brotli support
# if not, don't compress brotli files
if hash nginx > /dev/null 2>&1; then
	if ! nginx -V 2>&1 | grep -Eq brotli; then
		echo "Nginx install is missing brotli support, not brotli-compressing files"
		USE_BROTLI="0"
	fi
fi

if ! hash gzip > /dev/null 2>&1; then
	echo "Warning : gzip binary not found, will not be used"
	USE_GZIP="0"
fi


# Clean up
mapfile -t ARRAY_OLD_FILES < <(find . -iname '*.br' -o -iname '*.gz' -o -iname '*.html')
rm -f "${ARRAY_OLD_FILES[@]}"


for FILE_PHP in ./*.php; do
	[[ "${FILE_PHP}" == *"*"* ]] && continue

	echo "Rendering '${FILE_PHP}'"

	FILE_HTML="${FILE_PHP/\.php/}.html"

	case "${USE_TIDY}" in
		0) php "${FILE_PHP}" > "${FILE_HTML}" ;;
		1) php "${FILE_PHP}" | tidy -i -w 200 -ashtml -utf8 2> /dev/null > "${FILE_HTML}" ;;
	esac

	unset FILE_HTML FILE_PHP
done
echo


for FILE_COMPRESS in ./*.html ./css/*.css /css/*.css.map ./images/*.svg ./js/*.js ./js/*.js.map; do
	[[      "${FILE_COMPRESS}" == *"*"* ]] && continue
	[[ ! -s "${FILE_COMPRESS}"          ]] && continue

	echo "Compressing '${FILE_COMPRESS}'"

	FILE_BR="${FILE_COMPRESS}.br"
	FILE_GZ="${FILE_COMPRESS}.gz"

	if [[ "${USE_BROTLI}" == "1" ]]; then
		[[ -s "${FILE_BR}" ]] && rm -f "${FILE_BR}"
		brotli --keep --lgwin=0 --quality=11 "${FILE_COMPRESS}"
	fi

	if [[ "${USE_GZIP}" == "1" ]]; then
		[[ -s "${FILE_GZ}" ]] && rm -f "${FILE_GZ}"
		gzip --best --force --keep "${FILE_COMPRESS}"
	fi

	unset FILE_BR FILE_COMPRESS FILE_GZ
done
echo

echo "Complete"
