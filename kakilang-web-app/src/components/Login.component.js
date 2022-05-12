import React, { Component } from 'react';
import './Login.component.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'example@email.com',
            password: 'password123'
        }

        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    emailChange(event) {
        this.setState({email: event.target.value});
    }

    passwordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        console.log('Email: ', this.state.email, ' Password: ', this.state.password);
        event.preventDefault();
    }
    
    render() {   
        return (
            <div className='Login-window'>
                <h1> Kakileng </h1>
                <form onSubmit={this.handleSubmit}>
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