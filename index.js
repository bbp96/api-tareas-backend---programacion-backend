const express = require("express");
const tareasRouter = require("./routes");

const app = express();
const PUERTO = process.env.PORT || 3000;

app.use(express.json());

app.use("/tareas", tareasRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    exito: true,
    mensaje: "API de Tareas activa. Usa /tareas para interactuar con los recursos.",
    rutas_disponibles: {
      "GET /tareas": "Listar todas las tareas",
      "GET /tareas/:id": "Obtener tarea por ID",
      "POST /tareas": "Crear nueva tarea",
      "PUT /tareas/:id": "Actualizar una tarea",
      "DELETE /tareas/:id": "Eliminar una tarea"
    }
  });
});

app.listen(PUERTO, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PUERTO}`);
});