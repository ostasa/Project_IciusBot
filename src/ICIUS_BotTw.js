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
// Datos curiosos
const datosCuriosos = [
  'Los koalas duermen alrededor de 20 horas al día.',
  'El corazón de una ballena azul es tan grande que un humano podría nadar a través de sus arterias.',
  'Las abejas pueden reconocer rostros humanos.',
  'En Japón, existe una isla habitada casi exclusivamente por conejos.',
  'La miel nunca se echa a perder. Se han encontrado tarros de miel en tumbas egipcias que tienen miles de años y aún están buenos para comer.'
];

// Función para obtener un dato curioso aleatorio
function obtenerDatoCurioso() {
  const indice = Math.floor(Math.random() * datosCuriosos.length);
  return datosCuriosos[indice];
}

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
 if (message.toLowerCase() === 'Discord') {
  var disc=`https://discord.gg/BRNCXQF9t9`
    client.say(disc);
  }
  // Ejemplo: Responder "!hola" con un saludo
  if (message.toLowerCase() === 'hola') {
    client.say(channel, `¡Hola, ${tags.username}! ¿Cómo estás?`);
  }

   // Procesar el mensaje recibido
  // Ejemplo: Responder "!curiosidad" con un dato curioso
  if (message.toLowerCase() === '!curiosidad') {
    const datoCurioso = obtenerDatoCurioso();
    client.say(channel, datoCurioso);
  }
 
});

// Conectar el cliente al servidor de Twitch
client.connect();

