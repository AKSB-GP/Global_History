import Slider from '@mui/material/Slider';
import '../styles/SliderView.css';

const SliderView = ({ value, onChange, marks, modelYear }) => {


	return (
		<Slider
			value={modelYear}
			onChange={onChange}
			aria-label='Timeline'
			step={1}
			min={1500}
			max={2022}
			className='slider'
			/>
	);
};
export default SliderView;