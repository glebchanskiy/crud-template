import { FunctionalComponent } from "preact"
import { ApiUser } from "../api"

export const UserProfile: FunctionalComponent<{ onClick?: () => void, user: ApiUser }> = ({ onClick, user }) => {
    return (
        <div onClick={onClick} class='flex gap-5 items-center cursor-pointer'>
            <span class='block'>{user.username}</span>
            <img class='h-10' src="/src/assets/user.webp" alt="userpicture" />
        </div>
    )
}