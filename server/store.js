var liveDbMongo = require('livedb-mongo');
var coffeeify = require('coffeeify');
var yamlify = require('yamlify');

module.exports = store;

function store(derby, publicDir) {
  var mongo = liveDbMongo(process.env.MONGO_URL + '?auto_reconnect', {safe: true});

  derby.use(require('racer-bundle'));
  derby.use(require('racer-schema'), require('./schema'));

  var redis = require('redis-url');
  var livedb = require('livedb');

  var redisDriver = livedb.redisDriver(mongo, redis.connect(), redis.connect());

  var store = derby.createStore({
    backend: livedb.client({driver: redisDriver, db: mongo})
  });

  store.on('bundle', function(browserify) {

    browserify.transform({global: true}, coffeeify);
    browserify.transform({global: true}, yamlify);

    var pack = browserify.pack;
    browserify.pack = function(opts) {
      var detectTransform = opts.globalTransform.shift();
      opts.globalTransform.push(detectTransform);
      return pack.apply(this, arguments);
    };
  });

  return store;
}