const express = require ('express')
const { Router } = express

const User = require("../models").user;

const users = new Router()

users.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.findAll()
    res.json(allUsers)
  } catch (e) {
    next(e)
  }
})

users.post('/', async (req, res, next) => {
  try{
    const {fullName, email, password} = req.body
    if (!fullName || !email || !password) {
      res.status(400).send("Missing information")
    } else {
      const newUser = await User.create({fullName, email, password})
      res.json(newUser)
    }
  } catch (e) {
    next(e)
  }
})

module.exports = users