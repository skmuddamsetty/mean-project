const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});
app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post Added successfully'
  });
});
app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      title: 'first server side post',
      content: 'this is coming from server content',
      id: 'asbdjhabsj'
    },
    {
      title: 'second server side post',
      content: 'this is coming from server content',
      id: 'adadafsdf'
    },
    {
      title: 'third server side post',
      content: 'this is coming from server content',
      id: 'fghgh'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});
module.exports = app;
