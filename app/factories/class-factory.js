'use strict';
app.factory('classFactory', function ($q, $http, FBCreds) {

	//saves fb url
	let url = FBCreds.databaseURL;

	// returns array with class names, uid, and uglyId
	const makeArray = (obj) => {
		return Object.keys(obj).map(key => {
			obj[key].id = key;
			return obj[key];
		});
	};

	//shows all classes associated with current user
	const getAllClasses = (userId) => {
		return $q((resolve, reject) => {
			$http.get(`${url}/classes.json?orderBy="uid"&equalTo="${userId}"`)
				.then(classes => resolve(makeArray(classes.data)))
				.catch(error => console.log("error from getAllClasses", error.message));
		});
	};

	//gets one class object by class uglyId
	const getSingleClass = (uglyId) => {
		return $q((resolve, reject) => {
			$http.get(`${url}/classes/${uglyId}.json`)
				.then(classes => {
					classes.data.id = uglyId;
					resolve(classes.data);
				})
				.catch(error => console.log("error from getSingleClass", error.message));
		});
	};

	//adds new class to classes collection w/ object taken from classesCtrl
	const postClass = (classInfo) => {
		let newClass = angular.toJson(classInfo);
		return $http.post(`${url}/classes.json`, newClass)
			.then(data => console.log("data from postClass", data))
			.catch(error => console.log("error from postClass", error.message));
	};

	//updates class roster details
	const editClass = (id, obj) => {
		return $q((resolve, reject) => {
			let newObj = angular.toJson(obj);
			$http.patch(`${url}/classes/${id}.json`, newObj)
				.then(response => resolve(response))
				.catch(error => reject(error));
		});
	};

	//removes class from classes collection by ID
	const deleteClass = (classId) => {
		return $q((resolve, reject) => {
			$http.delete(`${url}/classes/${classId}.json`)
				.then(response => resolve(response))
				.catch(error => reject(error));
		});
	};

	return {
		getAllClasses,
		getSingleClass,
		postClass,
		editClass,
		deleteClass
	};

});