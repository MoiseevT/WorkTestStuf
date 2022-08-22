export const Users = [
  {
    login: "Timur",
    password: "Timur",
    name: "Тимур"
  },
  {
    login: "Oleg",
    password: "Oleg",
    name: "Олег"
  },
  {
    login: "Kiril",
    password: "Kirill",
    name: "Кирилл"
  },
  {
    login: "Alina",
    password: "Alina",
    name: "Алина"
  },
];

export const guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
