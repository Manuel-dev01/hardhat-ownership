//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// Solidity contract to prove the ownership without revealing the actual file
// We will achieve proof of ownership by storing the hash of the file and the owners name as pairs
// We will achieve proof of existence by storing the hash of the file and the block timestamp as pairs
// Finally storing the hash itself proves the file integrity, because if the file is modified then it's hash would change and the contract won't be able to find any such file proving that the file has been modified  

contract Proof {
    struct FileDetails {
        uint timestamp;
        string owner;
    }

    mapping(string => FileDetails) public files;

    event logFileAddedStatus(bool status, uint timestamp, string owner, string fileHash);

    // Store the owner of the file and blocktimestamp
    function set
    (string calldata _owner, string calldata _filehash) public {
        if(files[_filehash].timestamp == 0) {
            files[_filehash] = FileDetails(block.timestamp, _owner);

            // Trigger event to notify frontend that file existence and owner have been stored
            emit logFileAddedStatus(true, block.timestamp, _owner, _filehash);
        } else {
            emit logFileAddedStatus(false, block.timestamp, _owner, _filehash);
        }
    }
}
