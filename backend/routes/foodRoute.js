import express from 'express';
import { addFood,listfood,removeFood, searchFood, ViewMenu } from '../controllers/foodController.js';
import multer from 'multer';


const foodRouter = express.Router();



//image storage engine

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
       return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listfood)
foodRouter.post("/remove",removeFood);
foodRouter.get("/search", searchFood);
foodRouter.get("/menu", ViewMenu)





export default foodRouter;
