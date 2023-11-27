async function setPublicKey(s) {
  const reply = await ngx.fetch("http://account_server:3000/public_key");
  const body = await reply.text();
  const publicKey = JSON.parse(body).public_key;

  // Send public key to the webserver (and maybe others)
  // I'm sure that there is a better way that I should do this but it's fine
  const webserverReply = await ngx.fetch(
    "http://webserver:3000/webserver/public_keys",
    {
      headers: { apk: body },
    }
  );
  const webserverResponse = await webserverReply.text();

  // FIXME: I think there is a memory leak in this function, need to look into it

  ngx.shared.apk.set("public_key", publicKey);
}

export default {
  setPublicKey,
};
