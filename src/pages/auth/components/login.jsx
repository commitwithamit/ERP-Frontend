import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";

import { login } from '../api/auth';
import { setLogin } from '../../../store/slices/authSlice.js';
import { setUser } from '../../../store/slices/userSlice.js';

import { BsEye, BsEyeSlash } from "react-icons/bs";
import { AlertDanger } from '../../../custom/components/alerts.jsx';

export default function Login() {
  const [viewPass, setViewPass] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      return setIsError("Please fill all the fields.");
    }

    try {
      setIsLoading(true);
      const response = await login(loginData);

      dispatch(setLogin({ accessToken: response.data.accessToken }));
      dispatch(setUser({ user: response.data.user }));

      navigate("/");
    } catch (err) {
      console.log(err);
      console.log(err?.response?.data?.message);
      setIsError(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }
 
  

  return (
    <>

      {isError && (
        <AlertDanger msg={isError} setIsError={setIsError}/>
      )}

      <section className='w-full h-[calc(100vh-16px)] flex justify-center items-center flex-col' >
        <h2 className='mb-5 text-5xl'>Login</h2>
        <form className="min-w-[35%] mx-auto text-gray-900 p-10 rounded-xl bg-stone-400">
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
              required=""
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

          <button
            disabled={isLoading ? true : false}
            type="submit"
            onClick={(e) => submitHandler(e)}
            className={`clr-txt bg-orange-400 hover:bg-orange-500 active:bg-orange-500 border border-gray-900 outline-none focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center w-max transition-all ${isLoading && 'opacity-55'}`}
          >
            Submit
            {isLoading &&
              (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 text-stone-600 animate-spin ml-2"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )
            }
          </button>
        </form>
      </section>



    </>
  )
}
