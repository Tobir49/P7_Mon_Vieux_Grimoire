const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/books', (req, res, next) => {
    const stuff = [
      {
        id: "1",
        userId : "clc4wj5lh3gyi0ak4eq4n8syr",
        title : "Milwaukee Mission",
        author : "Elder Cooper",
        imageUrl : "https://via.placeholder.com/206x260",
        year : 2021,
        genre : "Policier",
        ratings : [{
        userId : "1",
        grade: 5
  },
    {
        userId : "1",
        grade : 5
    },
    {
        userId : "clc4wj5lh3gyi0ak4eq4n8syr",
        grade : 5
    },
    {
        userId : "1",
        grade : 5
    }],
    averageRating: 3
      },
    ];
    res.status(200).json(stuff);
  });

module.exports = app;
