// FIXME: For some reason with one function it won't make both requests

// FIXME: I think there is a memory leak in this function, need to look into it

// NOTE: Should use a shared disk to store the public key and just read from that each time instead of 3 requests...
async function webserverPublicKey(s) {
  const reply = await ngx.fetch("http://account_server:3000/api/public_key");
  const body = await reply.text();
  // I'm sure that there is a better way that I should do this but it's fine
  const webserverReply = await ngx.fetch(
    "http://webserver:3000/webserver/public_keys",
    {
      headers: { apk: body },
    }
  );
  const webserverResponse = await webserverReply.text();
  return;
}

async function cartServerPublicKey(s) {
  const reply = await ngx.fetch("http://account_server:3000/api/public_key");
  const body = await reply.text();
  const cartServerReply = await ngx.fetch(
    "http://cart_server:3000/cart_server/public_keys",
    {
      headers: { apk: body },
    }
  );
  const cartServerResponse = await cartServerReply.text();
  return;
}

async function orderServerPublicKey(s) {
  const reply = await ngx.fetch("http://account_server:3000/api/public_key");
  const body = await reply.text();
  const cartServerReply = await ngx.fetch(
    "http://order_server:3000/order_server/public_keys",
    {
      headers: { apk: body },
    }
  );
  const cartServerResponse = await cartServerReply.text();
  return;
}

export default {
  webserverPublicKey,
  cartServerPublicKey,
  orderServerPublicKey,
};
