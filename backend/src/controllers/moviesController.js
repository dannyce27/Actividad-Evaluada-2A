const moviesController = {};
import {v2 as cloudinary} from "cloudinary"

import moviesModel from "../models/movies.js"

moviesController.getMovies = async (req, res) => {
    const movies = await moviesModel.find();
    res.json(movies);
}

