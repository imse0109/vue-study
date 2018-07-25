const functions = require('firebase-functions');

//데이터베이스 사용
//const admin = require('firebase-admin');
//admin.initializeApp();


exports.onItemCheck = functions.database.ref('{pushId}/{messageId}').onUpdate((change, context) => {
	const ref = change.after.ref;
	const pushId = context.params.pushId;
	const messageId = context.params.messageId;

	console.log(pushId);
	console.log(messageId);

	return change.after.ref.once('value').then(snapshot => {
		const data = snapshot.val();
		console.log(data.date);
		console.log(data.time);
		console.log(data.itemCheck);

		//if(itemCheck){
		//	ref.remove();
		//}
	});

});