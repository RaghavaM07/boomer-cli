#!/usr/bin/env node

const program = require('commander');

const withConfig = require('./withConfig');
const writeConfig = require('./writeConfig');

const register = require('./controllers/register');
const login = require('./controllers/login');
const makeLink = require('./controllers/make');
const deleteLink = require('./controllers/deleteLink');
const updateLink = require('./controllers/updateLink');
const analyze = require('./controllers/analyze');
const pvtLinkRedirect = require('./controllers/pvtLinkRedirect');

program
	.version('1.0.0')
	.description('Boomer CLI');

program
	.command('register')
	.alias('r')
	.action(withConfig(register));

program
	.command('login')
	.alias('l')
	.action(withConfig(login));

program
	.command('logout')
	.action(() => writeConfig('authToken', undefined));

program
	.command('make')
	.alias('m')
	.action(withConfig(makeLink));

program
	.command('delete <shortCode>')
	.alias('d')
	.action((shortCode) => withConfig(deleteLink, { shortCode })());

program
	.command('update <shortCode>')
	.alias('u')
	.action((shortCode) => withConfig(updateLink, { shortCode })());

program
	.command('analyze <shortCode>')
	.action((shortCode) => withConfig(analyze, { shortCode })());

program
	.command('go <shortCode>')
	.action((shortCode) => withConfig(pvtLinkRedirect, { shortCode })());

program.parse()