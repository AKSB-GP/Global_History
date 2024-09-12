const HelpView = ({ closeHelp }) => {
	return (
		<div className='helpBox'>
			<p>Welcome to Global History!</p>
			<br></br>
			<p>
				Use the timeline to show country events for a specific year and then use
				your cursor to select an active event to display its information.
			</p>
			<br></br>
			<p>
				Use your mouse to turn the globe around. If you're on a mobile device -
				use two fingers to achieve the same effect!
			</p>
			<p className='exitHelp' onClick={closeHelp}>
				X
			</p>
		</div>
	);
};

export default HelpView;
