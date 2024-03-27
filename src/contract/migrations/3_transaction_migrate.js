const PaymentContract = artifacts.require("PaymentContract");
const BillContract = artifacts.require("BillContract");

module.exports = function(deployer) {
    deployer.deploy(PaymentContract);
    deployer.deploy(BillContract)
};