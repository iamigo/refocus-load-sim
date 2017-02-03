/**
 * Configure the load simulation here or override any default config here
 * using environment variables.
 */
const pe = process.env;

const defaults = {
  // milliseconds to pause between each item in a sequence of requests
  delay: 0, // override with env. var. "DELAY"

  // prefix every root subject and aspect to avoid name collisions
  prefix: Date.now(), // override with env. var. "PREFIX"

  subjects: {
    // number of root subjects to create
    roots: 1,  // override with env. var. "SUBJECTS_ROOTS"

    // number of children to create for each subject
    breadth: 1, // override with env. var. "SUBJECTS_BREADTH"

    // number of generations of children, must be [2, 3, 4, 5]
    depth: 2, // override with env. var. "SUBJECTS_DEPTH"
  },

  aspects: {
    // number of aspects to create for each root subject
    numPerRoot: 1, // override with env. var. "ASPECTS_NUMPERROOT"
    timeout: '60s', // override with env. var. "ASPECTS_TIMEOUT"
  },

  upserts: {
    // define the repeat interval for sending bulk upserts
    every: 500, // override with env. var. "UPSERTS_EVERY"
    everyUnit: 'ms', // override with env. var. "UPSERTS_EVERYUNIT"

    // define the total duration for sending bulk upserts
    for: 1, // override with env. var. "UPSERTS_FOR"
    forUnit: 's', // override with env. var. "UPSERTS_FORUNIT"
  },
};

module.exports= {
  delay: pe.DELAY || defaults.delay,
  prefix: pe.PREFIX || defaults.prefix,
  subjects: {
    roots: pe.SUBJECTS_ROOTS || defaults.subjects.roots,
    breadth: pe.SUBJECTS_BREADTH || defaults.subjects.breadth,
    depth: pe.SUBJECTS_DEPTH || defaults.subjects.depth,
  },
  aspects: {
    numPerRoot: pe.ASPECTS_NUMPERROOT || defaults.aspects.numPerRoot,
    timeout: pe.ASPECTS_TIMEOUT || defaults.aspects.timeout,
  },
  upserts: {
    every: pe.UPSERTS_EVERY || defaults.upserts.every,
    everyUnit: pe.UPSERTS_EVERYUNIT || defaults.upserts.everyUnit,
    for: pe.UPSERTS_FOR || defaults.upserts.for,
    forUnit: pe.UPSERTS_FORUNIT || defaults.upserts.forUnit,
  },
};
