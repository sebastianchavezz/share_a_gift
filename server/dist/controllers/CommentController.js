"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentById = exports.deleteComment = exports.updateComment = exports.createComment = void 0;
const CommentModel_1 = require("../models/CommentModel");
const commentModel = new CommentModel_1.CommentModel();
const createComment = async (req, res) => {
    try {
        await commentModel.createComment(req.body);
        res.status(200).send('Comment created Successfully');
    }
    catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.createComment = createComment;
const updateComment = async (req, res) => {
    try {
        const commentId = parseInt(req.params.commentId); // Assuming commentId is passed in the request parameters
        await commentModel.updateComment(commentId, req.body);
        res.status(200).send('Comment updated Successfully');
    }
    catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.updateComment = updateComment;
const deleteComment = async (req, res) => {
    try {
        const commentId = parseInt(req.params.commentId); // Assuming commentId is passed in the request parameters
        await commentModel.deleteComment(commentId);
        res.status(200).send('Comment deleted Successfully');
    }
    catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.deleteComment = deleteComment;
const getCommentById = async (req, res) => {
    try {
        const commentId = parseInt(req.params.commentId); // Assuming commentId is passed in the request parameters
        const comment = await commentModel.getCommentById(commentId);
        if (comment) {
            res.status(200).json(comment);
        }
        else {
            res.status(404).send("Comment not found");
        }
    }
    catch (error) {
        console.error("Error getting comment:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.getCommentById = getCommentById;
