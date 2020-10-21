const { Schema, model } = require('mongoose')

const postSchema = new Schema({
    title: String,
    description: String
});

module.exports = model("Post", postSchema)