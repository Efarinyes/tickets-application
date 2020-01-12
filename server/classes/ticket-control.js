const fs = require('fs');

class Ticket {

    constructor(numero, escriptori) {
        this.numero = numero;
        this.escriptori = escriptori;

    }
}



class TicketControl {

    constructor() {
        this.ultim = 0;
        this.avui = new Date().getDate();
        this.tickets = [];
        this.ultims4 = [];

        let data = require('../data/data.json');

        if (data.avui === this.avui) {
            this.ultim = data.ultim;
            this.tickets = data.tickets;
            this.ultims4 = data.ultims4;
        } else {
            this.reiniciaTikets();
        }
    }

    seguentTicket() {
        this.ultim += 1;

        let ticket = new Ticket(this.ultim, null);
        this.tickets.push(ticket);

        this.grabarArxiu();

        return `Ticket ${this.ultim}`;
    }

    getUltimTicket() {
        return `Ticket ${this.ultim}`;
    }

    getUltims4() {
        return this.ultims4;
    }

    atendreTicket(escriptori) {
        if (this.tickets.length === 0) {
            return 'No hi ha peticions per atendre';
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atendreTicket = new Ticket(numeroTicket, escriptori);

        this.ultims4.unshift(atendreTicket);

        if (this.ultims4.length > 4) {
            this.ultims4.splice(-1, 1); // borra la ultima posició d'un Array
        }
        console.log('Ultims 4');
        console.log(this.ultims4);

        this.grabarArxiu();
        return atendreTicket;
    }


    reiniciaTikets() {
        this.ultim = 0;
        console.log('Contadors inicialitzats');
        this.grabarArxiu();
        this.tickets = [];
        this.ultims4 = [];
    }

    grabarArxiu() {

        let jsonData = {
            ultim: this.ultim,
            avui: this.avui,
            tickets: this.tickets,
            ultims4: this.ultims4

        };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }
}

module.exports = {
    TicketControl
};