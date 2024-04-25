

export const generarID = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36)
    return fecha + random;
}


export function generarNumeroFactura() {
    const numeroAleatorio = Math.floor(Math.random() * 900) + 100; // Genera un número aleatorio de 3 dígitos
    const numeroFactura = `P${numeroAleatorio}`;
    return numeroFactura;
}

// Ejemplo de uso:
const numeroFactura = generarNumeroFactura();
console.log("Número de factura generado:", numeroFactura);




