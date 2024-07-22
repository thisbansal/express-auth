const { createCA, createCert } = require("mkcert");

async function generateCAKeys() {
  const ca = await createCA({
    organization: "Swifty",
    countryCode: "AU",
    state: "Vic",
    locality: "Truganina",
    validity: 365,
  });

  const cert = await createCert({
    ca: { key: ca.key, cert: ca.cert },
    domains: ["127.0.0.1", "localhost", "0.0.0.0"],
    validity: 365,
  });
  return { ca, cert };
}

module.exports = generateCAKeys;
