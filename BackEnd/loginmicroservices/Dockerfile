#
# Build stage
#
FROM maven:3.8.2-openjdk-16 AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package

#
# Package stage
#
FROM openjdk:16-oracle
COPY --from=build /home/app/target/loginmicroservices-0.0.1.jar /usr/local/lib/Login-Microservice.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/local/lib/Login-Microservice.jar"]