from collections import defaultdict
import json


class Event:
    def __init__(self, event_type: str, initiator: str, timestamp: int):
        self.type: str = event_type
        self.initiator: str = initiator
        self.timestamp: int = timestamp


def main():
    logs: defaultdict[str, list[Event]] = defaultdict(list)

    with open("p5.log", "r", encoding="utf-8") as f:
        while line := f.readline():
            elements = line.split('@')
            logs[elements[2]].append(Event(
                elements[-1].strip(),
                elements[2],
                int(elements[0]),
            ))
    
    res: dict[str, dict[str, int]] = dict()
    for account_addr, events in logs.items():
        res[account_addr] = dict()
        for i in range(1, len(events)):
            res[account_addr][events[i].type] = events[i].timestamp - events[i - 1].timestamp
    
    with open("p5_log.json", "w") as f:
        json.dump(res, f, indent=4)


if __name__ == "__main__":
    main()
