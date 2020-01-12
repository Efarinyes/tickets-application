const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

let ticketControl = new TicketControl();

io.on('connection', (client) => {
    client.on('seguentTicket', (data, callback) => {
        let proxim = ticketControl.seguentTicket();
        console.log(proxim);
        callback(proxim);
    });
    client.emit('estatActual', {
        actual: ticketControl.getUltimTicket(),
        ultims4: ticketControl.getUltims4()
    });

    client.on('atendreTicket', (data, callback) => {
        if (!data.escriptori) {
            return callback({
                err: true,
                missatge: 'Cal assignar un escriptori al ticket'
            });
        }
        let atendreTicket = ticketControl.atendreTicket(data.escriptori);

        callback(atendreTicket);
        client.broadcast.emit('ultims4', {
            ultims4: ticketControl.getUltims4()
        });
    });

});