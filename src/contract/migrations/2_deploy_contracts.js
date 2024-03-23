// const HelloWorld = artifacts.require("./HelloWorld");

// module.exports = function(deployer) {
//     deployer.deploy(HelloWorld);
// };

const PaymentContract = artifacts.require("PaymentContract");

module.exports = function(deployer) {
    deployer.deploy(PaymentContract);
};