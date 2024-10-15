export class Mensaje {
    emisor: string;
    texto: string;
    fecha: string;

    constructor(emisor: string, texto: string, fecha: string) {
        this.emisor = emisor;
        this.texto = texto;
        this.fecha = fecha;
    }
}