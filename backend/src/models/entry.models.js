const { Schema, model } = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const mongoose = require("mongoose"); //

const EntrySchema = new Schema(
  {
    cod: { type: String, trim: true, unique: true },
    name: { type: String, unique: true, required: true },
    desc: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
EntrySchema.plugin(autoIncrement.plugin, {
  model: "entry", // collection or table name in which you want to apply auto increment
  field: "cod", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

module.exports = model("entry", EntrySchema);
