import React, { Component } from 'react';
import axios from 'axios';
import './Login.component.css';

/**
 * This component class represents the login screen for user authentication
 * @example 
 * <Login /> 
 */
class Login extends Component {
    /**
     * @param {props} props Optional props to the component
     */
    constructor(props) {
        super(props);
        /**
         * @property {Object} state The internal state of the object
         * @property {email} state.email User's email
         * @property {password} state.password User's password
         */
        this.state = {
            /** User's email */
            email: 'example@email.com',
            /** User's password */
            password: 'password123'
        }

        

        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Handles the change in the email input element
     * @param {SyntheticBaseEvent} event 
     */
    emailChange(event) {
        this.setState({email: event.target.value});
    }

    /**
     * Handles the change in the password input element
     * @param {SyntheticBaseEvent} event 
     */
    passwordChange(event) {
        this.setState({password: event.target.value});
    }

    /**
     * Handles the submission of user information
     * @param {SyntheticBaseEvent} event 
     */
    handleSubmit(event) {
        event.preventDefault();
        const user = {email: this.state.email, password:this.state.password};
        axios.post('http://localhost:2500/login', user).then(res => res.json()).then(data => {
            localStorage.setItem("token", data.token)
        });
        //axios.post('http://localhost:2500/register/add', user).then(res => console.log(res.data));
    }
    
    /**
     * 
     * @return {JSX} The login window with email, password input and submission
     */
    render() {   
        return (
            <div className='Login-window'>
                <form onSubmit={this.handleSubmit}>
                    <h1> Log In</h1>
                    <input type="email" name="Email"
                        value={this.state.email} onChange={this.emailChange} />
                    <br />
                    <input type="password" name="Password" 
                        value={this.state.password} onChange={this.passwordChange} />
                    <br />
                    <input className="submit" type="submit" value="Log In" />
                </form>
                <i> Need an account? <a href='/register'> Sign up </a> </i>
            </div>
        )
    }
}

export default Login;