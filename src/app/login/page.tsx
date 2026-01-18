"use client"
import {useActionState} from "react";

interface FormState {
    success: boolean;
    message: string;
}

const initialState = {
    success: false,
    message: "",
}
function submitForm(prevState: FormState, formData: FormData) {
    const username = formData.get("username");
    const password = formData.get("password");
    console.log(prevState)
    console.log(username, password);

    // return null
    return {
        success: false,
        message: "Failed"
    }
}

const Login = () => {

    const [state, formAction, isPending] = useActionState(submitForm, initialState);

    console.log(isPending)

    console.log(state)

    return (
        <div className="h-full flex items-center justify-center">
            <form action={formAction} className="flex flex-col h-1/2 w-1/3 border border-gray-300 p-3">
                <h2 className="text-3xl text-center mb-5">Check in...</h2>
                {/*{state}*/}
                <input type="text" placeholder="Username" name="username" className="py-2 px-3 w-full my-3 border border-gray-300" />
                <input type="password" placeholder="Password" name="password" className="py-2 px-3 w-full my-3 border border-gray-300" />
                <button  type="submit" className="p-3 bg-green-700 hover:bg-green-500 hover:cursor-pointer">Login</button>
            </form>
        </div>
    )
}

export default Login;