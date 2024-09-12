import SplineView from '../view/SplineView';

function SplinePresenter({ onLoad, onMouseDown }) {
	return (
		<div className='globePresenter'>
			<SplineView onLoad={onLoad} onMouseDown={onMouseDown} />
		</div>
	);
}

export default SplinePresenter;
