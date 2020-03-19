const express = require ('express')
const { Router } = express

const Image = require("../models").image;

const images = new Router()

images.get("/", async (req, res) => {
  const limit = req.query.limit || 25;
  const offset = req.query.offset || 0;
  try {
    const images = await Image.findAndCountAll({limit, offset})
    res.send(images)
  } catch (e) {
    console.log(e)
  }
})

images.get("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const image = await Image.findByPk(id)
    res.json(image)
  } catch (e) {
    console.log(e)
  }
})

images.post("/", async (req, res, next) => {
  try {
    const newImage = await Image.create({title, url} = req.body)
    res.json(newImage)
  } catch (e) {
    next(e)
  }
})

module.exports = images