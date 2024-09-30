const chalk = require('chalk');

function logSuccess(message, icon = '✅') {
  console.log(chalk.greenBright(`
${icon} ${chalk.bold(message)}
  `));
}

function logError(message, icon = '❌') {
  console.log(chalk.redBright(`
${icon} ${chalk.bold(message)}
  `));
}

function logInfo(message, icon = 'ℹ️') {
  console.log(chalk.blueBright(`
${icon} ${chalk.bold(message)}
  `));
}

function logStartup() {
  console.log(chalk.blueBright(`
───────────────────────────────────────
      🚀  ${chalk.bold('Comet V2')} is starting up...  
───────────────────────────────────────
  `));
}

function logReady(client) {
  console.log(chalk.greenBright(`
───────────────────────────────────────
      🟢 ${chalk.bold(client.user.tag)} is now online!
───────────────────────────────────────
  `));
}

module.exports = {
  logSuccess,
  logError,
  logInfo,
  logStartup,
  logReady,
};