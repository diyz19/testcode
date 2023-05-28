import json

routes: dict[str, tuple[str, str]] = {
    "wx4en": ("wx4enscgue5", "wx4enrq9mm9"),
    "wx4ep": ("wx4epb8scg1", "wx4ep8e5gw0"),
    "wx4eq": ("wx4eq7rgmxk", "wx4eqt6u0vu"),
    "wx4er": ("wx4erd4xkyz", "wx4erw9rmze"),
}

accounts: list[str] = [
    "0x196424dd2bf7c978228ebd7a17b38b993d650696", "0x12d0e4381ef94a70a49252e35b9a65fadd3872b9", "0x456c4df0610c7611ae8bcaed32dd1d94e88ceca4", "0xdedee68f2020c0d3f98d2a8c23b6563f7b97e559", "0xc0a3917e5679c0ef9033c41cbe294a212abe55df", "0x55577fd620a0b8379846fcb1499e4bdc22538843", "0xad8a321e2e8f8f51245f47b8f412979d5740e625", "0x91153bad44dcc46187c481d8d36a53e58522d0c4", "0xe64e81bc77ee05caaa6b1476de75193607e84d87", "0x7a68b86008b0cfc3ae0e8068360271cbb999c97d", "0xd5f5ef5ff4c6323c62bdc5ab2061f440aefc511b", "0xf4190533e1203597f7cbe83cd76a32192af04ebf", "0xfc932e94fed02d65e282e933c8e0cb75f6c4cfd8", "0xfdd87ce574fea6b415f3a8f70f4fcc752555b920", "0xd05c44f7b7f9d7c76a32f6cd5c612ac9c0f5bfc2", "0xbeacf6104014bfafccc307bb7e7b5ef850c1db0d", "0x3df2c7b1e2c3e8e5e40c6035f6a3a5bb8fdb6b87", "0x46dfb062b17f2ef557a64283347653f11ba7c089", "0xd402c7301a68c4c65529ab0c597bb8b13e27f607", "0x42389309e69a2b32b98f04bc8255ad971797f757", "0xcae58827099cb4557f40dd308f5efc29e9065be8", "0x6d1558ef76336d670fb6f2b04ae1f345eab94761", "0x95d2b2a36e6a3d1e7ac8edbf99481c6009a19131", "0xd35d112793fe59877302d4064c9ef5a89c0485ba", "0xac37a0543b6abb8e7add0c00128c9f486e45b0e9", "0x7a5b8a958a74e39ade01f412951fb319ee4fe6d9", "0xfb1c049ecb1884a77e857bcca8ae6443f0143dbf", "0x4c0ae67f9e2dcabbcaee58afa56c14e427272b6f", "0x0d5f26272be5a3b462c3b7a978c7bf4b0d6aadb1", "0x0cac0bfe17bd73be78486a51a15db39b10cbafcf", "0xbf5868b482ace24aa4f339ceb26e32230fc7d3aa", "0x926f155822d00a9191fe71ec570bcd1f0eb0c300", "0xedb6f3a4a1ebc511f7fe9bd4f2cd4219ca0a3cf4", "0xbd2f3e025a8f0b0d8bb9f64ef60980ebb27e8d5d", "0xabd6b57b7d198796947bc03e4f5bd911813caada", "0x62119c27e0081b14e6e0c596603d21eaa6d6452b", "0xc265c858c1186113b2d830e6f46f6d95142e9750", "0x03875bcc0db199992266825e2c1cf0f5bfc200d2", "0xf0ce9fe96ac15405e4fd51a62cbdbdaef2d36372", "0x1bdf42d9a37b5b5c5a3bc09cadfade23d075791a", "0x3449a20e1b4700ffd4dd49f0fc14bcac44fee63c", "0xd2ed0cb17fd847c8aa8bc8e9ed3870481ede088b", "0x5227daf8db7c57d268979df21ba9ee9c93d26712", "0xb658cbd857f52f9705fbecf9b30cf827dd8c81a8", "0x5895ef03d8c36b9a53b4f961cd1345ed0bd79fa3", "0x4093777e3bf0a104ef5576011a965c58a206b69b", "0x7906b337632876b8050f55ee5b57228f02972fa3", "0x3b49b8eb1d9d3c28242b97c135379e0e32468fb9", "0x1cdf2caf87fe659e3d2fb0d2482049d74375eca6", "0x00cbd2864b7c93822826f80a7c968a2ada1cbaa7", "0x6667d6c8b9d92f20a6a8ffaae8aace0147bee999", "0x98a7df3e665e83ed12f900bb0a9f7d2914808fa7", "0xcb1d4560f811ae161002ffadc4c834ecd1fa82ba", "0x3d79e4b740913678fcab6e490f4c273f3e7d6a89", "0xbcbc44f60dea618c7df6a08a3a9683ee138813ba", "0x1c230c5d5ae6b126d0d7fd8e8af3aa09905d2b4b", "0x075c06e40ff4067d3f9d765719555f06532bb170", "0xbb9fdf370e08bb5dee6f39ea440de18f01cdb1c8", "0xed04389fb476cbfb0737477e9aa3a509404917cf", "0x54dd0a733e1c1ae9ea5ddab64c5f3922daec1ddf", "0xd93f7bbe87e0986efca3dedc91880635a0f355d9", "0x781b6d4d069a201ca8dc1542684edffd1b79c025", "0x05d6ca3c365ab26983bfca03809309a8258e3f62", "0x792e5531f6d360524e4dd3f1d17725edcc9b1dc1", "0x086ba65affc894f226e87f8d16f20a35d4f60b4d", "0x2702ee5633daab4d277f5660f1c29d3e5454f7b3", "0x2888bd343cbbc9cb5469c7a3c52d51dff4350d97", "0x7a594ef9f871e4ef17c8d659aa58b3b09e090cf3", "0xb2e192f38247113c0a695a4da975771bfd32d68e", "0xe3cfc7fd117fa5762bfb5390acbdf48557a18ac2", "0xa97253e4fe217e80b5f2e995bd54904f63726719", "0xce2897c392e16c5762131a56686733e035a4aa30", "0x441d24425b99411edd0ecf95501cb0db988e2f13", "0xf5493c66a2f85637127510a53b6cd0b067936b51", "0xcd924d3e8e043bb9579a4033ab08f8c1404840f0", "0xf85378de486a9514f26f3118450ff6409aaf2bfb", "0x2a52bc09f527f500c7fc62c63f681d24dad62a77", "0x0c05c7ae6e3a58c23e5d27fc1d121ed1aec0f738", "0x7776ed3449f97157630b06035e11bc7759e4f0db", "0xd30d093abb9d34fb14917d07121ed6a61cb1f99e", "0x7b11919cd9db9a817c8f9d2e9477f410273a3ceb", "0x3c28dc70332560ed17d1002704780df9df497abb", "0xeef75753e18f97f0ee8a61119d84cdba23d22a7f", "0x2a772e261792d208c40d685b31673a85ad18eb90", "0x495b77d80ccb1d3d1476db06dd522292555b2e23", "0xa95e44270fc15576da490955d8e6698e2a95f610", "0xa330923b96f26c88a2681112bfe26d4d9186131a", "0x814d66fc3f60ca8b257b21f1b89faeecd31475af", "0x17164c34807aa124363d80a604efd4560d8cea0e", "0x9edfe6721d18361bf2b6d83b5cc22c0bf4db6314", "0x08346710bfb71d0fea0b4a9a3d31107df5fe287a", "0x28a3f726b61a49da7ae14fd456b80e44e4974d1d", "0xb08c2456169491982bb3ab852eae8ee3300b9261", "0x073ad6ab89e9097b5405da6d46e1b0db47ec632e", "0x3007e2b9de5a7a57c84cd64609441bef2d29a9d0", "0xea9453d9095bf11acba9728c471703e9af4c31af"
]


if __name__ == "__main__":
    subarea_count: int = len(routes.keys())
    # quarter_account_count: int = len(accounts) // subarea_count
    quarter_account_count: int = 12 // subarea_count

    vehicles_content: dict[str, dict] = dict()
    passengers_content: dict[str, dict] = dict()

    for (i, (prefix, route)) in enumerate(routes.items()):
        idx_lo: int = quarter_account_count * i
        idx_hi: int = quarter_account_count * (i + 1)
        subarea_account_count: int = quarter_account_count // 3

        content: dict[str, dict] = dict()
        with open(f"vehicles_info_{prefix}.json", "w") as f:
            for j in range(idx_lo, idx_lo + subarea_account_count):
                content[accounts[j]] = {
                    "initPos": route[1]
                }
            json.dump(content, f)
            vehicles_content.update(content)

        content: dict[str, dict] = dict()
        with open(f"passengers_info_{prefix}.json", "w") as f:
            for j in range(idx_lo + subarea_account_count, idx_hi):
                content[accounts[j]] = {
                    "start": route[0],
                    "end": route[1]
                }
            json.dump(content, f)
            passengers_content.update(content)

    with open(f"vehicles_info_all.json", "w") as f:
        json.dump(vehicles_content, f)

    with open(f"passengers_info_all.json", "w") as f:
        json.dump(passengers_content, f)
