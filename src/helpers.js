


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



export const formatearDinero =  (valor) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return formatter.format(valor);
}


export function formatDateToUS(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses en JavaScript son 0-11
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}


// let arreglodePagos = []
// let invoicesArreays = []
// let updatedsTatus = ''

// let customers = []
// let name = ''
// let invoiceSelectedName = ''
// let idSelected = ''



export async function actualizarInvoices() {
    try {
        const respuesta = await fetch(`http://localhost:1337/api/customers?populate=*`);
        const list = await respuesta.json();
        const customers = list.data;
    
        const url = `http://localhost:1337/api/invoices`;
        const respuesta1 = await fetch(url);
        const result2 = await respuesta1.json();
        const invoicesArreays = result2.data;
    
        const respuesta2 = await fetch('http://localhost:1337/api/charges');
        const resultado = await respuesta2.json();
        
        // Procesa los pagos
        const arregloCompuesto = []; 

        resultado.data.forEach((payment) => {
            const invoicesTopay = payment.attributes.payments[0]?.invoicesTopay || {}; // Si no hay facturas
            
            // Recorre solo las facturas seleccionadas
            Object.keys(invoicesTopay).forEach(invoiceId => {
                const invoice = invoicesArreays.find(inv => inv.id === parseInt(invoiceId));
                
                if (invoice) {
                    // Asegúrate de que `charges` tenga el formato esperado
                    if (!invoice.attributes.charges || invoice.attributes.charges.length < 2) {
                        console.warn(`Factura ${invoiceId} no tiene los datos esperados en 'charges'.`);
                        return; // Saltar esta factura si no tiene los datos correctos
                    }

                    const invoiceObj = invoice.attributes.charges[1];
                    const { customerName, dueDate, invoiceNumber, issueDate, openbalance, total, type } = invoiceObj;
                    const paymentAmout = invoicesTopay[invoiceId];
                    let newOpenBalance = Math.max(0, openbalance - paymentAmout);
                    
                    // Determina el estado de la factura
                    let updatedsTatus = 'OPEN';
                    if (newOpenBalance === 0) {
                        updatedsTatus = 'PAID';
                    } else if (newOpenBalance > 0 && newOpenBalance < total) {
                        updatedsTatus = 'PARTIAL';
                    }

                    // Encuentra el cliente correspondiente
                    let idSelected = customers.find(customer => customer.attributes.name === customerName)?.id || null;
                    
                    const invoiceUpdatedObj = { idSelected, invoiceId, customerName, dueDate, invoiceNumber, issueDate, newOpenBalance, total, type, updatedsTatus };
                    arregloCompuesto.push({ ...invoiceUpdatedObj, charges: invoice.attributes.charges[0] });

                    // Depuración adicional
                    console.log(`Preparando para actualizar factura ID: ${invoiceId}, nuevo balance: ${newOpenBalance}, estado: ${updatedsTatus}`);
                } else {
                    console.warn(`Factura con ID: ${invoiceId} no encontrada en el arreglo de facturas.`);
                }
            });
        });

        // Actualiza solo las facturas seleccionadas
        await updateInvoiceAMount(arregloCompuesto);

    } catch (error) {
        console.log(error);
    }
}

async function updateInvoiceAMount(arregloCompuesto) {
    for (let element of arregloCompuesto) {
        console.log(`Actualizando factura ID: ${element.invoiceId} para cliente ID: ${element.idSelected}`);
        
        const respuesta = await fetch(`http://localhost:1337/api/invoices/${element.invoiceId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    customer: element.idSelected,
                    charges: [
                        element.charges,
                        { 
                            type: 'invoice',
                            customerName: element.customerName,
                            issueDate: element.issueDate,
                            dueDate: element.dueDate,
                            total: element.total,
                            openbalance: element.newOpenBalance,
                            invoiceNumber: element.invoiceNumber,
                            invoiceStatus: element.updatedsTatus
                        },
                    ],
                },
            }),
        });

        if (!respuesta.ok) {
            console.error(`Error updating invoice ${element.invoiceId}:`, respuesta.statusText);
        } else {
            console.log(`Invoice ${element.invoiceId} updated successfully.`);
        }
    }
}








