#!/bin/bash

# Wait for SQL Server to start
sleep 20s

# Run the sqlcmd utility to create the database
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -Q "CREATE DATABASE [express-mssql-db];"