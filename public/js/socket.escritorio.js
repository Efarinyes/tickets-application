var socket = io();

var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escriptori')) {
    window.location = 'index.html';
    throw new Error('Escriptori es necessari');
}

var escriptori = searchParams.get('escriptori');
var label = $('small');




console.log(escriptori);

$('h1').text('Escriptori: ' + escriptori);

$('button').on('click', function() {
    socket.emit('atendreTicket', { escriptori: escriptori }, function(resp) {

        if (resp === 'No hi ha peticions per atendre') {
            label.text(resp);
            alert(resp);
            return;
        }

        label.text('Ticket num: ' + resp.numero);

    });
});

// comprobem que l'usuari estigui conectat i la comunicacio amb el servidor

socket.on('connect', function() {
    console.log('Estem conectats al servidor');
});

socket.on('disconnect', function() {
    console.log('No estem conectats al servidor');
});