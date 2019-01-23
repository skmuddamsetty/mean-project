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
  Post.find().then(posts => {
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: posts
    });
  });
});
app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(
    res.status(200).json({
      message: 'Post Deleted Successfully'
    })
  );
});
module.exports = app;
