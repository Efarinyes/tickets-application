var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Estem conectats al servidor');
});

socket.on('disconnect', function() {
    console.log('No estem conectats al servidor');
});

socket.on('estatActual', function(resp) {
    console.log(resp);
    label.text(resp.actual);
});

$('button').on('click', function() {
    socket.emit('seguentTicket', null, function(seguentTicket) {
        label.text(seguentTicket);
    });
});