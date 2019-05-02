const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://empresajr:ej2019@cluster0-mvxgj.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log('Conectado ao banco de dados!');
});

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão: '+ err);
});

mongoose.connection.on('disconnect', () => {
    console.log('Desconectado :(');
});

