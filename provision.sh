
# IMPORTANT: This provisioning script is more of a provisioning README ATM!

cd /vagrant/angularApp

# make node modules symlink
sudo mkdir -p /angularApp/node_modules
sudo chmod 777 /angularApp/node_modules
ln -s /angularApp/node_modules node_modules

sudo mkdir -p /nodeApp/node_modules
sudo chmod 777 /nodeApp/node_modules
ln -s /nodeApp/node_modules node_modules

# install nvm
sudo apt-get update
sudo apt-get -y install build-essential libssl-dev
curl https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
source ~/.profile
nvm install

# install required global npm modules for angularApp
npm i -g gulp
npm i -g protractor
npm i -g bower

webdriver-manager update # update protractor's webdriver
sudo apt-get -y install default-jre # protractor dependency
sudo apt-get -y install git # bower dependency

# install chrome
sudo sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo apt-get update
sudo apt-get -y install google-chrome-stable

# install tool for headless browser testing
sudo apt-get -y install xvfb

# install npm modules
npm i
npm i gulp

webdriver-manager start # will need to use nohup for this but until then ...

# open new console
cd /vagrant/angularApp
nvm use

# Notes for protractor
Must have headless browser available - e.g. headless Chrome (requires xvfb to work), phantomjs, etc
Must have gulp server running ... gulp
Must run ... webdriver-manager start

then ...

npm run protractor

# install mongoDB
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get -y install mongodb-org

sudo service mongod start

# manual database setup
mongo

