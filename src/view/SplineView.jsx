import Spline from '@splinetool/react-spline';
const SplineView = ({ onLoad, onMouseDown }) => {
	return (
		<div className='globeView'>
			<div class='cursor-wrapper'></div>

			<Spline
				scene='https://prod.spline.design/XZVle6DRiue1EqA9/scene.splinecode'
				onLoad={onLoad}
				onMouseDown={onMouseDown}
			/>
		</div>
	);
};

export default SplineView;
