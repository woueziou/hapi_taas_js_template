const TMONEY_PHONE_NUMBER_PREFIX = [
    '90',
    '91',
    '92',
    '93',
    '70'

];
const FLOOZ_PHONE_NUMBER_PREFIX = [
    '99',
    '98',
    '97',
    '96',
    '79',
    '78',
    '76'
];
const _ = require('lodash');

/**
 * 
 * @param {String} phone 
 * @returns 
 */
const isPhoneNumber = (phone) => {
    if (isTmoneyPhoneNumber(phone) !== false && isFloozPhoneNumber(phone) !== false) {
        return Number(phone);
    }
    return false;

};

const isTmoneyPhoneNumber = (phone) => {
    if (phone.length === 8) {
        const phone_prefix = _.take(phone, 2).join('');
        console.log(phone_prefix);
        if (TMONEY_PHONE_NUMBER_PREFIX.includes(phone_prefix)) {
            return Number(phone);
        }
        return false;
    }
    return false;

};

const isFloozPhoneNumber = (phone) => {
    if (phone.length === 8) {
        const phone_prefix = _.take(phone, 2).join('');
        console.log(phone_prefix);
        if (FLOOZ_PHONE_NUMBER_PREFIX.includes(phone_prefix)) {
            return Number(phone);
        }
        return false;
    }
    return false;

};

module.exports = {
    isPhoneNumber,
    isFloozPhoneNumber,
    isTmoneyPhoneNumber
};