To set up the KafkaJS demo broker to run on your local machine follow steps:
To only set up the Prometheus server skip to step 3:

1. Set up the KafkaJS metrics docker image
    - Navigate to the "Kafka_Prom_Initialize" folder
    - In the terminal type: "docker build -t dockerpromkafka:latest ." including period
    - This builds a Kafka image with the required javaagent.jar and kafka.yml files

2. Set up the docker compose container for the demo KafkaJS cluster
    - In the terminal type: "docker-compose -f docker-compose.yml up -d"
    - This builds and starts the demo KafkaJS cluster

3. Start the Prometheus server
    - Navigate to the kafka-metrics folder
    - Download and unpack the (linux/darwin/windows) version of Prometheus online that corresponds to your local machine
    - Rename the folder to "prometheus"
    - Replace the unpacked prometheus.yml with the one provided
    - Navigate to the "prometheus" folder
    - To start Prometheus server in the terminal type: "./prometheus --config.file=prometheus.yml"
    - This will start the Prometheus server and run it on "localhost"
    - Navigate to the prometheus localhost port ("localhost:9090") to query the metrics data