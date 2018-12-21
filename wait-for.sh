echo "Waiting for servers to start..."
while true; do
 
    curl -f http://localhost:3000 > /dev/null 2> /dev/null
    if [ $? = 0 ]; then
      echo "React started"
      break
    fi

  sleep 10
  echo -n .
done