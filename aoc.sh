#!/bin/bash

while getopts t:p: flag
do
    case "${flag}" in
        t) language="typescript";;
        p) language="python";;
    esac
done

year=$2
len=`echo $3 | wc -c`
if [ $len == 2 ]
then
    day='0'$3
else
    day=$3
fi
target=./solutions/$language/$year/day$day

echo $language $year - day $day

if [[ $language == "typescript" ]]
then
    target=$target'.ts'
    deno run --allow-read --import-map import_map.json $target
fi

if [[ $language == "python" ]]
then
    target=$target'.py'
    python3 $target
fi