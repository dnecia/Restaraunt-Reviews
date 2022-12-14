import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [addUser, {error}] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    //here is where the user will submit the form 
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        //handle the errors using try and catch
        try {
            console.log(formState);
            const { data } = await addUser({
                variables: {...formState },
            });
            Auth.login(data.addUser.token); 
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <main className='flex-row justofy-center mb-4'>
            <div className='col-12 col-md-6'>
                <div className='card'>
                 <h4 className='card-header'> Sign Up </h4>
                    <div className='card-body'>
                        <form onSubmit={handleFormSubmit}>
                         <input
                             className='form-input'
                             placeholder='Your username'
                             name='username'
                             type='username'
                             id='username'
                             value={formState.username}
                             onChange={handleChange}
                            />
                         <input
                             className='form-input'
                             placeholder='Your email'
                             name='email'
                             type='email'
                             id='email'
                             value={formState.email}
                             onChange={handleChange}
                            />
                            <input
                             className='form-input'
                             placeholder='******'
                             name='password'
                             type='password'
                             id='password'
                             value={formState.password}
                             onChange={handleChange}
                            />
                           <button className='btn d-block w-100' type='submit'>
                            Submit
                           </button>
                        </form>
                        {error && <div> Unable to Sign up, please try again!</div>}
                          
                    </div>

                </div>

            </div>
        </main>

    );
 
}; 
export default Signup;