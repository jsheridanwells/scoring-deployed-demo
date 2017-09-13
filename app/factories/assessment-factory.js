'use strict';
app.factory('assessmentFactory', function ($q, $http, FBCreds) {

	//saves fb url
	let url = FBCreds.databaseURL;

	// return array with assement names, uid, and uglyId
	const makeArray = (obj) => {
		return Object.keys(obj).map(key => {
			obj[key].id = key;
			return obj[key];
		});
	};

	const getAllAssessments = (userId) => {
		return $q((resolve, reject) => {
			$http.get(`${url}/assessments.json?orderBy="uid"&equalTo="${userId}"`)
				.then(assessments => resolve(makeArray(assessments.data)))
				.catch(error => console.log("error from getAllAssessments", error.message));
		});
	};

	const postAssessment = (obj) => {
		console.log("postAssessment firing");
		let newObj = JSON.stringify(obj);
		return $http.post(`${url}/assessments.json`, newObj)
			.then( data => console.log("data from postAssessment", data))
			.catch(error => console.log("error from postAssessment", error.message));
	};

	const deleteAssessment = (assessmentId) => {
		console.log("function firing also", assessmentId);
		return $q((resolve, reject) => {
			$http.delete(`${url}/assessments/${assessmentId}.json`)
				.then(response => resolve(response))
				.catch(error => reject(error));
		});
	};

	return {
		getAllAssessments,
		postAssessment,
		deleteAssessment
	};

});