/**
 * TODO create a perspective for each root subject
 */
const debug = require('debug')('refocus-load-sim:setup');
const subjects = require('./subjects');
const aspects = require('./aspects');

/**
 * Adds root subjects.
 *
 * @returns {Promise} which resolves to an array of absolutePaths.
 */
function setupRootSubjects() {
  debug('Setting up root subjects...');
  return subjects.addRoots()
  .then((rootsAdded) => {
    debug('Finished setting up root subjects');
    return rootsAdded.map((root) => root.absolutePath);
  });
} // setupRootSubjects

/**
 * Adds subject children.
 *
 * @returns {Promise} which resolves to an array of absolutePaths.
 */
function setupSubjectChildren() {
  debug('Setting up subject children...');
  return subjects.addChildren()
  .then((subjectsAdded) => {
    debug('Finished setting up subject children');
    return subjectsAdded.map((subj) => subj.absolutePath);
  });
} // setupSubjectChildren

/**
 * Adds aspects (a different set of aspects for each root subject).
 *
 * @returns {Promise} which resolves to an array of aspect names.
 */
function setupAspects() {
  debug('Setting up aspects...');
  return aspects.addAspects()
  .then((aspectsAdded) => {
    debug('Finished setting up aspects');
    return aspectsAdded.map((asp) => asp.name);
  });
} // setupAspects

module.exports = {
  doSetup() {
    const rootMap = {};
    return setupRootSubjects()
    .then((rootsAdded) => {
      // Store the results in a map keyed off of each root subject's absolutePath.
      rootsAdded.forEach((root) => {
        rootMap[root] = { aspects: [], subjects: [] };
      });
    })
    .then(() => setupSubjectChildren())
    .then((subjectsAdded) => {
      // Store the array of absolutePaths in the rootMap.
      subjectsAdded.forEach((s) =>
        rootMap[s.split('.').slice(0, 1)].subjects.push(s));
    })
    .then(() => setupAspects())
    .then((aspectsAdded) => {
      // Store the array of aspect names in the rootMap.
      aspectsAdded.forEach((a) =>
        rootMap[a.split('_').slice(0, 1)].aspects.push(a));
    })
    .then(() => rootMap);
  }, // doSetup
};
