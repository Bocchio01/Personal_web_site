

/*
Script per il calcolo dell'azimut e distanze tra due luoghi sulla Terra
Viene considerata la Terra come l'ellissoide di Hayford.
I calcoli vengono efettuati considerando tutti i luoghi a quota 0 m.l.s.
*/

// Raggio equatore e raggio poli
const Rpo = 6356752;
const Req = 6378137;

function init() {
    //Lettura dati iniziali da stringhe del tipo: 'latitudine, longitudine'

    var polari_0 = math.multiply($('#partenza').val().split(','), math.PI / 180);
    var polari_1 = math.multiply($('#arrivo').val().split(','), math.PI / 180);

    polari_0[0] = (math.PI / 2) - polari_0[0]
    polari_1[0] = (math.PI / 2) - polari_1[0]

    main(polari_0, polari_1)
}


function main(polari_0, polari_1) {

    cartesiane_0 = terna_cartesiana(polari_0)
    cartesiane_1 = terna_cartesiana(polari_1)

    azimut_bussola = 180 - angolo_vettori(vettore_piano_cartesiano([0, 0, 0], [0, 0, 1], cartesiane_0), vettore_piano_cartesiano([0, 0, 0], cartesiane_0, cartesiane_1));
    //Controllo sull'angolo se maggiore di 180°
    if (polari_1[1] < polari_0[1]) azimut_bussola = 360 - azimut_bussola

    azimut_tunnel = math.abs(angolo_vettori(cartesiane_0, math.subtract(cartesiane_0, cartesiane_1)) - 90)

    $('#compass').text('Azimut: ' + azimut_bussola.toFixed(2) + '°')

    $('#tunnel').text('Inclinazione: ' + azimut_tunnel.toFixed(2) + '°')
    $('#tunnel_dist').text('Lunghezza: ' + ((math.norm(math.subtract(cartesiane_0, cartesiane_1))) / 1000).toFixed(2) + 'km')

    var img = $('.compass-pointer');
    var degree = azimut_bussola + 45
    img.css('-moz-transform', 'rotate('+degree+'deg)');
    img.css('-webkit-transform', 'rotate('+degree+'deg)');
    img.css('-o-transform', 'rotate('+degree+'deg)');
    img.css('-ms-transform', 'rotate('+degree+'deg)');

}


function terna_cartesiana(polare) {
    /*
        Calcolo delle coordinate cartesiane di un punto a partire dalle due sue coordinate polari
        alfa => longitudine
        beta => latitudine
    */

    const alfa = polare[1]
    const beta = polare[0]

    var terna_cartesiane = [
        Req * math.sin(alfa) * math.sin(beta),
        Req * math.cos(alfa) * math.sin(beta),
        Rpo * math.cos(beta)
    ]

    return terna_cartesiane
}


function vettore_piano_cartesiano(p1, p2, p3) {
    // Calcolo del vettore matematico (array) generatore del piano passante per i 3 punti di partenza

    vettore = math.cross(math.subtract(p1, p2), math.subtract(p1, p3))
    vettore = math.divide(vettore, math.norm(vettore))

    return vettore
}


function angolo_vettori(vet_1, vet_2) {
    // Calcolo dell'angolo in gradi tra due vettori matematici

    CosTheta = math.max(math.min(math.dot(vet_1, vet_2) / (math.norm(vet_1) * math.norm(vet_2)), 1), -1)
    Theta = math.divide(math.re(math.acos(CosTheta)), math.PI / 180)

    return Theta
}