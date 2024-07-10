const Message = require('../models/Message');

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createMessage = async (req, res) => {
  const { content } = req.body;

  try {
    const newMessage = await Message.create({ content });
    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
