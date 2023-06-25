import React, { useState } from "react";
import Input from "../components/Reusable/Input";
import Button from "../components/Reusable/Button";
import { Link, useNavigate } from "react-router-dom";
import { validEmailRegex } from "../utils/validEmailRegex";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/BaseUrl";

const Signin = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const [errors, setErrors] = useState({email: "", password: ""})
    const [loading, setLoading] = useState(false)

    const inputHandler = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setLoginData({ ...loginData, [name]: value })
        e.preventDefault()
        switch (name) {
          case "email":
            errors.email = validEmailRegex.test(value) ? '' : "Email is not valid"
            break;
          default:
            break;
        }
        setErrors({ ...errors })
    };

    const handleSubmit = async(e) => {
        try {
            e.preventDefault()
            setLoading(true)
            let submitData = await axios.post(`${BASE_URL}/auth/signin`, loginData);
            if(submitData.status == 201){
                toast.success(submitData.data.message);
                let token = submitData.data.token
                localStorage.setItem('token', token)
                setLoading(false)
                navigate('/dashboard')
            }else{
                toast.error(submitData.data.message);
                setLoading(false)
            }
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    return (
        <div className="w-[100%]  flex justify-between">
            <div className="w-[100%] md:w-[60%] mx-auto items-center flex flex-col justify-around">
              <div className="w-[100%] xl:w-[50%] p-10 flex flex-col justify-around">    
                <img src="Logo.svg" alt="Logo" className="w-60"/>
                <div className="mt-12">
                    <h1 className="text-3xl">Welcome back!</h1>
                    <p className=" text-md">Enter your credentials back to access your account</p>
                </div>
                <div className="w-[100%] mt-12">
                    <div>
                        <Input 
                            name={"email"} 
                            type={"email"}
                            placeholder={""}
                            labelName={"Email address"}
                            inputHandler={inputHandler}
                            required={true}
                            defaultInputValue={loginData.email}
                            disabled={loading}
                            value={loginData.email}
                            error={errors.email}
                        />
                    </div>
                    <div className="mt-6">
                        <Input 
                            name={"password"} 
                            type={"password"}
                            placeholder={""}
                            labelName={"Password"}
                            inputHandler={inputHandler}
                            required={true}
                            defaultInputValue={loginData.password}
                            disabled={loading}
                            value={loginData.password}
                            error={errors.password}
                        />
                    </div>

                    <div className="w-[100%] mt-4 flex justify-end">
                        <p className="text-primary">forgot password?</p>
                    </div>

                    <div className="mt-12">
                        <Button
                            className="bg-primary"
                            name={"Login"}
                            loading = {loading}
                            handleClick = {handleSubmit}
                        />
                    </div>
                </div>
                <div className="flex mt-8 mx-auto">
                    <p>Already have an account?</p>
                    <Link to={"/register"} className="ml-2 text-primary">Register</Link>
                </div>
              </div>
            </div>
            <div className="hidden xl:block  xl:w-[50%] self-end flex">
                <img src="people-3.png" alt="A people svg" className="w-[60em] h-[60em]"/>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Signin