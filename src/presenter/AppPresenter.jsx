import { useEffect, useRef, useState } from 'react';
import SliderPresenter from './SliderPresenter';
import { countryRegex, spline_list } from '../constant/regexConst';
import LoginPresenter from './LoginPresenter';
import { observer } from 'mobx-react-lite';
import SplinePresenter from './SplinePresenter';
import ListPresenter from './ListPresenter';
import HelpPresenter from './HelpPresenter';

export default observer(function AppPresenter({ model }) {
	const [sliderValue, setSliderValue] = useState(model.currentYear);
	const countries = useRef(spline_list);
	const [result, setResult] = useState(null);
	const [countryName, setCountryName] = useState(null);
	const [isHelp, setHelp] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(model.darkMode || false);
	const [isList, setIsList] = useState(false);
	const [helpIsDisabled, setHelpIsDisabled] = useState(false);
	let activeCountries = useRef({});
	//load each spline object according to each nations name.
	const onLoad = (splineApp) => {
		countries.current.forEach((country, i) => {
			const obj = splineApp.findObjectByName(String(country));
			if (countries.current[i] && obj) {
				countries.current[i] = obj;
			}
		});
	};
	//used to animate a country upon a event
	function country_animation(country) {
		//displacement vector used to "move" the country by a factor
		//change the displacement to decide how much a country moves
		const displacement_vector = [5, 5, 5];
		//position of a country
		const country_vector = [
			country.position.x,
			country.position.y,
			country.position.z,
		];
		//calculate the magnitude of a country
		const country_magnitude = Math.sqrt(
			country_vector[0] ** 2 + country_vector[1] ** 2 + country_vector[2] ** 2
		);
		//normalize each axis of a country
		const country_normalized = country_vector.map((v) => v / country_magnitude);
		//
		const new_vector = country_normalized.map(
			(v, i) => v * displacement_vector[i]
		);
		//add the new vector to the country position
		country.position.x += new_vector[0];
		country.position.y += new_vector[1];
		country.position.z += new_vector[2];
	}

	useEffect(
		() => {
			const timerId = setTimeout(async () => {
				const events = await model.getHistoricalEvent(
					String(model.currentYear)
				);
				reset_country_States();
				activeCountries.current = {};
				// If event includes any of the countries in the regex,emit a spline event
				events.forEach((event) => {
					const matchingCountryArray = countryRegex.find((countryArray) =>
						countryArray.some((country) => event.includes(country))
					);

					if (matchingCountryArray) {
						const countryObject = countries.current.find(
							(obj) => obj.name === matchingCountryArray[0]
						);
						countryObject.emitEvent('keyUp', countryObject.name);
						country_animation(countryObject);
						if (activeCountries.current[matchingCountryArray[0]]) {
							// If the country is already in activeCountries, update the events array
							activeCountries.current[matchingCountryArray[0]].events.push(
								event
							);
						} else {
							// If the country is not in activeCountries, add a new entry
							activeCountries.current[matchingCountryArray[0]] = {
								name: matchingCountryArray[0],
								events: [event],
							};
						}
					}
				});
			}, 500);

			const handleScroll = () => {
				const scrollPosition = window.scrollY;
				const element = document.querySelector('.globeDiv');

				// Adjust the speed of the animations by changing the multipliers
				const horizontalAnimationSpeed = 0.95;
				const verticalAnimationSpeed = 0.05;

				// Calculate the horizontal and vertical positions based on the scroll
				const newHorizontalPosition =
					-scrollPosition * horizontalAnimationSpeed;
				const newVerticalPosition = scrollPosition * verticalAnimationSpeed;

				// Apply the new transform values
				element.style.transform = `translate(${newHorizontalPosition}px, ${newVerticalPosition}px)`;
			};

			// Add scroll event listener
			window.addEventListener('scroll', handleScroll);

			// Cleanup function
			return () => {
				clearTimeout(timerId);
				window.removeEventListener('scroll', handleScroll);
			};
		},
		[model.currentYear],
		[]
	);

	useEffect(() => {
		// Switch to dark mode if the model is in dark mode
		document.body.classList.toggle('dark', model.isDarkMode);
		const imagePath = model.isDarkMode ? '/moon.svg' : '/sol.svg';
		document.querySelector(
			'.sun'
		).src = `${process.env.PUBLIC_URL}${imagePath}`;
	}, [model.isDarkMode]);

	//Reset all spline objects to start state
	const reset_country_States = () => {
		for (const element of countries.current) {
			element.emitEvent('start', String(element.name));
		}
	};

	// '_' is unused event, value is the slider value
	const handleSliderChange = (_, value) => {
		setSliderValue(value);
		model.currentYear = value;
	};

	const toggleDarkMode = () => {
		model.isDarkMode = !model.isDarkMode;
		setIsDarkMode(model.isDarkMode);
		document.body.classList.toggle('dark', model.isDarkMode);
		const imagePath = model.isDarkMode ? '/moon.svg' : '/sol.svg';
		document.querySelector(
			'.sun'
		).src = `${process.env.PUBLIC_URL}${imagePath}`;
	};

	const getImagePath = () => {
		return isDarkMode
			? `${process.env.PUBLIC_URL}/moon.svg`
			: `${process.env.PUBLIC_URL}/sol.svg`;
	};

	const openHelp = () => {
		setHelp(true);
	};

	const closeHelp = () => {
		setHelp(false);
	};

	function onMouseDown(obj) {
		if (activeCountries.current[obj.target.name]) {
			if (obj.target.name === activeCountries.current[obj.target.name].name) {
				console.log(activeCountries.current[obj.target.name].events);
				setCountryName(activeCountries.current[obj.target.name].name);
				setResult(activeCountries.current[obj.target.name].events);
				scrollToBottom();
				closeHelp();
			}
		}
	}

	function scrollToBottom() {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: 'smooth',
		});
		setHelpIsDisabled(true);
	}

	const scrollBack = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		setHelpIsDisabled(false);
	};

	return (
		<div>
			<div className='body'>
				<div className='background'></div>

				<div className=' headerDiv'>
					<div className='headerContainer'>
						<p className='logo'>Global History</p>

						<div className='niceButtons'>
							<div className='firstMenuRow'>
								<LoginPresenter model={model} className='login' />
								<HelpPresenter closeHelp={closeHelp} isHelp={isHelp} />
								<button
									className='help'
									onClick={openHelp}
									disabled={helpIsDisabled}
								>
									Help
								</button>
							</div>
							<div className='secondMenuRow'>
								<img
									src={getImagePath()}
									alt={isDarkMode ? 'dark mode' : 'light mode'}
									className='sun'
								/>
								<label className='lightDark'>
									<input
										type='checkbox'
										checked={model.isDarkMode}
										onChange={toggleDarkMode}
									/>
									<span className='circle'></span>
								</label>
							</div>
						</div>
					</div>
				</div>

				<div className='globeDiv'>
					<SplinePresenter onLoad={onLoad} onMouseDown={onMouseDown} />
				</div>

				<div className='parallaxYear yearTextDiv'>
					<p>What happened in</p>
					<h1 className='year'>{model.currentYear}</h1>
				</div>

				<div className='parallaxTimeline timelineDiv'>
					<SliderPresenter onChange={handleSliderChange} model={model} />
					<div className='years'>
						<p className='yearItem'>1500</p>
						<p className='yearItem'>2022</p>
					</div>
				</div>

				<div className='parallaxList'>
					<ListPresenter
						scrollBack={scrollBack}
						result={result}
						countryName={countryName}
						model={model}
					/>
				</div>
			</div>
		</div>
	);
});
