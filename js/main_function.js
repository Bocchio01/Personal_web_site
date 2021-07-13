function main_element() {
    $('#header').load('/html/header.html');
    $('#footer').load('/html/footer.html');
    for (var i = 0; i < 100; i++) {
        $("div#particle-container").append('<div class="particle"></div>');
    }
}

function load_articles_menu() {
    const arg = ["Programmazione", "Meccanica", "Fisica", "Matematica", "Orienteering"];
    $('nav').append($('<div></div>').addClass('arguments'))
    
    $.each(arg, function (i, el) {
        ele = $('<label></label>').addClass('sub_menu').append($("<input>").attr('type', 'checkbox'), $("<p></p>").text(el).attr('number', i))
        
        ele.children("input").click(function (e) {
            if ($(this)[0].checked) {
                $('.select_argument').css('display', 'none')
                $('div.' + el).addClass("d" + i);
                $('nav').find("p[number=" + i + "]").css('background-color', 'orange')
            } else {
                $('div.' + el).removeClass("d" + i);
                $('nav').find("p[number=" + i + "]").css('background-color', '')
            }
        });
        $('.arguments').append(ele)
    })
    $('nav').append($('<div></div>').addClass("select_argument").append($('<p></p>').text('Seleziona un argomento.')))
}

function load_articles(type) {
    $.getJSON('/js/data_articoli.json', function (data) {

        $.each(data, function (i, el) {
            var ele = $("div.container:first").clone();
            ele.addClass(el.tag).attr('data-order', i);

            if (type == "Forum") {
                ele.find(".link_hidden").attr("href", '/main_pages/Forum/Forum.html?discussion=' + el.link + '/' + el.title + '/');
            } else {
                ele.find(".link_hidden").attr("href", el.link + '/' + el.title + '/');
                ele.find(".text_container").html(el.description.join('<br>'));
            }

            if (el.img.indexOf("http") >= 0) {
                ele.find(".img_container").attr("src", el.img);
            } else {
                ele.find(".img_container").attr("src", el.link + '/' + el.title + '/' + el.img);
            }
            ele.find(".img_container").attr("alt", el.title)
            ele.find(".title_container").text(el.title)
            $("main").append(ele);
        })
        $("div.container:first").remove();
        getOrder("Newest first")
    })
}


function add_attachments(dir) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(xhttp.responseText);
            $.each(data, function (i, el) {
                var ele = $(".file_box:first").clone();
                ele.find("a").attr("href", dir + data[i]);
                ele.find('p').text(data[i]);
                ele.find('img').attr('src', '/img/Icons/' + data[i].substr((data[i].lastIndexOf('.') + 1)) + '.png').on("error", function () {
                    $(this).attr('src', '/img/Icons/Undefined.png');
                });
                $(".allegati_file:first").append(ele);
            })
            $(".file_box:first").remove();
        }
    };

    xhttp.open("POST", "/php/scan.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("directory=" + '..' + dir);
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

function add_link_articles(title) {
    $.get("/html/menu_pagine_footer.html", function (data) {
        $(".article").append(data)
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onload = function () {
            const obj = ($.parseJSON(this.responseText));
            var next_page = [], prev_page = [];
            for (var i = 0; i < obj.length; i++) {
                if (obj[i]["title"] == title) {
                    if (i == 0) {
                        next_page.push(obj[i + 1]['title'], obj[i + 1]['link'], obj[i + 1]['img'][0]);
                        prev_page.push("Tutti gli articoli", "/main_pages/Articoli/", '/img/Icons/Undefined.png');
                    }
                    else if (i == obj.length - 1) {
                        next_page.push("Tutti gli articoli", "/main_pages/Articoli/", '/img/Icons/Undefined.png');
                        prev_page.push(obj[i - 1]['title'], obj[i - 1]['link'], obj[i - 1]['img'][0]);
                    }
                    else {
                        next_page.push(obj[i + 1]['title'], obj[i + 1]['link'], obj[i + 1]['img'][0]);
                        prev_page.push(obj[i - 1]['title'], obj[i - 1]['link'], obj[i - 1]['img'][0]);
                    }
                    $('a#next_page').attr('href', next_page[1])
                    //$('img#next_page').attr("src", next_page[2])
                    $('p#next_page').html(next_page[0] + '&#8594')
                    $('a#prev_page').attr('href', prev_page[1])
                    //$('img#prev_page').attr("src", prev_page[2])
                    $('p#prev_page').html('&#8592' + prev_page[0])
                    return
                }
            }
        }
        xmlhttp.open("GET", "/js/data_articoli.json");
        xmlhttp.send();
    })
};

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

function getOrder(order) {
    var $fields, $container, sorted, index;

    $container = $('main');
    $fields = $(".container[data-order]", $container);
    sorted = [];
    $fields.detach().each(function () {
        sorted[parseInt(this.getAttribute("data-order"), 10)] = this;
    });
    sorted.forEach(function (element, i) {
        if (order == "Newest first") {
            $container.append(sorted[sorted.length - i - 1]);
        } else {
            $container.append(element);
        }
    })
}