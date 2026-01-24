"use client"

import {useActionState, useEffect, useState, use} from "react";
import useAppStore from "../../../store";
import {createClient} from "@/utils/supabase/client";
// import {use} from "chai";

interface FormState {
    success: boolean;
    name: FormDataEntryValue | null;
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
}

const initialState = {
    success: false,
    name: null,
    email: null,
    password: null,
}

async function handleSubmit(formState: FormState) {
    const supabase = await createClient()

    if (formState.success) {
        const {data, error} = await supabase.auth.signUp({
            email: formState.email ? formState.email.toString(): '',
            password: formState.password ? formState.password?.toString() : '',
            options: {
                data: {
                    display_name: formState.name
                }
            }

        })

        return data ? data : error
    }


}

function submitForm(prevState: FormState, formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    console.log(prevState)
    // console.log(username, password);

    if(!email || !password || !name) {
        return {
            success: false,
            name: null,
            email: null,
            password: null,
        }
    }

    return {
        success: true,
        email,
        password,
        name

    }

}

const LoginDialog =  () => {

    const [formResult, setFormResult ] = useState();
    const { toggleLoginDialog } = useAppStore()
    const [state, formAction, isPending] = useActionState(submitForm, initialState);

    console.log(isPending)
    console.log(state)



    useEffect(() => {
        if(state.success) {
               const {user} =  handleSubmit(state)
            console.log(user)

        }
    },[state])

    console.log(state)
    return (
        <div className="fixed h-[100vh] w-[100vw] top-0 p-5 flex justify-center items-center">
            <form action={formAction} className="flex flex-col items-center h-1/2 w-1/3 border bg-black border-gray-300 p-3 shadow-2xl relative">
                <span title="close login dialog" className="absolute right-1.5 text-4xl cursor-pointer" onClick={() =>  toggleLoginDialog(false)}>&times;</span>

                <h2 className="text-3xl text-center mb-5 mt-8">Login</h2>

                <input type="text" placeholder="Name" name="name" minLength={3} className="py-2 px-3 w-full my-3 border border-gray-300" required/>
                <input type="text" placeholder="Email" name="email"  required minLength={9} pattern="^\S+@\S+\.\S+$" className="py-2 px-3 w-full my-3 border border-gray-300" />
                <input type="password" placeholder="Password" name="password" minLength={6} required className="py-2 px-3 w-full my-3 border border-gray-300" />
                <button  type="submit" className="p-3 w-1/4 bg-green-700 hover:bg-green-500 hover:cursor-pointer">Login</button>
            </form>
        </div>
    )
}

export default LoginDialog;