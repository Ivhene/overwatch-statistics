import { Hero, Map } from "./types";

export const Heroes: Hero[] = [
  {
    heroID: 1,
    name: "Ana",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/3429c394716364bbef802180e9763d04812757c205e1b4568bc321772096ed86.png",
    role: "support",
  },
  {
    heroID: 2,
    name: "Ashe",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/8dc2a024c9b7d95c7141b2ef065590dbc8d9018d12ad15f76b01923986702228.png",
    role: "damage",
  },
  {
    heroID: 3,
    name: "Baptiste",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/f979896f74ba22db2a92a85ae1260124ab0a26665957a624365e0f96e5ac5b5c.png",
    role: "support",
  },
  {
    heroID: 4,
    name: "Bastion",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/4d715f722c42215072b5dd0240904aaed7b5285df0b2b082d0a7f1865b5ea992.png",
    role: "damage",
  },
  {
    heroID: 5,
    name: "Brigitte",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/48392820c6976ee1cd8dde13e71df85bf15560083ee5c8658fe7c298095d619a.png",
    role: "support",
  },
  {
    heroID: 6,
    name: "Cassidy",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/6cfb48b5597b657c2eafb1277dc5eef4a07eae90c265fcd37ed798189619f0a5.png",
    role: "damage",
  },
  {
    heroID: 7,
    name: "D.VA",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/ca114f72193e4d58a85c087e9409242f1a31e808cf4058678b8cbf767c2a9a0a.png",
    role: "tank",
  },
  {
    heroID: 8,
    name: "Doomfist",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/13750471c693c1a360eb19d5ace229c8599a729cd961d72ebee0e157657b7d18.png",
    role: "tank",
  },
  {
    heroID: 9,
    name: "Echo",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/f086bf235cc6b7f138609594218a8385c8e5f6405a39eceb0deb9afb429619fe.png",
    role: "damage",
  },
  {
    heroID: 10,
    name: "Genji",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/4edf5ea6d58c449a2aeb619a3fda9fff36a069dfbe4da8bc5d8ec1c758ddb8dc.png",
    role: "damage",
  },
  {
    heroID: 11,
    name: "Hanzo",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/aecd8fa677f0093344fab7ccb7c37516c764df3f5ff339a5a845a030a27ba7e0.png",
    role: "damage",
  },
  {
    heroID: 12,
    name: "Illari",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/5ea986038f9d307bd4613d5e6f2c4c8e7f15f30ceeeabbdd7a06637a38f17e1f.png",
    role: "support",
  },
  {
    heroID: 13,
    name: "Junker Queen",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/cef2406b2244b80506f83b8fb9ebaf214f41fa8795cbeef84026cd8018561d04.png",
    role: "tank",
  },
  {
    heroID: 14,
    name: "Junkrat",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/037e3df083624e5480f8996821287479a375f62b470572a22773da0eaf9441d0.png",
    role: "damage",
  },
  {
    heroID: 15,
    name: "Kiriko",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/088aff2153bdfa426984b1d5c912f6af0ab313f0865a81be0edd114e9a2f79f9.png",
    role: "support",
  },
  {
    heroID: 16,
    name: "Lifeweaver",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/39d4514f1b858bc228035b09d5a74ed41f8eeefc9a0d1873570b216ba04334df.png",
    role: "support",
  },
  {
    heroID: 17,
    name: "Lucio",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/e2ff2527610a0fbe0c9956f80925123ef3e66c213003e29d37436de30b90e4e1.png",
    role: "support",
  },
  {
    heroID: 18,
    name: "Mauga",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/9ee3f5a62893091d575ec0a0d66df878597086374202c6fc7da2d63320a7d02e.png",
    role: "tank",
  },
  {
    heroID: 19,
    name: "Mei",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/1533fcb0ee1d3f9586f84b4067c6f63eca3322c1c661f69bfb41cd9e4f4bcc11.png",
    role: "damage",
  },
  {
    heroID: 20,
    name: "Mercy",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/2508ddd39a178d5f6ae993ab43eeb3e7961e5a54a9507e6ae347381193f28943.png",
    role: "support",
  },
  {
    heroID: 21,
    name: "Moira",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/000beeb5606e01497897fa9210dd3b1e78e1159ebfd8afdc9e989047d7d3d08f.png",
    role: "support",
  },
  {
    heroID: 22,
    name: "Orisa",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/71e96294617e81051d120b5d04b491bb1ea40e2933da44d6631aae149aac411d.png",
    role: "tank",
  },
  {
    heroID: 23,
    name: "Pharah",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/f8261595eca3e43e3b37cadb8161902cc416e38b7e0caa855f4555001156d814.png",
    role: "damage",
  },
  {
    heroID: 24,
    name: "Ramattra",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/3e0367155e1940a24da076c6f1f065aacede88dbc323631491aa0cd5a51e0b66.png",
    role: "tank",
  },
  {
    heroID: 25,
    name: "Reaper",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/2edb9af69d987bb503cd31f7013ae693640e692b321a73d175957b9e64394f40.png",
    role: "damage",
  },
  {
    heroID: 26,
    name: "Reinhardt",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/490d2f79f8547d6e364306af60c8184fb8024b8e55809e4cc501126109981a65.png",
    role: "tank",
  },
  {
    heroID: 27,
    name: "Roadhog",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/72e02e747b66b61fcbc02d35d350770b3ec7cbaabd0a7ca17c0d82743d43a7e8.png",
    role: "tank",
  },
  {
    heroID: 28,
    name: "Sigma",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/cd7a4c0a0df8924afb2c9f6df864ed040f20250440c36ca2eb634acf6609c5e4.png",
    role: "tank",
  },
  {
    heroID: 29,
    name: "Sojourn",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/a53bf7ad9d2f33aaf9199a00989f86d4ba1f67c281ba550312c7d96e70fec4ea.png",
    role: "damage",
  },
  {
    heroID: 30,
    name: "Soldier 76",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/20b4ef00ed05d6dba75df228241ed528df7b6c9556f04c8070bad1e2f89e0ff5.png",
    role: "damage",
  },
  {
    heroID: 31,
    name: "Sombra",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/bca8532688f01b071806063b9472f1c0f9fc9c7948e6b59e210006e69cec9022.png",
    role: "damage",
  },
  {
    heroID: 32,
    name: "Symmetra",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/7f2024c5387c9d76d944a5db021c2774d1e9d7cbf39e9b6a35b364d38ea250ac.png",
    role: "damage",
  },
  {
    heroID: 33,
    name: "Torbjörn",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/1309ab1add1cc19189a2c8bc7b1471f88efa1073e9705d2397fdb37d45707d01.png",
    role: "damage",
  },
  {
    heroID: 34,
    name: "Tracer",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/a66413200e934da19540afac965cfe8a2de4ada593d9a52d53108bb28e8bbc9c.png",
    role: "damage",
  },
  {
    heroID: 35,
    name: "Venture",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/7e33dd756c8a1abca519af6c3bf26813f2f81d39885373539efcf8442c4bc647.png",
    role: "damage",
  },
  {
    heroID: 36,
    name: "Widowmaker",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/a714f1cb33cc91c6b5b3e89ffe7e325b99e7c89cc8e8feced594f81305147efe.png",
    role: "damage",
  },
  {
    heroID: 37,
    name: "Winston",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/bd9c8e634d89488459dfc1aeb21b602fa5c39aa05601a4167682f3a3fed4e0ee.png",
    role: "tank",
  },
  {
    heroID: 38,
    name: "Wrecking Ball",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/5c18e39ce567ee8a84078f775b9f76a2ba891de601c059a3d2b46b61ae4afb42.png",
    role: "tank",
  },
  {
    heroID: 39,
    name: "Zarya",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/8819ba85823136640d8eba2af6fd7b19d46b9ee8ab192a4e06f396d1e5231f7a.png",
    role: "tank",
  },
  {
    heroID: 40,
    name: "Zenyatta",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/71cabc939c577581f66b952f9c70891db779251e8e70f29de3c7bf494edacfe4.png",
    role: "support",
  },
  {
    heroID: 41,
    name: "Juno",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/585b2d60cbd3c271b6ad5ad0922537af0c6836fab6c89cb9979077f7bb0832b5.png",
    role: "support",
  },
  {
    heroID: 42,
    name: "Hazard",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/612ae1e6d28125bd4d4d18c2c4e5b004936c094556239ed24a1c0a806410a020.png",
    role: "tank",
  },
  {
    heroID: 43,
    name: "Freya",
    image:
      "https://d15f34w2p8l1cc.cloudfront.net/overwatch/5d1a515607b70f87fd391d0478fb4d706e31a7aebfbcb0edd2cfce04efad256c.png",
    role: "damage",
  },
  {
    heroID: 44,
    name: "Wuyang",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/d/d4/OW2_Wuyang.png/revision/latest/scale-to-width-down/1000?cb=20250814163523",
    role: "support",
  },
].sort((a, b) => a.name.localeCompare(b.name));

export const Maps: Map[] = [
  {
    name: "Antartic Peninsula",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/7/7c/Antarctic_Peninsula_1.png/revision/latest/scale-to-width-down/1000?cb=20230208020804",
    mode: "control",
  },
  {
    name: "Busan",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/0/09/Overwatch_Busan.jpg/revision/latest/scale-to-width-down/1000?cb=20190412043201",
    mode: "control",
  },
  {
    name: "Ilios",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/4/45/Ilios.jpg/revision/latest/scale-to-width-down/1000?cb=20180520062425",
    mode: "control",
  },
  {
    name: "Lijiang Tower",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/9/9b/Lijiang_Tower_loading_screen.jpg/revision/latest/scale-to-width-down/1000?cb=20180520062020",
    mode: "control",
  },
  {
    name: "Nepal",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/f/f3/Nepal_loading_screen.jpg/revision/latest/scale-to-width-down/1000?cb=20190412043102",
    mode: "control",
  },
  {
    name: "Samoa",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/b/b4/Samoa.jpg/revision/latest?cb=20231002031650",
    mode: "control",
  },
  {
    name: "Oasis",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/f/fc/Oasis.jpg/revision/latest/scale-to-width-down/1000?cb=20180520062749",
    mode: "control",
  },
  {
    name: "Circuit Royale",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/10/Monte_Carlo.jpg/revision/latest/scale-to-width-down/1000?cb=20220926230154",
    mode: "escort",
  },
  {
    name: "Dorado",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/e/ec/Dorado-streets2.jpg/revision/latest/scale-to-width-down/1000?cb=20180520045217",
    mode: "escort",
  },
  {
    name: "Havana",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/9/93/Havana.png/revision/latest/scale-to-width-down/1000?cb=20190512033804",
    mode: "escort",
  },
  {
    name: "Junkertown",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/e/e3/Junkertown.jpg/revision/latest/scale-to-width-down/1000?cb=20170822090741",
    mode: "escort",
  },
  {
    name: "Rialto",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/f/ff/Rialto.jpg/revision/latest/scale-to-width-down/1000?cb=20190412043512",
    mode: "escort",
  },
  {
    name: "Route 66",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/a/a6/Route_66.jpg/revision/latest/scale-to-width-down/1000?cb=20180520050707",
    mode: "escort",
  },
  {
    name: "Shambali Monastery",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/8/81/ShambaliEscort.png/revision/latest/scale-to-width-down/1000?cb=20230421235244",
    mode: "escort",
  },
  {
    name: "Watchpoint: Gibraltar",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/8/8b/Gibraltar.jpg/revision/latest/scale-to-width-down/1000?cb=20180520050120",
    mode: "escort",
  },
  {
    name: "New Junk City",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/a/ae/New_Junk_City.jpg/revision/latest?cb=20240419094558",
    mode: "flashpoint",
  },
  {
    name: "Suravasa",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/6/6f/Suravasa.jpg/revision/latest/scale-to-width-down/1000?cb=20230622084852",
    mode: "flashpoint",
  },
  {
    name: "Blizzard World",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/f/f8/Blizzard_World.jpg/revision/latest/scale-to-width-down/1000?cb=20190401012157",
    mode: "hybrid",
  },
  {
    name: "Eichenwalde",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/a/aa/Eichenwalde.png/revision/latest/scale-to-width-down/1000?cb=20190412043329",
    mode: "hybrid",
  },
  {
    name: "Hollywood",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/2/26/Hollywood-set.jpg/revision/latest/scale-to-width-down/1000?cb=20190506201443",
    mode: "hybrid",
  },
  {
    name: "King`s Row",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/1b/King%27s_Row_concept.jpg/revision/latest/scale-to-width-down/1000?cb=20180520052818",
    mode: "hybrid",
  },
  {
    name: "Midtown",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/4/4e/N18S6DCTDPG81613669123002.png/revision/latest/scale-to-width-down/1000?cb=20210221175110",
    mode: "hybrid",
  },
  {
    name: "Numbani",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/1b/Numbani_Loading_Screen.jpg/revision/latest/scale-to-width-down/1000?cb=20180520055541",
    mode: "hybrid",
  },
  {
    name: "Paraíso",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/9/90/Para%C3%ADso_pvp.jpg/revision/latest/scale-to-width-down/1000?cb=20220630025520",
    mode: "hybrid",
  },
  {
    name: "Colosseo",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/1e/Blizzconline_rome_01.png/revision/latest/scale-to-width-down/1000?cb=20220926222702",
    mode: "push",
  },
  {
    name: "Esperanca",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/f/f5/PortugalPush.jpg/revision/latest/scale-to-width-down/1000?cb=20220926215956",
    mode: "push",
  },
  {
    name: "New Queen Street",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/9/91/Toronto.jpg/revision/latest/scale-to-width-down/1000?cb=20220926222923",
    mode: "push",
  },
  {
    name: "Runasapi",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/0/07/Runasapi_2.jpg/revision/latest/scale-to-width-down/350?cb=20240619034643",
    mode: "push",
  },
  {
    name: "Aatlis",
    image:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/e/e6/Aatlis_loading_screen.png/revision/latest/scale-to-width-down/1000?cb=20250624194631",
    mode: "flashpoint",
  },
].sort((a, b) => a.name.localeCompare(b.name));
