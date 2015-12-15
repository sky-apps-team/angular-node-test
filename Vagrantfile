# -*- mode: ruby -*-
# vi: set ft=ruby :
# check guest additions plugin is installed
unless Vagrant.has_plugin?("vagrant-vbguest")
  puts
  warn "OOPS! vbguest plugin is not installed"
  puts
  warn "Run the following to install:"
  abort "vagrant plugin install vagrant-vbguest"
end
# check internet proxy plugin is installed
unless Vagrant.has_plugin?("vagrant-proxyconf")
  puts
  warn "OOPS! proxyconf plugin is not installed"
  puts
  warn "Run the following to install:"
  abort "vagrant plugin install vagrant-proxyconf"
end

Vagrant.configure("2") do |config|
  # start from ubuntu
  config.vm.box = "ubuntu/trusty64"
  # set hostname
  config.vm.hostname = "myskytest"
  # forward ports
  config.vm.network :forwarded_port, host: 9090, guest: 9090 # App
  config.vm.network :forwarded_port, host: 9091, guest: 9091 # Browser sync console
  config.vm.network :forwarded_port, host: 9092, guest: 9092 # Web inspector remote (debugging)
  config.vm.network :forwarded_port, host: 4444, guest: 4444 # Protractor
  config.vm.network :forwarded_port, host: 9999, guest: 9999 # Node

  # proxy config
  config.proxy.http     = ENV['HTTP_PROXY']
  config.proxy.https    = ENV['HTTPS_PROXY']
  config.proxy.no_proxy = ENV['NO_PROXY']
  # virtualbox provider
  config.vm.provider "virtualbox" do |vb|
    vb.name = "myskytest"
    vb.memory = 4096
    vb.cpus = 2
  end
end
