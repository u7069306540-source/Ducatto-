/*
  DUCATTO - GESTIÓN DE PREMIUM
  Las activaciones se hacen MANUALMENTE
  después de comprobar el pago.
*/

const PRECIO_PREMIUM = 7.99;


/* ================= USUARIOS ================= */

function obtenerUsuarios() {
  return JSON.parse(
    localStorage.getItem("ducattoUsuarios") || "[]"
  );
}


function guardarUsuarios(usuarios) {
  localStorage.setItem(
    "ducattoUsuarios",
    JSON.stringify(usuarios)
  );
}


/* ================= SOLICITUD PREMIUM ================= */

function solicitarPremium(nombreUsuario) {

  const usuario = nombreUsuario.trim();

  if (!usuario) {
    return {
      ok: false,
      mensaje: "Escribe tu nombre de usuario."
    };
  }

  const solicitudes = JSON.parse(
    localStorage.getItem(
      "ducattoSolicitudesPremium"
    ) || "[]"
  );

  const existe = solicitudes.find(
    s =>
      s.usuario.toLowerCase() ===
      usuario.toLowerCase()
  );

  if (
    existe &&
    existe.estado === "pendiente"
  ) {
    return {
      ok: false,
      mensaje: "Ya tienes una solicitud pendiente."
    };
  }

  solicitudes.push({
    usuario: usuario,
    precio: PRECIO_PREMIUM,
    fecha: new Date().toISOString(),
    estado: "pendiente"
  });

  localStorage.setItem(
    "ducattoSolicitudesPremium",
    JSON.stringify(solicitudes)
  );

  return {
    ok: true,
    mensaje:
      "Solicitud enviada. Se activará Premium después de comprobar el pago."
  };
}


/* ================= SOLICITUDES ================= */

function obtenerSolicitudesPremium() {

  return JSON.parse(
    localStorage.getItem(
      "ducattoSolicitudesPremium"
    ) || "[]"
  );

}


function guardarSolicitudesPremium(
  solicitudes
) {

  localStorage.setItem(
    "ducattoSolicitudesPremium",
    JSON.stringify(solicitudes)
  );

}


/* ================= ACTIVAR PREMIUM ================= */

function activarPremium(
  usuarioBuscado
) {

  const usuarios =
    obtenerUsuarios();

  let usuario =
    usuarios.find(
      u =>
        u.nombre.toLowerCase() ===
        usuarioBuscado.toLowerCase()
    );

  if (!usuario) {

    usuario = {
      nombre: usuarioBuscado,
      premium: false
    };

    usuarios.push(usuario);

  }

  usuario.premium = true;

  guardarUsuarios(
    usuarios
  );


  const solicitudes =
    obtenerSolicitudesPremium();


  solicitudes.forEach(
    solicitud => {

      if (
        solicitud.usuario.toLowerCase() ===
        usuarioBuscado.toLowerCase()
      ) {

        solicitud.estado =
          "aprobada";

      }

    }
  );


  guardarSolicitudesPremium(
    solicitudes
  );


  return true;

}


/* ================= RECHAZAR PREMIUM ================= */

function rechazarPremium(
  usuarioBuscado
) {

  const solicitudes =
    obtenerSolicitudesPremium();


  solicitudes.forEach(
    solicitud => {

      if (
        solicitud.usuario.toLowerCase() ===
        usuarioBuscado.toLowerCase()
      ) {

        solicitud.estado =
          "rechazada";

      }

    }
  );


  guardarSolicitudesPremium(
    solicitudes
  );


  return true;

}


/* ================= QUITAR PREMIUM ================= */

function quitarPremium(
  usuarioBuscado
) {

  const usuarios =
    obtenerUsuarios();


  const usuario =
    usuarios.find(
      u =>
        u.nombre.toLowerCase() ===
        usuarioBuscado.toLowerCase()
    );


  if (!usuario) {
    return false;
  }


  usuario.premium = false;


  guardarUsuarios(
    usuarios
  );


  return true;

}


/* ================= COMPROBAR PREMIUM ================= */

function tienePremium(
  usuarioBuscado
) {

  const usuarios =
    obtenerUsuarios();


  const usuario =
    usuarios.find(
      u =>
        u.nombre.toLowerCase() ===
        usuarioBuscado.toLowerCase()
    );


  return usuario
    ? usuario.premium === true
    : false;

}