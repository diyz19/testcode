import json
import os
import requests


def update_enode(filename: str, enode: str):
    with open(filename, "r") as f, open("temp", "w") as g:
        for line in f.readlines():
            if line.startswith("var w1Enode"):
                g.write(f"var w1Enode = \"{enode}\"\n")
            else:
                g.write(line)
    os.remove(filename)
    os.rename("temp", filename)


def generate_script(enode: str, node_name: str):
    code: str = r"""admin.addPeer("%s")

sleep(10000)

eth.setBranchBlock({from:eth.accounts[0],branchid:"%s",settime:20})
miner.setEtherbase(eth.accounts[2])

sleep(10000)

//账户解锁
for (var i = 0; i < 14; i++) {
    personal.unlockAccount(eth.accounts[i],"123",30000)
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}""" % (enode, node_name)
    
    with open(f"{node_name}_addPeer.js", "w") as f:
        print(code, file=f)


def main():
    r: requests.Response = requests.post(
        "http://localhost:8549",
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

    generate_script(enode, "w11")
    generate_script(enode, "w12")


if __name__ == "__main__":
    main()