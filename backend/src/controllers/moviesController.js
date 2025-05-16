import {v2 as cloudinary} from "cloudinary"

import moviesModel from "../models/movies.js"

import { config } from "../config.js";


cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
});


const moviesController = {};


//SELECT
moviesController.getMovies = async (req, res) => {
    const movies = await moviesModel.find();
    res.json(movies);
}

moviesController.insertMovies = async (req, res) => {
    const {titulo, descripcion, director, genero, anio, duracion} = req.body;

    let imageURL = "";

    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "public",
            allowed_formats: ["jpg", "png", "jpeg", "webp"] 
        });

        imageURL = result.secure_url;
    }

    const newMovie = new moviesModel({titulo, descripcion, director, genero, anio, duracion, imagen: imageURL});
    await newMovie.save();

    res.json({message: "Movie saved"})
};


moviesController.deleteMovie = async (req, res) => {
    const deleteMovie  = await moviesModel.findByIdAndDelete(req.params.id);
    if (!deleteMovie) {
        return res.status(404).json({ message: "Movie cannot be find" });
    }
    res.json({ message: " deleted" });
}


moviesController.updateMovies = async (req, res) => {
    const { titulo, descripcion, director, genero, anio, duracion } = req.body;

    let imagenURL = "";

    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "public",
            allowed_formats: ["jpg", "png", "jpeg", "webp"] 
        });

        imagenURL = result.secure_url;
    }

    await moviesModel.findByIdAndUpdate(
        req.params.id,
        {
            titulo,
            descripcion,
            director,
            genero,
            anio,
            duracion,
            imagen: imagenURL
        },
        { new: true }
    );

    res.json({ message: "Movie updated" });
};



export default moviesController;



