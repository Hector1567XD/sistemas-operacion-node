const express = require('express');
const { spawn } = require('child_process');
const app = express();

app.get('/cpp-program', (req, res) => {
  const jsonInput = JSON.stringify({
    type: 1,
    userId: "1006",
    message: "pong"
  }) + '\n';

  const cppInstance = spawn('./main');
  cppInstance.stdin.write(objeto_json_string);

  cppInstance.stdout.on('data', (data) => {
    res.send(data.toString());
  });

  // Manejar los errores del proceso hijo
  cppInstance.on('error', (error) => {
    console.error(`Error al ejecutar el programa de C++: ${error}`);
    res.status(500).send('Error interno del servidor');
  });

  cppInstance.on('exit', (code) => {
    if (code !== 0) {
      console.error(`El programa de C++ finalizó con un código de salida distinto de cero: ${code}`);
      res.status(500).send('Error interno del servidor');
    }
  });
});

app.listen(3000, () => {
  console.log('El servidor está escuchando en el puerto 3000');
});
