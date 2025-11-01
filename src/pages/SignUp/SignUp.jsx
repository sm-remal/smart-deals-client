import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';

const SignUp = () => {
    const { signInGoogle } = useContext(AuthContext)


    const handleSignUp = (event) => {
        event.preventDefault();
    }


    const handleGoogleSignUp = () => {
        signInGoogle()
            .then(result => {
                alert("Sign UP Successfully")

                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL,
                }

                fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                     body: JSON.stringify(newUser),
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log("User After save data: ", data)
                    })




            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <div className='flex justify-center items-center my-14'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <div className='flex justify-center items-center'>
                        <h1 className="text-3xl font-bold">Sign Up now!</h1>
                    </div>
                    <form onSubmit={handleSignUp}>
                        <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input type="text" className="input" name='name' placeholder="Enter Your Name" />

                            <label className="label">Photo URL</label>
                            <input type="text" className="input" name='photoURL' placeholder="Enter Your Photo URL" />
                            <label className="label">Email</label>
                            <input type="email" className="input" name='email' placeholder="Enter Your Email" />

                            <label className="label">Password</label>
                            <input type="password" className="input" name='password' placeholder="Enter Your Password" />

                            <label className="label mt-2">
                                <input type="checkbox" className="checkbox" />
                                Please accept our terms and condition.
                            </label>

                            <button className="btn btn-neutral mt-4">Sign Up</button>
                        </fieldset>
                    </form>
                    <div className='divider'>or</div>
                    <button onClick={handleGoogleSignUp} className="btn bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                    <p className='mt-1'>Already have an account? <Link to={"/login"} className="underline">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;