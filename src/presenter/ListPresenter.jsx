import ListView from '../view/ListView';

const ListPresenter = ({ scrollBack, result, countryName, model}) => {

	return (
        <div>
        {<ListView scrollBack={scrollBack} activeEvents={result} countryName = {countryName} model={model}/>}
      </div>
	);
};

export default ListPresenter;