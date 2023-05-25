const tmi = require('tmi.js');

// Configuración del cliente de Twitch
const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: 'ICIUS_Bot',
    password: 'oauth:kzhfy417d48b0f80cd6a9k6opzp1xo' // Genera un token en https://twitchapps.com/tmi/
  },
  channels: ['oscar2325_'] // Puedes añadir varios canales separados por comas
});

// Lista de palabras malsonantes
const palabrasMalsonantes = ['Maricon', 'Puta', 'Gilipollas']; // Añade las palabras que desees detectar

// Función para verificar si un mensaje contiene palabras malsonantes
function contienePalabrasMalsonantes(message) {
  const palabras = message.toLowerCase().split(' ');
  return palabras.some(palabra => palabrasMalsonantes.includes(palabra));
}

// Evento de conexión del cliente
client.on('connected', () => {
  console.log('Bot de Twitch conectado exitosamente');
});

// Evento de recepción de mensajes de chat
client.on('message', (channel, tags, message, self) => {
  if (self) return; // Ignorar los mensajes propios del bot

  // Verificar si el mensaje contiene palabras malsonantes
  if (contienePalabrasMalsonantes(message)) {
    client.say(channel, `¡Cuidado con esa boca, ${tags.username}!`);
    return; // Salir de la función para no procesar más el mensaje
  }

  // Procesar el mensaje recibido
  // Aquí puedes añadir la lógica de tu bot y responder a los comandos

  // Ejemplo: Responder "!hola" con un saludo
  if (message.toLowerCase() === '!hola') {
    client.say(channel, `¡Hola, ${tags.username}! ¿Cómo estás?`);
  }d
});

// Conectar el cliente al servidor de Twitch
client.connect();
