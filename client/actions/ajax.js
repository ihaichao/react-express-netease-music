import axios from 'axios'

export function getAjax(url, cb) {
	axios.get(url)
		.then(function (response) {
			cb(response);
		})
		.catch(function (error) {
			console.log(error);
		});
}

export function putAjax(url, data, cb) {
	axios.put(url, data)
		.then(function (response) {
			cb(response);
		})
		.catch(function (error) {
			console.log(error);
		});
}

export function postAjax(url, data, cb) {
	axios.post(url, data)
		.then(function (response) {
			cb(response);
		})
		.catch(function (error) {
			console.log(error);
		});
}

export function deleteAjax(url, cb) {
	axios.delete(url)
		.then(function (response) {
			cb(response);
		})
		.catch(function (error) {
			console.log(error);
		});
}
