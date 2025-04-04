FROM mcr.microsoft.com/mssql/server:2019-latest

USER root

RUN apt-get update && \
    apt-get install -y curl apt-transport-https gnupg && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y mssql-tools unixodbc-dev && \
    echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc

ENV SA_PASSWORD=123_development_db
ENV ACCEPT_EULA=Y

COPY ./init-db.sh /usr/src/app/init-db.sh

RUN chmod +x /usr/src/app/init-db.sh

CMD /bin/bash /usr/src/app/init-db.sh & /opt/mssql/bin/sqlservr