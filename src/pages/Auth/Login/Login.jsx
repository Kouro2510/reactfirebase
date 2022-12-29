import './login.scss'
import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile,
} from "firebase/auth";
import React, {useState} from "react";
import {toast} from "react-toastify";
import {auth} from "../../../config/firebase";
import {useNavigate} from "react-router-dom";

const initialState = {
    firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
};

const Login = ({setActive, setUser}) => {
    const [state, setState] = useState(initialState);
    const [signUp, setSignUp] = useState(false);

    const {email, password, firstName, lastName, confirmPassword} = state;

    const navigate = useNavigate();
    const handleAuth = async (e) => {
        e.preventDefault();
        if (!signUp) {
            if (email && password) {
                const {user} = await signInWithEmailAndPassword(auth, email, password);
                setUser(user);
                setActive("home");
            } else {
                return toast.error("All fields are mandatory to fill");
            }
        } else {
            if (password !== confirmPassword) {
                return toast.error("Password don't match");
            }
            if (firstName && lastName && email && password) {
                const {user} = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(user, {displayName: `${firstName} ${lastName}`});
                setActive("home");
            } else {
                return toast.error("All fields are mandatory to fill");
            }
        }
        navigate("/");
    };
    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    };
    return (<div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
            <div className="hidden bg-cover lg:block lg:w-2/3"
                 style={{backgroundImage: "url(https://th.bing.com/th/id/R.a95e2303d03c307a030fb9ee487b94b6?rik=37FneRZ6lqNmFQ&riu=http%3a%2f%2f1.bp.blogspot.com%2f-2TmctTaO-Gs%2fUoR0wwhbpGI%2fAAAAAAAAF08%2f9QN9bqFM21Y%2fs1600%2fCars%2bWallpapers%2b20141.jpg&ehk=7J13cTR3HY%2bs4eY3Bkl2Xvwu9N0rT8jwVX%2fafmi%2bLhU%3d&risl=&pid=ImgRaw&r=0)"}}>
                <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                </div>
            </div>

            <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                <div className="flex-1">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">{!signUp ? "Sign-In" : "Sign-Up"} to
                            website</h2>

                        <p className="mt-3 text-gray-500 dark:text-gray-300">{!signUp ? "Sign-In" : "Sign-Up"} to
                            access your account</p>
                    </div>

                    <div className="mt-8">
                        <form onSubmit={handleAuth}>
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email
                                    Address</label>
                                <input placeholder="Email"
                                       name="email"
                                       value={email}
                                       onChange={handleChange}
                                       className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                            </div>
                            <div className="mt-6">
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="password"
                                           className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                                    {!signUp && (<a href="/forgot"
                                                    className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot
                                        password?</a>)}
                                </div>
                                <input type="password" name="password" id="password" placeholder="Your Password"
                                       onChange={handleChange}
                                       className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                            </div>
                            {signUp && (<div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Confirm
                                    password</label>
                                <input type="password" id="confirmPassword" placeholder="Confirm Password"
                                       name="confirmPassword"
                                       value={confirmPassword}
                                       onChange={handleChange}
                                       className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                            </div>)}
                            {signUp && (<div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm text-gray-600 dark:text-gray-200">First
                                    Name</label>
                                <input type="email" id="firstName" placeholder="Last Name"
                                       name="lastName"
                                       value={lastName}
                                       onChange={handleChange}
                                       className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                            </div>)}
                            {signUp && (<div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Last
                                    Name</label>
                                <input type="email" id="lastName" placeholder="Last Name"
                                       name="lastName"
                                       value={lastName}
                                       onChange={handleChange}
                                       className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                            </div>)}
                            <div className="mt-6">
                                <button
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    Sign in
                                </button>
                            </div>

                        </form>

                        {!signUp ? (<>
                            <div className="text-center justify-content-center mt-2 pt-2">
                                <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Don't have an account ?&nbsp;
                                    <span
                                        className="link-danger"
                                        style={{textDecoration: "none", cursor: "pointer"}}
                                        onClick={() => setSignUp(true)}
                                    >
                        Sign Up
                      </span>
                                </p>
                            </div>
                        </>) : (<>
                            <div className="text-center justify-content-center mt-2 pt-2">
                                <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Already have an account ?&nbsp;
                                    <span
                                        style={{
                                            textDecoration: "none", cursor: "pointer", color: "#298af2",
                                        }}
                                        onClick={() => setSignUp(false)}
                                    >
                        Sign In
                      </span>
                                </p>
                            </div>
                        </>)}
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
export default Login;