/*
=========================================
    DUCATTO - ACCESO PREMIUM
=========================================
👑 LA JEFA
Escribe aquí el nombre de usuario de la
cuenta de la propietaria.
⭐ CLIENTES PREMIUM
Cuando recibas un pago, añade aquí el
nombre de usuario del cliente.
=========================================
*/
const USUARIO_JEFA = "jefa";
const usuariosPremium = [
    // Ejemplos:
    // "cliente1",
    // "cliente2"
];
/*
=========================================
    COMPROBAR PREMIUM
=========================================
*/
function tieneAccesoPremium(usuario) {
    if (!usuario) {
        return false;
    }
    const nombre =
        usuario.trim().toLowerCase();
    /*
    👑 LA JEFA SIEMPRE TIENE PREMIUM
    */
    if (
        nombre ===
        USUARIO_JEFA.toLowerCase()
    ) {
        return true;
    }
    /*
    ⭐ CLIENTES QUE HAN PAGADO
    */
    return usuariosPremium.some(
        function(nombrePremium) {
            return (
                nombrePremium
                    .trim()
                    .toLowerCase() === nombre
            );
        }
    );
}