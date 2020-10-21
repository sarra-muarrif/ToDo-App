const router = require('express').Router()
const Post = require('../models/post')

router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find({})
        res.send(posts)
    } catch (error) {
        res.status(500).json({
            Error: error
        })
        console.log(req.body)
    }
})

//add new post
router.post('/posts', async (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        await newPost.save()
        res.json(newPost)
    } catch (error) {
        res.status(500).json({
            Error: error
        })
    }

})

//delete post
router.delete('/posts/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Post.deleteOne({
            _id: id
        })
        res.json(result)
    } catch (error) {
        res.status(500).json({
            Error: error
        })
    }
})

//edit post
router.put('/posts/:id', async (req, res) => {
    try {
        await Post.updateOne({ _id: req.params.id }, {
            $set: {
                title: req.body.title,
                description: req.body.description
            }
        }
        )
        const editPost = await Post.find({ _id: req.params.id })
        res.json(editPost)
    } catch (error) {
        res.status(500).json({
            Error: error
        })
    }
})


module.exports = router
