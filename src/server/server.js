const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
 
 
const app = express();
app.use(cors());
app.use(express.json());
 
  
// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'zona012',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use((req, res, next) => {
  req.mysqlPool = pool;
  next();
});

app.get('/', async (req, res) => {
  try {
    const connection = await req.mysqlPool.getConnection();
    console.log('Conexión exitosa a la base de datos');
    connection.release();
    res.send('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    res.status(500).send('Error al conectar a la base de datos');
  }
});

// Ruta para insertar datos desde el formulario
app.post('/insertar-datossss', async (req, res) => {
    try {
      const { dato } = req.body; 
      const connection = await req.mysqlPool.getConnection();
      await connection.query('INSERT INTO yo (dato) VALUES (?)', [dato]);
      connection.release();
      res.status(200).send('Dato insertado correctamente en la base de datos');
    } catch (error) {
      console.error('Error al insertar dato en la base de datos:', error);
      res.status(500).send('Error al insertar dato en la base de datos');
    }
  });
  
  app.get('/plantel', async (req, res) => {
    try {
      const query = 'SELECT id, nombre FROM plantel';  
      const connection = await req.mysqlPool.getConnection();
      const [results] = await connection.execute(query); 
      const options = results.map(result => ({
        value: result.id,
        label: result.nombre
      }));
      connection.release(); 
      res.json(options);
    } catch (error) {
      console.error('Error al obtener datos del plantel:', error);
      res.status(500).json({ error: 'Error al obtener datos del plantel' });
    }
  });

  app.get('/sesiones', async (req, res) => {
    try {
      const query = 'SELECT id, tipo_sesion FROM sesion'; 
      const connection = await req.mysqlPool.getConnection();
      const [results] = await connection.execute(query);
      const options = results.map(result => ({
        value: result.id,
        label: result.tipo_sesion
      }));
      connection.release();
      res.json(options);
    } catch (error) {
      console.error('Error al obtener datos de sesiones:', error);
      res.status(500).json({ error: 'Error al obtener datos de sesiones' });
    }
  });

  app.get('/preguntas-secretas', async (req, res) => {
    try {
      const query = 'SELECT id, tipo_pregunta FROM pregunta';
      const connection = await req.mysqlPool.getConnection();
      const [results] = await connection.execute(query);
      const options = results.map(result => ({
        value: result.id,
        label: result.tipo_pregunta
      }));
      connection.release();
      res.json(options);
    } catch (error) {
      console.error('Error al obtener datos de preguntas secretas:', error);
      res.status(500).json({ error: 'Error al obtener datos de preguntas secretas' });
    }
  });
  
  app.post('/verificar-telefono', async (req, res) => {
    try {
        const { telefono } = req.body;
        const connection = await req.mysqlPool.getConnection();
        const query = 'SELECT COUNT(*) as count FROM registro WHERE telefono = ?';
        const [results] = await connection.execute(query, [telefono]);
        connection.release();
        const exists = results[0].count > 0;
        res.json({ exists });
    } catch (error) {
        console.error('Error al verificar la existencia del teléfono en la base de datos:', error);
        res.status(500).json({ error: 'Error al verificar la existencia del teléfono en la base de datos' });
    }
});

  app.post('/verificar-curp', async (req, res) => {
    try {
        const { curp } = req.body;
        const connection = await req.mysqlPool.getConnection();
        const query = 'SELECT COUNT(*) as count FROM registro WHERE curp = ?';
        const [results] = await connection.execute(query, [curp]);
        connection.release();
        const exists = results[0].count > 0;
        res.json({ exists });
    } catch (error) {
        console.error('Error al verificar la existencia de la CURP en la base de datos:', error);
        res.status(500).json({ error: 'Error al verificar la existencia de la CURP en la base de datos' });
    }
});
 
app.post('/insertar-dato', async (req, res) => {
  try {
      const {
          curp,
          plantel,
          sesion,
          nombre,
          aPaterno,
          aMaterno,
          telefono,
          pregunta,
          respuesta,
          contrasena
      } = req.body;
      const connection = await req.mysqlPool.getConnection();
      try {
          // Cifrar la contraseña antes de almacenarla en la base de datos
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
          // Cifrar la respuesta antes de almacenarla en la base de datos
          const hashedRespuesta = await bcrypt.hash(respuesta, saltRounds);
          const query = `
              INSERT INTO registro 
                  (curp, plantel, sesion, nombre, aPaterno, aMaterno, telefono, pregunta, respuesta, contrasena)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;
          await connection.execute(query, [curp, plantel, sesion, nombre, aPaterno, aMaterno, telefono, pregunta, hashedRespuesta, hashedPassword]);
          res.status(200).send('Registro exitoso');
      } finally {
          connection.release();
      }
  } catch (error) {
      console.error('Error al insertar dato en la base de datos:', error);
      res.status(500).send('Error al insertar dato en la base de datos');
  }
});
 
 

app.post('/login', async (req, res) => {
  try {
    const { curp, contrasena } = req.body;
    console.log('Datos de inicio de sesión recibidos en el backend:', { curp });
    const connection = await req.mysqlPool.getConnection();

    try {
      const query = 'SELECT * FROM registro WHERE curp = ?';
      const [results] = await connection.execute(query, [curp]);

      if (results.length > 0) {
        const user = results[0];
        const hashedPassword = user.contrasena;
        const match = await bcrypt.compare(contrasena, hashedPassword);

        if (match) {
          // Verifica el rol del usuario
          const userRole = user.sesion; // Cambiado a 'sesion'
          let roleName = '';

          if (userRole === 1) {
            roleName = 'Rol 1';
          } else if (userRole === 2) {
            roleName = 'Rol 2';
          } else if (userRole === 3) {
            roleName = 'Rol 3';
          } else {
            roleName = 'Otro Rol';
          }

          console.log(`Inicio de sesión exitoso. Rol: ${roleName}`);
          res.json({ success: true, role: userRole, roleName: roleName });

        } else {
          console.log('Inicio de sesión fallido: Contraseña incorrecta');
          res.json({ success: false, message: 'Contraseña incorrecta' });
        }
      } else {
        console.log('Inicio de sesión fallido: Usuario no encontrado');
        res.json({ success: false, message: 'La CURP no está registrada' });
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error al procesar solicitud de inicio de sesión:', error);
    res.status(500).json({ success: false, message: 'Error al procesar solicitud de inicio de sesión' });
  }
});


app.get('/obtener-nombre/:curp', async (req, res) => {
  try {
    const { curp } = req.params;
    const connection = await req.mysqlPool.getConnection();
    
    const query = 'SELECT nombre, aPaterno, aMaterno FROM registro WHERE curp = ?';
    const [results] = await connection.execute(query, [curp]);

    connection.release();

    if (results.length > 0) {
      const { nombre, aPaterno, aMaterno } = results[0];
      res.json({ nombre, aPaterno, aMaterno });
    } else {
      res.status(404).json({ error: 'No se encontraron datos para la CURP proporcionada' });
    }
  } catch (error) {
    console.error('Error al obtener nombre desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener nombre desde la base de datos' });
  }
});

 
app.get('/obtener-telefono/:curp', async (req, res) => {
  try {
    const { curp } = req.params;
    const connection = await req.mysqlPool.getConnection();
    
    const query = 'SELECT telefono FROM registro WHERE curp = ?';
    const [results] = await connection.execute(query, [curp]);

    connection.release();

    if (results.length > 0) {
      const {telefono} = results[0];
      res.json({ telefono});
    } else {
      res.status(404).json({ error: 'No se encontraron datos para la CURP proporcionada' });
    }
  } catch (error) {
    console.error('Error al obtener nombre desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener nombre desde la base de datos' });
  }
});

app.get('/obtener-pregunta/:curp', async (req, res) => {
  try {
    const { curp } = req.params;
    const connection = await req.mysqlPool.getConnection();
    
    const query = 'SELECT pregunta FROM registro WHERE curp = ?';
    const [results] = await connection.execute(query, [curp]);

    connection.release();

    if (results.length > 0) {
      const { pregunta } = results[0];
      res.json({ pregunta: pregunta });
    } else {
      res.status(404).json({ error: 'No se encontraron datos para la CURP proporcionada' });
    }
  } catch (error) {
    console.error('Error al obtener nombre desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener nombre desde la base de datos' });
  }
});
 
app.get('/obtener-tipo-pregunta/:pregunta', async (req, res) => {
  try {
    const { pregunta } = req.params;
    const connection = await req.mysqlPool.getConnection();
    
    const preguntaQuery = 'SELECT tipo_pregunta FROM pregunta WHERE id = ?'; // Ajusta la consulta según tu esquema de base de datos
    const [preguntaResults] = await connection.execute(preguntaQuery, [pregunta]);

    connection.release();

    if (preguntaResults.length > 0) {
      const { tipo_pregunta } = preguntaResults[0];
      res.json({ tipo_pregunta: tipo_pregunta });
    } else {
      res.status(404).json({ error: 'No se encontraron datos para la pregunta proporcionada en la tabla pregunta' });
    }
  } catch (error) {
    console.error('Error al obtener tipo de pregunta desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener tipo de pregunta desde la base de datos' });
  }
});



 
app.post('/recuperar-contrasena', async (req, res) => {
  try {
      const { curp, respuesta } = req.body;
      console.log('Datos de recuperación de contraseña:', { curp, respuesta });

      const connection = await req.mysqlPool.getConnection();

      try {
          // Verificar la existencia de la CURP y obtener la respuesta almacenada
          const checkExistenceQuery = 'SELECT respuesta FROM registro WHERE curp = ?';
          const [existenceResults] = await connection.execute(checkExistenceQuery, [curp]);

          if (existenceResults.length === 0) {
              connection.release();
              return res.status(404).json({ error: 'La CURP no está registrada' });
          }

          const storedRespuesta = existenceResults[0].respuesta;

          // Verificar que la respuesta coincida
          const matchRespuesta = await bcrypt.compare(respuesta, storedRespuesta);

          if (!matchRespuesta) {
              connection.release();
              console.log('La respuesta no es correcta');
              return res.status(401).json({ error: 'La respuesta no es correcta. Por favor, inténtelo de nuevo.' });
          }

          // Devolver una respuesta exitosa si la verificación es exitosa
          res.json({ success: true });

      } finally {
          connection.release();
      }
  } catch (error) {
      res.status(500).json({ error: 'Error al procesar solicitud de recuperación de contraseña' });
  }
});
    

app.post('/actualizar-contrasena', async (req, res) => {
  try {
    const { curp, nuevaContrasena } = req.body;

    const connection = await req.mysqlPool.getConnection();

    try {
      // Cifrar la nueva contraseña antes de almacenarla en la base de datos
      const saltRounds = 10;
      const hashedNuevaContrasena = await bcrypt.hash(nuevaContrasena, saltRounds);

      // Actualizar la contraseña en la base de datos con la nueva contraseña cifrada
      const updateQuery = 'UPDATE registro SET contrasena = ? WHERE curp = ?';
      await connection.execute(updateQuery, [hashedNuevaContrasena, curp]);

      // Log de depuración
      console.log('Contraseña actualizada exitosamente.');

      // Devolver una respuesta exitosa
      res.json({ success: true, message: 'Contraseña actualizada exitosamente' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error al procesar solicitud de actualización de contraseña:', error);
    res.status(500).json({ error: 'Error al procesar solicitud de actualización de contraseña' });
  }
});

  

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
