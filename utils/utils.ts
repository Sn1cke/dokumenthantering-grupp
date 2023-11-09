import { User } from "@/interfaces"

export function getUser():User {
    const data = localStorage.getItem("user")
    return JSON.parse(data as string)
}

export function setUser(data: User) {
     localStorage.setItem("user", JSON.stringify(data))

}
