// const HelloWorld = artifacts.require("./HelloWorld");

// module.exports = function(deployer) {
//     deployer.deploy(HelloWorld);
// };

const PaymentContract = artifacts.require("PaymentContract");
const BillContract = artifacts.require("BillContract");

module.exports = function(deployer) {
    deployer.deploy(PaymentContract);
    deployer.deploy(BillContract)
};