"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLike = exports.createLike = void 0;
const LikeModel_1 = require("../models/LikeModel");
const likeModel = new LikeModel_1.LikeModel();
const createLike = async (req, res) => {
    try {
        await likeModel.createLike(req.body);
        res.status(200).send('Like created Successfully');
    }
    catch (error) {
        console.error("Error creating like:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.createLike = createLike;
const deleteLike = async (req, res) => {
    try {
        const likeId = parseInt(req.params.likeId); // Assuming likeId is passed in the request parameters
        await likeModel.deleteLike(likeId);
        res.status(200).send('Like deleted Successfully');
    }
    catch (error) {
        console.error("Error deleting like:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.deleteLike = deleteLike;
