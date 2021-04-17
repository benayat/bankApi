const express = require('express');
const router = express.Router();

//require controller methods:
const {
  getAllClients,
  getClient,
  putHandler,
  createClient,
  deleteClient,
} = require('../controller/bankController');
router.get('/api/clients', getAllClients);
router.get('/api/clients/:id', getClient);
router.put('/api/clients/:id', putHandler);
router.post('/api/clients/:id', createClient);
router.delete('/api/clients/:id', deleteClient);

module.exports = router;
