module.exports = function diFactory() {
  const decodeToken = token => {
    const [headerB64, claimsB64, hashB64] = token.split('.');
    const [header, claims] = [headerB64, claimsB64]
      .map(b64String => new Buffer(b64String, 'base64'))
      .map(buffer => buffer.toString())
      .map(json => JSON.parse(json));
    return { header, claims, hash: hashB64 };
  };

  return {
    token: { decode: decodeToken },
    hashing: {
      basic: input => '#' + input // wow, now that's secure
      //realLife: something of the likes: forge.pkcs5.pbkdf2(inputPassword, salt, iterations, 32 (...) =>
    }
  };
};
