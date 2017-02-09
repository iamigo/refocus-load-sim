const debug = require('debug')('refocus-load-sim:subjects');
const RefocusClient = require('refocus-client');
const delay = require('delay');
const eachPromise = require('each-promise');
const conf = require('./config/config');
const rconf = require('./config/refocus');

const rc = new RefocusClient(rconf.refocusUrl, rconf.apiVersion, rconf.token);

let depth = 5;
if (conf.subjects.depth >= 2 && conf.subjects.depth <= 5) {
  depth = conf.subjects.depth;
}

const roots = Array.apply(null, { length: conf.subjects.roots })
  .map(Number.call, Number);

function hierarchy(roots) {
  const afterGet = (res) => {
    debug('Got hierarchy', res.absolutePath);
    return res.absolutePath;
  };
  const getWithDelay = (r) => delay(conf.delay)
    .then(() => rc.getHierarchy(r))
    .then(afterGet);
  const arr = roots.map(getWithDelay);
  return eachPromise.serial(arr);
} // hierarchy

function addRoots() {
  const subjects = roots.map((r) => ({
      name: `${conf.prefix}r${r}`,
      isPublished: true,
    }));
  debug('Root subjects to add:', subjects.length);
  return rc.addRootSubjects(subjects)
  .then((added) => {
    added.forEach((s) => debug('Added subject', s.absolutePath));
    return added;
  });
} // addRoots

function addChildren() {
  const breadth = Array.apply(null, { length: conf.subjects.breadth })
    .map(Number.call, Number);
  const subjects = [];
  roots.forEach((r) => {
    breadth.forEach((b2) => {
      subjects.push({
        parentName: `${conf.prefix}r${r}`,
        child: { name: `g2s${b2}`, isPublished: true },
      });

      if (depth >= 3) {
        breadth.forEach((b3) => {
          subjects.push({
            parentName: `${conf.prefix}r${r}.g2s${b2}`,
            child: { name: `g3s${b3}`, isPublished: true },
          });

          if (depth >= 4) {
            breadth.forEach((b4) => {
              subjects.push({
                parentName: `${conf.prefix}r${r}.g2s${b2}.g3s${b3}`,
                child: { name: `g4s${b4}`, isPublished: true },
              });

              if (depth >= 5) {
                breadth.forEach((b5) => {
                  subjects.push({
                    parentName:
                      `${conf.prefix}r${r}.g2s${b2}.g3s${b3}.g4s${b4}`,
                    child: { name: `g5s${b5}`, isPublished: true },
                  })
                });
              } // depth 5
            });
          } // depth 4
        });
      } // depth 3
    }); // depth 2
  }); // for each root

  debug('Subject children to add:', subjects.length);
  const arr = subjects.map((subj) => ({
    parentAbsolutePath: subj.parentName,
    subject: subj.child,
  }));
  return rc.addChildSubjects(arr)
  .then((added) => {
    added.forEach((s) => debug('Added subject', s.absolutePath));
    return added;
  });
} // addChildren

function deleteSubjects(subjects) {
  return rc.deleteSubjects(subjects)
  .then((deleted) => {
    deleted.forEach((s) => debug('Deleted subject', s.absolutePath));
    return deleted;
  });
} // deleteSubjects

module.exports = {
  addRoots,
  addChildren,
  deleteSubjects,
  hierarchy,
};
