#!/bin/sh
emacs -Q --script publish.el

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
BUILD_DIR="$SCRIPTPATH/public"

# Procedures to run after build:

# Remove useless css
rm -rf	"$BUILD_DIR/css/level"
rm -f	"$BUILD_DIR/css/simplecss.css"
rm -f	"$BUILD_DIR/css/simplecss.css.map"
rm -f	"$BUILD_DIR/css/variables.css"
rm -f	"$BUILD_DIR/css/variables.css.map"
