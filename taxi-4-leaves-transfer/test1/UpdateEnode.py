import json
import os
import requests

code: str = r"""admin.addPeer("%s")

sleep(10000)

eth.setBranchBlock({from:eth.accounts[0],branchid:"%s",settime:20})

var MAP_NAME = "%s";

sleep(10000)

// 账户解锁
for (var i = 0; i < %d; i++) {
    personal.unlockAccount(eth.accounts[i],"123",30000)
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}"""


def update_enode(filename: str, enode: str):
    with open(filename, "r") as f, open("temp", "w") as g:
        for line in f.readlines():
            if line.startswith("var w1Enode"):
                g.write(f"var w1Enode = \"{enode}\";\n")
            else:
                g.write(line)
    os.remove(filename)
    os.rename("temp", filename)


def generate_script(enode: str, node_name: str, unlock_count: int):
    with open(f"{node_name}_addPeer.js", "w") as f:
        print(code % (enode, node_name, node_name, unlock_count), file=f)


def main():
    r: requests.Response = requests.post(
        "http://localhost:8080",
        data=json.dumps({
            "method": "admin_nodeInfo",
            "params": [],
            "id": 0,
            "jsonrpc": "2.0"
        }),
        headers={
            "Content-Type": "application/json"
        }
    )
    r.raise_for_status()

    result: dict = json.loads(r.text).get("result")
    enode: str = result["enode"]

    # unlock_count: int = 192
    unlock_count: int = 12

    generate_script(enode, "wx4en", unlock_count)
    generate_script(enode, "wx4ep", unlock_count)
    generate_script(enode, "wx4eq", unlock_count)
    generate_script(enode, "wx4er", unlock_count)

    with open("unlockAccounts.js", "w") as f:
        f.write(r"""var MAP_NAME = "wx4e"; for (var i = 0; i < %d; i++) { personal.unlockAccount(eth.accounts[i], "123", 30000); }""" % (unlock_count, ))


if __name__ == "__main__":
    main()
