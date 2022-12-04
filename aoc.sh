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

echo $language $year - day $day

if [[ $language == "typescript" ]]
then
    target=./solutions/$language/$year/day$day.ts
    deno run --allow-read $target
fi

if [[ $language == "python" ]]
then
    target=./solutions/$language/$year/day$day.py
    python3 $target
fi