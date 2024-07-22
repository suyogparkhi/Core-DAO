// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/**
 * @title LibraryManagement
 * @dev A basic Library management system with access control and events.
 */
contract UserManagement {
    address owner;

    struct User {
        uint256 id;
        string name;
        string author;
    }

    mapping(address => User) private users;
    mapping(uint256 => address) private userIds;
    uint256 private nextId;

    event BookAdded(address indexed userAddress, uint256 userId, string name, string author);
    event BookRemoved(address indexed userAddress, uint256 userId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    modifier userExists(address userAddress) {
        require(users[userAddress].id != 0, "User does not exist");
        _;
    }

    constructor() {
        owner = msg.sender;
        nextId = 1;
    }

    function addBook(address userAddress, string memory name, string memory author) public onlyOwner {
        require(users[userAddress].id == 0, "User already exists");
        users[userAddress] = User(nextId, name, author);
        userIds[nextId] = userAddress;
        emit BookAdded(userAddress, nextId, name, author);
        nextId++;
    }

    function removeBook(address userAddress) public onlyOwner userExists(userAddress) {
        uint256 userId = users[userAddress].id;
        delete users[userAddress];
        delete userIds[userId];
        emit BookRemoved(userAddress, userId);
    }

    function getBook(address userAddress) public view userExists(userAddress) returns (uint256, string memory, string memory) {
        User memory user = users[userAddress];
        return (user.id, user.name, user.author);
    }

    function getBookById(uint256 userId) public view returns (address, string memory, string memory) {
        address userAddress = userIds[userId];
        require(userAddress != address(0), "User ID does not exist");
        User memory user = users[userAddress];
        return (userAddress, user.name, user.author);
    }
}