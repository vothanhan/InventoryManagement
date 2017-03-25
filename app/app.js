angular = require('angular');
app = angular.module('inventorymanage',['ui.router']);

domain='localhost:3000';

require('./routes/index.js');
require('./controllers/index.js');
require('./directives/index.js');
require('./factories/index.js');
