const express = require('express');
const pageRoutes = require('./routes');
const apiRoutes = require('./api/routes');
const session = require('express-session');
const path = require('path');

const server = express();

// Settings.
server.set('port', 4500);
server.set('views', path.join(__dirname, 'views')); //ruta de la carpeta views
server.set('View engine', 'pug'); //defino el motor de plantillas

// Middlewares.
server.use(express.json()); // activando JSON.
server.use(express.urlencoded({ extended: false })); // Recibir datos desde un formulario.
server.use(
	session({
		name: 'users-app',
		secret: 'casafhbdsakjfhsdjkfhdsfhsddhfjksdfhsdjkhfjksd',
		resave: false,
		saveUninitialized: false,
	})
);

// Routes.
server.use('/pages', pageRoutes.pages);
server.use('/api/user', apiRoutes.user);

// Static folder.
server.use(express.static(path.join(__dirname, 'public')));

module.exports = server;