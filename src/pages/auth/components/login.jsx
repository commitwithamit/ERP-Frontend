import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import UseAlert from '../../../hooks/UseAlert.jsx';
import { AnimatePresence } from "framer-motion";

import { login } from '../api/auth';
import { setLogin } from '../../../store/slices/authSlice.js';
import { setUser } from '../../../store/slices/userSlice.js';

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const inputChangeHandler = (name, value) => {
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!loginData?.email || !loginData?.password) {
      setShowAlert({
        type: "failure",
        msg: "Please fill all the fields.",
        show: true,
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await login(loginData);

      dispatch(setLogin({ accessToken: response.data.accessToken }));
      dispatch(setUser({ user: response.data.user }));

      navigate("/");
    } catch (err) {
      setShowAlert({
        type: "failure",
        msg: err?.response?.data?.message,
        show: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

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
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-transparent border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              placeholder="username@gmail.com"
              required
              onChange={(e) => inputChangeHandler("email", e.target.value)}
            />
          </div>
          <div className="mb-5">
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
                className="bg-transparent border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 pe-9 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
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
