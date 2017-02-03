const debug = require('debug')('refocus-load-sim:aspects');
const RefocusClient = require('refocus-client');
const conf = require('./config/config');
const rconf = require('./config/refocus');
const delay = require('delay');
const eachPromise = require('each-promise');

const rc = new RefocusClient(rconf.refocusUrl, rconf.apiVersion, rconf.token);

function addAspects() {
  const roots = Array.apply(null, { length: conf.subjects.roots })
    .map(Number.call, Number);
  const numPerRoot = Array.apply(null, { length: conf.aspects.numPerRoot })
    .map(Number.call, Number);
  const aspects = [];
  roots.forEach((r) => {
    numPerRoot.forEach((a) => {
      aspects.push({
        name: `${conf.prefix}r${r}_a${a}`,
        timeout: conf.aspects.timeout,
        valueType: 'NUMERIC',
        criticalRange: [90, 100],
        warningRange: [80, 90],
        infoRange: [70, 80],
        okRange: [0, 70],
        isPublished: true,
      });
    });
  });

  const afterAdd = (a) => {
    debug('Added aspect', a.name);
    return a;
  };
  const addWithDelay = (asp) => delay(conf.delay)
    .then(() => rc.addAspect(asp))
    .then(afterAdd);
  const arr = aspects.map(addWithDelay);
  return eachPromise.serial(arr);
} // addAspects

function deleteAspects(aspects) {
  const afterDelete = (a) => {
    debug('Deleted aspect', a.name);
    return a;
  };
  const deleteWithDelay = (asp) => delay(conf.delay)
    .then(() => rc.deleteAspect(asp))
    .then(afterDelete);
  const arr = aspects.map(deleteWithDelay);
  return eachPromise.serial(arr);
} // deleteAspects

module.exports = {
  addAspects,
  deleteAspects,
};
