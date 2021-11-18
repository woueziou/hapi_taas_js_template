/* eslint-disable indent */
const UserModel = require('../../data/models/core/user.model');
const LOG_UTILS = require('../../utils/log-utils');
const _ = require('lodash');
const moment = require('moment');
// const {
// 	log
// } = require('console');
const UserService = {
	/**
	 * 
	 * @param {Object} user 
	 * @param {String} user_type 
	 */
	async saveUser(user, user_type) {
		// return new Promise(async (res, rej) => {
		try {
			const searchResult = await UserModel.find({
				phone: user.phone
			}).exec();
			console.log(searchResult);
			if (searchResult.length > 0) {
				// log('User exists');
				return;
			}
			const u = new UserModel({
				first_name: user.first_name,
				last_name: user.last_name,
				username: user.username,
				user_type: user_type,
				date_contact: moment().unix()
			});
			u.save(function (err) {
				if (err) {
					LOG_UTILS.reqLogger.userLogger.error(`${user.id} - Erreur de sauvegarde`);
					return;
				}
				LOG_UTILS.reqLogger.userLogger.info(`Nouvel utilisateur -  ${user.id} `);
				// saved!
			});
		} catch (e) {
			LOG_UTILS.reqLogger.userLogger.error('##############');
			LOG_UTILS.reqLogger.userLogger.error('Une erreur s\'est produite');
			LOG_UTILS.reqLogger.userLogger.error(e);
			LOG_UTILS.reqLogger.userLogger.error('##############');
		}
	},

	/**
	 * 
	 * @param {String} id 
	 * @returns UserModel || null
	 */
	async lookup(id) {
		return new Promise((resolve, reject) => {
			try {
				UserModel.findOne({
					_id: id
				}).then(searchResult => {
					resolve(searchResult);
				}).catch(err => {
					reject(err);
				});

			} catch (error) {
				reject(error);
			}

		});
	},

	async sanitizeUsers() {
			const listUser = await UserModel.find().distinct('id').exec();
			_.forEach(listUser, (value) => {
				UserModel.find({
					_id: value
				}).then((duplicated_data_list) => {
					let i = duplicated_data_list.length;
					while (i > 1) {
						UserModel.findByIdAndDelete(duplicated_data_list[i - 1]._id).then(val => {
							console.log(val);
						}).catch(err => {
							console.log(err);
						});
						i--;
					}
				});
			});
			return listUser;
		}

		,
	async getUsers() {
		const userList = await UserModel.find().exec();
		return userList;
	},
	// async unfinishedRequestUsers() {
	//     const request_list = await RequestModel.find().exec();
	//     if (_.isEmpty(request_list)) {
	//         return [];
	//     }
	//     let userList = [];
	//     await Promise.all(request_list.map(async (request) => {
	//         const u = await UserModel.findOne({
	//             id: request.user_id
	//         }).exec();
	//         userList.push(u);
	//         return;
	//     }));
	//     return userList;
	// },


};

module.exports = UserService;