const {
  createClientHelper,
  getAllClientsHelper,
  updateCreditHelper,
  withdrawHelper,
  depositHelper,
  transferHelper,
  deleteClientHelper,
} = require('../model/model');

const getAllClients = (req, res) => {
  try {
    const rawData = getAllClientsHelper();
    return res.status(200).send(rawData);
  } catch (error) {
    return res.status(404).send('404 not found');
  }
};
const getClient = (req, res) => {
  try {
    console.log('starting get');
    const allClients = getAllClientsHelper();
    const client = allClients.find((client) => client.id === req.params.id);
    if (typeof client == 'undefined') throw Error('not in the database');
    return res.status(200).send(client);
  } catch (error) {
    return res
      .status(404)
      .send({ error: res.statusCode + ':' + error.message });
  }
};
const putHandler = (req, res) => {
  const { id } = req.params;
  console.log(req.query);
  const { type } = req.query;
  console.log(type);
  try {
    switch (type) {
      case 'deposit': {
        console.log('deposit funds');
        const client = depositHelper(id, req.query.cash);
        res.status(201).send(client);
        break;
      }
      case 'withdraw': {
        const client = withdrawHelper(id, req.query.cash);
        res.status(201).send(client);
        break;
      }
      case 'transfer': {
        const idFrom = req.params.id;
        const cash = req.query.cash;
        const idTo = req.query.idTo;
        const client = transferHelper(idFrom, idTo, cash);
        res.status(201).send(client);
        break;
      }
      case 'updatecredit': {
        const client = updateCreditHelper(id, req.query.credit);
        console.log(client);
        res.status(201).send(client);
        break;
      }
      default: {
        break;
      }
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
const createClient = (req, res) => {
  try {
    const { id } = req.params;
    const client = createClientHelper(id);
    res.status(201).send(client);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const deleteClient = (req, res) => {
  try {
    const { id } = req.params;
    deleteClientHelper(id);
    res.status(201).send('success in deleting id' + id);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  getAllClients,
  getClient,
  putHandler,
  createClient,
  deleteClient,
};
