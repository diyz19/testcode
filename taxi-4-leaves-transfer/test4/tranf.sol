// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract Transf{
    //new event
    event IN_Event1();

    function IN_transf1() public {
        emit IN_Event1();
    }
    //new event
    event OUT_Event2();

    function OUT_transf2() public {
        emit OUT_Event2();
    }

	event IN_Event3();

    function IN_transf3() public {
        emit IN_Event3();
    }
    //new event
    event OUT_Event4();

    function OUT_transf4() public {
        emit OUT_Event4();
    }
}