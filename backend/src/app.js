const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./model');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const helmet = require('helmet');

const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

// In a prod app cors will be configured for specific origins
app.use(cors());
app.use(helmet());
app.use(routes);
app.use(errorHandler);

module.exports = app;
