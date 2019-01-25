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
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});
app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'Post Added successfully',
      postId: result._id
    });
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
app.put('/api/posts/:id', (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(
    res.status(200).json({
      message: 'Post Updated Successfully'
    })
  );
});
app.get('/api/posts/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  });
});
module.exports = app;
