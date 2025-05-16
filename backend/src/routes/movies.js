import express from "express";
import moviesController from "../controllers/moviesController.js";
import multer from "multer"

const router = express.Router();

//Configurar una carpeta local que guarde
//el registro de las imagenes subidas
const upload = multer({dest: "public/"})


router.route("/")
  .get(moviesController.getMovies)
  .post(upload.single("imagen"), moviesController.insertMovies);

router.route("/:id")
.delete(moviesController.deleteMovie)
.put(upload.single("imagen"), moviesController.updateMovies)

export default router;
    