const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employees_db'
    },
    console.log('Connected to the database')
  );