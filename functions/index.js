const functions = require('firebase-functions');

//데이터베이스 사용
const admin = require('firebase-admin');
admin.initializeApp();


const CUT_OFF_TIME = 60 * 1000; // 2 Hours in milliseconds.


exports.deleteOldItems = functions.database.ref('{pushId}').onWrite((change, context) => {
    const ref = change.after.ref; // reference to the parent

	//console.log(change);
	//console.log(change.DataSnapshot);	
	//console.log(change.DataSnapshot[_data]);

	const beforeData = change.before.val();
	const afterData = change.after.val();

	//const appOptions = JSON.parse(process.env.FIREBASE_CONFIG);
    //appOptions.databaseAuthVariableOverride = context.auth;
    //const app = admin.initializeApp(appOptions, 'app');

	//const beforeDataItemCheck = beforeData[itemCheck];
	console.log("-- start --");
	console.log(beforeData);
	console.log(context.params.itemCheck);
	console.log("-- end --");

	//if(!beforeDataItemCheck) return;

	const now = Date.now();
  	const cutoff = now - CUT_OFF_TIME;
  	const oldItemsQuery = ref.orderByChild('timestamp').endAt(cutoff);
  	return oldItemsQuery.once('value').then((snapshot) => {
		
		var event = snapshot.val();
		//console.log(event);
		//console.log(event.itemCheck);
		
		
		// create a map with all children that need to be removed
    	const updates = {};
    	snapshot.forEach(child => {
    		updates[child.key] = null;
    	});
		
		// execute all updates in one go and return the result to end the function
    	return ref.update(updates);
  	});
});