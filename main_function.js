function background() {
    for (var i = 0; i < 100; i++) {
        $("div#particle-container").append('<div class="particle"></div>');
    }
}

function load(path, ele) {
    $(ele).load(path);
}

function load_articles_menu() {
    const arg = ["Programmazione", "Meccanica", "Fisica", "Matematica", "Orienteering"];

    $.each(arg, function (i, el) {
        var ele = $("label.main_menu:first").clone();

        
        ele.find("input").click(function (e) {
            if ($(this)[0].checked){
                $('.select').css('display', 'none')
                $('div.' + el).addClass("d" + i);
                $('p')[i].style.backgroundColor = 'orange'
            }else{
                $('div.' + el).removeClass("d" + i);
                $('p')[i].style.backgroundColor = ''
            }
            riallinea('.d0, .d1, .d2, .d3, .d4');
        });
        ele.find("p").text(el);
        $("nav").append(ele);
    })
    $("label.main_menu:first").remove();
}

function load_articles(file_to_load) {
    $.getJSON(file_to_load + ".json", function (data) {

        $.each(data, function (i, el) {
            var ele = $("div.container:first").clone();
            ele.addClass(el.tag).attr('id', i);

            ele.find("a").attr("href", el.link);
            ele.find("img").attr({ "src": el.img[0], "alt": el.img[1]});

            ele.find(".title").text(el.title)
            ele.find(".paragraph").html(el.description.join('<br>'));
            $("article").append(ele);
        })
        $("div.container:first").remove();
    })
}


function riallinea(parent) {
    var selector = $(parent).children();
    selector.css('flex-direction', '');
    selector.odd().css('flex-direction', 'row-reverse');
}

function add_attachments(dir) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(xhttp.responseText);
            $.each(data, function (i, el) {
                var ele = $(".file_box:first").clone();
                ele.find("a").attr("href", dir + '/' + data[i]);
                ele.find('p').text(data[i]);
                ele.find('img').attr('src', '/img/Icons/' + data[i].substr((data[i].lastIndexOf('.') + 1)) + '.png').on("error", function () {
                    $(this).attr('src', '/img/Icons/Undefined.png');
                });
                $(".allegati_file").append(ele);
            })
            $(".file_box:first").remove();
        }
    };

    xhttp.open("POST", "/scan.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("directory=" + dir);
};

function embedded_img() {
    $('body').append('<div class="embedded_img"><img><p></p></div>')

    $('img').each(function () {
        $(this).click(function () {
            $('.embedded_img').css('display', 'block').children('img').attr("src", $(this).attr('src'));
            $('.embedded_img').children('p').text($(this).parent().children('p').text());
        });
    })
    $('.embedded_img').click(function () { $(this).css('display', 'none') })
};