import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import * as Yup from 'yup';

import { login } from '../api/auth';
import { setLogin } from '../../../store/slices/authSlice.js';
import { setUser } from '../../../store/slices/userSlice.js';
import UseAlert from '../../../hooks/UseAlert.jsx';
import logo from "../../../assets/erplogo.png";

import { Button } from "flowbite-react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { LuLoader2 } from "react-icons/lu";

export default function Login() {
  const [viewPass, setViewPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({
    type: "",
    msg: "",
    show: false,
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [formValid, setFormValid] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email format"),
    password: Yup.string().required("Password is required"),
  })

  const inputChangeHandler = (name, value) => {
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Validate form data
      await validationSchema.validate(loginData, { abortEarly: false });

      // If validation passes, reset formValid and submit data
      setFormValid({});
      setIsLoading(true);
      const response = await login(loginData);
      console.log(response);

      dispatch(setLogin({ accessToken: response.data.accessToken }));
      dispatch(setUser({ user: response.data.user }));

      navigate("/");
    } catch (error) {
      console.log(error);

      // Handle Yup validation errors
      if (error.name === "ValidationError") {
        const newError = { ...formValid }; // Retain existing errors
        error.inner.forEach(err => {
          newError[err.path] = err.message;
        });

        setFormValid(newError);
      }

      // Handle Axios errors (server-side errors)
      if (error.isAxiosError) {
        setShowAlert({
          type: "failure",
          msg: error?.response?.data?.message,
          show: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }
  
  console.log(formValid);  
  return (
    <>
      <AnimatePresence mode="popLayout">
        {
          showAlert.show &&
          <UseAlert
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
        }
      </AnimatePresence>

      <section className='w-full h-[calc(100vh-16px)] flex justify-center items-center flex-col' >
        <h2 className='mb-5 text-5xl'>Login</h2>
        <form className="min-w-[35%] mx-auto text-gray-900 p-10 rounded-xl bg-secondary">

          <div>
            <img src={logo} alt="logo" className='w-9 mx-auto mb-3' />
          </div>

          <div className="h-[100px]">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className={`bg-transparent border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 ${formValid.email && 'border-red-600'}`}
              placeholder="username@gmail.com"
              required
              onChange={(e) => inputChangeHandler("email", e.target.value)}
            />
            <AnimatePresence>
              {
                formValid.email &&
                <motion.p
                  initial={{
                    opacity: 0
                  }}
                  animate={{
                    opacity: 1
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className='text-xs my-1 text-red-600'>
                  {`* ${formValid.email}`}
                </motion.p>
              }
            </AnimatePresence>
          </div>

          <div className="h-[100px]">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium dark:text-white"
            >
              Your password
            </label>
            <span className="relative">
              <input
                type={viewPass ? "text" : "password"}
                id="password"
                className={`bg-transparent border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 pe-9 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 ${formValid.password && 'border-red-600'}`}
                required=""
                onChange={(e) => inputChangeHandler("password", e.target.value)}
              />
              {
                loginData.password && (
                  <span className='absolute block w-[15px] h-[15px] flex justify-center top-[50%] right-2.5 translate-y-[-50%] cursor-pointer'>
                    {
                      viewPass ? (
                        <BsEye onClick={() => setViewPass(false)} />
                      ) : (
                        <BsEyeSlash onClick={() => setViewPass(true)} />
                      )
                    }
                  </span>
                )
              }
            </span>
            <AnimatePresence>
              {
                formValid.password &&
                <motion.p
                  initial={{
                    opacity: 0
                  }}
                  animate={{
                    opacity: 1
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className='text-xs my-1 text-red-600'>
                  {`* ${formValid.password}`}
                </motion.p>
              }
            </AnimatePresence>
          </div>

          <Button
            type="submit"
            className="btn items-center"
            onClick={(e) => submitHandler(e)}
            disabled={isLoading && true}
          >
            Login
            {isLoading && <LuLoader2 className='w-4 h-4 animate-spin ml-2' />}
          </Button>
        </form>
      </section>
    </>
  )
}
