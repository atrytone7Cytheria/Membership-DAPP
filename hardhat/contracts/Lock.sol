// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MembershipCard {
    address[] public admins;

    constructor(address[] memory _admins) {
        admins.push(msg.sender); // Add the contract deployer as an admin
        for (uint i = 0; i < _admins.length; i++) {
            admins.push(_admins[i]); // Add the provided admins
        }
    }

    modifier onlyAdmin() {
        bool isAdmin = false;
        for (uint i = 0; i < admins.length; i++) {
            if (msg.sender == admins[i]) {
                isAdmin = true;
                break;
            }
        }
        require(isAdmin, "Access Denied");
        _;
    }

    struct Membership {
        string name;
        string rollNumber;
        string clubName;
        string date;
    }

    mapping(uint256 => Membership) public memberships; // Membership details by membership ID
    mapping(uint => uint256) private index; // Mapping to track issued membership IDs
    uint public numMemberships; // Counter for the number of memberships issued

    modifier newID(uint256 _id) {
        bool isNewID = true; // Renamed variable to avoid shadowing
        for (uint i = 0; i < numMemberships; i++) {
            if (index[i] == _id) {
                isNewID = false;
                break;
            }
        }
        require(isNewID, "A membership card has already been issued with this ID.");
        _;
    }

    function issueMembership(
        uint256 _id,
        string memory _name,
        string memory _rollNumber,
        string memory _clubName,
        string memory _date
    ) public onlyAdmin newID(_id) {
        memberships[_id] = Membership(_name, _rollNumber, _clubName, _date);
        index[numMemberships++] = _id;
    }
}
