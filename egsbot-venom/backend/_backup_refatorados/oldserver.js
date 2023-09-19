// Supports ES6
// import { create, Whatsapp } from 'venom-bot';

const venom = require('venom-bot');

venom.create({
    session: 'EGS'
})
.then((client) => start(client))
.catch ((erro) => {
    console.log(erro);
} );

function start(client) {
    console.log("Bot iniciado");
    client.onMessage((message) => {
        if (message.body === 'hihi' && message.isGroupMsg === false){
            client
                .sendText(message.from, 'Bem vindo a EGS DIGITAL 🕷')               
                .then((result) => {
                    console.log('RESULTADO: ', result);
                })
                .catch((erro) => {
                    console.error('Erro ao enviar: ', erro);
                });
        }

    });
}
