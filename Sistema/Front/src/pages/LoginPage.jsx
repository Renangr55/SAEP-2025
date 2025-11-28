import {z} from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "../components/Button"
import { Input } from "../components/Input"
import api from "../services/api"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"



export const LoginPage  = () =>{

    const loginSchema = z.object({
        username: z.string().min(1,"required 1 caracter"),
        password: z.string().min(1, "required 1 caracter")
    })


    const { 
        register, 
        handleSubmit, 
        formState: { errors } } = useForm({
            resolver: zodResolver(loginSchema)
        });
    
    const onSubmit = async (data) => {
        const payload = {
            username: data.username,
            password: data.password
        };

        try {
            const response = await api.post("api/auth/login", payload);
            console.log(response.data);

            // Salva token
            localStorage.setItem("token", response.data?.token);

            // Salva userId e role
            localStorage.setItem("userId", response.data?.user_id);
            localStorage.setItem("username", response.data?.username); // ✅
            localStorage.setItem("role", response.data?.role || "");

            navigate("/homepage");

            alert("Login realizado com sucesso!");
        } catch (error) {
            alert(error.response?.data?.error || "Erro ao fazer login");
            console.log("error", error.response?.data);
        }
    };

    const navigate = useNavigate()

    
    return (
        <>
        <div className="flex justify-center items-center bg-linear-to-r from-blue-500 to-purple-500 h-svh w-svw">
            <form onSubmit={handleSubmit(onSubmit)} className=" h-100">
                <section className="flex flex-col bg-white h-100 w-100 justify-between">
                    <section className="flex justify-center">
                        <h1 className="font-bold text-2xl pt-5">Sign In</h1>
                    </section>

                    <section className="w-full flex flex-col justify-center items-center gap-1.5">
                        <Input
                        idInput={"usernameInput"}
                        labelId={"usernameInput"}
                        widthInput={"w-70"}
                        heightInput={"h-10"}
                        textLabel={"Username"}
                        bgInput={"bg-gray-200"}
                        register={register("username")}
                        />

                        <Input 
                        typeInput={"password"}
                        textLabel={"password"}
                        widthInput={"w-70"}
                        heightInput={"h-10"}
                        bgInput={"bg-gray-200"}
                        register={register("password")}
                        />
                    </section>

                    <section className="flex justify-center w-full pb-2">
                        <Button 
                        typeButton="submit" 
                        children={"Sign now"} 
                        bgButton={"bg-linear-to-r from-blue-500 to-purple-500"} 
                        heightButton={"h-10"} 
                        widhtButton={"w-50"}
                        textColor={"text-white"}
                        />
                    </section>
                </section>

                
            </form>
        </div>
        </>
    )
}

export default LoginPage;