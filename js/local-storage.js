"use strict";

let rakBuku = [];

const tambahBuku = e => {
    e.preventDefault();
    const judul = document.querySelector("#judul");
    const penulis = document.querySelector("#penulis");
    const tahun = document.querySelector("#tahun");
    const selesai = document.querySelector("#selesai");
    const buku = {
        id: new Date().valueOf(),
        judul: judul.value,
        penulis: penulis.value,
        tahun: tahun.value,
        selesai: selesai.checked
    };
    console.log(buku), rakBuku.push(buku), document.dispatchEvent(new Event("update"))
}

const cariBuku = e => {
    e.preventDefault();
    const word = document.querySelector("#cari-judul");
    query = word.value, query ? daftarBuku(rakBuku.filter((function (rakBuku) {
        return rakBuku.judul.toLowerCase().includes(query.toLowerCase())
    }))) : daftarBuku(rakBuku)
}

const selesaikan = e => {
    const id = Number(e.target.id),
        buku = rakBuku.findIndex(((rakBuku) => {
            return rakBuku.id === id
        })); - 1 !== buku && (rakBuku[buku] = {
        ...rakBuku[buku],
        selesai: true
    }, document.dispatchEvent(new Event("update")))
}

const sebelumkan = e => {
    const id = Number(e.target.id),
        buku = rakBuku.findIndex(((rakBuku) => {
            return rakBuku.id === id
        })); - 1 !== buku && (rakBuku[buku] = {
        ...rakBuku[buku],
        selesai: false
    }, document.dispatchEvent(new Event("update")))
}

const hapuskan = e => {
    const id = Number(e.target.id),
        buku = rakBuku.findIndex(((rakBuku) => {
            return rakBuku.id === id
        })); - 1 !== buku && (rakBuku.splice(buku, 1), document.dispatchEvent(new Event("update")))
}

const daftarBuku = rakBuku => {
    const rakBelum = document.querySelector("#belum-dibaca");
    const rakSelesai = document.querySelector("#selesai-dibaca");
    rakBelum.innerHTML = "";
    rakSelesai.innerHTML = "";
    for (const i of rakBuku) {
        console.log(i);
        const tr = document.createElement("tr");

        const tdNo = document.createElement("td");
        tdNo.classList.add("text-center");

        const tdJudul = document.createElement("td");
        tdJudul.innerText = i.judul;

        const tdPenulis = document.createElement("td");
        tdPenulis.innerText = i.penulis;

        const tdTahun = document.createElement("td");
        tdTahun.innerText = i.tahun;

        const tdKeterangan = document.createElement("td");

        tr.appendChild(tdNo)
        tr.appendChild(tdJudul)
        tr.appendChild(tdPenulis)
        tr.appendChild(tdTahun)

        let no = 0;
        if (i.selesai) {
            const divKeterangan = document.createElement("div");
            divKeterangan.classList.add("col", "btn-group", "text-white");
            divKeterangan.setAttribute("role", "group");

            const btnInfo = document.createElement("a");
            btnInfo.classList.add("btn", "btn-info");
            btnInfo.id = i.id;
            btnInfo.innerText = "Belum Dibaca";
            btnInfo.addEventListener("click", sebelumkan);

            const btnHapus = document.createElement("a");
            btnHapus.classList.add("btn", "btn-danger");
            btnHapus.id = i.id;
            btnHapus.innerText = "Hapus Buku";
            btnHapus.addEventListener("click", hapuskan);

            divKeterangan.appendChild(btnInfo);
            divKeterangan.appendChild(btnHapus);
            tdKeterangan.appendChild(divKeterangan);
            tr.appendChild(tdKeterangan);
            rakBelum.appendChild(tr);
        } else {
            const divKeterangan = document.createElement("div");
            divKeterangan.classList.add("col", "btn-group", "text-white");
            divKeterangan.setAttribute("role", "group");

            const btnInfo = document.createElement("a");
            btnInfo.classList.add("btn", "btn-info");
            btnInfo.id = i.id;
            btnInfo.innerText = "Belum Dibaca";
            btnInfo.addEventListener("click", selesaikan);

            const btnHapus = document.createElement("a");
            btnHapus.classList.add("btn", "btn-danger");
            btnHapus.id = i.id;
            btnHapus.innerText = "Hapus Buku";
            btnHapus.addEventListener("click", hapuskan);

            divKeterangan.appendChild(btnInfo);
            divKeterangan.appendChild(btnHapus);
            tdKeterangan.appendChild(divKeterangan);
            tr.appendChild(tdKeterangan);
            rakSelesai.appendChild(tr);
        }
    }
}

const perbarui = () => {
    ! function (rakBuku) {
        localStorage.setItem("books", JSON.stringify(rakBuku))
    }(rakBuku), daftarBuku(rakBuku)
}

window.addEventListener("load", (() => {
    rakBuku = JSON.parse(localStorage.getItem("books")) || [], daftarBuku(rakBuku);
    const tambah = document.querySelector("#input-buku");
    const cari = document.querySelector("#cari-buku");
    tambah.addEventListener("submit", tambahBuku), cari.addEventListener("submit", cariBuku), document.addEventListener("update", perbarui)
}))