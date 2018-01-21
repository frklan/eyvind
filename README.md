# Eyvind
[![Raspberry Pi Zero W](https://img.shields.io/badge/RaspberryPI-Zero%20W-brightgreen.svg)](https://www.raspberrypi.org/products/raspberry-pi-zero-w/)
[![Build Status](https://travis-ci.org/frklan/Eyvind.svg?branch=master)](https://travis-ci.org/frklan/Eyvind)
[![GitHub release](https://img.shields.io/github/release/frklan/Eyvind.svg)](https://github.com/frklan/Eyvind/releases)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/frklan/Eyvind/issues)
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](https://github.com/frklan/Eyvind/blob/master/LICENSE)

A NodeJS based app to serve as a very small (and insecure) control panel for a printer server based on a Rapberry PI Zero W. Allows an inexperienced user to shutdown and reboot the PI, as well as display the last few lines of the system and cups error logs.

Note: there is NO security measures implemented - if you have access to the PI wifi you will be able to reboot it.

## Running the app

### Prerequisites

* NodeJS

### Compiling

To compile issue the following commands

````
$ git clone git@github.com:frklan/Eyvind.git
$ cd Eyvind
$ npm start 
````

Access the app at [PI ip-address]:3000.

### Installing
TBD

### Permissions
The pi user needs to be able to execute commands as root (i.e. using sudo command), one way to do this is to add ```pi ALL=(ALL) NOPASSWD: ALL``` to ```etc/sudoers.d/010_pi-nopasswd```. This, however is also pretty unsecure.

## Contributing

Contributions are always welcome!

When contributing to this repository, please first discuss the change you wish to make via the issue tracker, email, or any other method with the owner of this repository before making a change.

Please note that we have a code of conduct, you are required to follow it in all your interactions with the project.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/frklan/Teleport2Lobby/tags).

## Authors

* **Fredrik Andersson** - *Initial work* - [frklan](https://github.com/frklan)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments
* An excellent help testing NodeJS apps while development is [NodeMon](https://nodemon.io/), as well as having an awesome looking web page
* README based on [PurpleBooth's](https://github.com/PurpleBooth) template





[![HitCount](http://hits.dwyl.io/frklan/Eyvind.svg)]()