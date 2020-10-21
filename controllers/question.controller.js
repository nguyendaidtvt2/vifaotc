const Question_type = require('../models/question_type');
const Question = require('../models/question');

module.exports.add_question_type = function (req, res) {
    const questionType = new Question_type({
        text_en: req.body.question_type_en,
        text_vi: req.body.question_type_vi,
        text_cn: req.body.question_type_cn,
        kids: []
    });

    questionType.save(function (err) {
        if (err) {
            return res.send(err);
        } else {
            res.redirect('/question');
        }
    });
}

module.exports.add_question = async function (req, res) {

    const time = new Date().toLocaleString("vi", { timeZone: "Asia/Ho_Chi_Minh" });
    const question = new Question({
        categoryId: req.body.question_type,
        question_en: req.body.question_en,
        question_vi: req.body.question_vi,
        question_cn: req.body.question_cn,
        answer_en: req.body.answer_en,
        answer_vi: req.body.answer_vi,
        answer_cn: req.body.answer_cn,
        created: time,
        updated: "No Updated",
        popular: req.body.prioritized === 'on' ? true : false
    });

    await question.save();
    await Question_type.findByIdAndUpdate(
        { _id: req.body.question_type },
        { $push: { kids: question._id } }
    ).exec();
    res.redirect("/help");

    // res.send(question);
}

module.exports.help = async function (req, res) {

    const data = await Question_type.aggregate([
        {
            $lookup: {
                from: "questions",
                localField: "kids",
                foreignField: "_id",
                as: "question"
            }
        }
    ]).exec();

    res.render('../views/help', { title: "HELP CENTER", data, lang: req.cookies.lang || "en", currentPage: 5 });
}

module.exports.question_detail = async function (req, res) {
    const id = req.params.id;

    const data = await Question.findOne({ _id: id }).exec();

    res.render('../views/question_detail', { title: data.question_en, data, lang: req.cookies.lang || "en", currentPage: 5 });
}