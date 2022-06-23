/**
 * Author: Martin Haslien / Haslien Fotografene
 * Author Site: https://haslien.no
 * 
 * Forbrukertilsynet:
 * https://www.forbrukertilsynet.no/forbrukertilsynets-veiledning-om-merking-av-retusjert-reklame
 */
#target photoshop

/**
 * Loven sier at merket skal dekke 7% av bildets flate.
 * Her definerer vi det som en prosentfaktor. Dette burde
 * ikke endres, med mindre loven endres.
 * -----------------------------------------------------------
 * By law, the label has to cover 7% of the image's surface.
 * Here we define that as a percentage factor. This should not
 * be changed unless the law changes.
 */
var labelPercentageSize = 0.07;
/**
 * I tilleg sier loven også at merket skal plasseres øverst i
 * venstre hjørne, under filtre og brukernavn. Hvis det er
 * andre påbudte merker i det hjørnert, kan du flytte retusj 
 * merket til et annet hjørne.
 * 
 * Vi definerer derfor standard plassering i øverste hjørnet, 
 * med marginer likt Forbrukertilsynet's eget hjelpe verktøy.
 * -----------------------------------------------------------
 * Furthermore, law also states label should be placed in the
 * top left corner, under filter or username. If there's
 * any other mandated label in the corner already, you can 
 * move the retouched label to another corner.
 * 
 * We therefore define a default top-corner position, with 
 * offset similar to Forbrukertilsynet's own help tool.
 */
var labelPlacement = {
    place: {
        // "top" or "bottom"
        vertical: "top",
        // "left" or "right"
        horizontal: "left",
    },
    // Percentage factor of the emblem's own size after being scaled
    margins: 0.077
}

if (app.activeDocument) app.activeDocument.suspendHistory("Juster Retusj Merke","adjustLabel()");

function adjustLabel() {
    // Find target dimension for label
    var doc = app.activeDocument;
    var pf = (doc.height * doc.width) * labelPercentageSize;
    var targetDiameter = Math.round(Math.sqrt(pf));
    
    // Find the label's width / size
    var active = doc.activeLayer;
    var bounds = getBounds(active);

    // .resize() is % relative to its current size, so find scaling required
    var percentages = Math.round(100/bounds.w * targetDiameter);

    // Perform resize
    active.resize(percentages, percentages);

    // Refresh bounds
    bounds = getBounds(active);

    // Move the label to a corner
    const delta = getPosition(bounds, labelPlacement, {width: doc.width, height: doc.height});
    // alert(delta.x+", "+delta.y);
    active.translate(delta.x, delta.y);
}

/**
 * Get the bounds (width, height, x and y position)
 * @param {ArtLayer} layer The Label layer
 * @returns {{x:Number, y:Number, width:Number, height:Number}}
 */
function getBounds(layer) {
    var __bounds = layer.boundsNoEffects || layer.bounds;

    /*
    bounds == e.g. [
        23.071 cm, // x
        8.396 cm,  // y
        37.076 cm, // x+width pos
        26.775 cm  // y+height pos
    ]
    */

    var __size = {
        x: __bounds[0],
        y: __bounds[1]
    };
    __size.w = __bounds[2] - __size.x;
    __size.h = __bounds[3] - __size.y;
    return __size;
}

/**
 * Get the translation values we need to place the label
 * in a corner according to the label placement configuration.
 * @param {{x:Number, y:Number, w:Number, h:Number}} bounds Current bounds of the label
 * @param {{place:{vertical:('top'|'bottom'), horizontal:('left'|'right')}, margins: Number}} position Where we want the label to be placed
 * @param {{width: Number, height:Number}} docSize Our document's current width and height
 * @returns {{x:Number, y:Number}} Gives us delta values to translate the label
 */
function getPosition(bounds, position, docSize) {
    if (position.place.vertical!=="top" && position.place.vertical!=="bottom") throw new Error("Unknown vertical label placement '"+position.place.vertical+"', expected 'top' or 'bottom'");
    if (position.place.horizontal!=="left" && position.place.horizontal!=="right") throw new Error("Unknown horizontal label placement '"+position.place.horizontal+"', expected 'left' or 'right'");

    var __pos = {
        x: null,
        y: null,
        targX: null,
        targY: null
    };

    // Get target X position
    if (position.place.horizontal==="left") __pos.targX = bounds.w * position.margins;
    else __pos.targX = docSize.width - (bounds.w * position.margins);

    // Get target Y position
    if (position.place.vertical==="top") __pos.targY = bounds.h * position.margins;
    else __pos.targY = docSize.height - bounds.h - (bounds.h * position.margins);

    // Difference between current horizontal position and target one
    if (position.place.horizontal==="left") {
        if (bounds.x > __pos.targX) {
            __pos.x = (bounds.x - __pos.targX) * -1;
        } else if (bounds.x < __pos.targX) {
            __pos.x = __pos.targX - bounds.x;
        }
    } else {
        if (bounds.x > __pos.targX) {
            __pos.x = ((bounds.x - __pos.targX) + bounds.w) * -1;
        } else if (bounds.x < __pos.targX) {
            __pos.x = (__pos.targX - bounds.x) - bounds.w;
        }
    }

    // Difference between current vertical position and target one
    if (position.place.vertical==="top") {
        if (bounds.y > __pos.targY) {
            __pos.y = (bounds.y - __pos.targY) * -1;
        } else if (bounds.y < __pos.targY) {
            __pos.y = __pos.targY - bounds.y;
        }
    } else {
        if (bounds.y > __pos.targY) {
            __pos.y = (bounds.y - __pos.targY) * -1;
        } else if (bounds.y < __pos.targY) {
            __pos.y = (__pos.targY - bounds.y);
        }
    }

    return {x: Math.round(__pos.x), y: Math.round(__pos.y)};
}
