# Retursj Merke
> Fra og med 1. juli 2022 krever markedsføringsloven § 2 at all reklame der en kropps fasong, størrelse eller hud er endret ved retusjering eller annen manipulering, skal merkes med et standardmerke.  
— [Forbrukertilsynet](https://www.forbrukertilsynet.no/forbrukertilsynets-veiledning-om-merking-av-retusjert-reklame)

Dette er et Photoshop script som skal gjøre enkelt å plassere og skalere det standariserte merket.

# Oversikt
* [Funksjoner](#funksjoner)
* [Hvordan bruke](#hvordan-bruke)
* [Installasjon](#installasjon)
  * [Legg til som meny valg](#legg-til-som-meny-valg)
  * [Velge fil manuelt](#velge-fil-manuelt)
* [Konfigurasjon](#konfigurasjon)
  * [Marginer](#marginer)
  * [Størrelse](#størrelse)
  * [Plassering](#plassering)

# Funksjoner
* 🤏 skalerer så merke dekker 7% av bildeflaten
* 👈 flytter logo inn i hjørne
* 🧱 justerbar margin fra bildekant
* 🎛 justerbar hjørne plassering (topp, bunn, til høyre eller venstre)

![GIF demonstrasjon](https://i.thevirt.us/06/Z5I63.gif)

# Hvordan bruke

Velg laget med Retusj merket i Photoshop først.  

**Som meny valg:**  
Velg scriptet via: Edit → Scripts → Retusj Merke  

**Manuelt som fil:**  
Naviger til `Retusj Merke.js` filen og velg den  
Trykk på "Load" knappen"  


# Installasjon
I Photoshop kan du starte scriptet på en av to måter:
* laste filen inn i Photoshop presets, så du bare velger den i dropdown
* åpne filutforsker fra Photoshop og velge filen som skal kjøres

## Legg til som meny valg
Meny-valg [(bilde)](https://i.thevirt.us/06/94E6B.png) er det enkleste valget om du bruker scriptet ofte, eller ikke har et fast sted for dine script.
1. Last ned [Retusj Merke.js](Retusj%20Merke.js) filen, eller kopier teskt innholdet og lim inn i Notisblokk.
2. Lagre filen som "Retusj Merke.js" (viktig: med '.js' filtypen) ett sted på din datamaskin
3. Åpne plasseringen for dine Photoshop scripts, vanligvis ligger de her
    * **Windows:** C:\Program Files\Adobe\Adobe Photoshop **[versjon]**\Presets\Scripts
    * **Mac:** <Bruker>/Library/Application Support/Adobe/AdobePhotoshop **[versjon]**/Presets/Scripts
4. Flytt filen din hit, og godkjenn sikkerhetsboks om du blir spurt
5. Restart Photoshop
6. Finn Scriptet via: Edit → Scripts → Retusj Merke

## Velge fil manuelt
1. Velg laget med Retusj merket i Photoshop (*må gjøres før du kjører scriptet*)
2. I Photoshop, gå til Edit → Scripts → Browse…
3. Naviger til `Retusj Merke.js` filen og velg den
4. Trykk på "Load" knappen"

# Konfigurasjon
## Marginer, størrelse, og plassering
Som standard skal merke plasseres i øverste venstre hjørnet, og merket skal dekke 7% av bildeflaten.  
Du behøver ikke foreta noen endringer om du følger dette.

Dersom du allikavel trenger/ønsker å justere størrelse eller standard plassering, for eksempel hvis du har andre påbudte merker i dette hjørnet, har du lov til å flytte det til et annet hjørne.

### Marginer
I skrivende stund er det ikke noe spesifikasjon på hvor langt fra hjørnet skal være.  
Som standard har vi satt marginen til å være lik den blir generert via Forbrukertilsynet sitt eget hjelpe verktøy.  
I det verktøyet er marginen 7.7% av merket's egen størrelse.

Du kan lett endre marginen, ved å endre [linje 45](Retusj%20Merke.js#L45) til en annen prosentfaktor. Marginen blir lik for top, høyre, bunn, og venstre side.
```js
var labelPlacement = {
    // ...
    // Percentage factor of the emblem's own size after being scaled
    margins: 0.077
}
```

### Størrelse
I filen finner du på [linje 19](Retusj%20Merke.js#L19) en variable for størrelse
```js
var labelPercentageSize = 0.07;
```
Dette er en prosentfaktor, hvor 1 er 100%, og 0.07 er 7%. Alt du trenger å gjøre er å endre dette numeret til ønsket størrelse.

### Plassering
Du kan lett konfigurere koden slik at den plasserer merket i et annet hjørne enn øverste venstre.  
I filen finner du på [linje 40](Retusj%20Merke.js#L40) og [linje 42](Retusj%20Merke.js#L42) konfigurering for vertikal og horisontal plassering.  
Alt du trenger å gjøre er å endre `"left"` til `"right"`, eller `"top"` til `"bottom"`.
```js
var labelPlacement = {
    place: {
        // "top" or "bottom"
        vertical: "top",
        // "left" or "right"
        horizontal: "left",
    },
    // ...
}
```
