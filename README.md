# KafkaView - Kafka Visualizer and Data Monitoring Tool

<div align="center">

  <img src="./src/assets/kafkalogofinal.png" width="200" height="200">

</div>

## About

<div align='center'>

![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Apache Kafka](https://img.shields.io/badge/apache%20kafka-%2320232a.svg?style=for-the-badge&logo=apachekafka&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E7532D?style=for-the-badge&logo=prometheus&logoColor=white)
![Node](https://img.shields.io/badge/-node-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React-Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart%20js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![esLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)

</div>

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

- **npm install**

  Then type the following command:
- **npm run dev**

> [!NOTE]
> We should get a successful message saying the server is running on port 8080. If encountering an issue here, check if you typed 'npm install' or verify your current repository is correct.

3. Open the server up on [localhost:8080](locahost:8080) if it doesn't already do so. You just set up the front-end for monitoring your metrics!

4. Add your Prometheus server by typing in the ip address and exposed port. 

![Alt Text](src/assets/login.gif)

> [!NOTE]
> If you would like to use our demo Prometheus server, open kafka-metrics folder and follow steps in the Readme.txt.

5. Congrats! You can now view metrics! Various metrics, such as real-time updates on under replicated partitions and total messages being sent, are available on the first page. You can navigate to other metrics by clicking the link at the top of the page. 

<img src="src/assets/producerMetrics.gif" width="1000" height="500"/>

6. If you would like to learn more about the kafka ecosystem, click on the Kafka Information page. Enjoy!

## Contact

@BryceK2
@seannguyen96
@Chris00
@hJosephDafesh
<table>
  <tr>
    <td align="center">
      <img src="assets/readme/clhilgert.png" width="140px;" alt="a photo of Clay Hilgert"/>
      <br />
      <sub><b>Clay Hilgert</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/clay-hilgert/">Linkedin</a> |
      <a href="https://github.com/clhilgert">GitHub</a>
    </td>
     <td align="center">
      <img src="assets/readme/duke-ahn.png" width="140px;" alt="a photo of Duke Ahn"/>
      <br />
      <sub><b>Duke Ahn</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/duke-ahn-3886b9284/">Linkedin</a> |
      <a href="https://github.com/AhnDuke">GitHub</a>
    </td> <td align="center">
      <img src="assets/readme/dpavel.png" width="140px;" alt="a photo of Darren Pavel"/>
      <br />
      <sub><b>Darren Pavel</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/darren-pavel/">Linkedin</a> |
      <a href="https://github.com/dcpavel">GitHub</a>
    </td> <td align="center">
      <img src="assets/readme/Blotski.png" width="140px;" alt="a photo of Vitaly Blotski"/>
      <br />
      <sub><b>Vitaly Blotski</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/vitaly-blotski/">Linkedin</a> |
      <a href="https://github.com/Blotski">GitHub</a>
    </td>     
  </tr>
</table>