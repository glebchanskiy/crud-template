import { FunctionalComponent } from "preact"

export const UserProfile: FunctionalComponent<{ onClick?: () => void }> = ({ onClick }) => {
    return (
        <div onClick={onClick} class='flex gap-5 items-center cursor-pointer'>
            <span class='block'>${`{username}`}</span>
            <img class='h-10' src="/src/assets/user.webp" alt="userpicture" />
        </div>
    )
}