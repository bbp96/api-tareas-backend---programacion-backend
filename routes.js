const express = require("express");
const router = express.Router();
const tareas = require("./data");

function generarId() {
  if (tareas.length === 0) return 1;
  const maxId = Math.max(...tareas.map((t) => t.id));
  return maxId + 1;
}

function validarTarea(body, esActualizacion = false) {
  if (!body || Object.keys(body).length === 0) {
    return { valido: false, mensaje: "No se enviaron datos en la peticion." };
  }

  const { titulo, descripcion, completada } = body;

  // Validaciones para la creacion de tareas (POST)
  if (!esActualizacion) {
    if (!titulo || String(titulo).trim() === "") {
      return { valido: false, mensaje: "El campo 'titulo' es obligatorio y no puede estar vacio." };
    }
    if (!descripcion || String(descripcion).trim() === "") {
      return { valido: false, mensaje: "El campo 'descripcion' es obligatorio y no puede estar vacio." };
    }
  }

  // Validacion para la actualizacion de tareas (PUT)
  if (esActualizacion && titulo === undefined && descripcion === undefined && completada === undefined) {
    return { valido: false, mensaje: "Debe enviar al menos un campo para modificar." };
  }
  if (titulo !== undefined && typeof titulo !== "string") {
    return { valido: false, mensaje: "El campo 'titulo' debe ser de tipo texto." };
  }
  if (descripcion !== undefined && typeof descripcion !== "string") {
    return { valido: false, mensaje: "El campo 'descripcion' debe ser de tipo texto." };
  }
  if (completada !== undefined && typeof completada !== "boolean") {
    return { valido: false, mensaje: "El campo 'completada' debe ser de tipo boolean (true o false)." };
  }

  return { valido: true, mensaje: null };
}

router.get("/", (req, res) => {
  res.status(200).json({
    exito: true,
    mensaje: "Lista de tareas obtenida correctamente.",
    datos: tareas
  });
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ exito: false, mensaje: "El ID debe ser un numero valido." });
  }

  const indice = tareas.findIndex((t) => t.id === id);

  if (indice === -1) {
    return res.status(404).json({ exito: false, mensaje: `No se encontro una tarea con el ID ${id}.` });
  }

  res.status(200).json({ exito: true, mensaje: "Tarea encontrada.", datos: tareas[indice] });
});

router.post("/", (req, res) => {
  const validacion = validarTarea(req.body, false);

  if (!validacion.valido) {
    return res.status(400).json({ exito: false, mensaje: validacion.mensaje });
  }

  const nuevaTarea = {
    id: generarId(),
    titulo: String(req.body.titulo).trim(),
    descripcion: String(req.body.descripcion).trim(),
    completada: typeof req.body.completada === "boolean" ? req.body.completada : false
  };

  tareas.push(nuevaTarea);
  res.status(201).json({ exito: true, mensaje: "Tarea creada exitosamente.", datos: nuevaTarea });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ exito: false, mensaje: "El ID debe ser un numero valido." });
  }

  const indice = tareas.findIndex((t) => t.id === id);

  if (indice === -1) {
    return res.status(404).json({ exito: false, mensaje: `No se encontro una tarea con el ID ${id}.` });
  }

  const validacion = validarTarea(req.body, true);

  if (!validacion.valido) {
    return res.status(400).json({ exito: false, mensaje: validacion.mensaje });
  }

  const { titulo, descripcion, completada } = req.body;

  if (titulo !== undefined) tareas[indice].titulo = String(titulo).trim();
  if (descripcion !== undefined) tareas[indice].descripcion = String(descripcion).trim();
  if (completada !== undefined) tareas[indice].completada = completada;

  res.status(200).json({ exito: true, mensaje: "Tarea actualizada exitosamente.", datos: tareas[indice] });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ exito: false, mensaje: "El ID debe ser un numero valido." });
  }

  const indice = tareas.findIndex((t) => t.id === id);

  if (indice === -1) {
    return res.status(404).json({ exito: false, mensaje: `No se encontro una tarea con el ID ${id}.` });
  }

  const eliminado = tareas.splice(indice, 1)[0];
  res.status(200).json({ exito: true, mensaje: "Tarea eliminada exitosamente.", datos: eliminado });
});

module.exports = router;
