Feature: Search product in Daraz

	# to check first cucumber works or not
	Scenario: Verify result for daraz product search
		Given User visits daraz website
		When User search by product name
		Then Count the results
	    	And User clears first search from input
		Then Count the result again