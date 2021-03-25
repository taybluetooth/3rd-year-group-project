const mongoose = require("mongoose");
const challenge = mongoose.model("challenges");

module.exports = (app) => {
  app.get('/api/challenge', async (req, res) => {
    let challenges = await challenge.find();
    return res.status(200).send(challenges);
  });

  app.post('/api/challenge', async (req, res) => {
    let challenge = await challenge.create(req.body);
    return res.status(201).send({
      error: false,
      challenge,
    });
  });

  app.put('/api/challenge/:id', async (req, res) => {
    const {id} = req.params;
    let challenge = await challenge.findByIdAndUpdate(id, req.body);
    return res.status(202).send({
      error: false,
      challenge
    });
  });

  app.delete('/api/challenge/:id', async (req, res) => {
    const {id} = req.params;
    let challenge = await challenge.findByIdAndDelete(id);
    return res.status(202).send({
      error: false,
      challenge
    });
  });
};
