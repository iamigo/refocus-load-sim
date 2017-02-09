const debug = require('debug')('refocus-load-sim:samples');
const delay = require('delay');
const eachPromise = require('each-promise');
const Random = require('tiny-random');
const RefocusClient = require('refocus-client');
const conf = require('./config/config');
const rconf = require('./config/refocus');
const rc = new RefocusClient(rconf.refocusUrl, rconf.apiVersion, rconf.token);
const rand = new Random();

const rl = [
  { name: 'Google', url: 'http://www.google.com' },
  { name: 'Yahoo', url: 'http://www.yahoo.com' },
  { name: 'Salesforce', url: 'http://www.salesforce.com' },
  { name: 'Refocus', url: 'https://github.com/salesforce/refocus' },
];

function upsert(roots) {
  const batches = {};
  Object.keys(roots).forEach((r) => {
    batches[r] = [];
    roots[r].aspects.forEach((a) => {
      roots[r].subjects.forEach((s) => {
        batches[r].push({
          name: `${s}|${a}`,
          value: (rand.real(-1, 101)).toString(),
          relatedLinks: rl,
        });
      });
    });
  });
  // debug(batches);

  const upsertWithDelay = (batch) => delay(conf.delay)
    .then(() => rc.bulkUpsertSamples(batch));
  const arr = Object.keys(batches)
    .map((root) => upsertWithDelay(batches[root]));
  return eachPromise.serial(arr).then(debug);
} // upsertSamples

module.exports = {
  upsert,
};
