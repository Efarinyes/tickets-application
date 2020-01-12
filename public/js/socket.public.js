var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscriptoris = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];




socket.on('estatActual', function(resp) {
    // console.log(resp);

    actualitzarHTML(resp.ultims4);
});

socket.on('ultims4', function(data) {
    // console.log(data);


    actualitzarHTML(data.ultims4);

    //  var audio = new Audio('audio/new-ticket.mp3');
    //  audio.play();
});

function actualitzarHTML(ultims4) {
    for (var i = 0; i <= ultims4.length - 1; i++) {
        lblTickets[i].text('Ticket: ' + ultims4[i].numero);
        lblEscriptoris[i].text('Escriptori: ' + ultims4[i].escriptori);
    }
}



// comprobem que l'usuari estigui conectat i la comunicacio amb el servidor

socket.on('connect', function() {
    console.log('Estem conectats al servidor');
});

socket.on('disconnect', function() {
    console.log('No estem conectats al servidor');
});