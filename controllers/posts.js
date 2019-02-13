const Post = require('../models/post')

function postIndexRoute(req, res, next) {
  Post
    .find()
    .populate('likes')
    .then(post => res.json(post))
    .catch(next)
}

function postCreateRoute(req, res, next) {
  req.body.city = req.params.id
  req.body.user = req.currentUser
  Post
    .create(req.body)
    .then(city => res.status(201).json(city))
    .catch(next)
}

function postShowRoute(req, res, next) {
  Post
    .findById(req.params.postId)
    .populate('user comments.user likes')
    .populate({ path: 'city', select: 'name' })
    .then(post => res.json(post))
    .catch(next)
}

function postUpdateRoute(req, res, next) {
  Post
    .findById(req.params.postId)
    .then(post => post.set(req.body))
    .then(post => post.save())
    .then(post => res.json(post))
    .catch(next)
}

function postDeleteRoute(req, res, next) {
  Post
    .findById(req.params.postId)
    .then(post => post.remove())
    .then(post => post.save())
    .then(res.json({ message: 'Post deleted' }))
    .catch(next)
}

function commentCreateRoute(req, res, next) {
  req.body.user = req.currentUser
  Post
    .findById(req.params.postId)
    .then(post => {
      post.comments.push(req.body)
      return post.save()
    })
    .then(post => res.status(201).json(post))
    .catch(next)
}

function commentUpdateRoute(req, res, next) {
  Post
    .findById(req.params.postId)
    .then(post => {
      const comment = post.comments.id(req.params.commentId)
      comment.set(req.body)
      return post.save()
    })
    .then(post => res.json(post))
    .catch(next)
}

function commentDeleteRoute(req, res, next) {
  Post
    .findById(req.params.postId)
    .then(post => {
      const comment = post.comments.id(req.params.commentId)
      return comment.remove()
    })
    .then(res.json({ message: 'Comment deleted' }))
    .catch(next)
}

module.exports = {
  postCreate: postCreateRoute,
  postShow: postShowRoute,
  postIndex: postIndexRoute,
  postUpdate: postUpdateRoute,
  postDelete: postDeleteRoute,
  commentCreate: commentCreateRoute,
  commentUpdate: commentUpdateRoute,
  commentDelete: commentDeleteRoute
}
