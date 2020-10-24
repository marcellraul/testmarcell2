"use strict";
const Entry = require("../models/entry.models");

async function createEntry(req, res) {
  try {
    const { name, desc } = req.body;
    const newEntry = {
      name: name,
      desc: desc,
    };
    const entry = new Entry(newEntry);
    await entry.save();
    console.log(entry);
    return res.json({
      message: "Entry saved successfully",
      entry,
    });
    res.status(201).send({ entry });
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getEntries(req, res) {
  try {
    const gets = await Entry.find().sort({ cod: -1 });
    console.log(gets);
    return res.json(gets);
    res.status(201).send({ gets });
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getEntry(req, res) {
  try {
    const { id } = req.params;
    const get = await Entry.findById(id);
    console.log(get);
    return res.json(get);
  } catch (error) {
    res.status(404).send({ message: error.message || "Error Occured" });
  }
}

async function deleteEntry(req, res) {
  try {
    const { id } = req.params;
    const d = await Entry.findByIdAndDelete(id).then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id ",
        });
      }
    });
    return res.json({
      message: "Entry deleted",
      d,
    });
  } catch (error) {
    res.status(404).send({ message: error.message || "Error Occured" });
  }
}

async function updateEntry(req, res) {
  try {
    const { id } = req.params;
    const { name, desc } = req.body;
    const u = await Entry.findByIdAndUpdate(id, { name, desc }, { new: true });
    console.log(u);
    return res.json({
      message: "Successfuly updated",
      u,
    });
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = {
  createEntry,
  getEntries,
  getEntry,
  deleteEntry,
  updateEntry,
};
