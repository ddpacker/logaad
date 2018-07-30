FROM java

LABEL maintainer "Andres.Munoz@synechron.com"

VOLUME /tmp

ADD app.jar app.jar

EXPOSE 8090

RUN bash -c 'touch /app.jar'

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
