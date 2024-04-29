
import { FunctionalComponent } from "preact";
import { useRef } from "preact/hooks";
import { getFormField } from "../utils";
import { apiClient } from "../api/client";
import Cookies from "js-cookie";
import { route } from "preact-router";


export const SignUp: FunctionalComponent = () => {
    const formRef = useRef<HTMLFormElement>(null)

    const onSignUpSubmit = (e: SubmitEvent) => {
        e.preventDefault()

        if (!formRef.current) return

        const email = getFormField('email', formRef)
        const username = getFormField('username', formRef)
        const password = getFormField('password', formRef)


        const signUpData = {
            email,
            username,
            password
        }

        apiClient.authSignUp(signUpData).then(response => {
            Cookies.set('token', response.data.accessToken)
            route('/tables')
            location.reload()
        })
    }

    return (
        <div class="mx-auto mt-10 w-96 p-6 space-y-4 md:space-y-6 sm:p-8 0 bg-gray-600 rounded-lg">
            <h1 class="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                SignUp
            </h1>
            <form ref={formRef} onSubmit={onSignUpSubmit} class="space-y-4 md:space-y-6" action="#">
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium  text-white">Your email</label>
                    <input type="email" name="email" id="email" class=" border   sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" required />
                </div>

                <div>
                    <label for="username" class="block mb-2 text-sm font-medium text-white">Your username</label>
                    <input type="text" name="username" id="text" class=" border sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="username" required />
                </div>

                <div>
                    <label for="password" class="block mb-2 text-sm font-medium  text-white">Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" class=" border   sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
                </div>


                <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>

                <p class="text-sm font-light text-gray-400">
                    Already have an account? <a href="/login" class="font-medium hover:underline text-primary-500">Login here</a>
                </p>
            </form>
        </div>
    )
}