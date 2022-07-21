/** Static Group import */
import dylan1 from "./images/Dylan-img1.png";
import marcus_dp from "./images/marcus.jpg";
import sherwin_dp from "./images/sherwin.jpg";
import xuanyi_dp from "./images/xy.jpg";
import stephen_dp from "./images/stephen.jpg";
import yongjie_dp from "./images/yong jie.jpg";
import william_dp from "./images/william.jpg";

const staticGroup = [
  {
    img: dylan1,
    name: "Dylan Ho",
    email: "dylanho@email.com",
    _id: 1,
  },
  {
    img: marcus_dp,
    name: "Marcus Lim",
    email: "marcuslim@email.com",
    _id: 2,
  },
  {
    img: sherwin_dp,
    name: "Sherwin Lim",
    email: "sherwinlim@lmao.com",
    _id: 3,
  },
  {
    img: xuanyi_dp,
    name: "Xuan Yi",
    email: "xuanyi@email.com",
    _id: 4,
  },
  {
    img: stephen_dp,
    name: "Stephen",
    email: "stephen@email.com",
    _id: 5,
  },
  {
    img: yongjie_dp,
    name: "Yong Jie",
    email: "yongjie@email.com",
    _id: 6,
  },
  {
    img: william_dp,
    name: "William Chau",
    email: "lmao@lmao.com",
    _id: 7,
  },
];

const houses = [
  { label: "I'll rather not say", value: null },
  { label: "Saren", value: "Saren" },
  { label: "Ianthe", value: "Ianthe" },
  { label: "Ursala", value: "Ursala" },
  { label: "Nocturna", value: "Nocturna" },
  { label: "Triton", value: "Triton" },
  { label: "Ankaa", value: "Ankaa" },
];

const floors = Array.from({ length: 19 }, (_, i) => 3 + i * 1).map((num) => {
  return { value: num, label: "Cinnamon Wing Floor " + num };
});
floors[0] = { value: null, label: "I'll rather not say" };

const ccas = [
  { value: null, label: "I'll rather not say" },
  { value: "Floorball", label: "Floorball" },
  { value: "USP Tabletop", label: "USP Tabletop" },
  { value: "UStetris", label: "UStetris" },
];

const majors = [
  { value: null, label: "I'll rather not say" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Information Systems", label: "Information Systems" },
  { value: "Computer Engineering", label: "Computer Engineering" },
  { value: "Business Analytics", label: "Business Analytics" },
  { value: "Information Security", label: "Information Security" },
];

const years = [
  { value: null, label: "I'll rather not say" },
  { value: "Year 1", label: "Year 1" },
  { value: "Year 2", label: "Year 2" },
  { value: "Year 3", label: "Year 3" },
  { value: "Year 4", label: "Year 4" },
];

export { staticGroup, houses, floors, ccas, majors, years };
