const mongoose = require("mongoose");
const Achievement = mongoose.model("Achievement");

module.exports = (app) => {
  app.get('/api/achievement', async (req, res) => {
    let achievements = await Achievement.find();
    return res.status(200).send(achievements);
  });

  app.post('/api/achievement', async (req, res) => {
    let achievement = await Achievement.create(req.body);
    return res.status(201).send({
      error: false,
      achievement,
    });
  });

  app.put('/api/achievement/:id', async (req, res) => {
    const {id} = req.params;
    let achievement = await Achievement.findByIdAndUpdate(id, req.body);
    return res.status(202).send({
      error: false,
      achievement
    });
  });

  app.delete('/api/achievement/:id', async (req, res) => {
    const {id} = req.params;
    let achievement = await Achievement.findByIdAndDelete(id);
    return res.status(202).send({
      error: false,
      achievement
    });
  });
};
