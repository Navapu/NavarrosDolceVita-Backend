/**
 * ResponseAPI Helper Function
 * Función auxiliar ResponseAPI
 * 
 * Construye un objeto de respuesta estándar para que todas las respuestas
 * de la API tengan la misma estructura consistente:
 * - msg: mensaje (string)
 * - data: datos (array o cualquier tipo)
 * - status: "error" si error es true, sino "ok"
 * 
 * Builds a standard response object so all API responses
 * share a consistent structure:
 * - msg: message (string)
 * - data: data (array or any type)
 * - status: "error" if error is true, otherwise "ok"
 */
export const ResponseAPI = ({ msg = "", data = [], error = false }) => {
    return {
        msg,
        data,
        status: error ? "ok" : "error"
    };
};