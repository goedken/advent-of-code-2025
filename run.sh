#!/bin/bash
DAY=$(printf "%02d" $1)
PART=$2
tsx src/day${DAY}/part${PART}.ts
