let gyumolcsok = []
gyumolcsok.push(
    'apple',
    'banana',
    'cherry',
    'lemon',
    'melon',
    'orange',
    'peach',
    'pineapple',
    'plum',
    'strawberry')

let kijeloltHalom
let celDiv
let nyertesHatter

document.addEventListener("DOMContentLoaded", ready);
function ready() {

    gyumolcsValasztas()
    gyumolcsokLerakása()
    nyertesHatter = document.createElement("div")
    nyertesHatter.id = "win"
    nyertesHatter = document.getElementById("win")
    nyertesHatter.style.display = "none"
}

function gyumolcsValasztas() {

    // 4 random elemet kiválaszt és töröl az eredeti tömbből

    for (let i = 0; i < 4; i++) {

        let randomSzam = Math.floor(Math.random() * gyumolcsok.length)
        gyumolcsok.splice(randomSzam, 1)
    }

}

function gyumolcsokLerakása() {

    //Halmok létrehozása és megjelenítése

    for (let i = 0; i < gyumolcsok.length; i++) {

        const halom = document.createElement("img")
        halom.addEventListener("click", function (event) { kijeloles(kijeloltHalom = event.target) })
        halom.src = `images/${gyumolcsok[i]}` + "_group.png"
        halom.classList.add("halom")
        halom.id = `halom-${gyumolcsok[i]}`
        document.getElementById("pool").appendChild(halom)

    }

    //Gyümölcsök létrehozása és eltüntetése

    for (let i = 0; i < gyumolcsok.length; i++) {

        const gyumolcs = document.createElement("img")
        gyumolcs.src = `images/${gyumolcsok[i]}` + "_1.png"
        gyumolcs.classList.add("gyumolcs")
        gyumolcs.id = `${gyumolcsok[i]}`
        document.getElementById("jatekter").appendChild(gyumolcs)
        gyumolcs.style.display = "none"

    }

}

//Halmok kijelölése

function kijeloles() {

    let kijelolve = 1
    let elhelyezve = 0
    halomId = kijeloltHalom.id

    if (kijelolve === 1) {

        const gyumolcsNev = halomId.split('-').pop();

        kijeloltGyumolcs = document.getElementById(`${gyumolcsNev}`)


        document.getElementById(halomId).classList.add("selected")

        if (document.getElementsByClassName("selected").length > 1) {
            const elements = document.querySelectorAll('*')
            elements.forEach((element) => {
                element.classList.remove('selected')
            })
        }
        document.getElementById(halomId).classList.add("selected")


        document.getElementById("container-1").addEventListener("click", function (event) { lerakas(celDiv = event.target) })
        document.getElementById("container-2").addEventListener("click", function (event) { lerakas(celDiv = event.target) })
        document.getElementById("container-3").addEventListener("click", function (event) { lerakas(celDiv = event.target) })
    }

    //Gyümölcsök konténerbe helyezése

    function lerakas() {
        divId = celDiv.id
        if (document.getElementById(divId).getElementsByTagName('*').length < 2) {

            document.getElementById(divId).appendChild(kijeloltGyumolcs)
            kijeloltGyumolcs.style.display = "flex"
            document.getElementById(halomId).style.border = "none"
            elhelyezve = 1
            nyertemE()

        } else {
            elhelyezve = 0
        }
        //Felhasznált halmok kiszürkítése

        if (elhelyezve === 1) {
            document.getElementById(halomId).style.filter = "grayscale(100%)"
            kijelolve = 0
        }
    }

    //Győzelmi feltétel vizsgálata

    function nyertemE() {
        container1ElemekSzama = document.getElementById("container-1").getElementsByTagName('*').length
        container2ElemekSzama = document.getElementById("container-2").getElementsByTagName('*').length
        container3ElemekSzama = document.getElementById("container-3").getElementsByTagName('*').length

        if (container1ElemekSzama == 2 && container2ElemekSzama == 2 && container3ElemekSzama == 2) {
            nyertesHatter.style.display = "flex"
        }
    }
}