require('trapezo').resolve(module, main);

function main(authServers) {
  authServers.start().then(() => {
    console.log('[auth] ready to authenticate people and kick ass (̿▀̿ ̿Ĺ̯̿̿▀̿ ̿)̄');
  });
}
