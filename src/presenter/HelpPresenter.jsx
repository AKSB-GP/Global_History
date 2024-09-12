import HelpView from '../view/HelpView';

const HelpPresenter = ({closeHelp,isHelp}) => {
    
	return (
        <div className='helpBoxDiv'>
      {isHelp && <HelpView closeHelp={closeHelp} />}
      </div>
	);
};

export default HelpPresenter;