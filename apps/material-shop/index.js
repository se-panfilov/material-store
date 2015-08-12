var derby = require('derby');

var app = module.exports = derby.createApp('material-shop', __filename);


app.use(require('d-bootstrap'));
app.use(require('derby-login/components'));
app.use(require('derby-router'));
app.use(require('derby-debug'));
app.serverUse(module,'derby-jade');
app.serverUse(module, 'derby-stylus');
app.serverUse(module, 'derby-markdown');

app.loadViews(__dirname + '/views');
app.loadStyles(__dirname + '/styles');

app.get('home', '/');



app.get('login', '/login');
app.get('register', '/register');

