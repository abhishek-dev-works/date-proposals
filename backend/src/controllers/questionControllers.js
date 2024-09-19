const Question = require("../models/Question");

// Endpoint to add a question
exports.addQuestion = async (req, res) => {
  const { question, name } = req.body;
  try {
    // Create friendship record
    const que = new Question({ question: question, name: name });
    await que.save();
    console.log(que)
    res.status(200).json({ message: "Question added successfully", data: que });
  } catch (err) {
    console.error("Failed to add friend", err);
    res.status(500).json({ error: "Failed to add question" });
  }
};

// Endpoint to submit a response to a question
exports.submitResponse = async (req, res) => {
  const { id, answer, hoverOnNo } = req.body;
  try {
    const que = await Question.findById(id);
    if (!que) {
      return res.status(404).json({ error: "Question not found", data: false });
    }
    que.answer = answer;
    que.hoverOnNo = hoverOnNo;
    await que.save();
    console.log(que)  

    res
      .status(200)
      .json({ message: "Response submitted successfully", data: true });
  } catch (err) {
    console.error("Failed to update response", err);
    res.status(500).json({ error: "Failed to update response" });
  }
};

// Endpoint to get the answer for a question
exports.getAnswerById = async (req, res) => {
  const { id } = req.params;
  try {
    const que = await Question.findById(id);
    console.log(que)
    if (!que) {
      return res.status(404).json({ error: "Question not found", data: false });
    }
    res.status(200).json({ data: que });
  } catch (err) {
    console.error("Failed to get response", err);
    res.status(500).json({ error: "Failed to get response", data: false });
  }
};
