/**
 * TODO add some GET hierarchy traffic while all the other stuff is happening
 * TODO add perspectives to setup/teardown
 */
const debug = require('debug')('refocus-load-sim');
const Repeat = require('repeat');
const conf = require('./config/config');
const samples = require('./samples');
const setup = require('./setup');
const teardown = require('./teardown');

console.log('===============================================================');
console.log(conf);
console.log('===============================================================');

let rootMap;

setup.doSetup()
.then((res) => (rootMap = res))
.then(() => {
  debug('Start posting bulk upserts...')
  samples.init(rootMap);
  return Repeat(samples.upsertSamples)
    .every(conf.upserts.every, conf.upserts.everyUnit)
    .for(conf.upserts.for, conf.upserts.forUnit)
    .start.now();
})
.then(() => debug('Finished posting bulk upserts'))
.then(() => teardown.doTeardown(rootMap))
.then(() => debug('Done'))
.then(() => Promise.resolve())
.catch(console.err);
