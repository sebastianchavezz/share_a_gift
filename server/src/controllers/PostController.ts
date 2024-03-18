// src/controllers/PostController.ts
import { Request, Response } from "express";
import { PostModel } from "../models/PostModel";

const postModel = new PostModel();

export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        await postModel.createPost(req.body);
        res.status(200).send('Post created Successfully');
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const getPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const postId = parseInt(req.params.postId); // Assuming postId is passed in the request parameters
        const post = await postModel.getPostById(postId);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).send("Post not found");
        }
    } catch (error) {
        console.error("Error getting post:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const postId = parseInt(req.params.postId); // Assuming postId is passed in the request parameters
        await postModel.updatePost(postId, req.body);
        res.status(200).send('Post updated Successfully');
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const postId = parseInt(req.params.postId); // Assuming postId is passed in the request parameters
        await postModel.deletePost(postId);
        res.status(200).send('Post deleted Successfully');
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).send("Internal Server Error");
    }
};
