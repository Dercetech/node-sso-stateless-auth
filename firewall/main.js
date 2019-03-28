require('trapezo').resolve(module, main);

function main(firewallServers) {
  firewallServers.start().then(() => {
    console.log('[firewall] ready to inject SSO tokens and proxy requests ༼つಠ益ಠ༽つ ─=≡ΣO))');
  });
}
