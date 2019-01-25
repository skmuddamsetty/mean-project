const express = require('express');
const Post = require('../models/post');

const router = express.Router();

router.post('', (req, res, next) => {
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
router.get('', (req, res, next) => {
  Post.find().then(posts => {
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: posts
    });
  });
});
router.delete('/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(
    res.status(200).json({
      message: 'Post Deleted Successfully'
    })
  );
});
router.put('/:id', (req, res, next) => {
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
router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  });
});
module.exports = router;
