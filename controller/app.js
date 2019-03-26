const express = require('express');
const bodyParser = require('body-parser');
const store = require('../model/store.js');
const statusCodes = require('../constants/statusCodes.js');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//GET requests
app.get('/parts', (req, res) => {
  store.getAllParts((err, data) => {
    if (err) {
      res.status(statusCodes.badRequest).send(err);
    }
    res.status(statusCodes.ok).json(data);
  });
});

app.get('/parts/:partId', (req, res) => {
  const { partId } = req.params;
  store.getPart(partId, (err, data) => {
    if (err) {
      res.status(statusCodes.badRequest).send(err);
    }
    res.status(statusCodes.ok).json(data);
  });
});

app.get('/parts/components', (req, res) => {
  store.getAllComponents((err, data) => {
    if (err) {
      res.status(statusCode.badRequest).send(err);
    }
    res.status(statusCodes.ok).json(data);
  });
});

app.get('/parts/orphans', (req, res) => {
  store.getAllOrphans((err, data) => {
    if (err) {
      res.status(statusCode.badRequest).send(err);
    }
    res.status(statusCodes.ok).json(data);
  });
});

app.get('/parts/:partId/assemblies', (req, res) => {
  const { partId } = req.params;
  store.getAllContainingAssemblies(partId, (err, data) => {
    if (err) {
      res.status(statusCode.badRequest).send(err);
    }
    res.status(statusCodes.ok).json(data);
  });
});

app.get('/assemblies', (req, res) => {
  store.getAllAssemblies((err, data) => {
    if (err) {
      res.status(statusCodes.badRequest).send(err);
    }
    res.status(statusCodes.ok).json(data);
  });
});

app.get('/assemblies/top', (req, res) => {
  store.getAllTopLevelAssemblies((err, data) => {
    if (err) {
      res.status(statusCodes.badRequest).send(err);
    }
    res.status(statusCodes.ok).json(data);
  });
});

app.get('/assemblies/sub', (req, res) => {
  store.getAllSubAssemblies((err, data) => {
    if (err) {
      res.status(statusCodes.badRequest).send(err);
    }
    res.status(statusCodes.ok).json(data);
  });
});

app.get('/assemblies/:assemblyId/components', (req, res) => {
  const { assemblyId } = req.params;
  store.getAllAssemblyParts(assemblyId, (err,data) => {
    if (err) {
      res.status(statusCodes.badRequest).send(err);
    }
    res.status(statusCodes.ok).json(data);
  });
});

app.get('/assemblies/:assemblyId/components/top', (req, res) => {
  const { assemblyId } = req.params;
  store.getTopLevelAssemblyParts(assemblyId, (err, data) => {
    if (err) {
      res.status(statusCodes.badRequest).send(err);
    }
    res.status(statusCodes.ok).json(data);
  });
});

//POST requests
app.post('/parts', (req, res) => {
  store.createPart(req.body, (err, data) => {
    if (err) {
      return res.status(statusCodes.badRequest).send(err);
    }
    res.sendStatus(statusCodes.created);
  });
});

//PUT requests
app.put('/assemblies/:parentId', (req, res) => {
  const { parentId } = req.params;
  const childId = req.body.child.id;
  store.updateAssembly(parentId, childId, (err, data) => {
    if (err) {
      return res.status(statusCodes.badRequest).send(err);
    }
    const statusCode = (data === 'updated') ? statusCodes.ok : statusCodes.created;
    res.sendStatus(statusCode);
  });
});

//DELETE requests
app.delete('/parts/:partId', (req, res) => {
  const { partId } = req.params;
  store.deletePart(partId, (err, data) => {
    if (err) {
      return res.status(statusCodes.badRequest).send(err);
    }
    res.sendStatus(statusCodes.accepted);
  });
});

app.delete('/assemblies/:parentId', (req, res) => {
  const { parentId } = req.params;
  const childId = req.body.child.id;
  store.removeChild(parentId, childId, (err, data) => {
    if (err) {
      return res.status(statusCodes.badRequest).send(err);
    }
    res.sendStatus(statusCodes.accepted);
  });
});

//Start Up
app.listen(3000, (err) => {
  if (err) {
    return console.log('Error at server startup', err);
  }
  console.log('Listening on port 3000');
});