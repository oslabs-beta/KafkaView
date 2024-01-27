To set up this kafka broker to run on your machine:

1. Set up the kafka broker docker image
    - navigate to the kafka-broker folder
    - in the terminal type: docker build -t dockerpromkafka:latest .
    - don't forget the period after latest

    - This builds a kafka image with the required javaagent.jar and kafka.yml files

2. Set up the docker compose container with kafka and zookeeper
    - navigate to the kafka folder
    - in the terminal type: docker-compose -f docker-compose.yml up -d

    - This builds and starts the kafka cluster

3. Start the prometheus server
    - navigate to the prometheus folder
    - download and unpack the linux version of prometheus here
    - replace the unpacked prometheus.yml with the one provided
    - in the terminal type: ./prometheus --config.file=prometheus.yml

    - This should start the prometheus server and run it on localhost 
    - navigate to the localhost port that this server is running on to view the prometheus gui