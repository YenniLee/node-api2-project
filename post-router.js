const express = require('express');
const router = express.Router();
const Posts = require('./data/db.js');

router.post('/', (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  } else {
    Posts.insert({ title: title, contents: contents })
      .then(post => {
        res.status(201).json({ post });
      })
      .catch(err => {
        res.status(500).json({
          error: 'There was an error while saving the post to the database'
        });
      });
  }
});

router.post('/:id/comments', (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  const comment = req.body;

  if (!text) {
    res.status(400).json({
      errorMessage: 'Please provide text for the comment'
    });
  } else {
    Posts.findById(id)
      .then(post => {
        if (post) {
          res.status(201).json({ comment });
        } else {
          res.status(404).json({
            message: 'The post with the specified ID does not exist.'
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: 'There was an error while saving the comment to the database.'
        });
      });
  }
});

router.get('/', (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json({ posts });
    })
    .catch(err => {
      res.status(500).json({
        error: 'The posts information could not be retrieved.'
      });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Posts.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json({ post });
      } else {
        res.status(404).json({
          message: 'The post with the specified ID does not exist.'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: 'The post information could not be retrieved.'
      });
    });
});

router.get('/:id/comments', (req, res) => {
  const id = req.params.id;

  Posts.findById(id)
    .then(comments => {
      if (id) {
        res.status(200).json({ comments });
      } else {
        res.status(404).json({
          message: 'The post with the specified ID does not exist.'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: 'The comments information could not be retrieved.'
      });
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Posts.remove(id)
    .then(deletedPost => {
      if (deletedPost) {
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The post could not be removed' });
    });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { title, contents } = req.body;
  const post = req.body;

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  }
  if (!id) {
    res.status(404).json({
      message: 'The post with the specified ID does not exist.'
    });
  } else {
    Posts.update(id, post)
      .then(post => {
        res.status(200).json({ post });
      })
      .catch(err => {
        res.status(500).json({
          error: 'The post information could not be modified.'
        });
      });
  }
});

module.exports = router;