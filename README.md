# KafkaView - Kafka Visualizer and Data Monitoring Tool

<div align="center">

  <img src="./src/assets/kafkalogofinal.png" width="400" height="400">

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

Welcome to KafkaView, the open-source tool designed to simplify the Kafka ecosystem for developers and data engineers. Kafka, renowned for its powerful event streaming capabilities, often presents a steep learning curve due to its complex data flow and lack of intuitive monitoring interfaces. KafkaView is here to change that. Visit our website here  [KafkaView.com](https://www.kafkaview.com)

## Table of Contents

- [KafkaView - Kafka Visualizer and Data Monitoring Tool](#kafkaview---kafka-visualizer-and-data-monitoring-tool)
  - [About](#about)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Installation](#installation)
  - [Roadmap](#roadmap)
  - [Contact](#contact)
  - [License](#license)

## Description

KafkaView is an intuitive monitoring tool designed to simplify the complexity of Apache Kafka, one of the most potent and prevalent event streaming platforms. Despite Kafka's widespread use, its intricate data flow and ecosystem can be challenging to grasp, and the platform traditionally lacks a user-friendly interface for monitoring. This often makes onboarding a daunting task for new users.

With KafkaView, users gain access to real-time updates that offer a clear view of crucial metrics for Kafka cluster management. This includes visualizing the rate at which data is produced to brokers and tracking the volume of messages across various topics. KafkaView aims to demystify Kafka's operations, presenting a more approachable structure for your Kafka projects.

Especially beneficial for newcomers, KafkaView features a dedicated informational section. This segment provides a detailed overview of the Kafka ecosystem, complete with easy-to-understand descriptions of its components. By making Kafka's inner workings more transparent, KafkaView facilitates a smoother learning curve and enhances the monitoring experience for users at all levels of experience.

## Installation


1. Clone our repository to your local machine by typing the following command into your terminal:

```
git clone https://github.com/oslabs-beta/KafkaView.git
```

1. Open the repo with your favorite IDE. Once complete install the dependencies for our application by typing into your terminal:

- **npm install**

  Then type the following command to start the server:
- **npm start**

> [!NOTE]
> Our application should automatically open a web browser window with our home page. You should also see a confirmation message in your terminal that the server has started. If you are encountering an issue here, check if you typed 'npm install' or verify your current repository is correct. Once you have verified everything installed correctly and the server is running, navigate to our home page by clicking this link: [localhost:8080](locahost:8080)


1. Add your Prometheus server by typing in the ip address and exposed port of your server.

<br/>
<img src="src/assets/login.gif" width="700" height="350"/>

<br/>

> [!NOTE]
> If you would like to demo KafkaView without a prometheus-configured kafka cluster, open kafka-metrics folder and follow steps in the Readme.txt to use our provided setup.

1. Congrats! You can now explore the Kafka ecosystem! You will find a variety of metrics right at your fingertips, including live updates on under-replicated partitions and the total count of messages being transmitted. You can navigate to other metrics by clicking the links at the top of the page.
  
<br/>
<img src="src/assets/producerMetrics.gif" width="700" height="500"/>

<br/>


3. If you would like to learn more about the kafka ecosystem, click on the Kafka Information page. Enjoy!
   
<br/>
<img src="src/assets/kafkaInfo.gif" width="700" height="500"/>

## Roadmap

- Expand range of metrics. If you would like to see something missing, consider contributing to the project.
- Alert system that send a message to users when a metric reaches a critical threshold
- Expand support for other Kafka controller systems
- Containerize entire project 

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
      <strong>Joseph Dafesh</strong>
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