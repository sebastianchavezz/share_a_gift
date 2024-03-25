"use strict";
/* // src/controllers/LikeController.ts
import { Request, Response } from "express";
import { LikeModel } from "../models/LikeModel";

const likeModel = new LikeModel();

export const createLike = async (req: Request, res: Response): Promise<void> => {
    try {
        await likeModel.createLike(req.body);
        res.status(200).send('Like created Successfully');
    } catch (error) {
        console.error("Error creating like:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const deleteLike = async (req: Request, res: Response): Promise<void> => {
    try {
        const likeId = parseInt(req.params.likeId); // Assuming likeId is passed in the request parameters
        await likeModel.deleteLike(likeId);
        res.status(200).send('Like deleted Successfully');
    } catch (error) {
        console.error("Error deleting like:", error);
        res.status(500).send("Internal Server Error");
    }
};
*/ 
