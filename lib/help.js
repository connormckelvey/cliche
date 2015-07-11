'use strict';

function description(title, desc) {
  return 'DESC:'.bold + '\n\t' + (title.split('.').join(' ') + ': ').bold + desc + '\n';
}

function usage(title, params, hasSubcommand) {

  var paramsText = '';
  var printText = '';
  params.forEach(function(e, i, a) {
    var str  = '[';
        str += '-'+e.alias;
        str += '|--'+e.name;
        str += '] ';

    paramsText += str;
  });

  printText = 'USAGE:'.bold + '\n\t' + title.split('.').join(' ') + ' ' + paramsText + '\n';

  if(hasSubcommand) {
    printText += '<command> \n';
  }

  return printText;
}

function params(params) {
  var paramsText = 'OPTIONS/FLAGS: \n'.bold;
  params.forEach(function(el) {
    paramsText += '\t' + (el.name + ':\t').bold;
    paramsText += '(required: ' + el.required + ') ';
    paramsText += '(expects: ' + el.validation +') \n';
  });

  return paramsText;
}

function subCommands(commands, command) {
  var subCommands =[];

  for(var cmd in commands) {
    if(cmd.indexOf(command.name) > -1) {
      if(cmd !== command.name && cmd.split(command.name).join('').split('.').length <= 2) {
        //Is command direct child
          subCommands.push(cmd);
      }
    }
  }

  if(subCommands.length > 0) {
    return subCommands;
  }
  return false;
}

function commands(commands, command, config) {
  var commandsText = '';

  if(command.name === config.bin) {
    commandsText = config.bin.toUpperCase().split('.').join(' ') + ' COMMANDS: \n'.bold;
    for(var cmd in commands) {
        if(commands[cmd].name.indexOf('.') > -1 || commands[cmd].name === config.bin) {
          continue;
        }
        commandsText += '\t' + commands[cmd].name + ':   ' + commands[cmd].desc + '\n';
    }
  } else {
    var subCmds = subCommands(commands, command);

    if(subCmds) {
      commandsText = command.name.toUpperCase().split('.').join(' ') + ' COMMANDS: \n'.bold;
      subCmds.forEach(function(el) {
        var subCmd = commands[el].name.split(command.name).join('').split('.').join('');
        commandsText += '\t' + subCmd + ':   ' + commands[el].desc + '\n';
      });
    }
  }

  return commandsText;
}

function Help(systemCommands, systemCommand, config) {
  this.usage = usage(systemCommand.name, systemCommand.params);
  this.desc = description(systemCommand.name, systemCommand.desc);
  this.params = params(systemCommand.params);
  this.commands = commands(systemCommands, systemCommand, config);

}

module.exports = Help;
