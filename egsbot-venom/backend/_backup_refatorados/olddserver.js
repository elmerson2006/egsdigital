const venom = require('venom-bot');
const qrcode = require('qrcode');
const express = require('express');
const app = express();
const http = require('http').createServer(app);

let venomClient;

venom
  .create({
    session: 'EGS DIGITAL',
    browserArgs: ['--no-sandbox'], // Adicione esta linha para corrigir problemas com sandbox no Linux
  })
  .then((client) => {
    venomClient = client;
    start(client);
    // Gere o QR code e envie-o para o frontend
    client.onStateChange((state) => {
      if (state === 'qrReadSuccess') {
        generateQrCode(client.browserWSEndpoint);
      }
    });
  })
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result) => {
          console.log('Result: ', result);
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro);
        });
    }
  });
}

function generateQrCode(browserWSEndpoint) {
  qrcode.toDataURL(browserWSEndpoint, (err, url) => {
    if (err) {
      console.error('Error generating QR code:', err);
      return;
    }
    // Aqui você pode enviar a URL do QR code para o frontend
    app.get('/qrcode', (req, res) => {
      res.send(`<img src="${url}" alt="QR Code">`);
    });

    const port = 3000;
    http.listen(port, () => {
      console.log(`Servidor escutando na porta ${port}`);
    });
  });
}
