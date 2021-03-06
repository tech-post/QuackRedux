const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');
// User model
const User = require('../../models/User');

// Load Post Validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get('/test', (req, res) => res.json({
  msg: "Posts Works"
}));

// @route   GET api/posts/
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({
      date: -1
    })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({
      nopostsfound: 'No posts found'
    }));
});

// @route   GET api/posts/:id
// @desc    Get post by post's id
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .populate('user').exec((err, post) => {
      if (err) {
        res.status(404).json({
          nopostfound: 'No post found with that ID'
        })
      }else{
        res.json(post);
      }
    });
});

// @route   GET api/posts/user/:userid
// @desc    Get post by userid
// @access  Public
router.get('/user/:userid', (req, res) => {
  Post.find({ user: req.params.userid },
    (err, data) => {
      if (err || data == null) {
        res.status(404); res.send('No post found with that userid');
      } else {
        res.json(data);
      }
    })
});

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  User.findOne({
    user: req.user.id
  })
    .then(user => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
              notauthorized: 'User not authorized'
            });
          }

          // Delete
          post.remove().then(() => res.json(post));
        })
        .catch(err => res.status(404).json({
          postnotfound: 'no post found'
        }));
    })
});

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  console.log('req', req.user.id)
  User.findOne({
    user: req.user.id
  }).then(user => {
    console.log(user)
    console.log(req.params.id)
    Post.findById(req.params.id)
      .then(post => {
        console.log(post)
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
          return res.status(409).json({
            alreadyliked: 'User already liked this post'
          });
        }

        // Add user id to likes array
        post.likes.unshift({
          user: req.user.id
        });

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({
        postnotfound: 'no post found'
      }));
  })
});
// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post("/unlike/:id", passport.authenticate("jwt", {
  session: false
}), (req, res) => {
  User.findOne({
    user: req.user.id
  }).then(user => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({
              notliked: "You have not yet liked this post"
            });
        }

        // Get remove index
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        // Splice out of array
        post.likes.splice(removeIndex, 1);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({
        postnotfound: "No post found"
      }));
  });
}
);
// @route   POST api/posts/
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  req.body = JSON.parse(Object.keys(req.body)[0]);

  const {
    errors,
    isValid
  } = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    title: req.body.title,
    user: req.user.id,
  });

  newPost.save().then(post => res.json(post));
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  req.body = JSON.parse(Object.keys(req.body)[0]);
  console.log(req.body);

  // const {
  //   errors,
  //   isValid
  // } = validatePostInput(req.body);

  // // Check Validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        title: req.body.title,
        user: req.user.id
      }
      // Add comment to comment array
      post.comments.unshift(newComment);

      // Save to db
      post.save().then(post => {
        console.log(post);
        res.json(post)
      });
    })
    .catch(err => res.status(404).json({
      postnotfound: 'No post found'
    }));
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment from post
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  Post.findById(req.params.id)
    .then(post => {
      // Check to see if comment exists
      if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({
          commentnotexists: "comment does not exist"
        });
      }

      // Get the to-be-removed index
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      // Splice the index from the array
      post.comments.splice(removeIndex, 1);

      // Update the dB with comment removed
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({
      postnotfound: 'No post found'
    }));

});


module.exports = router;