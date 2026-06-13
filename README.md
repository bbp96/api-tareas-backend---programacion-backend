API de Tareas (To-Do API)

API RESTful construida con Node.js y Express.js que permite gestionar tareas mediante operaciones CRUD (Crear, Leer, Actualizar y Eliminar).

Los datos se almacenan en memoria dentro de un archivo JavaScript externo "data.js", sin necesidad de base de datos ni autenticación.

1. Estructura del proyecto

encargo-semana-4/
── index.js → Servidor principal (configuracion y arranque de Express)
── routes.js → Definicion de rutas y logica CRUD
── data.js → Array de tareas (datos en memoria)
── package.json → Configuracion del proyecto y dependencias
── .gitignore → Archivos excluidos del repositorio
── README.md → Documentacion (este archivo)

2. Instalacion y ejecucion

- Requisitos previos:

Node.js: https://nodejs.org/

- Pasos:

  2.1 Clonar el repositorio:

git clone <URL_DEL_REPOSITORIO>
cd encargo-semana-4

2.2 Instalar dependencias:

npm install

2.3 Ejecutar el servidor:

npm start

El servidor se iniciara en: http://localhost:3000

2.4 Modo desarrollo:

npm run dev

3. Flujo de la aplicacion:

   Cliente
   │
   index.js → Recibe la peticion HTTP
   │ - Parsea el body JSON
   │ - Monta las rutas bajo /tareas
   routes.js → Procesa la ruta y el metodo HTTP
   │ - Valida los datos de entrada
   │ - Ejecuta la operacion CRUD
   │ - Retorna respuesta JSON
   data.js → Array de tareas en memoria - Fuente de datos (se resetea al reiniciar)

4. Modelo de datos:

Cada tarea tiene la siguiente estructura:

| Campo       | Tipo    | Obligatorio | Descripcion                        |
| ----------- | ------- | ----------- | ---------------------------------- |
| id          | number  | Auto        | Identificador unico (autogenerado) |
| titulo      | string  | Sí          | Nombre de la tarea                 |
| descripcion | string  | Sí          | Detalle de la tarea                |
| completada  | boolean | No          | Estado (por defecto: false)        |

5. Pruebas:

5.1 GET - Listar todas las tareas:

Peticion:

curl http://localhost:3000/tareas

Respuesta (200 OK):

{
"exito": true,
"mensaje": "Lista de tareas obtenida correctamente.",
"datos": [
{
id: 1,
titulo: "Tarea numero 1",
descripcion: "Estudiar ingenieria de software",
completada: false
},
{
id: 2,
titulo: "Tarea numero 2",
descripcion: "Estudiar programacion backend",
completada: false
},
{
id: 3,
titulo: "Tarea numero 3",
descripcion: "Estudiar seguridad en base de datos",
completada: true
}
]
}

5.2 GET - Obtener una tarea por ID:

Peticion:

curl http://localhost:3000/tareas/1

Respuesta (200 OK):

{
"exito": true,
"mensaje": "Tarea encontrada.",
"datos": {
"id": 1,
"titulo": "Tarea numero 1",
"descripcion": "Estudiar ingenieria de software",
"completada": false
}
}

Error - Tarea no encontrada (404):

curl http://localhost:3000/tareas/999

{
"exito": false,
"mensaje": "No se encontro una tarea con el ID 999."
}

5.3 POST - Crear una nueva tarea:

Peticion:

curl -X POST http://localhost:3000/tareas \
 -H "Content-Type: application/json" \
 -d '{"titulo": "Escribir README", "descripcion": "Documentar la API con ejemplos de uso"}'

Respuesta (201 Created):

{
"exito": true,
"mensaje": "Tarea creada exitosamente.",
"datos": {
"id": 4,
"titulo": "Escribir README",
"descripcion": "Documentar la API con ejemplos de uso",
"completada": false
}
}

Error - Campo obligatorio faltante (400):

curl -X POST http://localhost:3000/tareas \
 -H "Content-Type: application/json" \
 -d '{"descripcion": "Falta el titulo"}'

{
"exito": false,
"mensaje": "El campo 'titulo' es obligatorio y no puede estar vacio."
}

5.4 PUT - Actualizar una tarea existente:

Peticion:

curl -X PUT http://localhost:3000/tareas/1 \
 -H "Content-Type: application/json" \
 -d '{"titulo": "Estudiar la nueva semana de ingenieria de software", "completada": true}'

Respuesta (200 OK):

{
"exito": true,
"mensaje": "Tarea actualizada exitosamente.",
"datos": {
"id": 1,
"titulo": "Estudiar la nueva semana de ingenieria de software",
"descripcion": "Estudiar ingenieria de software",
"completada": true
}
}

Error - Tipo de dato invalido (400):

curl -X PUT http://localhost:3000/tareas/1 \
 -H "Content-Type: application/json" \
 -d '{"completada": "si"}'

{
"exito": false,
"mensaje": "El campo 'completada' debe ser de tipo boolean (true o false)."
}

---

6. DELETE - Eliminar una tarea:

Peticion:

curl -X DELETE http://localhost:3000/tareas/3

Respuesta (200 OK):

{
"exito": true,
"mensaje": "Tarea eliminada exitosamente.",
"datos": {
"id": 3,
"titulo": "Tarea numero 3",
"descripcion": "Estudiar seguridad en base de datos",
"completada": true
}
}

Error - Tarea no encontrada (404):

curl -X DELETE http://localhost:3000/tareas/999

{
"exito": false,
"mensaje": "No se encontro una tarea con el ID 999."
}

7. Resumen de codigos HTTP

| Codigo | Significado | Cuando se usa                              |
| ------ | ----------- | ------------------------------------------ |
| 200    | OK          | GET, PUT y DELETE exitosos                 |
| 201    | Created     | POST exitoso (recurso creado)              |
| 400    | Bad Request | Faltan campos obligatorios o tipo invalido |
| 404    | Not Found   | El ID solicitado no existe en el array     |

8. Tecnologias utilizadas

- Node.js: Entorno de ejecucion de JavaScript en el servidor
- Express.js: Framework minimalista para crear APIs web

9. Autor

Benjamin Brante

Programacion Back End
2026
