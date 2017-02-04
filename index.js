/**
 * TODO add perspectives to setup/teardown
 */
const debug = require('debug')('refocus-load-sim');
const Repeat = require('repeat');
const conf = require('./config/config');
const samples = require('./samples');
const subjects = require('./subjects');
const setup = require('./setup');
const teardown = require('./teardown');

console.log('===============================================================');
console.log(conf);
console.log('===============================================================');

const rh = conf.repeat.hierarchy;
const ru = conf.repeat.upserts;
let rootMap;

setup.doSetup()
.then((res) => (rootMap = res))
.then(() => {
  debug('Execute a bunch of hierarchy and bulk upsert requests...')
  Repeat(() => samples.upsert(rootMap))
    .every(ru.every, ru.everyUnit)
    .for(ru.for, ru.forUnit)
    .start.in(ru.wait, ru.waitUnit);
  return Repeat(() => subjects.hierarchy(Object.keys(rootMap)))
    .every(rh.every, rh.everyUnit)
    .for(rh.for, rh.forUnit)
    .start.now();
})
.then(() =>
  debug('Finished executing a bunch of hierarchy and bulk upsert requests'))
.then(() => teardown.doTeardown(rootMap))
.then(() => debug('Done'))
.then(() => Promise.resolve())
.catch(console.err);
