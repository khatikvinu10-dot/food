import { log } from "console";
import foodModel from "../models/foodModel.js";
import fs from 'fs';




//add food item

const addFood = async (req, res) => {


  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename
  })
  try {
    food.save();
    return res.json({ success: true, message: "Food added" })
  } catch (error) {
    console.log(error, "error in adding food")
    res.json({ success: false, message: "Error" })
  }
}
//all food list
const listfood = async (req, res) => {
  try {
    const listfood = await foodModel.find({});
    res.json({ success: true, data: listfood })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

//remove food item
const removeFood = async (req, res) => {
  const foodId = req.params.id
  console.log(req.body)
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => { })

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food item removed" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}
//search food
 const searchFood = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.json({ success: false, message: "Search query required" });
    }
     const foods = await foodModel.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } }
      ]
    });

    res.json({
      success: true,
      data: foods
    });
  } catch (error) {
    console.log(error);
    
    res.json({ success: false, message: "Search failed"});
  }
};

// ViewMenu
const ViewMenu = async (req, res) => {
  try {
    const listfood = await foodModel.find({});
    res.json({ success: true, data: foods })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}
export { addFood, listfood, removeFood, searchFood, ViewMenu};