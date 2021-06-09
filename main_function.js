function load_header_footer() {
    $("#header").load("/_header.html");
    $("#footer").load("/_footer.html");
}

function load_page(par) {
    $("#article").load(par.replaceAll(' ', '%20') + "_content.html");
}

function background() {
    for (var i = 0; i < 100; i++) {
        $("div#particle-container").append('<div class="particle"></div>');
    }
}

function load_articles_menu() {
    const arg = ["Programmazione", "Meccanica", "Fisica", "Matematica", "Orienteering"];

    $.each(arg, function (i, el) {
        var ele = $("label.main_menu:first").clone();
        ele.find("input").click(function (e) {
            if ($('div.' + el).hasClass("d" + i)) {
                $('div.' + el).removeClass("d" + i);
            } else {
                $('div.' + el).addClass("d" + i);
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
            var ele = $(".main_content div.container:first").parent().clone();
            ele.addClass(el.tag);
            if (file_to_load == 'data_home') {
                ele.find("a").attr("href", el.link);
                ele.find("img").attr({ "src": el.img[0], "alt": el.img[1] });
            } else {
                ele.find("a").attr("href", '/viewer.html?year=' + el.year + '&title=' + el.title);
                if (el.img[0].includes('http')) {
                    ele.find("img").attr({ "src": el.img[0], "alt": el.img[1] });
                }
                else {
                    ele.find("img").attr({ "src": '/' + el.year + '/' + el.title + '/' + el.img[0], "alt": el.img[1] });
                }
            }
            ele.find(".title").text(el.title);
            ele.find(".paragraph").html(el.description.join('<br>'));
            $("article").append(ele);
        })
        $(".main_content div.container:first").parent().remove();
    })
}

function riallinea(parent) {
    var selector = $(parent).children();
    selector.css('flex-direction', '');
    selector.odd().css('flex-direction', 'row-reverse');
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

function loadFileNames(dir) {
    if (0) {

        var xmlhttp = new XMLHttpRequest();

        return new Promise((resolve, reject) => {

            xmlhttp.onreadystatechange = (e) => {
                if (xmlhttp.readyState !== 4) {
                    return;
                }

                if (xmlhttp.status === 200) {
                    resolve(JSON.parse(xmlhttp.responseText));
                } else {
                    console.warn('request_error');
                }
            };

            xmlhttp.open("GET", "/scan.php?directory=" + dir, true);
            xmlhttp.send();
        });
    } else {


        return new Promise((resolve, reject) => {
            try {
                var fileNames = new Array();
                $.ajax({
                    url: dir,
                    success: function (data) {
                        for (var i = 1; i < $(data).find('li span.name').length; i++) {
                            var elem = $(data).find('li span.name')[i];
                            fileNames.push(elem.innerHTML);
                        }
                        return resolve(fileNames);
                    }
                });
            } catch (ex) {
                return reject(new Error(ex));
            }
        });
    }
};

function dod() {
    $('h1.title').text(title);
    $('.local').each(function () {
        $(this).attr("src", path + $(this).attr("src"));
    });
    $('.container').children('div').each(function () {
        $(this).addClass("paragraph");
    });

    $('img').each(function () {
        $(this).click(function () {
            $('.embedded_img').attr('style', 'display: block !important').children('img').attr("src", $(this).attr('src'));
            $('.embedded_img').children('p').text($(this).parent().children('p').text());
        });
        //$(this).click( $('.embedded_img').css('display', 'block !important'))
    })

}


