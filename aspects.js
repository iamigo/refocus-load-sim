const debug = require('debug')('refocus-load-sim:aspects');
const RefocusClient = require('refocus-client');
const conf = require('./config/config');
const rconf = require('./config/refocus');

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

  return rc.addAspects(aspects)
  .then((added) => {
    added.forEach((a) => debug('Added aspect', a.name));
    return added;
  });
} // addAspects

function deleteAspects(aspects) {
  return rc.deleteAspects(aspects)
  .then((deleted) => {
    deleted.forEach((a) => debug('Deleted aspect', a.name));
    return deleted;
  });
} // deleteAspects

module.exports = {
  addAspects,
  deleteAspects,
};
