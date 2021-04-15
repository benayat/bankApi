const express = require('express');
const {
  getAllClients,
  createClient,
  deposit,
  withdraw,
  transfer,
  updateCredit,
  deleteClient,
} = require('../utils/dbMethods');

const port = 3000;

const app = express();
app.use(express.json());

//configure paths
// const pathStaticPublic = path.join(__dirname, '../public');

//configure views engine and partials and static
// app.use(express.json);

app.get('/api/clients', (req, res) => {
  const users = getAllClients();
  res.status(200).json(users);
});

app.get('/api/clients/:id', (req, res) => {
  const clients = getAllClients();
  console.log(req.params);
  res.status(200).json(clients.find((client) => client.id === req.params.id));
});
app.put('/api/clients/:id', (req, res) => {
  const { id } = req.params;
  console.log(req.query);
  const { type } = req.query;
  console.log(type);
  try {
    switch (type) {
      case 'deposit': {
        const client = deposit(id, req.query.cash);
        res.status(201).send(client);
        break;
      }
      case 'withdraw': {
        const client = withdraw(id, req.query.cash);
        res.status(201).send(client);
        break;
      }
      case 'transfer': {
        const idFrom = req.params.id;
        console.log(idFrom);
        const cash = req.query.cash;
        const idTo = req.query.idTo;
        const client = transfer(idFrom, idTo, cash);
        res.status(201).send(client);
        break;
      }
      case 'updatecredit': {
        const client = updateCredit(id, req.query.credit);
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
});

app.post('/api/clients/:id', (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const client = createClient(id);
    res.status(201).send(client);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
app.delete('/api/clients/:id', (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    deleteClient(id);
    res.status(201).send('success in deleting id' + id);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
