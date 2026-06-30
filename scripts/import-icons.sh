#!/bin/sh
#
# NOTES:
# 
# This script assumes that the workflow of "Production Icon Sync (Full)" has been executed 
# and generated the Artifact "generated-icons.zip". 
# 
# The user should download the artifact to their machine and run this script with 
#
# $ ./scripts/import-icons.sh PATH_TO_DOWNLOADED_ARTIFACT.zip
#
# Link to workflow:
#   https://github.com/scania-digital-design-system/tegel-icons/actions/workflows/production-icon-sync.yml
# 
# Troubleshooting:
# If you get an error like
#
# error:  cannot open zipfile [ SOME_PATH/generated-icons.zip ]
#        Operation not permitted
# 
# you might not have permissions to work on that directory. 
# Remedy: Consider moving the zip file to Downloads, or this workspace. 
#

echo " "
echo "🔀 Prepare import from $1..."
echo " "


TEGEL_HOME=$PWD
unzip -q $1 -d new-icons-to-import

cd new-icons-to-import/svgs

cd traton
mv traton/web-icons/*  .
rmdir traton/web-icons/
rmdir traton/
cd ..

cd scania
mv scania/industry-icons/* .
mv scania/web-icons/* .

rmdir scania/industry-icons
rmdir scania/web-icons
rmdir scania
cd .. 

echo " "
echo "🚛 Moving icons from generated icons..."
echo " "

cd $TEGEL_HOME


mv new-icons-to-import/svgs/traton/*.svg assets/icons/traton/
mv new-icons-to-import/svgs/scania/*.svg assets/icons/scania/

rm -fr new-icons-to-import

echo " "
echo "✅ All done!"
echo " "