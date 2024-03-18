"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPost = exports.createPost = void 0;
const PostModel_1 = require("../models/PostModel");
const postModel = new PostModel_1.PostModel();
const createPost = async (req, res) => {
    try {
        await postModel.createPost(req.body);
        res.status(200).send('Post created Successfully');
    }
    catch (error) {
        console.error("Error creating post:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.createPost = createPost;
const getPost = async (req, res) => {
    try {
        const postId = parseInt(req.params.postId); // Assuming postId is passed in the request parameters
        const post = await postModel.getPostById(postId);
        if (post) {
            res.status(200).json(post);
        }
        else {
            res.status(404).send("Post not found");
        }
    }
    catch (error) {
        console.error("Error getting post:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.getPost = getPost;
const updatePost = async (req, res) => {
    try {
        const postId = parseInt(req.params.postId); // Assuming postId is passed in the request parameters
        await postModel.updatePost(postId, req.body);
        res.status(200).send('Post updated Successfully');
    }
    catch (error) {
        console.error("Error updating post:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.updatePost = updatePost;
const deletePost = async (req, res) => {
    try {
        const postId = parseInt(req.params.postId); // Assuming postId is passed in the request parameters
        await postModel.deletePost(postId);
        res.status(200).send('Post deleted Successfully');
    }
    catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.deletePost = deletePost;
