/* declaratie2503 - a form to fill during these times

Copyright 2020 Herr_Alien <alexandru.garofide@gmail.com>

This program is free software: you can redistribute it and/or modify it under 
the terms of the GNU General Public License as published by the 
Free Software Foundation, either version 3 of the License, or (at your option)
any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY 
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>. */

"use strict";

document.getElementById("buton-print").onclick = function () {
    setTimeout (function() { window.print(); }, 100);
}

var sigView = document.getElementById("vizualizare-semnatura");
var fileSel = document.getElementById("selectare-semnatura-fisier");
fileSel.onchange = function() {
    if (fileSel.files.length == 0) {
        return;
    }

    var reader = new FileReader();
    reader.onloadend = function() {
        sigView.src = reader.result;
        localStorage.setItem(sigView.id, sigView.src);
    }
    reader.readAsDataURL(fileSel.files[0]); 
}

document.getElementById("selectare-semnatura").onclick = function() {
    var fileSel = document.getElementById("selectare-semnatura-fisier");
    fileSel.dispatchEvent(new MouseEvent("click",  { "view": window, 
                                               "bubbles": true, 
                                               "cancelable": false }));
}

var dataNasterii = document.getElementById("data-nasterii");
dataNasterii.onchange = function() {
    var birthDate = this.valueAsDate;
    document.getElementById("vizualizare-data-nasterii-zi").value = birthDate.getDate();
    document.getElementById("vizualizare-data-nasterii-luna").value = birthDate.getMonth() + 1;
    document.getElementById("vizualizare-data-nasterii-an").value = birthDate.getFullYear();
    // todo: persist birthDate for later re-use
    localStorage.setItem(this.id, this.value);
}


var dataDeclaratie = document.getElementById("data-declaratie");
dataDeclaratie.onchange = function() {
    var birthDate = this.valueAsDate;
    document.getElementById("vizualizare-data-declaratie").value = birthDate.getDate()
    + "/" + Number(birthDate.getMonth() + 1) + "/" + birthDate.getFullYear();
}


var editorNume = document.getElementById("nume");
editorNume.onchange = function() {
    localStorage.setItem(this.id, this.value);
}
var editorAdresa = document.getElementById("adresa");
editorAdresa.onchange = editorNume.onchange;

var editorAdresaResedinta = document.getElementById("adresa_resedinta");
editorAdresaResedinta.onchange = editorNume.onchange;

var loculNasterii = document.getElementById("locul_nasterii");
loculNasterii.onchange = editorNume.onchange;



// init from current date
dataDeclaratie.valueAsDate = new Date();
dataDeclaratie.onchange(); // to copy values in the print view

editorNume.value = localStorage.getItem(editorNume.id);
editorAdresa.value = localStorage.getItem(editorAdresa.id);
loculNasterii.value = localStorage.getItem(loculNasterii.id);
editorAdresaResedinta.value = localStorage.getItem(editorAdresaResedinta.id);

var imageUrl = localStorage.getItem(sigView.id);
if (imageUrl == null) {
    imageUrl = 'data:image/svg+xml;utf8,<svg><rect width="10" height="10" style="fill:rgb(200,200,200)"/></svg>';
}

sigView.src = imageUrl;
dataNasterii.value = localStorage.getItem(dataNasterii.id);
dataNasterii.onchange(); // to copy values in the print view
