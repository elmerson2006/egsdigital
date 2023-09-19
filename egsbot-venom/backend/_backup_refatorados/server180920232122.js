const fs = require('fs');
const venom = require('venom-bot');
const express = require('express');
const app = express();

app.get('/qrcode', (req, res) => {
  venom
    .create(
      'EGSDIGITAL',
      (base64Qr, asciiQR, attempts, urlCode) => {
        //console.log(asciiQR); // Opcional para registrar o QR no terminal
        var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
          response = {};

        if (matches.length !== 3) {
          return res.status(500).send('Erro ao processar o QR Code');
        }

        response.type = matches[1];
        response.data = new Buffer.from(matches[2], 'base64');

        // Envia o QR Code como resposta HTTP
        res.setHeader('Content-Type', response.type);
        res.send(response.data);
      },
      undefined,
      { logQR: false }
    )
    .then((client) => {
      start(client);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).send('Erro ao criar a sessão do WhatsApp');
    });
});

app.listen(3000, () => {
  console.log('Servidor Express está escutando no endereço http://192.168.0.40:3000');
});



function start(client) {
  
  console.log("Bot iniciado");
  client.onMessage((message) => {

     let now = Date()
     let mensagem = `Bem vindo a EGS DIGITAL 🕷 ${now}`;

      if (message.body === 'hi' && message.isGroupMsg === false){
          client
              .sendText(message.from, mensagem)               
              .then((result) => {
                  console.log('RESULTADO: ', result);
                  now = '';
              })
              .catch((erro) => {
                  console.error('Erro ao enviar: ', erro);
              });
      }

  });
}

