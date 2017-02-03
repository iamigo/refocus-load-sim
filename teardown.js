/**
 * TODO delete the perspective for each root subject
 */
const debug = require('debug')('refocus-load-sim:teardown');
const subjects = require('./subjects');
const aspects = require('./aspects');

/**
 * Deletes subjects.
 *
 * @param {Object} rootMap - map of root subjects to array of subject children
 * @returns {Promise}
 */
function teardownSubjects(rootMap) {
  debug('Tearing down subjects...');

  // Prepare the list of subjects to delete.
  const arr = [];
  Object.keys(rootMap).forEach((r) => {
    rootMap[r].subjects.forEach((s) => arr.push(s));
    arr.push(r);
  });

  arr.sort().reverse(); // delete children before parents!
  return subjects.deleteSubjects(arr)
  .then(() => debug('Finished tearing down subjects.'));
} // teardownSubjects

/**
 * Deletes aspects, which also cascade deletes samples.
 *
 * @param {Object} rootMap - map of root subjects to array of aspects
 * @returns {Promise}
 */
function teardownAspects(rootMap) {
  debug('Tearing down aspects...');

  // Prepare the list of aspects to delete.
  const arr = [];
  Object.keys(rootMap).forEach((r) => {
    rootMap[r].aspects.forEach((a) => arr.push(a));
  });

  return aspects.deleteAspects(arr)
  .then(() => debug('Finished tearing down aspects.'));
} // teardownAspects

module.exports = {
  doTeardown(rootMap) {
    return teardownAspects(rootMap)
    .then(() => teardownSubjects(rootMap));
  }, // doTeardown
};
