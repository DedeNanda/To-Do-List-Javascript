// Mengambil elemen dalam todo-app
const inputList = document.getElementById("input-list");
const btnAdd = document.getElementById("btn-add");
const listReminder = document.getElementById("list-reminder");

// Tambah pengingat baru
btnAdd.addEventListener("click", () => {
  const taskText = inputList.value.trim();

  // Jika input kosong, tampilkan pesan peringatan
  if (taskText === "") {
    alert("Silahkan masukkan pengingat Anda");
    return;
  }

  // Mendapatkan tanggal hari ini dalam format yang seragam
  const date = new Date();
  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Cek apakah elemen tanggal hari ini sudah ada
  let dateContainer = document.getElementById(`date-${formattedDate}`);

  // Jika belum ada elemen untuk tanggal hari ini, buat elemen baru
  if (!dateContainer) {
    dateContainer = document.createElement("div");
    dateContainer.id = `date-${formattedDate}`;

    // Buat elemen judul tanggal
    const dateTitle = document.createElement("h3");
    dateTitle.textContent = formattedDate;
    dateTitle.style.fontWeight = "bold";
    dateContainer.appendChild(dateTitle);

    // Buat elemen list untuk tugas di tanggal ini
    const taskList = document.createElement("ul");
    taskList.classList.add("task-list");
    dateContainer.appendChild(taskList);

    // Tambahkan dateContainer ke dalam listReminder
    listReminder.appendChild(dateContainer);
  }

  // Ambil taskList di dalam dateContainer yang sesuai tanggal
  const taskList = dateContainer.querySelector(".task-list");

  // Buat item tugas baru
  const taskItem = document.createElement("li");

  // Buat checkbox untuk menandai selesai
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => {
    taskTextElement.classList.toggle("completed");
  });

  // Buat elemen teks pengingat
  const taskTextElement = document.createElement("span");
  taskTextElement.textContent = taskText;
  taskTextElement.classList.add("task-text");

  // Buat tombol hapus pengingat
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Hapus";
  btnDelete.classList.add("delete-btn");
  btnDelete.addEventListener("click", () => {
    taskList.removeChild(taskItem);
    
    // Jika taskList kosong setelah penghapusan, hapus dateContainer
    if (taskList.children.length === 0) {
      listReminder.removeChild(dateContainer);
    }
  });

  // Masukkan elemen ke dalam taskItem
  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskTextElement);
  taskItem.appendChild(btnDelete);

  // Tambahkan taskItem ke dalam taskList
  taskList.appendChild(taskItem);

  // Reset input
  inputList.value = "";
});
