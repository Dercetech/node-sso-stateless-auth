require('trapezo').resolve(module, main);

function main(apiServers) {
  apiServers.start().then(() => {
    console.log('[api] server ready ٩(^‿^)۶');
  });
}
