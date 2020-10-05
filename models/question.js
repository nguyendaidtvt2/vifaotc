const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const question = new Schema({
    categoryId: String,
    question_en: String,
    question_vi: String,
    question_cn: String,
    answer_en: String,
    answer_vi: String,
    answer_cn: String,
    created: String,
    updated: String,
    popular: Boolean,
});

module.exports = mongoose.model("question", question);