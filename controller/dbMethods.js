const path = require('path');
const fs = require('fs');
const pathDB = path.join(__dirname, '../model/clients.json');

const getAllClients = () => {
  const rawData = fs.readFileSync(pathDB);
  return JSON.parse(rawData);
};
const getClient = (id) => {
  const clients = getAllClients();
  return clients.find((client) => client.id === id);
};
const createClient = (id) => {
  return updateClient(id, 0, 0, 'post');
};
const updateClient = (id, cash, credit, method) => {
  const client = { id, cash, credit };
  console.log(client);
  const clients = getAllClients();
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
const updateCredit = (id, credit) => {
  const client = getClient(id);
  return updateClient(id, client.cash, credit, 'put');
};
const withdraw = (id, cash) => {
  const client = getClient(id);
  cash = parseFloat(cash);
  if (cash > client.cash + client.credit) {
    throw Error("can't withdraw, not enough cash");
  } else {
    client.cash -= cash;
  }
  return updateClient(id, client.cash, client.credit, 'put');
};
const deposit = (id, cash) => {
  const client = getClient(id);
  cash = parseFloat(cash);
  return updateClient(id, client.cash + cash, client.credit, 'put');
};
//returns client2 if all is ok.
const transfer = (idFrom, idTo, cash) => {
  const res1 = withdraw(idFrom, cash);
  const res2 = deposit(idTo, cash);
  return res1 && res2;
};
const deleteClient = (id) => {
  const clients = getAllClients();
  const indexToDelete = clients.findIndex((client) => client.id === id);
  if (indexToDelete === -1) throw Error("client doesn't exist in the database");
  const result = clients.splice(indexToDelete, 1);
  if (result === []) console.log('error delete');
  fs.writeFileSync(pathDB, JSON.stringify(clients));
};
module.exports = {
  getAllClients,
  createClient,
  updateCredit,
  withdraw,
  deposit,
  transfer,
  deleteClient,
};
