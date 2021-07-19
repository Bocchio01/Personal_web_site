var ws
function init(event) {
    $('#con1, #con2').toggle()
    //ws = new WebSocket("ws://127.0.0.1:5000");
    ws = new WebSocket("wss://curious-wealthy-pigment.glitch.me/");
    //ws = new WebSocket("wss://simple-websocket-server-echo.glitch.me/");
    ws.onopen = function (event) {
        ws.send('[CLIENT]')
        $('#con2, #con3').toggle()
        $('#joystick_area').on('mousemove', send_cord);
        setInterval(function () { ws.send('[CLIENT]: ...') }, 300000)
        try {
            light('name_[SERVER]' + sib, 1)
        } catch (error) {
        }
    }
    ws.onclose = function (event) {
        $('.name').toggleClass("open").toggleClass("close")
    }
    ws.onerror = function (event) {
        light('name_[SERVER]' + sib, 0)
        alert('Il server ha smesso di funzionare.')
    }
    ws.onmessage = function (event) {
        if (event.data.indexOf('just disconnected') > 0) {
            var sib = event.data.substring(event.data.indexOf(':') + 2, event.data.indexOf(':', event.data.indexOf(':') + 1));
            light('name_' + sib, 0);
        }
        var sub = event.data.substring(0, event.data.indexOf(']') + 1);
        //if (sub != '[CLIENT]')
        try {
            if (event.data.indexOf('just connected') > 0) {
                var sib = event.data.substring(event.data.indexOf(':') + 2, event.data.indexOf(':', event.data.indexOf(':') + 1));
                light('name_' + sib, 1);
            }
        } catch (error) {

        }

        try {
            //light('name_' + sub, 1)
            if (document.getElementById(sub).value == "") document.getElementById(sub).value = event.data;
            else {
                document.getElementById(sub).value = document.getElementById(sub).value + '\n' + event.data;
                document.getElementById(sub).scrollTop = document.getElementById(sub).scrollHeight;
            }
        } catch (error) {
            $('.Consol_logs').append($('<div></div>').addClass('element'))
            $('.element:last').append($('<span></span>').addClass('name open').attr('id', "name_" + sub).text(sub)).append($('<textarea></textarea>').addClass('console').attr('id', sub).attr('readonly', ""))
            document.getElementById(sub).scrollTop = document.getElementById(sub).scrollHeight;
        }
    }
}

function reboot() {
    ws.send('[CLIENT]: reboot')
}

function send_cord(event) {
    x = Math.floor(event.clientX - document.getElementById('joystick_area').offsetLeft) / 2
    y = Math.floor(event.clientY - document.getElementById('joystick_area').offsetTop - document.getElementById('joystick_area').offsetParent.offsetTop) / 2

    ws.send('{"red":' + x + ',"blue":' + y + '}')
    //console.log('[CLIENT]: {"red":' + x + ',"blue":' + y + '}')
}

function light(ele, mode) {
    if (mode == 0) {
        document.getElementById(ele).classList.replace('open', 'close');
    }
    else {
        document.getElementById(ele).classList.replace('close', 'open');
    }
}