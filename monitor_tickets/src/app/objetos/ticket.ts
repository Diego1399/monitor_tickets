export class Ticket {
    numero: string;
    asunto: string;
    descripcion: string;
    cliente: string;
    especialista: string;
    estado: string;
    impacto: string;
    fecha_solucion: string;
    fehca_estimada: string;

    constructor(
        numero: string,
        asunto: string,
        descripcion: string,
        cliente: string,
        especialista: string,
        estado: string,
        impacto: string,
        fecha_solucion: string,
        fehca_estimada: string,
    ) {  
        this.numero = numero;
        this.asunto = asunto;
        this.descripcion = descripcion;
        this.cliente = cliente
        this.especialista = especialista;
        this.estado = estado;
        this.impacto = impacto;
        this.fecha_solucion = fecha_solucion;
        this.fehca_estimada = fehca_estimada;
    }
}
