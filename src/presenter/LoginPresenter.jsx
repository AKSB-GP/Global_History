import React, { useState } from 'react';
import LoginView from '../view/LoginView';
import { authenticate, logOut } from '../model/firebaseModel';
import '../styles/LoginPresenter.css';

const LoginPresenter = ({ model }) => {
	const [authButtonText, setAuthButtonText] = useState('Sign in with Google');

	function handleLoginClick() {
		if (model.user) {
			logOut(model);
			setAuthButtonText('Sign in with Google');
		} else {
			authenticate(model);
			setAuthButtonText('Sign out');
		}
	}

	return (
		<div className='loginButton'>
			<LoginView
				handleLoginClick={handleLoginClick}
				buttonText={authButtonText}
			/>
		</div>
	);
};

export default LoginPresenter;
