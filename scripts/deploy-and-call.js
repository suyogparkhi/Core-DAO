const hre = require("hardhat");

async function main() {
  const LibraryManagement = await hre.ethers.getContractFactory("UserManagement");
  const libManagement = await LibraryManagement.deploy();

  await libManagement.deployed();
  console.log("LibraryManagement contract deployed to:", libManagement.address);

  // Add a new user
  console.log("Adding Book...");
  let tx = await libManagement.addBook("0x1234567890abcdef1234567890abcdef12345678", "Book1", "Tushar");
  await tx.wait();

  //get book info
  let libInfo = await libManagement.getBook("0x1234567890abcdef1234567890abcdef12345678");
  console.log(`Book info: ID=${libInfo[0]}, Name=${libInfo[1]}, Author=${libInfo[2]}`);

  // Add a new user
  console.log("Adding Book...");
  let tx2 = await libManagement.addBook("0x1234567890abcdef1234567890abcdef12345679", "Book2", "Suyog");
  await tx2.wait();

  //get book info
  let libInfo2 = await libManagement.getBook("0x1234567890abcdef1234567890abcdef12345679");
  console.log(`Book info: ID=${libInfo2[0]}, Name=${libInfo2[1]}, Author=${libInfo2[2]}`);


  // Remove the user
  console.log("Removing Book...");
  tx = await libManagement.removeBook("0x1234567890abcdef1234567890abcdef12345678");
  await tx.wait();

  // Attempt to retrieve the user information again (should fail)
  try {
    libInfo = await libManagement.getBook("0x1234567890abcdef1234567890abcdef12345678");
    console.log(`Book info: ID=${libInfo[0]}, Name=${libInfo[1]}, Author=${libInfo[2]}`);
  } catch (error) {
    console.error("User does not exist.");
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});