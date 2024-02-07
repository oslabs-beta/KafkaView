FROM wurstmeister/kafka:latest
ADD kafka.yml /opt/kafka/libs/kafka.yml

RUN wget https://repo1.maven.org/maven2/io/prometheus/jmx/jmx_prometheus_javaagent/0.19.0/jmx_prometheus_javaagent-0.19.0.jar

RUN cp jmx_prometheus_javaagent-0.19.0.jar /opt/kafka/libs/jmx_prometheus_javaagent.jar
RUN chmod +r /opt/kafka/libs/jmx_prometheus_javaagent.jar

EXPOSE 7070