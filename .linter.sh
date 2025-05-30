#!/bin/bash
cd /home/kavia/workspace/code-generation/recipevault-26806-6f2b382f/recipevault_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

