# KafkaView - Kafka Visualizer and Data Monitoring Tool
![KafkaView Logo](./src/assets/KafkaViewLogo.png)

## About
<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=apache-kafka&logoColor=white">
<img src="https://img.shields.io/badge/Prometheus-000000?style=for-the-badge&logo=prometheus&labelColor=000000">
<img src="https://img.shields.io/badge/Chart%20js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
<img src="https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white">
<img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
<img src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white">
<img src="https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=trello&logoColor=white">
<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white">

KafkaView is an open-source solution for monitoring your Kafka clusters. View metrics and information with just the broker IP address! Try it out for yourself or take a look at our *demo*  here. *demo-link-to-lp-here*

## Table of Contents

- [KafkaView - Kafka Visualizer and Data Monitoring Tool](#kafkaview---kafka-visualizer-and-data-monitoring-tool)
  - [About](#about)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Installation](#installation)
  - [Contact](#contact)

## Description

Kafka is one of the most powerful and widely used event streaming platforms, however the flow of data is widely misunderstood. The Kafka ecosystem is hard to understand and Kafka lacks a UI for monitoring. Onboarding is a problem to do its complexity. 

KafkaView provides real-time graphs displaying useful metrics for monitoring clusters, such as response rate, etc *add more metrics here*. Visualize your Kafka metrics and simplify the structure of your Kafka projects.


## Installation

*Describe the installation process, if any. Provide code examples and explanations for getting your project up and running.*

1. Decide where to clone this repository and type the following into terminal: 

```
git clone https://github.com/oslabs-beta/KafkaView.git
```

2. Now type the following into your terminal:
- _*npm install*_

  Then type the following command:
- _*npm run dev*_

> [!NOTE]
> We should get a successful message saying the server is running on port 8080. If encountering an issue here, check if you typed 'npm install' or verify your current repository is correct.

3. Open the server up on [localhost:8080](locahost:8080) if it doesn't already do so. You just set up the front-end for monitoring your metrics!

4. Now we need to set up our Prometheus server. **Prometheus steps here.**
   
<!-- 5. Set up the kafka-metrics docker image
    - Navigate to the kafka-metrics folder
    - In the terminal type: docker build -t dockerpromkafka:latest .
    - Don't forget the period after latest
    - This builds a kafka image with the required javaagent.jar and kafka.yml files

6. Set up the docker compose container with kafka and zookeeper
    - In the terminal type: docker-compose -f docker-compose.yml up -d
    - This builds and starts the kafka cluster -->

5. Start the prometheus server
    - Navigate to the kafka-metrics folder
    - Download and unpack the (linux/mac/windows) version of prometheus here
    - Replace the unpacked prometheus.yml with the one provided
    - Navigate to the prometheus folder
    - To start the prometheus server in the terminal type: ./prometheus --config.file=prometheus.yml
    - This will start the prometheus server and run it on localhost 
    - Navigate to the localhost port that this server is running on to view the metrics data

6. Congrats! You can now view metrics! Enter your _*broker IP address*_ into the text field and press _*enter*_.

## Contact 
@BryceK2
@seannguyen96
@Chris00
@hJosephDafesh