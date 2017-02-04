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
    roots: 3,  // override with env. var. "SUBJECTS_ROOTS"

    // number of children to create for each subject
    breadth: 2, // override with env. var. "SUBJECTS_BREADTH"

    // number of generations of children, must be [2, 3, 4, 5]
    depth: 2, // override with env. var. "SUBJECTS_DEPTH"
  },

  aspects: {
    // number of aspects to create for each root subject
    numPerRoot: 2, // override with env. var. "ASPECTS_NUMPERROOT"
    timeout: '60s', // override with env. var. "ASPECTS_TIMEOUT"
  },

  repeat: {
    hierarchy: {
      // define the repeat interval for sending bulk upserts
      every: 300, // override with env. var. "UPSERTS_EVERY"
      everyUnit: 'ms', // override with env. var. "UPSERTS_EVERYUNIT"

      // define the total duration for sending bulk upserts
      for: 5, // override with env. var. "UPSERTS_FOR"
      forUnit: 's', // override with env. var. "UPSERTS_FORUNIT"
    },
    upserts: {
      // define the repeat interval for sending bulk upserts
      every: 400, // override with env. var. "UPSERTS_EVERY"
      everyUnit: 'ms', // override with env. var. "UPSERTS_EVERYUNIT"

      // define the total duration for sending bulk upserts
      for: 2, // override with env. var. "UPSERTS_FOR"
      forUnit: 's', // override with env. var. "UPSERTS_FORUNIT"

      // define how long to wait to start bulk upserts after starting to get
      // hierarchy
      wait: 2,
      waitUnit: 's',
    },
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
  repeat: {
    hierarchy: {
      every: pe.HIERARCHY_EVERY || defaults.repeat.hierarchy.every,
      everyUnit: pe.HIERARCHY_EVERYUNIT || defaults.repeat.hierarchy.everyUnit,
      for: pe.HIERARCHY_FOR || defaults.repeat.hierarchy.for,
      forUnit: pe.HIERARCHY_FORUNIT || defaults.repeat.hierarchy.forUnit,
    },
    upserts: {
      every: pe.UPSERTS_EVERY || defaults.repeat.upserts.every,
      everyUnit: pe.UPSERTS_EVERYUNIT || defaults.repeat.upserts.everyUnit,
      for: pe.UPSERTS_FOR || defaults.repeat.upserts.for,
      forUnit: pe.UPSERTS_FORUNIT || defaults.repeat.upserts.forUnit,
      wait: pe.UPSERTS_WAIT || defaults.repeat.upserts.wait,
      waitUnit: pe.UPSERTS_WAITUNIT || defaults.repeat.upserts.waitUnit,
    },
  },
};
