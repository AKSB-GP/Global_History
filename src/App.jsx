import AppPresenter from './presenter/AppPresenter';
import { observer } from 'mobx-react-lite';

export default observer(function App({ model }) {
	if (model.user && model.ready) {
		return (
			<div>
				{/* <h4>Current user: {model.user.uid}</h4> */}
				<AppPresenter model={model} />
			</div>
		);
	} else {
		return (
			<div>
				{/* <h4>Current user: null</h4> */}
				<AppPresenter model={model} />
			</div>
		);
	}
});
