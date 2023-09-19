const fs = require('fs');
const venom = require('venom-bot');
const express = require('express');
const app = express();

app.get('/qrcode-sales', (req, res) => {
  initializeWhatsAppBot('sales', req, res);
});

app.get('/qrcode-support', (req, res) => {
  initializeWhatsAppBot('support', req, res);
});

app.listen(3000, () => {
  console.log('Servidor Express está escutando no endereço http://192.168.0.40:3000');
});

function initializeWhatsAppBot(botType, req, res) {
  venom
    .create(
      botType, // 'vendas' ou 'suporte' dependendo do tipo de bot
       (base64Qr, asciiQR, attempts, urlCode) => {
        console.log(asciiQR); // Opcional para registrar o QR no terminal
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
      start(client, botType);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).send(`Erro ao criar a sessão do WhatsApp para o bot ${botType}`);
    });
}

function start(client, botType) {
  console.log(`Bot ${botType} iniciado`);
  client.onMessage((message) => {
    let now = Date();
    let mensagem = `Bem vindo a EGS DIGITAL 🕷 ${now}`;
    // evoluir codigo para tratar mensagens :: 180920232207
    if (message.body === 'hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, mensagem)
        .then((result) => {
          console.log(`RESULTADO do Bot ${botType}:`, result);
          
        })
        .catch((erro) => {
          console.error(`Erro ao enviar do Bot ${botType}:`, erro);
        });
    }
  });
}
