abigen: 
	abigen -abi=build/abi/StandardToken.json --out StandardToken.go --pkg eth --type StandardToken
	abigen -abi=build/abi/MultiSendERC20Dealer.json --out MultiSendERC20Dealer.go --pkg eth --type MultiSendERC20Dealer
