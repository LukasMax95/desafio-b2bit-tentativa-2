export interface User {
  name: string;
  email: string;
  senha?: string;
  //image?: string;
  id?: string;
}

const KEY = "b2bit_users";

export function getUsers(): User[] {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) as User[] : [];
}

export function saveUsers(users: User[]) {
  localStorage.setItem(KEY, JSON.stringify(users));
}

export function addUser(user: User) {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
}

export function findUserByEmail(email: string) {
  return getUsers().find(u => u.email === email);
}

export function clearUsers() {
  localStorage.removeItem(KEY);
}