const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "pxxgzvd3zd5qvcqf",
  publicKey: "yd7tkzp9kgyqk3z4",
  privateKey: "ca2dfa74786907fa02aeb2db9ed62fce",
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) res.status(500).send(err);
    else res.send(response);
  });
};

exports.processPayment = (req, res) => {
  
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;
  
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
     
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) res.status(500).json(err);
      else res.json(result);
    }
  );
};
