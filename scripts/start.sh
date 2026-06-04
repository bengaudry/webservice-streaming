#!/bin/bash

# Store background process IDs
pids=()

# Cleanup function to terminate child processes
cleanup() {
  echo "Terminating processes..."
  for pid in "${pids[@]}"; do
    if kill -0 "$pid" 2>/dev/null; then
      kill "$pid"
    fi
  done
  wait
  exit 0
}

# Set up trap to handle script termination
trap cleanup SIGINT SIGTERM

cd apps/api || exit
php artisan serve &
pids+=($!)

cd ../web || exit
pnpm dev &
pids+=($!)

# Wait for all background processes
wait
