var main = function() {
	wypiszPrzedmiotyNaStronie();
	zaktualizujKoszykNaStronie();
	$('button').click(potwierdzenieOproznieniaKoszyka);
	$('#wrapper img').click(pokozaniaSchowanieKoszyka);
};

// dodaje przedmiot do koszyka, aktualizuje jego zawartosc na stronie, zwraca liczbe wystapien danego przedmiotu w koszyku
function dodajPrzedmiotDoKoszyka(przedmiot){
	for(var i = 0; i < koszyk.length; i++) {
		var elementKoszyka = koszyk[i];
		if(elementKoszyka.przedmiot === przedmiot) {
			elementKoszyka.liczba++;
			zaktualizujKoszykNaStronie();
			return elementKoszyka.liczba;
		}
	}
	
	koszyk.push({
		przedmiot: przedmiot,
		liczba: 1
	});
	zaktualizujKoszykNaStronie();
	return 1;
}


function kliknietoPrzyciskDodaj() {
	var $przedmiot = $(this).closest(".przedmiot");
	var indexPrzedmiotu = $przedmiot.data("index");
	var przedmiot = przedmioty[indexPrzedmiotu];
	var liczbaWystapienPrzedmiotuWKoszyku = dodajPrzedmiotDoKoszyka(przedmiot);
	$przedmiot.find(".dodaj").hide();
	$przedmiot.find(".zmien").show();
	$przedmiot.find(".zmien .w_koszyku").text(liczbaWystapienPrzedmiotuWKoszyku);
}

function wypiszPrzedmiotyNaStronie(){
	for(var i = 0; i < przedmioty.length; i++) {
		var przedmiot = przedmioty[i];
		var $przedmiot = $('#szablon_przedmiotu').clone();
		$przedmiot.removeAttr('id');
		$przedmiot.find('.nazwa').text(przedmiot.nazwa);
		$przedmiot.find('.opis').text(przedmiot.opis);
		$przedmiot.find('.cena').text(przedmiot.cena + "PLN");
		$przedmiot.find('img').attr('src', przedmiot.imgSrc );
		$przedmiot.data('index', i);
		//console.log($przedmiot.data('index'));
		$('#przedmioty').append($przedmiot);
		$przedmiot.find('.dodaj').click(kliknietoPrzyciskDodaj);
		$przedmiot.find(".plus").click(kliknietoPrzyciskDodaj);
		$przedmiot.find(".minus").click(kliknietoPrzyciskUsun);//
	}
}

// usuwanie przedmiotów z koszyka

function usunPrzedmiotZKoszyka(przedmiot){
	for(var i = 0; i < koszyk.length; i++) {
		var elementKoszyka = koszyk[i];
		if(elementKoszyka.przedmiot === przedmiot) {
			if (elementKoszyka.liczba === 1) {
				koszyk.splice(i, 1);
				return 0;
			} else {
				elementKoszyka.liczba--;
				return elementKoszyka.liczba;
			}
		} 
	}
	return 0;
}
// funkcja obsługuje klikniecie przycisku minus , usuwa przedmiot z koszyka i aktualizuje dane na stronie
function kliknietoPrzyciskUsun() {
	var $przedmiot = $(this).closest(".przedmiot");
	var indexPrzedmiotu = $przedmiot.data("index");
	var przedmiot = przedmioty[indexPrzedmiotu];
	var liczbaWystapienPrzedmiotuWKoszyku = usunPrzedmiotZKoszyka(przedmiot);
	if (liczbaWystapienPrzedmiotuWKoszyku === 0) {
		$przedmiot.find(".zmien").hide();
		$przedmiot.find(".dodaj").show();
	} else {
		$przedmiot.find(".zmien .w_koszyku").text(liczbaWystapienPrzedmiotuWKoszyku);
	}
	zaktualizujKoszykNaStronie();
}

var przedmioty = [
	{
		nazwa: "Milk", 
		opis: "Natural milk 3% fat from Polish cows ",
		cena: 10,
		imgSrc: "img/milk.png"
	},
	{
		nazwa: "Butter", 
		opis: "Natural butter with delicate taste. Fat 82%.",
		cena: 13.5,
		imgSrc: "img/butter.png"
	},
	{
		nazwa: "Salt", 
		opis: "Ecological salt extracted from rocks in Nepal.",
		cena: 15,
		imgSrc: "img/salt.png"
	}
];

function zaktualizujKoszykNaStronie(){
	$('#koszyk .przedmiot_z_koszyka').remove();
	var suma = 0;
	for(var i = koszyk.length - 1; i >= 0; i--) {
		var przedmiot = koszyk[i].przedmiot;
		var liczba = koszyk[i].liczba;
		var lacznaCenaDanegoPrzedmiotu = przedmiot.cena * liczba;
		suma += lacznaCenaDanegoPrzedmiotu;
		var $przedmiot = $('#szablon_przedmiotu_koszyka').clone();
		$przedmiot.removeAttr('id');
		$przedmiot.find('.nazwa').text(przedmiot.nazwa);
		$przedmiot.find('.opis').text(przedmiot.opis);
		$przedmiot.find('.cena').text(przedmiot.cena + "PLN = " + lacznaCenaDanegoPrzedmiotu + "PLN");//
		$przedmiot.find('img').attr('src', przedmiot.imgSrc );
		$przedmiot.find('.liczba').text(liczba + " x ");
		$('#koszyk').prepend($przedmiot);
	}
	$('#suma').text("Total: " + suma + "PLN");
}
var potwierdzenieOproznieniaKoszyka = function () {
    var r = confirm("The cart will be emptied!");
    if (r == true) {
		koszyk = [];
		zaktualizujKoszykNaStronie();
		$('.przedmiot > .dodaj').show();
		$('.przedmiot > .zmien').hide();
		
    } 
}
 

var koszyk = [
	
]

var pokozaniaSchowanieKoszyka = function () {
	$('#koszyk').slideToggle();
}


$(document).ready(main);