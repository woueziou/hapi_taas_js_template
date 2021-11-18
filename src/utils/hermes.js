const {
    BOT_PANEL
} = require('../telegram/common');
const HermesService = require('../services/hermes.service');
const Hermes = {
    /**
     * 
     * @param {String} social_id 
     * @param {String} message 
     * @param {String} channel 
     * @param {String} sender_id 
     * @param {String} receiver_id 
     * @returns 
     */
    async sendMessage(social_id, message, channel, sender_id, receiver_id) {
        switch (channel) {
            case 'TELEGRAM':
                return new Promise((res, rej) => {
                    BOT_PANEL.telegram.sendMessage(social_id, message).then(() => {
                        HermesService.saveMessage({
                            content: message,
                            sender: sender_id,
                            receiver: receiver_id,
                            social_id: social_id,
                        }).then(() => {
                            res();
                        }).catch(err => {
                            rej(err);
                        });

                    }).catch(err => {
                        rej(err);
                    });
                });
            case 'WHATSAPP':
                // Send message to Whatsapp user
                break;

            default:
                // Message cannot be sent unknown channel
                break;
        }
    },
    async answerRequest(social_id, message, channel, receiver_id, extra) {
        switch (channel) {
            case 'TELEGRAM':
                return new Promise((res, rej) => {
                    BOT_PANEL.telegram.sendMessage(social_id, message, extra).then((result) => {
                        // console.log('#####HERMESS####');
                        // console.log(result);
                        HermesService.saveMessage({
                            content: message,
                            sender: receiver_id,
                            receiver: receiver_id,
                            social_id: social_id,
                        }).then(() => {
                            return res(result.message_id);
                        }).catch(err => {
                            rej(err);
                        });

                    }).catch(err => {
                        rej(err);
                    });
                });
            case 'WHATSAPP':
                // Send message to Whatsapp user
                break;

            default:
                // Message cannot be sent unknown channel
                break;
        }
    }
};
module.exports = Hermes;