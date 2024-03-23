/* // src/controllers/CommentController.ts
import { Request, Response } from "express";
import { CommentModel } from "../models/CommentModel";

const commentModel = new CommentModel();

export const createComment = async (req: Request, res: Response): Promise<void> => {
    try {
        await commentModel.createComment(req.body);
        res.status(200).send('Comment created Successfully');
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const updateComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const commentId = parseInt(req.params.commentId); // Assuming commentId is passed in the request parameters
        await commentModel.updateComment(commentId, req.body);
        res.status(200).send('Comment updated Successfully');
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const commentId = parseInt(req.params.commentId); // Assuming commentId is passed in the request parameters
        await commentModel.deleteComment(commentId);
        res.status(200).send('Comment deleted Successfully');
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const getCommentById = async (req: Request, res: Response): Promise<void> => {
    try {
        const commentId = parseInt(req.params.commentId); // Assuming commentId is passed in the request parameters
        const comment = await commentModel.getCommentById(commentId);
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).send("Comment not found");
        }
    } catch (error) {
        console.error("Error getting comment:", error);
        res.status(500).send("Internal Server Error");
    }
};
 */