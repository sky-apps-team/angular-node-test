Development decisions
---------------------

* Developed on node 5.2.0

* Decided against using a yeoman (http://yeoman.io) generator (https://www.npmjs.com/package/generator-gulp-angular),
wanted to provide a self developed solution to allow SKY to determine personal capabilities

* The backend node server is 100% complete according to the spec and has 100% unit test coverage

* The front end is fully functional and integrates with all APIs but has not been fully unit tested, protractor has been
setup but I didn't get to write any tests :(

* There are 4 APIs ... POST login, POST logout, HEAD authenticated, GET attempts (auth attempts)

* The node server is 100% groomed for the dev environment. It has live reload on HTML and JS and live streaming for CSS.

* Istanbul provides code coverage.

* Gruntfile provides detail on task running.

* A thoroughly enjoy test :) Would love to demo this work if the opportunity exists.
