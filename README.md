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
  - [License](#license)

## Description

Kafka is one of the most powerful and widely used event streaming platforms, however the flow of data is widely misunderstood. The Kafka ecosystem is hard to understand and Kafka lacks a UI for monitoring. Onboarding is a problem to do its complexity.

KafkaView provides real-time graphs displaying useful metrics for monitoring clusters, such as the rate at which producers send data to brokers, the total number of messages in each topic, etc. Visualize your Kafka metrics and simplify the structure of your Kafka projects. For beginners, KafkaView provides an information page to show users how a kafka ecosystem is set up along with descriptions of each part. 

## Installation


1. Decide where to clone this repository and type the following into terminal:

```
git clone https://github.com/oslabs-beta/KafkaView.git
```

2. Now type the following into your terminal:

- **npm install**

  Then type the following command:
- **npm start**

> [!NOTE]
> We should get a successful message saying the server is running on port 8080. If encountering an issue here, check if you typed 'npm install' or verify your current repository is correct. Open the server up on [localhost:8080](locahost:8080) if it doesn't already do so.


1. Add your Prometheus server by typing in the ip address and exposed port.

<br/>
<img src="src/assets/login.gif" width="800" height="400"/>

<br/>

> [!NOTE]
> If you would like to use our demo Prometheus server, open kafka-metrics folder and follow steps in the Readme.txt to run our pre-configured kafka cluster.

2. Congrats! You can now view metrics! Various metrics, such as real-time updates on under replicated partitions and total messages being sent, are available on the first page. You can navigate to other metrics by clicking the link at the top of the page.
  
<br/>
<img src="src/assets/producerMetrics.gif" width="800" height="400"/>

<br/>


3. If you would like to learn more about the kafka ecosystem, click on the Kafka Information page. Enjoy!
   
<br/>
<img src="src/assets/kafkaInfo.gif" width="800" height="400"/>

## Contact

<table>
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/108435897?v=4" width="140px;" alt="a photo of Byrce Kelly"/>
      <br />
      <strong>Byrce Kelly</strong>
      <br />
      <a href="https://github.com/BryceK2">
        <img style="padding-top: 10px" src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
      </a>
      <br />
      <a href="https://www.linkedin.com/in/-brycekelly/">
        <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
      </a>
    </td>
     <td align="center">
      <img src="https://avatars.githubusercontent.com/u/14811666?v=4" width="140px;" alt="a photo of Chris Johnson"/>
      <br />
      <strong>Chris Johnson</strong>
      <br />
      <a href="https://github.com/Johnson-Chris00">
        <img style="padding-top: 10px" src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
      </a>
      <br />
      <a href="https://www.linkedin.com/in/johnson-chris00">
        <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
      </a>
    </td> <td align="center">
      <img src="https://avatars.githubusercontent.com/u/148285698?v=4" width="140px;" alt="a photo of Joseph Defesh"/>
      <br />
      <strong>Joseph Defesh</strong>
      <br />
      <a href="https://github.com/JosephDafesh">
        <img style="padding-top: 10px" src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
      </a>
      <br />
      <a href="https://www.linkedin.com/">
        <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
      </a>
    </td> <td align="center">
      <img src="https://avatars.githubusercontent.com/u/26880119?s=400&u=94f7e8ea169586b630323f7a3e4ea6ea01922403&v=4" width="140px;" alt="a photo of Sean Nguyen"/>
      <br />
      <strong>Sean Nguyen</strong>
      <br />
      <a href="https://github.com/seannguyen96">
        <img style="padding-top: 10px" src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
      </a>
      <br />
      <a href="https://www.linkedin.com/in/sean-nguyen-cpslo/">
       <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
      </a>
      </form>
    </td>
  </tr>
</table>

## License
By contributing, you are agreeing that your contributions will be licensed under the [MIT License](/LICENSE).