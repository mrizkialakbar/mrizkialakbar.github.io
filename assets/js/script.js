const splash = document.querySelector('.splash');
document.addEventListener('DOMContentLoaded',(e)=>{
  setTimeout(()=>{
    splash.classList.add('display-none')
  },2000);
})




const menus = [
  {
      "name": "mie_goreng",
      "label_name": "Mie Goreng",
      "harga": 20000,
  },
  {
      "name": "nasi_goreng",
      "label_name": "Nasi Goreng",
      "harga": 17000,
  },
  {
      "name": "latte",
      "label_name": "Coffee Latte",
      "harga": 25000,
  },
  {
      "name": "espreso",
      "label_name": "Coffee Espreso",
      "harga": 15000,
  },
]

let [dataBarang, listBarang, alert, elGrandTotal, grandTotal] = [
  [],
  document.getElementById("list-barang"),
  document.getElementById("alert"),
  document.getElementById("grandtotal"),
  0
]

const uniqBarang = () => {
  return dataBarang.length > 0 ? dataBarang.map((v) => v[1]) : []
}

const calculateGrandTotal = () => {
  grandTotal = 0
  dataBarang.forEach(element => {
      grandTotal += element[4]
  })
  elGrandTotal.innerHTML = `Rp ${grandTotal}`
}

const showBarang = () => {
  listBarang.innerHTML = ""

  dataBarang.forEach((element, i) => {
      listBarang.innerHTML += `<div class="card mt-3 mb-3" id="card-${element[1]}">
              <div class="card-body mx-2">
                  <input type="hidden" id="d-input-${i}" value="${element[1]}">
                  <div class="row pl-3 pr-3">
                      <div class="w-50">
                          <h6 class="f-bold mt-2 mb-0">${element[0]}</h6>
                          <h6>Rp ${element[2]}</h6 >
                          <div class="input-group input-group-sm pill-num">
                          <div class="input-group-prepend" onclick="editMenu(${i}, 'min')">
                              <span class="input-left">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                  </svg>
                              </span>
                          </div>
                          <input type="number" class="form-num" value="${element[3]}" id="input-num-${i}" oninput="editMenu(${i})">
                          <div class="input-group-prepend" onclick="editMenu(${i}, 'plus')">
                              <span class="input-right">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                  </svg></span>
                              </div>
                          </div>
                      </div>
                      <div class="w-50">
                          <div class="text-right">
                              <h6 class="mt-2 mb-0">Subtotal</h6>
                              <h6 class="mb-2">Rp ${element[4]}</h6>
                              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash-fill mt-4" viewBox="0 0 16 16" onclick="deleteBarang(${i})">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                              </svg>
                          </div>
                      </div>
                  </div>
              </div >
          </div >
      `
  });

  calculateGrandTotal()
}

const addBarang = () => {
  let menu = document.getElementById('input-menu').value;
  let jumlah = document.getElementById('input-jumlah').value;
  let daftarMenu = getMenu(menu);
  let total = jumlah * daftarMenu.harga
  if (!uniqBarang().includes(daftarMenu.name) && daftarMenu.name) {
      dataBarang.push([
          daftarMenu.label_name,
          daftarMenu.name,
          daftarMenu.harga,
          jumlah,
          total,
      ])
      showBarang()
      alert.innerHTML = ""
      return;
  } else if (uniqBarang().includes(daftarMenu.name)) {
      alert.innerHTML = "Barang sudah ada!"
      return;
  }
  alert.innerHTML = "Data tidak ditemukan!"
}

const getMenu = (input) => {
  const query = input.toLowerCase()
  let result
  menus.forEach(element => {
      let matching = element.name.toLowerCase().match(query)
      if (matching) {
          if (matching.input == input.toLowerCase()) result = element
      }
  })
  return result
}

const editMenu = (id, opsi = null) => {
  let inputNum = document.getElementById(`input-num-${id}`);
  let menu = document.getElementById(`d-input-${id}`).value;
  let daftarMenu = getMenu(menu);
  if (Number(inputNum.value) < 1) inputNum.value = 1
  if (opsi == 'plus') inputNum.value = Number(inputNum.value) + 1
  if (opsi == 'min') {
      inputNum.value = Number(inputNum.value) == 1
          ? 1
          : Number(inputNum.value) - 1
  }
  let total = daftarMenu.harga * Number(inputNum.value)
  dataBarang[id] = [
      dataBarang[id][0],
      dataBarang[id][1],
      dataBarang[id][2],
      Number(inputNum.value),
      total,
  ]

  showBarang()
  alert.innerHTML = ""
}

const deleteBarang = (id) => {
  dataBarang.splice(id, 1)

  showBarang()
  alert.innerHTML = ""
}

showBarang()
