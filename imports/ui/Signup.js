import React from 'react';
import {Link} from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';

export default class Signup extends React.Component {
    minPasswordLength = 7;

    constructor(props) {
        super(props);
        this.state = {  //Component state
            error: ''
        };
    }

    onSubmit(e) {
        e.preventDefault(); //Prevent browser default action (full refresh)

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        if(password.length < this.minPasswordLength) {
            return this.setState({error: `Password must be more than ${this.minPasswordLength - 1} characters long.`});
        }

        Accounts.createUser({email, password}, (err) => {
            if(err){
                this.setState({error: err.reason});
            }else{
                this.setState({error: ''});
            }
        });
    }

    render(){
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Join</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
                        <input type="email" ref="email" name="email" placeholder="e-mail"/>
                        <input type="password" ref="password" name="password" placeholder="password"/>
                        <button className="button">Create Account</button>
                    </form>

                    <Link to="/">Already have an account?</Link>
                </div>
            </div>
        );
    }
}