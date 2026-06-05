#!/bin/bash

# Jarvis OS - Environment Repair Script
# This script resolves native binding errors common in cross-platform development (e.g., GitHub Codespaces)

echo ">>> [JARVIS_OS] Initializing environment repair protocol..."

echo ">>> Deleting node_modules..."
rm -rf node_modules

echo ">>> Deleting package-lock.json..."
rm -f package-lock.json

echo ">>> Performing fresh install..."
npm install

echo ">>> [SYSTEM_READY] Environment repaired successfully. You can now run 'npm run dev'."
