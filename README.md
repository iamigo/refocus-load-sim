# refocus-load-sim

## Refocus Load Simulator

Generate consistent work to do performance-, scalability- and load-testing in your Refocus environment. Use the config file or environment variables to dictate how many, how much, how often, etc.

The "setup" phase generates a bunch of subjects in one or more hierarchies.
The "execute" phase gets hierarchies and posts bulk upserts.
The "teardown" phase cleans up all the data it added.

Still to come...
- Setup and tear down a perspective for each root subject.

## Using the Refocus Load Simulator

Set your Refocus URL, API version, and token in `./config/refocus.json`.

Run `node .`.

You can turn on debug for any or all of the modules using the DEBUG environment variable and `*` wildcard:
- `DEBUG=* node .`
- `DEBUG=refocus-load-sim:subjects node .`

You can override defaults in `./config/config.js` using environment variables:
- `DEBUG=* PREFIX=Shazam node .`
- `PREFIX=Moneypenny SUBJECTS_BREADTH=25 node .`
