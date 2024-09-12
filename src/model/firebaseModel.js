import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref, get } from 'firebase/database';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
	signOut,
} from 'firebase/auth';
import { reaction } from 'mobx';

const firebaseConfig = {
	apiKey: 'API KEY HERE',
	authDomain: 'AUTH DOMAIN HERE',
	databaseURL:
		'DATABASE USRL HERE',
	projectId: 'PROJECT ID HERE',
	storageBucket: 'STORAGE BUCKET HERE',
	messagingSenderId: 'MESSAGING SENDER ID HERE',
	appId: 'APP ID HERE',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const PATH = 'global-history';

async function authenticate(model) {
	await signInWithPopup(auth, provider);
	model.user = auth.currentUser;
	connectToFirebase(model, reaction);
}

async function logOut(model) {
	await signOut(auth);
	model.user = auth.currentUser;
}

function modelToPersistence(model) {
	return {
		year: model.currentYear,
		isDarkMode: model.isDarkMode,
	};
}

function persistenceToModel(data, model) {
	model.currentYear = data?.year || 2000;
	model.isDarkMode = data?.isDarkMode || false;
}

function saveToFirebase(model) {
	if (model.ready) {
		set(ref(db, PATH + '/' + model.user.uid), modelToPersistence(model));
	}
}

function readFromFirebase(model) {
	function getPromiseDataACB(snapshot) {
		return persistenceToModel(snapshot.val(), model);
	}

	function setModelReadyACB() {
		model.ready = true;
	}

	model.ready = false;
	return get(ref(db, PATH + '/' + model.user.uid))
		.then(getPromiseDataACB)
		.then(setModelReadyACB);
}
function connectToFirebase(model, watchFunction) {
	function checkModelItemsACB() {
		return [model.currentYear, model.isDarkMode];
	}

	function saveUpdatedDataACB() {
		saveToFirebase(model);
	}

	if (model.user) {
		readFromFirebase(model);
		watchFunction(checkModelItemsACB, saveUpdatedDataACB);
	}
}

export {
	modelToPersistence,
	persistenceToModel,
	saveToFirebase,
	readFromFirebase,
	authenticate,
	logOut,
};

export default connectToFirebase;
