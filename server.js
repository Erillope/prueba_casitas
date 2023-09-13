const express = require('express');
const app = express();
const port = 3000; // Puedes cambiar el puerto según tus preferencias

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Servidor local en http://localhost:${port}`);
});
