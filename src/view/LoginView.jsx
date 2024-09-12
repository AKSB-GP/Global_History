const LoginView = ({ handleLoginClick, buttonText }) => {
	return (
		<div>
			<button onClick={handleLoginClick} className="login">{buttonText}</button>
		</div>
	);
};
export default LoginView;
