const MultiSendERC20Dealer = artifacts.require("MultiSendERC20Dealer");
const Token = artifacts.require("Token");

contract("MultiSendERC20Dealer", function(accounts) {
  const [owner, recipient1, recipient2, dealer] = accounts;
  let token;
  let multiSend;

  beforeEach(async function() {
    token = await Token.new();
    multiSend = await MultiSendERC20Dealer.new();
  });

  it("send all to recipient1, recipient2", async function() {
    let multiSendBalance = 0;
    let recipient1Balance = 0;
    
    /*
    // send ether to contract
    await web3.eth.sendTransaction({
      from: owner,
      to: multiSend.address,
      value: web3.toWei(1, "ether")
    });

    multiSendBalance = await web3.eth.getBalance(multiSend.address);
    assert.isTrue(multiSendBalance.equals(web3.toWei(1, "ether")));

    // send tokens to contract
    await token.transfer(multiSend.address, web3.toWei(2, "ether"));

    multiSendBalance = await token.balanceOf(multiSend.address);
    assert.isTrue(multiSendBalance.equals(web3.toWei(2, "ether")));
    */

    ownerBalance = await token.balanceOf(owner);
    console.log('OWNER TOKEN: ', ownerBalance.toNumber());
    ownerBalance = await web3.eth.getBalance(owner);
    console.log('OWNER ETH: ', ownerBalance.toNumber())
    dealerBalance = await web3.eth.getBalance(dealer);
    console.log('DEALER ETH: ', dealerBalance.toNumber())

    await token.approve(multiSend.address, web3.toWei(2, "ether"), {from: owner});
    let allowance = await token.allowance(owner, multiSend.address);
    console.log('Owner Allowance: ', allowance.toNumber())
    assert.isTrue(allowance.equals(web3.toWei(2, "ether")));
    // send tokens to addresses
    await multiSend.multiSend(
      token.address,
      owner,
      dealer,
      web3.toWei(1, "ether"),
      [recipient1, recipient2],
      [web3.toWei(1, "ether"), web3.toWei(1, "ether")], {from: owner, value:web3.toWei(1, "ether")}
    );

    ownerBalance = await token.balanceOf(owner);
    console.log('Owner Token:', ownerBalance.toNumber())
    assert.isTrue(ownerBalance.equals(web3.toWei(98, "ether")));

    recipient1Balance = await token.balanceOf(recipient1);
    assert.isTrue(recipient1Balance.equals(web3.toWei(1, "ether")));

    recipient2Balance = await token.balanceOf(recipient2);
    assert.isTrue(recipient2Balance.equals(web3.toWei(1, "ether")));

    ownerBalance = await web3.eth.getBalance(owner);
    console.log('Owner ETH: ', ownerBalance.toNumber())

    dealerBalance = await web3.eth.getBalance(dealer);
    console.log('Dealer ETH:', dealerBalance.toNumber())
  });
});