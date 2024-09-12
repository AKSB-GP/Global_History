import '../styles/ListView.css';

const ListView= ({ scrollBack, activeEvents, countryName, model}) => {

      function renderEvents(event) {
            return (
                <div className='cards'>
                    <div className='card'>
                        <p className='cardText'>{event}</p>
                    </div>
                </div>
            );
      }



	return ( 
        <div className='listPage'>
            
            <div className='cardDiv'>

                <h2 className='countryHeader'>{countryName}  {model.currentYear}</h2>
                <button onClick={scrollBack} className='closeButton'>Back to exploring</button>
                <div className='cardStack' > 
                {activeEvents? activeEvents.map(renderEvents) : ""}
                
                </div>
                
            </div>

      </div>
	);
      
};

export default ListView;