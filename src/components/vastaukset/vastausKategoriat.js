
const vastausKategoriat = {
  sosiaalipolitiikka: ['147|Kansalaisten oikeus terveyspalveluihin on tärkeämpää kuin kuntien itsehallinto.', '146|Vanhuksen ja hänen omaistensa vastuuta hoitokustannuksista on lisättävä.', '145|Viranomaisten pitää puuttua lapsiperheiden ongelmiin nykyistä herkemmin.', '144|Terveys- ja sosiaalipalvelut on tuotettava ensijaisesti julkisina palveluina.', '143|Parantumattomasti sairaalla on oltava oikeus avustettuun kuolemaan.', '127|Suomessa on liian helppo elää sosiaaliturvan varassa', '129|Suomessa on siirryttävä perustuloon joka korvaisi nykyisen sosiaaliturvan vähimmäistason.', '135|Lapsilisiä on korotettava ja laitettava verolle.', '136|Suomella ei ole varaa nykyisen laajuisiin sosiaali- ja terveyspalveluihin.'],
  kaupansaantely: ['247|Mietojen viinien ja vahvojen oluiden myynti ruokakaupassa sallitaan.', '244|Hyväksytään periaatepäätös uuden ydinvoimalaitosyksikön rakentamisesta.', '148|Ilmastonmuutoksen hillitseminen pitää asettaa teollisuuden kilpailukyvyn edelle.', '144|Terveys- ja sosiaalipalvelut on tuotettava ensijaisesti julkisina palveluina.', '128|Kaupan ja muiden liikkeiden aukioloajat on vapautettava.'],
  tyoehdot: ['130|Työntekijälle on turvattava lailla minimityöaika.', '131|Ansiosidonnaisen työttömyysturvan kestoa pitää lyhentää.'],
  eu: ['150|Suomen pitää ottaa suurempi vastuu EU:n alueelle tulevista turvapaikanhakijoista.', '132|Euron ulkopuolella Suomi pärjäisi paremmin.'],
  talouspolitiikka: ['245|Tuloveroa alennetaan tasaisesti kaikissa tuloluokissa talouden elvyttämiseksi.', '148|Ilmastonmuutoksen hillitseminen pitää asettaa teollisuuden kilpailukyvyn edelle.', '146|Vanhuksen ja hänen omaistensa vastuuta hoitokustannuksista on lisättävä.', '132|Euron ulkopuolella Suomi pärjäisi paremmin.', '134|Valtion ja kuntien taloutta on tasapainotettava ensisijaisesti leikkaamalla menoja.', '136|Suomella ei ole varaa nykyisen laajuisiin sosiaali- ja terveyspalveluihin.'],
  verotus: ['133|Ruoan verotusta on varaa kiristää.', '135|Lapsilisiä on korotettava ja laitettava verolle.'],
  turvallisuus: ['149|Geenimuunneltu ruoka on turvallista ihmiselle ja ympäristölle.', '142|Suomen on osallistuttava Isisin vastaiseen taisteluun kouluttamalla Irakin hallituksen joukkoja.', '137|Nato-jäsenyys vahvistaisi Suomen turvallisuuspoliittista asemaa.', '138|Suomeen tarvitaan enemmän poliiseja.', '139|Maahanmuuttoa Suomeen on rajoitettava terrorismin uhan vuoksi.', '141|Verkkovalvonnassa valtion turvallisuus on tärkeämpää kuin kansalaisten yksityisyyden suoja.'],
  maahanmuutto: ['150|Suomen pitää ottaa suurempi vastuu EU:n alueelle tulevista turvapaikanhakijoista.', '139|Maahanmuuttoa Suomeen on rajoitettava terrorismin uhan vuoksi.'],
  ulkopolitiikka: ['142|Suomen on osallistuttava Isisin vastaiseen taisteluun kouluttamalla Irakin hallituksen joukkoja.', '140|Venäjän etupiiripolitiikka on uhka Suomelle.', '132|Euron ulkopuolella Suomi pärjäisi paremmin.', '137|Nato-jäsenyys vahvistaisi Suomen turvallisuuspoliittista asemaa.'],
  yksityisyys: ['246|Edellisen eduskunnan hyväksymä lainmuutos samaa sukupuolta olevien avioliiton sallimisesta peruutetaan.', '141|Verkkovalvonnassa valtion turvallisuus on tärkeämpää kuin kansalaisten yksityisyyden suoja.'],
  ymparisto: ['244|Hyväksytään periaatepäätös uuden ydinvoimalaitosyksikön rakentamisesta.', '149|Geenimuunneltu ruoka on turvallista ihmiselle ja ympäristölle.', '148|Ilmastonmuutoksen hillitseminen pitää asettaa teollisuuden kilpailukyvyn edelle.'],
  hallinto: ['201|Suomen Nato-jäsenyydestä on järjestettävä kansanäänestys.', '147|Kansalaisten oikeus terveyspalveluihin on tärkeämpää kuin kuntien itsehallinto.', '151|On aika luopua ajatuksesta, että koko Suomi on pidettävä asuttuna.'],
  koulutus: ['152|Peruskoulun opetusryhmien koko on rajattava lailla esimerkiksi 20 oppilaaseen.'],
}

export const puolueet = [
  {
    text: 'Keskusta',
    value: 'kesk',
  },
  {
    text: 'Kokoomus',
    value: 'kok',
  },
  {
    text: 'SDP',
    value: 'sdp',
  },
  {
    text: 'Vihreät',
    value: 'vihr',
  },
  {
    text: 'Vasemmistoliitto',
    value: 'vas',
  },
  {
    text: 'RKP',
    value: 'rkp',
  },
  {
    text: 'Kristillisdemokraatit',
    value: 'kd',
  },
  {
    text: 'Perussuomalaiset',
    value: 'ps',
  },
]

export default { vastausKategoriat, puolueet }
