var ws
var tm_array = []
var local_client_name = '[CLIENT' + Math.floor(Math.random() * 100) + ']'
var data_prec = ''
//const url_server = 'ws://127.0.0.1:5000'
const url_server = 'wss://curious-wealthy-pigment.glitch.me/'
//const url_server = 'wss://simple-websocket-server-echo.glitch.me/'

function init() {
    stage(2)
    $('#stage_1').text('Riconnettiti al server')
    $('#stage_3').text('Consol_log -> ' + local_client_name)

    ws = new WebSocket(url_server);

    ws.onopen = () => {
        aggiorna_stato('-> [SERVER]', 'open')
        ws.send('HandShake: ' + local_client_name)
        stage(3)
    }
    ws.onclose = () => {
        stage(1)
        $('span.console_name').each(function () { light($(this).attr('id'), 'close') });
        alert('La connessione è stata interrotta, ricollegati.')
    }

    ws.onerror = () => { console.error('Errore di connessione al server at -> ' + url_server) }

    ws.onmessage = function (event) {
        msg = event.data

        if (msg == '__ping__') ws.send('__pong__')
        else {
            var sender = msg.split(':')[0]

            if (msg.indexOf('Clients connected') > 0) aggiorna_stato(msg, 'open')
            if (msg.indexOf('Client disconnected') > 0) aggiorna_stato(msg, 'close')

            post_msg(msg, sender)
        }
    }
}


function post_msg(msg, sender) {
    var console_ = document.getElementById(sender)

    if (console_.value == "") console_.value = msg;
    else console_.value = console_.value + '\n' + msg;

    console_.scrollTop = console_.scrollHeight;
    if (msg.indexOf('ERR') > 0) alert(msg)
}


function aggiorna_stato(msg, mode) {
    const array = msg.substring(msg.indexOf('->') + 3).split(',')

    for (i in array) {
        if (array[i] != local_client_name) {
            try { light('name_' + array[i], mode); }
            catch (error) {
                $('.container_down').append($('<div></div>').addClass('console'))
                $('.console:last').append($('<span></span>').addClass('console_name close').attr('id', 'name_' + array[i]).text(array[i])).append($('<textarea></textarea>').addClass('console_log').attr('id', array[i]).attr('readonly', ""))
                light('name_' + array[i], mode);
            }
        }
    }
}


function send_cord(joy, min_list, max_list) {
    if (min_list.length != max_list.length)
    {
        console.error('I parametri di minimo e massimo non coincidono')
        return
    }

    var values = getValues(joy, min_list, max_list);

    //var data_new = JSON.stringify({ "red": Math.floor((parseInt(joy.GetX()) + 100) / 200 * 255), "blue": Math.floor((parseInt(joy.GetY()) + 100) / 200 * 255) });
    var data_new = JSON.stringify({ "Steering": values[0], "Velocity": values[1]});

    if (data_prec != data_new) {
        try {
            ws.send(data_new)
            console.log(data_new)
        }
        catch (error)
        {
            alert('Errore, non sono riuscito ad inviare i dati al Server')
            $('html, body').removeClass('block')
        }
    }
    data_prec = data_new
}


function light(id, mode) {
    console_name_css = document.getElementById(id).classList

    if (mode == 'close') {
        console_name_css.replace('open', 'close');
        if (tm_array[id] == '') {
            tm_array[id] = setTimeout(() => {
                document.getElementById(id).parentElement.remove()
                clearTimeout(tm_array[id])
                tm_array[id] = ''
            }, 30000)
        }
    }
    else {
        console_name_css.replace('close', 'open');
        clearTimeout(tm_array[id])
        tm_array[id] = ''
    }
}

function stage(num) {
    $('#stage_1, #stage_2, #stage_3').css('display', 'none')
    $('#stage_' + num).toggle()
}

function reboot_ard () {
    ws.send('ReBoot: [ARDUINO]')
}

function getValues(joy, min, max) {
    const parameters = [joy.GetX(), joy.GetY()]
    var fin_value = []
    for (i = 0; i < min.length; i++)
    {
        range = max[i] - min[i]
        x = ((parseInt(parameters[i]) + 100) * range) / 200
        fin_value[i] = Math.floor(x + min[i])
    }
    return fin_value
}