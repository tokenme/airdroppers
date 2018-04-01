pragma solidity 0.4.19;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";


contract MultiSendERC20Dealer is Ownable {
  
  event TokenDropLog( address receiver, uint256 amount );

  function multiSend(address _tokenAddr, address _tokenSupplier, address _dealer, uint256 _price, address[] recipients, uint256[] amounts) external onlyOwner payable {
    require(recipients.length == amounts.length);

    _dealer.transfer(_price);

    ERC20 token = ERC20(_tokenAddr);

    for (uint256 i = 0; i < recipients.length; i++) {
      token.transferFrom(_tokenSupplier, recipients[i], amounts[i]);
      TokenDropLog(recipients[i], amounts[i]);
    }
  }

  function () external payable {}
}