const venom = require('venom-bot');
const initializeAppBot = require('../api/initializeAppBot'); // Importa o mudolo para inicializar o bot

module.exports = app => {

const { initializeWhatsAppBot, start } = initializeAppBot(app); // Desestruture do objeto exportado


// refatora codigo para rotas dinamicas.
app.get('/qrcode-sales', (req, res) => {
  initializeWhatsAppBot('sales', req, res);
     });
      
app.get('/qrcode-support', (req, res) => {
  initializeWhatsAppBot('support', req, res);
      });    

app.get('/', (req, res) => {
    res.send('Backend executando ...');
});
};
