'use strict';

function usage(title, desc, params) {

  var paramsText = '';

  params.forEach(function(e, i, a) {
    var str  = '[';
        str += '-'+e.alias;
        str += '|--'+e.name;
        str += '] ';

    paramsText += str;
  });

  return 'Usage: '.bold + '\t' + title + ' ' + paramsText;
}

function Help(systemCommands, userCommand) {
  var systemCommand = systemCommands[userCommand];
  this.usage = usage(systemCommand.name, systemCommand.desc, systemCommand.params);
}

module.exports = Help;
