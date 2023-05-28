const Web3 = require('web3');
const w1Web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8549"));
const w11Web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8511"));
const w12Web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8521"));

function accountHex2Address(accountHex) {
	if (!accountHex.startsWith("0x")) {
		console.error("Wrong format! Account of hex must starts with \"0x\".")
		return ""
	} else {
		res = `[${parseInt(accountHex.slice(2, 4), 16)}`
		for (let i = 4; i < accountHex.length; i += 2) {
			res += ` ${parseInt(accountHex.slice(i, i + 2), 16)}`
		}
		res += "]"
		return res
	}
}

//accounts_manage_account
const accountManagerW11 = "0x196424dd2bf7c978228ebd7a17b38b993d650696";
//mobile_account
const mobileAccounts = [
	"0x12d0e4381ef94a70a49252e35b9a65fadd3872b9",
	"0x95fcbbba05858b53b829361a052450179d7a62ca",
	"0x59cadf05182c56784b60960159c0fb4d16860d10",
	"0x4d326e5422c48ca1db8695bb59c9a58005a3fb44",
	"0x1daf02e444bec7fc7fdbbac7704c57d001b19648",
	"0xf41384cb20cd007daea6b0d7eefa3942ac44a3d1",
	"0x8ed2d00a4ee496e51fab00ddc7561f85186e2a9c",
	"0xcada164cb319316a133741dbaa1b40fcc8caec52",
	"0x4461e120a1bcbdc9e08730f59c7e169bac5de38f",
	"0x0b424be2eb61a4fa045161198754613a93845857",
	"0x023bc9309e89678b5de3ea084a5a91cc0679dd39",
	// "0xa63e2d4e2bbcf0ba59f913887cbd683cf3e13621",
	// "0x891402ecfa0f2dfdad07e4dadd8a2d06370097e1",
	// "0xf87242ce0719bea8c5685685c9aadd72f3e86a38",
	// "0xa72ebb86eb50b8ecf0c4a885cb5b2d5395f08b75",
	// "0xd151d81db1ab770c843ce9cbe759f2e016f7da1a",
	// "0x1baa8faa6ecb171d07e87a1b35c228891d27c216",
	// "0xc413289a9f026deacc7f0b99a4a82a10953b9479",
	// "0x38516eff18224a2bf8fd0be118a799bc32793308",
	// "0x97c72fd57d8fa3421b02605e874a9d79740d465c",
	// "0x4b5d867cc32ad99225f440ee355d3ca026a110c0",
	// "0x17f0dc52223397eea45b4a3fa7f239b5ce2f43ea",
	// "0xd606b79a35f5da003993abe0299bdf47b07abb56",
	// "0xd6d26c1a4866b19289a5ee667143a16f641400b5",
	// "0x30a48cb921cc4a1236d93aa65cc9502d89dfa315",
	// "0x2d13a110c2aec1c4fad74611a0f64dc54f26427b",
	// "0x0377f0d90c193bb66ae440399a50c8c52c1be6bc",
	// "0x4e9b483b256b0bbbc8b6435bf61aa310014a4a4f",
	// "0xd8f585bf92b0d862148b8299d5edd652e969a8ec",
	// "0x8486b1b44c01fe1e646c6969ef1af9102edbc584",
	// "0xb06024ae300aa4fd038cd33a093af537f40ec5fb",
	// "0xfc5f6797a6d6c815c9a9d967df80daee227610e3",
	// "0x8c615a4eace05128da7943e0a492d0212af5ee97",
	// "0x61d3cbb6777164476ec7025aa4d76ac99bb004b1",
	// "0x853184aad754858137f6e0bf29a676149acd8869",
	// "0x6fbb841062ba97a1427e859997dcf96a4ed0acb6",
	// "0xc4d3aa101410a5ef64e11827cd03cf32086740e9",
	// "0x6281a8f18bd54f42b0bacbda13a3e07361e9bedd",
	// "0x880e592406b91c0818151f0c1cce5db014b1432c",
	// "0x77c189bee93e207a1443b6fa08edac500cbeeefd",
	// "0x8ae63987c2ad6cb2e0c9b62f33d437d28df2dd6f",
	// "0xb6e5bcc2dcadb9d2d8f4b1d9ebdf072995ecff2f",
	// "0x632d4b2d0282b610dffdfcf97b2fea89a49b125d",
	// "0x24c3abca62681f5e85ec56fbaf836958e40b16e7",
	// "0x4ca639568724194175da9e459def95a350d8c492",
	// "0xe5450b5ff11cb662970c058f5ab05bc86cb0cf42",
	// "0xde906c38bec0d23c9a50f99dfe8ce89d99d340ed",
	// "0x3068565a8fec05e11ac922bff918f47c3d51fef7",
	// "0xb649108711bc7de7857e1c5f4f5d8cca48613f80",
	// "0x29563496bf520b46d674862212d25edb245803a3",
	// "0x815c00f3ecbd82735d715f16edefaf33818405fd",
	// "0x771812570128ff72f05a0f64a701c50fc160a359",
	// "0xc5f9b3d3b3838d8d572b86be749ac76650e33b5d",
	// "0x3f5e7aa103d5b5d784659a43cee4b434fca7351d",
	// "0xa97b146cd2f5877710d134b99d8f4787d139c132",
	// "0xa9e921f9bb15a394463e6e762f5834f0f19f8b66",
	// "0xbf91b3d316bb43a6dba10aab939bf84f6308f72f",
	// "0x04cbe510ed5376f348553ff4381244ff2cb92806",
	// "0x7b49b726429239c08b085be20a368393b905f1a7",
	// "0x20d3d0fcf1654a183c46c1d3de9c6e65cd833143",
	// "0x9644911cbb21bf56a3e247f90b8ab2c1b4569a6a",
	// "0xac5d9bb9dc8cfe5707498146b13c60381cfe2c40",
	// "0x832e1876d38ca66d0a18332370f2afc57eb40f90",
	// "0x29f9b151551dd371b9539be8ea476d1d5cec8a3e",
	// "0xba77f781033277d4393bc200e871bd51bcf1acd3",
	// "0x5da0ea918a2a7731f06b3287cc21436d466e761f",
	// "0x9a4e0331df3deeb03f54dd2a2cb752f097671ef3",
	// "0x71bd141622cbde559952715a595ff4ccb7d9fa6e",
	// "0xa164388844183b28e8a6234233fcef90041e0a4f",
	// "0xf7a7265fab2b684f126827c6cf0f11616cf69656",
	// "0xabcf8e4d59fc72e1940347074f6e0cb87b6246fb",
	// "0xaf1145369318f4b79a26a074245ce8e1649209d0",
	// "0x7e84b1c1e88a868d86c46b355525bac9ac312075",
	// "0xacd5a6505287eeaec520b7fe8fde60ccd210cb48",
	// "0x0ed46fe903e0e6ac5be4ddbb853fc499232d103a",
	// "0xdcebe874dd3a8b3086cd7eb0b799c212c1c71041",
	// "0xd7deeb0d5b94b690eacbbf4117c0c8842455d3c9",
	// "0xf79da4894d5623734281c136929a612ce6a257a3",
	// "0x51e9cd72c76442db31fdb9a6f7b618aa73157aab",
	// "0x1a06936858d554c92e6e81efba198a2a8a646ada",
	// "0x3f91a455e9e3ccff57963d44f3cdc7b0475583ad",
	// "0xb066e946a6884fed52d8a1e87c7610a63526a06e",
	// "0xb7dda7fd6da582d1e67f6276a6c6b82577da6988",
	// "0x411d473c0b09a163d50d0ae648114ab270a6d2fe",
	// "0x8be8abe67a08a68f4a723584b460c19a919df8ec",
	// "0x782968fa27c8aade6e5f2c3aa0d3cac8c8d69aa1",
	// "0x20afc9a0634a32d2e58421c7f4c5c1f41ab661e4",
	// "0xf273fbd75cbea3f81e1aea92e54c6d0905af7129",
	// "0x4626b5493521c1ae75e278739e33f17917c8f937",
	// "0xff7d4695b836847188dd7f541b361b7c03b824d5",
	// "0x1e94ead04b5ec04b11e956d04f0c373d49ba63c7",
	// "0x2f4a40e04dd91347df73a6bcace7bcb3343005ed",
	// "0x8807977099edd7740b7155b6360e61740f688afe",
	// "0xf4ffbcddbb5767de3d38bd86318e065c324eeea0",
	// "0x2a6b4ee7455a17bb47114e0c54562bb87b2e70e3",
	// "0x60dc5bf4a3ba12a40a89e48d1aee1ebaf6953457",
	// "0xb7b00fe67fcb8c2e372dfc3430c6361efc91ada9",
	// "0xfe820e2e19b55af6ff9a09f960312e8e4847427e",
	// "0x2ed0a483326573640d7e432aa3404b45d9ab5883",
	// "0xf2a959a67e1abdbeceb444b1ea1f9dd7160c9a93",
	// "0x02d0bdd1be19567f8c5368c089a120f0e4d7a370",
	// "0xf134056ca436b0f803221193e55b514f07a92be7",
	// "0xba226b740bc72736618e836a7c1d614ccade86a1",
	// "0x82cf60cbcc2441b672ae47a1c8dc00f83c92dd43",
	// "0xa4fdd8b98d608d5274ac0fd67aa2f1f7db3255ea",
	// "0x155f75649109e5836f81658f171929853983484c",
	// "0xc9a7e28d4b7c2be240431507302cea462a79c400",
	// "0xa62a7a447ec8be88838e0e33f6883bcce2d35789",
	// "0x93b5a8930aa1d61cb0141061ead4883e58a8f4d0",
	// "0x8708bf2eeb9ea69d060ae361ec6803a6c9628421",
	// "0x201941f0d444d90a056841f75dde3dccb5f868be",
	// "0x009335f275db82e28675229b9cca2bd3f7347373",
	// "0xa3a26c90d0f2804eac8eedde35139c5657e137cf",
	// "0x58d7c237de46be13915ca3f1211461d106c67910",
	// "0xf4314706b00802f8ff8e5eeb041cdbe82e2b98de",
	// "0x8c507cc89539e02b420269a796c9b1e7fcf2970d",
	// "0x38c653abb9588ee71e024993b2174e634a432e47",
	// "0xd7caf20062b670a5f0027758f87a2c6809184ec3",
	// "0x2289bbed7160abf34ee14ef37a01a128b9685750",
	// "0x9992065f0b7dcd8b3f92106d3581165885deffad",
	// "0x3b086c96cd911795776eb4eea8bc94604defce73",
	// "0x722e99fbc0c2553dea3f3a0c4def72eb36b32cf5",
	// "0x3e9df0e68de343b34545f742655d5840f4f16335",
	// "0x7511aa8ac8082263f50a53832b53316adc3824d3",
	// "0xcda7863568de55656bbac68c548f57906a6d64b0",
	// "0xfdd4ad3ae5b32858c022a256b082e410744e9d56",
	// "0x1d95a75a5be48765a9a17a06c6f8c71f68880a0f",
	// "0xbc463d3a6a2454bfc6a48bccc3c4edd79b0f7073",
	// "0xb8a4f6dd1cdc2e9f297c64aa3283851d56c7842a",
	// "0xd8bac0be7f855b38dc4bf9e3b8d0a6aa573ef23e",
	// "0x3f5e3f9c5fab92a291af541d2aa45a5d9a5d05ec",
	// "0x8f8fb32955820741e7164d0f6d00021c944011dc",
	// "0x5219a1de9be8925df10c14682df0ee10fe8b66ab",
	// "0xe26713948e429540a9931228f0cc8bf3fa8533eb",
	// "0x1de56417f607e7d6b46417199e63264a831ca941",
	// "0x5da6831308bb23495bb1259aa5e0a087a8063f6e",
	// "0x47c1eb41a7285f640e0f1f96e12bd086f603ccfa",
	// "0x81f17aecea204f0cf32d362469b070dca77f325e",
	// "0xd3f43b85985672bc368de25912292064d0163b0e",
	// "0x1de312f4cb162e23941ec1d23cc93d82b8dda3c2",
	// "0x1a6d3ca6568862f4a0bb22b0d615b24dc399ac91",
	// "0xf8a070b917bde8b9e8a2fadb444ed4923b92e832",
	// "0x765ca268faf428b51901da0fd758250576ab6ba9",
	// "0x54319dfd2980d7898801299205bc9d3d0c1ffd2d",
	// "0xa40167f92da34f7542f00a0ae21bd1a5fd53e372",
	// "0x356dce894604612316ab9192439e4a888f68d502",
	// "0x8909238bba7f42b97cee72d6b2470617999aecd7",
	// "0x9796d03f2924d8307249247ce3897318408bda39",
	// "0xafe419a1bcba28a6e49efd0d2a93dcb10ab38a38",
	// "0x15af50c63bdbd62c1fdbccc8656cbe5afda99dbd",
	// "0x3e88a7d03b50ba1a33d5648d9881a90617f1d893",
	// "0x997b103f6c961ff07f1bea19ab9f500de1a5fb5a",
	// "0xdbb4b243ffdda762ed6e9f205b952b9a82890fef",
	// "0xe757637985e781ee173d32b0f27619368dc05fc9",
	// "0xb694358f91126362bde9f6467e1e22a64b1aeada",
	// "0x85c0f07e7588e7da1c4ae8c3c429692991b78b67",
	// "0xa7d97c4859141af368a6418b870648384aea5823",
	// "0xc125211208c561b7981b6ad6589cc7b39c5a3898",
	// "0xf844e750847818ad433241ca1d94078122853e44",
	// "0xb12c73c3758663d1d5958493ac21a1407ae594db",
	// "0x9037df103a343d99a46f39c2cd3c6bf2a7888fe6",
	// "0x50566282e0b67c0bfa621216dfd38896ec1eaea8",
	// "0xf9431e5a905a6418eeed1440612238e492428afb",
	// "0xc55421991d68b4c24efbc186b8c1f811f315176a",
	// "0x815b6c1dff553cd32e5efc58c53001dc5bc52504",
	// "0x17cac1af612bf395ad211c81858dfad7d5fc8db5",
	// "0xe31507fa1dce81db109501936bb778429f10379a",
	// "0xefc791625ca8a39632fc29ce4883c671d0a9674f",
	// "0xf74364eaf2af82c13e3a17a78679164535546a8f",
	// "0x3a77990e31934af3cf27fa1504bc59a0112885d4",
	// "0x2aa1d31248e58173a51ea3033d782a72e46ddf99",
	// "0xea4e7946ac83a2fc5bc65845afa0e126751f7689",
	// "0xf0e5e2de7d61ccb4b4efebf810a0ae0b505da8e4",
	// "0x1ff07eab2c3f4a18ef30e6f2a584c1b6069e5786",
	// "0x8b2eef64bb75e5822523adec4d643b6d332e9dbe",
	// "0x1869f4535cc9209247463848bf103e2a68131c43",
	// "0xbf9cd8650ab9d34b927add491aaf46105f96cb61",
	// "0x0729d47465b0bb0f2eaf1adc34a0e4619c3ccdef",
	// "0x21f93ad9911204ca02e9ea57390a6e38030a5b8a",
	// "0x99099e41ec6fada6077ce0ef759a6fc9bed1a035",
	// "0xa3326cd0446ac177acbb3fa70d9fabe34e6dd69c",
	// "0x3be69afb9796ee2779791e1343c089fe50166813",
	// "0xb0639200e2bcbcebe221dc880b01b66717ad45b9",
	// "0x7c10f29d181b8258772258dd454cf55df210b3d9",
	// "0x2fbcfa512c1fdbba71acad645e46cf0ee87a704e",
	// "0x6d55478ac843db0f3c5bfc5dd40e071035f14209",
	// "0xc84cf58fc1fbda5beafed85b3d40f4155fb8cb53",
	// "0xc2814a8eb569b6f21dbb1b6620f29b0258f02718",
	// "0x45ee0d7003fa89e96c40296d32ac4a0341a8257e",
	// "0x85e571757532f77b78d386262f64f58a37724039",
	// "0x61261f00cfd05c160dd450cb1870cc611b707f67",
	// "0x2ee32e9363467dc023e58502baf5a1cc6698a687",
	// "0x3e2d0bc0175c56d69cf41b4b3d56713385ca0499",
	// "0x8dac762fe49271943f50357348f04774b3ca0c6e",
	// "0xd1486366410bad8f0768303695f9d960f29b9b51",
	// "0x68027ad4c5fa5b03dca0faa7e343f9beff05af6f",
	// "0x61fa144547dee010f842bafbf3ff82224cbeba92",
	// "0x6cbc251fc06806a0ec1dfd3ac2fa60e054335dc1",
	// "0x170e7a057e3efce75a963268992722b2c6bba391",
	// "0xcdae61d349859c7c543920f2e0f91bfad8787108",
]

//mobile_account_add
const mobileAccountFromHexToAddress = mobileAccounts.map(accountHex2Address)

// var add_macc1 = '[18 208 228 56 30 249 74 112 164 146 82 227 91 154 101 250 221 56 114 185]';
// var add_macc2 = '[149 252 187 186 5 133 139 83 184 41 54 26 5 36 80 23 157 122 98 202]';
// var add_macc3 = '[89 202 223 5 24 44 86 120 75 96 150 1 89 192 251 77 22 134 13 16]';
// var add_macc4 = '[77 50 110 84 34 196 140 161 219 134 149 187 89 201 165 128 5 163 251 68]';
// var add_macc5 = '[29 175 2 228 68 190 199 252 127 219 186 199 112 76 87 208 1 177 150 72]';
// var add_macc6 = '[244 19 132 203 32 205 0 125 174 166 176 215 238 250 57 66 172 68 163 209]';
// var add_macc7 = '[142 210 208 10 78 228 150 229 31 171 0 221 199 86 31 133 24 110 42 156]';
// var add_macc8 = '[202 218 22 76 179 25 49 106 19 55 65 219 170 27 64 252 200 202 236 82]';
// var add_macc9 = '[68 97 225 32 161 188 189 201 224 135 48 245 156 126 22 155 172 93 227 143]';
// var add_macc10 = '[11 66 75 226 235 97 164 250 4 81 97 25 135 84 97 58 147 132 88 87]';

//w11_account
var minerW11 = "0x456c4df0610c7611ae8bcaed32dd1d94e88ceca4";
//w12_account
var minerW12 = "0x1dee886dee470f8e725c27061b55ad7e8619d92a";

var starttime, endtime, curtime;

const hashRequests = new Array(mobileAccounts.length).fill("")
var hash_out, hash_in;

//1. 第一次移动:移动账户在目标链w12发起位置写入交易Tx_common，没有余额无法写入  value:w3_web3.toWei(1,"ether")
function Tx_common_w12() {
	//移动账户在目标链发送普通交易,余额不足,未成功
	w12Web3.eth.sendTransaction({ from: mobileAccounts[0], to: minerW12, position: "w1201111111111", txtime: 1100 }, function (err, res) {
		if (err) {
			//console.log("Error:",err);
			console.log("!!mobileAccounts[0]--insufficient funds for this tx--w12!!")
		}
	});
	sleep(200)
	//  w12_web3.eth.sendTransaction({from:macc2,to:accw12,position:"w1202111111111",txtime:1200},function(err,res){
	//  	if(err){
	//  	  //console.log("Error:",err);
	//  	  console.log("!!macc2--insufficient funds for this tx--w12!!")
	// 	}
	//  });	
	//  sleep(200)
	// w12_web3.eth.sendTransaction({from:macc3,to:accw12,position:"w1203111111111",txtime:1300},function(err,res){
	// 	if(err){
	// 	  //console.log("Error:",err);
	// 	  console.log("!!macc3--insufficient funds for this tx--w12!!")
	// 	}
	// });	
	// sleep(200)
	// w12_web3.eth.sendTransaction({from:macc4,to:accw12,position:"w1204111111111",txtime:1400},function(err,res){
	// 	if(err){
	// 	  //console.log("Error:",err);
	// 	  console.log("!!macc4--insufficient funds for this tx--w12!!")
	// 	}
	// });	
	// sleep(200)
	// w12_web3.eth.sendTransaction({from:macc5,to:accw12,position:"w1205111111111",txtime:1500},function(err,res){
	// 	if(err){
	// 	  //console.log("Error:",err);
	// 	  console.log("!!macc5--insufficient funds for this tx--w12!!")
	// 	}
	// });	
	// sleep(200)
	// w12_web3.eth.sendTransaction({from:macc6,to:accw12,position:"w1206111111111",txtime:1600},function(err,res){
	// 	if(err){
	// 	  //console.log("Error:",err);
	// 	  console.log("!!macc6--insufficient funds for this tx--w12!!")
	// 	}
	// });	
	// sleep(200)
	// w12_web3.eth.sendTransaction({from:macc7,to:accw12,position:"w1207111111111",txtime:1700},function(err,res){
	// 	if(err){
	// 	  //console.log("Error:",err);
	// 	  console.log("!!macc7--insufficient funds for this tx--w12!!")
	// 	}
	// });	
	// sleep(200)
	// w12_web3.eth.sendTransaction({from:macc8,to:accw12,position:"w1208111111111",txtime:1800},function(err,res){
	// 	if(err){
	// 	  //console.log("Error:",err);
	// 	  console.log("!!macc8--insufficient funds for this tx--w12!!")
	// 	}
	// });	
	// sleep(200)
	// w12_web3.eth.sendTransaction({from:macc9,to:accw12,position:"w1209111111111",txtime:1900},function(err,res){
	// 	if(err){
	// 	  //console.log("Error:",err);
	// 	  console.log("!!macc9--insufficient funds for this tx--w12!!")
	// 	}
	// });	
	// sleep(200)
	// w12_web3.eth.sendTransaction({from:macc10,to:accw12,position:"w1210111111111",txtime:2000},function(err,res){
	// 	if(err){
	// 	  //console.log("Error:",err);
	// 	  console.log("!!macc10--insufficient funds for this tx--w12!!")
	// 	}
	// });	
	// sleep(200)

	//2. 第一次移动:移动账户在目标链w12发起资产转移请求交易Tx_request
	Tx_request_w12();
}

function Tx_common_w12_single() {
	//移动账户在目标链发送普通交易,余额不足,未成功
    let i = 9
	// for (let i = 0; i < mobileAccounts.length; i++) {
		w12Web3.eth.sendTransaction(
			{ from: mobileAccounts[i], to: minerW12, position: `w12${('00' + (i + 1).toString()).slice(-3)}11111111`, txtime: 1100 + 100 * i },
			function (err, res) {
				if (err) {
					//console.log("Error:",err);
					console.log(`!!mobileAccounts[${i}]--insufficient funds for this transaction--w12!!`)
				}
			}
		)
		sleep(200)
	// }

	//2. 第一次移动:移动账户在目标链w12发起资产转移请求交易Tx_request
	// Tx_request_w12_single();
    sleep(2000)

	// for (let i = 0; i < mobileAccounts.length; i++) {
		w12Web3.eth.sendTransaction(
			{ from: mobileAccounts[i], to: accountManagerW11, position: `w12${('0' + (11 + i).toString()).slice(-3)}11111111`, txtype: 1, txtime: 2100 + 100 * i },
			function (err, res) {
				if (err) {
					console.error("Error:", err);
				} else {
					sleep(2000)
					hashRequests[i] = w12Web3.toHex(res);
					console.log(`mobileAccounts[${i}]_hash_request: ${hashRequests[i]}`);
				}
			}
		)
	// }
	// let idx = mobileAccountFromHexToAddress.indexOf(acc)
    let idx = 5
	let curacc = mobileAccounts[idx]
	let hash_req = hashRequests[idx]
    let outchain = 'w11'
	if (outchain === 'w11') {
		console.log("curacc(", idx, "):", curacc)
		const macc_outbal = w11Web3.eth.getBalance(curacc)
		console.log("get_outchain_info--outchain_balance:", macc_outbal)
		w11Web3.eth.sendTransaction({ from: curacc, to: accountManagerW11, value: macc_outbal, position: "w1155111111111", txtype: 2, txtime: 666, exdata: hash_req }, function (err, res) {
			if (err) {
				console.log("Error:", err);
			} else {
				sleep(2000);
				console.log("Result:", res);
				hash_out = w11Web3.toHex(res);
				send_inchain_tx(w12Web3, curacc, macc_outbal, hash_out, "w1266111111111", w11Web3, "w1177111111111");
			}
		});
    }
}

function Tx_request_w12_single() {
	//查询余额,这时余额为0
	sleep(2000)

	for (let i = 0; i < mobileAccounts.length; i++) {
		w12Web3.eth.sendTransaction(
			{ from: mobileAccounts[i], to: accountManagerW11, position: `w12${('0' + (11 + i).toString()).slice(-3)}11111111`, txtype: 1, txtime: 2100 + 100 * i },
			function (err, res) {
				if (err) {
					console.error("Error:", err);
				} else {
					sleep(2000)
					hashRequests[i] = w12Web3.toHex(res);
					console.log(`mobileAccounts[${i}]_hash_request: ${hashRequests[i]}`);
				}
			}
		)
	}
}

//2. 移动账户在目标链w12发起资产转移请求交易Tx_request
function Tx_request_w12() {
	//查询余额,这时余额为0
	sleep(2000)
	starttime = Date.now();
	w12Web3.eth.sendTransaction({ from: mobileAccounts[0], to: accountManagerW11, position: "w1211111111111", txtype: 1, txtime: 2100 }, function (err, res) {
		if (err) {
			console.log("Error:", err);
		} else {
			sleep(2000)
			hashRequests[0] = w12Web3.toHex(res);
			console.log("macc1_hash_req:", hashRequests[0]);
		}
	});
	//  w12_web3.eth.sendTransaction({from:macc2,to:ama,position:"w1212111111111",txtype:1,txtime:2200},function(err,res){
	//  	if(err){
	//  	console.log("Error:",err);
	//  	}else{
	//  	sleep(2000)
	//  	hash_req2 = w12_web3.toHex(res);
	//  	console.log("macc2_hash_req:",hash_req2);
	//  		}
	//  });
	// w12_web3.eth.sendTransaction({from:macc3,to:ama,position:"w1213111111111",txtype:1,txtime:2300},function(err,res){
	// 	if(err){
	// 	console.log("Error:",err);
	// 	}else{
	// 	sleep(2000)
	// 	hash_req3 = w12_web3.toHex(res);
	// 	console.log("macc3_hash_req:",hash_req3);
	// 		}
	// });
	// w12_web3.eth.sendTransaction({from:macc4,to:ama,position:"w1214111111111",txtype:1,txtime:2400},function(err,res){
	// 	if(err){
	// 	console.log("Error:",err);
	// 	}else{
	// 	sleep(2000)
	// 	hash_req4 = w12_web3.toHex(res);
	// 	console.log("macc4_hash_req:",hash_req4);
	// 		}
	// });
	// w12_web3.eth.sendTransaction({from:macc5,to:ama,position:"w1215111111111",txtype:1,txtime:2500},function(err,res){
	// 	if(err){
	// 	console.log("Error:",err);
	// 	}else{
	// 	sleep(2000)
	// 	hash_req5 = w12_web3.toHex(res);
	// 	console.log("macc5_hash_req:",hash_req5);
	// 		}
	// });
	// w12_web3.eth.sendTransaction({from:macc6,to:ama,position:"w1216111111111",txtype:1,txtime:2600},function(err,res){
	// 	if(err){
	// 	console.log("Error:",err);
	// 	}else{
	// 	sleep(2000)
	// 	hash_req6 = w12_web3.toHex(res);
	// 	console.log("macc6_hash_req:",hash_req6);
	// 		}
	// });
	// w12_web3.eth.sendTransaction({from:macc7,to:ama,position:"w1217111111111",txtype:1,txtime:2700},function(err,res){
	// 	if(err){
	// 	console.log("Error:",err);
	// 	}else{
	// 	sleep(2000)
	// 	hash_req7 = w12_web3.toHex(res);
	// 	console.log("macc7_hash_req:",hash_req7);
	// 		}
	// });
	// w12_web3.eth.sendTransaction({from:macc8,to:ama,position:"w1218111111111",txtype:1,txtime:2800},function(err,res){
	// 	if(err){
	// 	console.log("Error:",err);
	// 	}else{
	// 	sleep(2000)
	// 	hash_req8 = w12_web3.toHex(res);
	// 	console.log("macc8_hash_req:",hash_req8);
	// 		}
	// });
	// w12_web3.eth.sendTransaction({from:macc9,to:ama,position:"w1219111111111",txtype:1,txtime:2900},function(err,res){
	// 	if(err){
	// 	console.log("Error:",err);
	// 	}else{
	// 	sleep(2000)
	// 	hash_req9 = w12_web3.toHex(res);
	// 	console.log("macc9_hash_req:",hash_req9);
	// 		}
	// });
	// w12_web3.eth.sendTransaction({from:macc10,to:ama,position:"w1220111111111",txtype:1,txtime:3000},function(err,res){
	// 	if(err){
	// 	console.log("Error:",err);
	// 	}else{
	// 	sleep(2000)
	// 	hash_req10 = w12_web3.toHex(res);
	// 	console.log("macc10_hash_req:",hash_req10);
	// 		}
	// });
}

// //3. branchnode收到Tx_request,并获得来源链信息;移动账户在来源链w11发起资产转出交易Tx_out(get_outchain_info)

//4. ama在目标链发送资产转入交易Tx_in
function send_inchain_tx(inweb3, acc, inbal, txouthash, inpos, outweb3, outpos) {
	inweb3.eth.sendTransaction({ from: accountManagerW11, to: acc, value: inbal, position: inpos, txtype: 3, txtime: 777, exdata: txouthash }, function (err, res) {
		if (err) {
			console.log("Error:", err);
		} else {
			sleep(2000)
			console.log("send_inchain--Result:", res);
			hash_in = inweb3.toHex(res);
			console.log("send_inchain--hash_in:", hash_in);
			sleep(2000)
			var macc1_inbal = inweb3.eth.getBalance(acc)
			console.log("send_inchain--balance:", macc1_inbal)
			send_result_tx(outweb3, acc, true, hash_in, outpos);
		}
	});

}


//5. ama在来源链发送Tx_result交易
function send_result_tx(outweb3, acc, result, txinhash, outpos) {
	if (result) {
		outweb3.eth.sendTransaction({ from: accountManagerW11, to: acc, position: outpos, txtype: 4, txtime: 888, exdata: txinhash }, function (err, res) {
			if (err) {
				console.log("Error:", err);
			} else {
				sleep(2000)
				console.log("send_result--Tx_result:", res);
				endtime = new Date().getTime();
				console.log("during--", endtime - starttime)
			}
		});
	}
}
//w12向11转移-------------------------------------
function Tx_common_w12tow11() {
	//移动账户在目标链发送普通交易,余额不足,未成功
	for (let i = 0; i < mobileAccounts.length; i++) {
		curtime = new Date().getTime()
		w11Web3.eth.sendTransaction(
			{ from: mobileAccounts[i], to: minerW11, position: `w11${('0' + (21 + i).toString()).slice(-3)}11111111`, txtime: curtime },
			function (err, res) {
				if (err) {
					//console.log("Error:",err);
					console.log(`!!mobileAccounts[${i}]--insufficient funds for this tx--w11!!`)
				}
			}
		)
		sleep(200)
	}

	//2. 第一次移动:移动账户在目标链w11发起资产转移请求交易Tx_request
	Tx_request_w11_single();
}

function Tx_request_w11_single() {
	//查询余额,这时余额为0
	sleep(2000)
	curtime = Date.now();
	for (let i = 0; i < mobileAccounts.length; i++) {
		// curtime = Date.now();
		w11Web3.eth.sendTransaction(
			{ from: mobileAccounts[i], to: accountManagerW11, position: `w11${('0' + (51 + i).toString()).slice(-3)}11111111`, txtype: 1, txtime: curtime },
			function (err, res) {
				if (err) {
					console.error("Error:", err);
				} else {
					sleep(2000)
					hashRequests[i] = w11Web3.toHex(res);
					console.log(`w11_mobileAccounts[${i}]_hash_req:`, hashRequests[i]);
				}
			}
		)
	}
}

function Tx_request_w12_single() {
	//查询余额,这时余额为0
	sleep(2000)
	curtime = Date.now();
	for (let i = 0; i < mobileAccounts.length; i++) {
		w12Web3.eth.sendTransaction(
			{ from: mobileAccounts[i], to: accountManagerW11, position: `w12${('0' + (41 + i).toString()).slice(-3)}11111111`, txtype: 1, txtime: curtime },
			function (err, res) {
				if (err) {
					console.error("Error:", err);
				} else {
					sleep(2000)
					hashRequests[i] = w12Web3.toHex(res);
					console.log(`w12_mobileAccounts[${i}]_hash_req: `, hashRequests[i]);
				}
			}
		)
	}
}



function sleep(delay) {
	var start = new Date().getTime();
	while (new Date().getTime() < start + delay);
}

exports.init_tx = function () {
	//10个账户，初始余额为0，转入余额10000
	for (let i = 0; i < mobileAccounts.length; i++) {
		console.log(`Initial balance of mobileAccounts[${i}] = ${w11Web3.eth.getBalance(mobileAccounts[i]).toString()}`)
		w11Web3.eth.sendTransaction(
			{ from: minerW11, to: mobileAccounts[i], position: `w11${('00' + (i + 1).toString()).slice(-2)}11111111`, value: 10000, txtime: 100 + 100 * i },
			function (err, _) {
				if (err) {
					console.error("macc1_beforetrans_Error:", err)
				} else {
					// sleep(2000)
					// console.log("balance_from_beforetrans:",w2_web3.eth.getBalance(macc1))
					//1. macc1在目标链w3发起位置写入交易Tx_common，没有余额无法写入
					// Tx_common_w3();
				}
			}
		)
	}

	//10个账户,转入余额10000
	// w11Web3.eth.sendTransaction({ from: minerW11, to: macc1, position: "w1101111111111", value: 10000, txtime: 100 }, function (err, res) {
	// 	if (err) {
	// 		console.log("macc1_beforetrans_Error:", err)
	// 	} else {
	// 		sleep(2000)
	// 		// console.log("balance_from_beforetrans:",w2_web3.eth.getBalance(macc1))
	// 		//1. macc1在目标链w3发起位置写入交易Tx_common，没有余额无法写入
	// 		// Tx_common_w3();
	// 	}
	// });
	// w11Web3.eth.sendTransaction({ from: minerW11, to: macc2, position: "w1102111111111", value: 10000, txtime: 200 }, function (err, res) {
	// 	if (err) {
	// 		console.log("macc2_beforetrans_Error:", err)
	// 	} else {
	// 		sleep(2000)
	// 		// console.log("balance_from_beforetrans:",w2_web3.eth.getBalance(macc1))
	// 		//1. macc1在目标链w3发起位置写入交易Tx_common，没有余额无法写入
	// 		// Tx_common_w3();
	// 	}
	// });
	// w11Web3.eth.sendTransaction({ from: minerW11, to: macc3, position: "w1103111111111", value: 10000, txtime: 300 }, function (err, res) {
	// 	if (err) {
	// 		console.log("macc3_beforetrans_Error:", err)
	// 	} else {
	// 		sleep(2000)
	// 		// console.log("balance_from_beforetrans:",w2_web3.eth.getBalance(macc1))
	// 		//1. macc1在目标链w3发起位置写入交易Tx_common，没有余额无法写入
	// 		// Tx_common_w3();
	// 	}
	// });
	// w11Web3.eth.sendTransaction({ from: minerW11, to: macc4, position: "w1104111111111", value: 10000, txtime: 400 }, function (err, res) {
	// 	if (err) {
	// 		console.log("macc4_beforetrans_Error:", err)
	// 	} else {
	// 		sleep(2000)
	// 		// console.log("balance_from_beforetrans:",w2_web3.eth.getBalance(macc1))
	// 		//1. macc1在目标链w3发起位置写入交易Tx_common，没有余额无法写入
	// 		// Tx_common_w3();
	// 	}
	// });
	// w11Web3.eth.sendTransaction({ from: minerW11, to: macc5, position: "w1105111111111", value: 10000, txtime: 500 }, function (err, res) {
	// 	if (err) {
	// 		console.log("macc5_beforetrans_Error:", err)
	// 	} else {
	// 		sleep(2000)
	// 		// console.log("balance_from_beforetrans:",w2_web3.eth.getBalance(macc1))
	// 		//1. macc1在目标链w3发起位置写入交易Tx_common，没有余额无法写入
	// 		// Tx_common_w3();
	// 	}
	// });
	// w11Web3.eth.sendTransaction({ from: minerW11, to: macc6, position: "w1106111111111", value: 10000, txtime: 600 }, function (err, res) {
	// 	if (err) {
	// 		console.log("macc6_beforetrans_Error:", err)
	// 	} else {
	// 		sleep(2000)
	// 		// console.log("balance_from_beforetrans:",w2_web3.eth.getBalance(macc1))
	// 		//1. macc1在目标链w3发起位置写入交易Tx_common，没有余额无法写入
	// 		// Tx_common_w3();
	// 	}
	// });
	// w11Web3.eth.sendTransaction({ from: minerW11, to: macc7, position: "w1107111111111", value: 10000, txtime: 700 }, function (err, res) {
	// 	if (err) {
	// 		console.log("macc7_beforetrans_Error:", err)
	// 	} else {
	// 		sleep(2000)
	// 		// console.log("balance_from_beforetrans:",w2_web3.eth.getBalance(macc1))
	// 		//1. macc1在目标链w3发起位置写入交易Tx_common，没有余额无法写入
	// 		// Tx_common_w3();
	// 	}
	// });
	// w11Web3.eth.sendTransaction({ from: minerW11, to: macc8, position: "w1108111111111", value: 10000, txtime: 800 }, function (err, res) {
	// 	if (err) {
	// 		console.log("macc8_beforetrans_Error:", err)
	// 	} else {
	// 		sleep(2000)
	// 		// console.log("balance_from_beforetrans:",w2_web3.eth.getBalance(macc1))
	// 		//1. macc1在目标链w3发起位置写入交易Tx_common，没有余额无法写入
	// 		// Tx_common_w3();
	// 	}
	// });
	// w11Web3.eth.sendTransaction({ from: minerW11, to: macc9, position: "w1109111111111", value: 10000, txtime: 900 }, function (err, res) {
	// 	if (err) {
	// 		console.log("macc9_beforetrans_Error:", err)
	// 	} else {
	// 		sleep(2000)
	// 		// console.log("balance_from_beforetrans:",w2_web3.eth.getBalance(macc1))
	// 		//1. macc1在目标链w3发起位置写入交易Tx_common，没有余额无法写入
	// 		// Tx_common_w3();
	// 	}
	// });
	// w11Web3.eth.sendTransaction({ from: minerW11, to: macc10, position: "w1110111111111", value: 10000, txtime: 1000 }, function (err, res) {
	// 	if (err) {
	// 		console.log("macc10_beforetrans_Error:", err)
	// 	} else {
	// 		sleep(2000)
	// 		// console.log("balance_from_beforetrans:",w2_web3.eth.getBalance(macc1))
	// 		//1. macc1在目标链w3发起位置写入交易Tx_common，没有余额无法写入
	// 		// Tx_common_w3();
	// 	}
	// });

	//1. 移动账户在目标链w12发起位置写入交易Tx_common，没有余额无法写入
	//  Tx_common_w12();
}

exports.trans_tx = function () {
	//1. 移动账户在目标链w12发起位置写入交易Tx_common，没有余额无法写入
	//  Tx_common_w12();
	Tx_common_w12_single();
}

exports.trans_tx_w11tow12 = function () {
	//1. 移动账户在目标链w12发起位置写入交易Tx_common，没有余额无法写入
	Tx_common_w12_single();
}

exports.trans_tx_w12tow11 = function () {
	//1. 移动账户在目标链w12发起位置写入交易Tx_common，没有余额无法写入
	Tx_common_w12tow11();
}

//3. branchnode收到Tx_request,并获得来源链信息;移动账户在来源链w11发起资产转出交易Tx_out
// module.exports = {get_outchain_info}
exports.get_outchain_info = function (acc, outchain) {
	console.log("get_outchain_info--account:", acc)
	console.log("get_outchain_info--outchain:", outchain)

	let idx = mobileAccountFromHexToAddress.indexOf(acc)
	let curacc = mobileAccounts[idx]
	let hash_req = hashRequests[idx]

	if (outchain === 'w11') {
		console.log("curacc(", idx, "):", curacc)
		const macc_outbal = w11Web3.eth.getBalance(curacc)
		console.log("get_outchain_info--outchain_balance:", macc_outbal)
		w11Web3.eth.sendTransaction({ from: curacc, to: accountManagerW11, value: macc_outbal, position: "w1155111111111", txtype: 2, txtime: 666, exdata: hash_req }, function (err, res) {
			if (err) {
				console.log("Error:", err);
			} else {
				sleep(2000);
				console.log("Result:", res);
				hash_out = w11Web3.toHex(res);
				send_inchain_tx(w12Web3, curacc, macc_outbal, hash_out, "w1266111111111", w11Web3, "w1177111111111");
			}
		});
	} else if (outchain === 'w12') {
		console.log("curacc(", idx, "):", curacc)
		const macc_outbal = w12Web3.eth.getBalance(curacc)
		w12Web3.eth.sendTransaction({ from: curacc, to: accountManagerW11, value: macc_outbal, position: "w1255111111111", txtype: 2, txtime: 666, exdata: hash_req }, function (err, res) {
			if (err) {
				console.log("Error:", err);
			} else {
				sleep(2000);
				console.log("Result:", res);
				hash_out = w12Web3.toHex(res);
				//console.log("3-w3-hash_out:",hash_out);
				console.log("3-outchain_balance:", macc_outbal)
				send_inchain_tx(w11Web3, curacc, macc_outbal, hash_out, "w1166111111111", w12Web3, "w1277111111111");
			}
		});
	}
}
