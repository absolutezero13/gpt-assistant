const mongoose = require("mongoose");

const appPropertiesSchema = new mongoose.Schema({
  key: {
    type: String,
  },
  tokens: {
    type: Number,
  },
});

const AppProperties = mongoose.model("app-properties", appPropertiesSchema);

module.exports = AppProperties;
