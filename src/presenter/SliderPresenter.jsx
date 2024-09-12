import SliderView from '../view/SliderView';

const SliderPresenter = ({ onChange, model}) => {
	const marks = [];

	// Label every 10th year
/* 	for (let i = 1500; i < 2022; i += 50) {
		marks.push({ value: i, label: i });
	} */

	return (
		<div className='timeline'>
			<SliderView onChange={onChange} marks={marks} modelYear={model.currentYear}/>
		</div>
	);
};

export default SliderPresenter;