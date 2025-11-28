import {z} from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "../components/Button"
import { Input } from "../components/Input"
import api from "../services/api"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"



export const RegisterPage  = () =>{

    const registerPage = z.object({
        username: z.string().min(1,"required 1 caracter"),
        password: z.string().min(1, "required 1 caracter")
    })


    const { 
        register, 
        handleSubmit, 
        formState: { errors } } = useForm({
            resolver: zodResolver(registerPage)
        });
    
    const onSubmit = async (data) => {
        const payload = ({
            "username": data.username,
            "password": data.password
        })

        try{
            const response = await api.post("api/createListUser",payload)
            console.log(response.data)
            navigate("/login")
            alert("it was sucessfull")
        } catch (error){
            alert(error.response.data.username?.[0])
            console.log("error", error.response.data)
        }
    }
    const navigate = useNavigate()

    
    return (
        <>
        <div className="flex justify-center items-center bg-linear-to-r from-blue-500 to-purple-500 h-svh w-svw">
            <form onSubmit={handleSubmit(onSubmit)} className=" h-100">
                <section className="flex flex-col bg-white h-100 w-100 justify-between">
                    <section className="flex justify-center">
                        <h1 className="font-bold text-2xl pt-5">Create User</h1>
                    </section>

                    <section className="w-full flex flex-col justify-center items-center gap-1.5">
                        
                        {/* component input */}
                        <Input
                        inputType={"text"}
                        idInput={"usernameInput"}
                        labelId={"usernameInput"}
                        widthInput={"w-70"}
                        heightInput={"h-10"}
                        textLabel={"username"}
                        bgInput={"bg-gray-200"}
                        register={register("username")}
                        />

                        {errors.username && (
                            <p className="text-red-500 text-sm">{errors.username.message}</p>
                        )}
                        
                        {/* component imput */}
                        <Input 
                        inputType={"password"}
                        textLabel={"password"}
                        widthInput={"w-70"}
                        heightInput={"h-10"}
                        
                        bgInput={"bg-gray-200"}
                        register={register("password")}
                        />

                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </section>

                    <section className="flex justify-center w-full pb-2">
                        <Button 
                        typeButton="submit" 
                        children={"Create"} 
                        bgButton={"bg-linear-to-r from-blue-500 to-purple-500"} 
                        heightButton={"h-10"} 
                        widhtButton={"w-50"}
                        textColor={"text-white"}
                        />
                    </section>

                    <section className="flex justify-center h-10">
                        <Link to={'/login'} className="text-blue-600">
                            Login Page
                        </Link>
                    </section>
                </section>

                
            </form>
        </div>
        </>
    )
}

export default RegisterPage;