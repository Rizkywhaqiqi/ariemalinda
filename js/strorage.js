// JavaScript untuk web (frontend)
$(function () {
  // Event submit pada form
  $('#formMessage').on('submit', function (e) {
    e.preventDefault(); // Mencegah halaman refresh saat form disubmit

    // Mengambil data dari form dan mengubahnya menjadi objek JSON
    const form = $('#formMessage').serializeArray();
    let newData = {};
    form.forEach(function (item) {
      newData[item.name] = item.value;
    });

    // Mengirim data ke Google Sheets Web App
    $.ajax({
      type: 'POST',
      url: 'https://script.google.com/macros/s/AKfycbyffcQQyh3qS5N2jOYoJ8vOT0_QLHRlGx2gndFR4a71jw4vwCbnaHDIugUUb7e1VpJxxg/execL', // Ganti dengan URL Web App dari Google Apps Script
      data: JSON.stringify(newData),
      contentType: 'application/json',
      success: function () {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Terima Kasih Atas Ucapan & Doanya',
          showConfirmButton: false,
          timer: 2000,
        });
        loadMessages(); // Memanggil fungsi untuk memuat pesan terbaru
      },
      error: function () {
        alert('Gagal menyimpan pesan! Periksa koneksi Anda.');
      },
    });
  });

  // Fungsi untuk memuat data dari Google Sheets
  function loadMessages() {
    $.ajax({
      type: 'GET',
      url: 'https://script.google.com/macros/s/AKfycbyffcQQyh3qS5N2jOYoJ8vOT0_QLHRlGx2gndFR4a71jw4vwCbnaHDIugUUb7e1VpJxxg/execL', // URL yang sama dengan endpoint Web App
      success: function (data) {
        $('.card-message').html(showData(data));
      },
      error: function () {
        alert('Gagal mengambil pesan!');
      },
    });
  }

  // Fungsi untuk menampilkan data di elemen .card-message
  function showData(data) {
    let row = '';

    if (data.length === 0) {
      row = `<h1 class="title" style="text-align: center">Belum Ada Pesan Masuk</h1>`;
    } else {
      data.forEach(function (item) {
        row += `<h1 class="title">${item.nama}</h1>`;
        row += `<h4>- ${item.hubungan}</h4>`;
        row += `<p>${item.pesan}</p>`;
      });
    }

    return row;
  }

  // Memuat pesan saat halaman pertama kali dimuat
  loadMessages();
});
