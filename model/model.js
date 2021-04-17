const fs = require('fs');
const path = require('path');

const pathDB = path.join(__dirname, '../model/clients.json');

const createClientHelper = (id) => {
  return updateClientHelper(id, 0, 0, 'post');
};

const getAllClientsHelper = () => {
  const rawData = fs.readFileSync(pathDB);
  return JSON.parse(rawData);
};

const getClientHelper = (id) => {
  const clients = getAllClientsHelper();
  return clients.find((client) => client.id === id);
};

const updateClientHelper = (id, cash, credit, method) => {
  const client = { id, cash, credit };
  const clients = getAllClientsHelper();
  const indexToUpdate = clients.findIndex((client) => client.id === id);
  if (indexToUpdate === -1 && method !== 'post') {
    throw Error('the item you want to update is not there!');
  } else if (indexToUpdate === -1) {
    console.log('no index, push');
    clients.push(client);
  } else if (indexToUpdate !== -1 && method === 'post') {
    throw Error('client already exists!');
  } else {
    console.log('found the client');
    console.log(client);
    clients[indexToUpdate] = client;
  }
  fs.writeFileSync(pathDB, JSON.stringify(clients));
  return client;
};
const updateCreditHelper = (id, credit) => {
  const client = getClientHelper(id);
  if (client.cash < 0 && Math.abs(client.cash) > credit)
    throw Error('credit is smaller the minus. pay-off the debt first');
  return updateClientHelper(id, client.cash, credit, 'put');
};
const withdrawHelper = (id, cash) => {
  const client = getClientHelper(id);
  cash = parseFloat(cash);
  if (cash > parseFloat(client.cash) + parseFloat(client.credit)) {
    throw Error("can't withdraw, not enough cash");
  } else {
    client.cash -= cash;
  }
  return updateClientHelper(id, client.cash, client.credit, 'put');
};
const depositHelper = (id, cash) => {
  const client = getClientHelper(id);
  cash = parseFloat(cash);
  return updateClientHelper(id, client.cash + cash, client.credit, 'put');
};
//returns client2 if all is ok.
const transferHelper = (idFrom, idTo, cash) => {
  const res1 = withdrawHelper(idFrom, cash);
  const res2 = depositHelper(idTo, cash);
  return res1 && res2;
};
const deleteClientHelper = (id) => {
  const clients = getAllClientsHelper();
  const indexToDelete = clients.findIndex((client) => client.id === id);
  if (indexToDelete === -1) throw Error("client doesn't exist in the database");
  const result = clients.splice(indexToDelete, 1);
  if (result === []) console.log('error delete');
  fs.writeFileSync(pathDB, JSON.stringify(clients));
};
module.exports = {
  createClientHelper,
  getAllClientsHelper,
  updateCreditHelper,
  withdrawHelper,
  depositHelper,
  transferHelper,
  deleteClientHelper,
};
