To set up this kafka broker to run on your machine:

1. Set up the kafka-metrics docker image
    - navigate to the kafka-metrics folder
    - in the terminal type: docker build -t dockerpromkafka:latest .
    - don't forget the period after latest

    - This builds a kafka image with the required javaagent.jar and kafka.yml files

2. Set up the docker compose container with kafka and zookeeper
    - in the terminal type: docker-compose -f docker-compose.yml up -d

    - This builds and starts the kafka cluster

3. Start the prometheus server
    - navigate to the kafka-metrics folder
    - download and unpack the (linux/mac/windows) version of prometheus here
    - replace the unpacked prometheus.yml with the one provided
    - navigate to the prometheus folder
    - to start prometheus server in the terminal type: ./prometheus --config.file=prometheus.yml
    - This will start the prometheus server and run it on localhost 
    - navigate to the localhost port that this server is running on to view the metrics data