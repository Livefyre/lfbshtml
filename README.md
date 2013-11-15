lfbshtml
====================

Bootstrap html generator. Uses a phantom process to generate boostrap html for a
particular set of config files.

Installation
--------------------
Uses npm to install phantomjs and other dependencies.
`make install`

Note that on Ubuntu systems that fontconfig is required (to install, run
`sudo apt-get install fontconfig`).

Run
--------------------
Localdev: Uses foreman to run processes locally. Use command `make run`

For the server, there are two processes to be run:
 1. The phantom consumer: `bin/runconsumer`
 2. The web server: `bin/runserver`

Because the consumer works off a Redis queue, it may be useful to spin up more
instances if a single one falls behind. Only one worker at a time on a machine at
this point since it binds to a particular port for webpage rendering. This should
be fixed.

Test
--------------------
Run mocha tests via `make test`.

Tests are in the code itself, and all have the filename "test.js". The test runner
finds all and will run them.
