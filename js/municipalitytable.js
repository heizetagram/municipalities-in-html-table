import {fetchAnyUrl, postObjectAsJson, delObject} from "./modulejson.js";

/////////////////////////////////////////////////////

console.log("municipalitytable.js")

const urlMunicipalities = "http://localhost:8080/municipalities"
const urlMunicipality = "http://localhost:8080/municipality"
const pbCreateMunicipalityTable = document.getElementById("pbGetMunicipalities")
const tblMunicipality = document.getElementById("tblMunicipality")

/////////////////////////////////////////////////////

function createTable(municipality) {
    let cellCount = 0
    let rowCount = tblMunicipality.rows.length
    let row = tblMunicipality.insertRow(rowCount)

    let cell = row.insertCell(cellCount++)

    // Set row id
    row.id = municipality.kode

    // Municipality kode
    cell.innerHTML = municipality.kode
    cell.style.width = "25%"

    // Municipality navn
    cell = row.insertCell(cellCount++)
    cell.innerHTML = municipality.navn
    cell.style.width = "25%"

    // Municipality href
    cell = row.insertCell(cellCount++)
    cell.innerHTML = municipality.href
    cell.style.width = "50%"

    // Region kode
    cell = row.insertCell(cellCount++)
    cell.innerHTML = municipality.region.kode

    // Region navn
    cell = row.insertCell(cellCount++)
    cell.innerHTML = municipality.region.navn

    // Action delete
    cell = row.insertCell(cellCount++)
    const pbDelete = document.createElement("input")
    pbDelete.className = "btn1"
    pbDelete.type = "button"
    pbDelete.setAttribute("value", "Slet kommune")
    cell.appendChild(pbDelete)

    pbDelete.onclick = function () {
        document.getElementById(row.id).remove()
        deleteMunicipality(municipality)
    }
}

let municipalities = []

async function fetchMunicipalities() {
    municipalities = await fetchAnyUrl(urlMunicipalities)
    municipalities.forEach(createTable)
}

/////////////////////////////////////////////////////

function actionGetMunicipalities() {
    fetchMunicipalities();
}

async function deleteMunicipality(municipality) {
    let delUrl = urlMunicipality + "/" + municipality.kode

    const response = await delObject(delUrl)

    console.log(delUrl)
    console.log(municipality.kode)

    response.ok ? alert("Municipality deleted") : alert("Municipality could not be deleted")
}

/////////////////////////////////////////////////////

pbCreateMunicipalityTable.addEventListener('click', actionGetMunicipalities)
