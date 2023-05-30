export class SmsDTO {
    idAssignment: number;
    idContatto: number;
    nomeContatto: string;
    numeroCellulare: string;
    dataInvio: string;
    _id: number;

    constructor(
        idAssignment: number,
        idContatto: number,
        nomeContatto: string,
        numeroCellulare: string,
        dataInvio: string,
        _id: number
    ) {
        this.idAssignment = idAssignment;
        this.idContatto = idContatto;
        this.nomeContatto = nomeContatto;
        this.numeroCellulare = numeroCellulare;
        this.dataInvio = dataInvio;
        this._id = _id;
    }
}