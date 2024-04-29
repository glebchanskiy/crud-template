import { FunctionalComponent } from "preact";
import { UserProfile } from "../components/UserProfile";
import { useState } from "preact/hooks";
import { route } from "preact-router";
import Cookies from "js-cookie";
import { ApiUser } from "../api";
import { apiClient } from "../api/client";

export const UserPage: FunctionalComponent<{ user?: ApiUser }> = ({ user }) => {

    if (!user) return <></>

    const [username, setUsername] = useState(user.username)

    const onUpdateProfile = () => {
        if (username.length > 2) {
            apiClient.updateUsername(username).then(() => {
                location.pathname = '/user'
                location.reload()
            })

        }
    }

    const onLogoutProfile = () => {
        Cookies.remove('token')
        location.reload()
    }

    return (
        <div class='w-full flex flex-col gap-y-5 p-2 '>
            <div class='flex justify-end mb-20'>
                <UserProfile user={user} />
            </div>

            <div class="mx-auto mt-10 w-96 p-6 space-y-4 md:space-y-6 sm:p-8 0 bg-gray-600 rounded-lg">

                <div>
                    <label for="username" class="block mb-2 text-sm font-medium text-white">Your username</label>
                    <input value={username} onInput={(e) => setUsername(e.currentTarget.value)} type="text" name="username" id="username" class=" border sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="username" />
                </div>

                <div>
                    <label for="role" class="block mb-2 text-sm font-medium text-white">Your role</label>
                    <input disabled value={user.role} type="text" name="role" id="role" class=" border sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-400 focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div>
                    <label for="email" class="block mb-2 text-sm font-medium  text-white">Your email</label>
                    <input disabled value={user.email} type="email" name="email" id="email" class=" border sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-400 focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" />
                </div>

                <div>
                    <label for="password" class="block mb-2 text-sm font-medium  text-white">Password</label>
                    <input disabled type="password" name="password" id="password" placeholder="••••••••••••••••••••••••••••••••" class=" border   sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-400 focus:ring-blue-500 focus:border-blue-500" />
                </div>


                <button onClick={onUpdateProfile} class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update</button>
                <button onClick={onLogoutProfile} class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Logout</button>
            </div>


            <button onClick={() => route('/tables')} class='mx-auto w-28 py-1 bg-gray-200 rounded-md'>
                Go Back
            </button>

        </div>
    )
}