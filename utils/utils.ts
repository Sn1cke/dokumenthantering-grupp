import { User } from "@/interfaces";

export function getUser(): User {
  const data = localStorage.getItem("user");
  return JSON.parse(data as string);
}

export function setUser(data: User) {
  localStorage.setItem("user", JSON.stringify(data));
}

export function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
