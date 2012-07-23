Myplanet Digital
================

An install profile for building the Myplanet website.

To Build
--------

To build the site in a \*nix environment:

    git clone git@github.com:myplanetdigital/myplanet.git
    cd myplanet
    git submodule update --init --recursive
    export RERUN_MODULES=$(readlink -f .)/tmp/scripts/rerun-modules
    export PATH=$PATH:$(readlink -f .)/tmp/scripts/rerun
    # You may now run the `rerun --help` command to view usage instructions
    # To build, we simply run:
    rerun 2ndlevel:build -f build-myplanet.make -d path/to/docroot -p myplanet

Vagrant
-------

The intention is that this site will rarely be advised to be built
outside the accompanying Ariadne environment. An Ariadne project will be
provided shortly.
