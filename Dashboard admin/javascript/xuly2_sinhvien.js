class bang{
    constructor(msv,ho_ten,ten_dang_nhap,email){
        this.msv= msv;
        this.ho_ten=ho_ten;
        this.ten_dang_nhap=ten_dang_nhap;
        this.email=email;
    }
}

function highlightLink(element) {
  element.classList.toggle('highlight');
}
//-----------------------------------------------------//
//  THÊM DỮ LIỆU VÀO BẢNG
//-----------------------------------------------------//

const tableDataList = [
    new bang("SV0001","Nguyễn Thế Quyết","quyetnt","quyetnt@gmail.com"),
    new bang("SV0002","Hoàng Thu Hà","haht","haht@gmail.com")
];

function input(){
    const table = document.getElementById("data");
    const tbody = table.querySelector("tbody");
    tableDataList.forEach(tableData => {
        const row = document.createElement("tr");

        const cell1 = document.createElement("td");
        cell1.textContent = tableData.msv;
        row.appendChild(cell1);

        const cell2 = document.createElement("td");
        cell2.textContent = tableData.ho_ten;
        row.appendChild(cell2);

        const cell3 = document.createElement("td");
        cell3.textContent = tableData.ten_dang_nhap;
        row.appendChild(cell3);

        const cell4 = document.createElement("td");
        cell4.textContent = tableData.email;
        row.appendChild(cell4);

        tbody.appendChild(row);
    });
}
input();
//-----------------------------------------------------//
// LỌC BẢNG DỰA TRÊN THANH TÌM KIẾM
//-----------------------------------------------------//

function locKq(){
  const inputTimKiem = document.getElementById("input-tim-kiem");
  const tableData = document.getElementById("data");

  // Lắng nghe sự kiện "input" của trường nhập liệu
  inputTimKiem.addEventListener("input", function () {
    const searchValue = inputTimKiem.value.toLowerCase();

    // Lặp qua các hàng dữ liệu trong bảng, bắt đầu từ hàng thứ 1 (sau hàng tiêu đề)
    for (let i = 1; i < tableData.rows.length; i++) {
      const row = tableData.rows[i];
      const hoTen = row.cells[1].innerText.toLowerCase();
      const msv = row.cells[0].innerText.toLowerCase();

      // Kiểm tra xem tên đăng nhập hoặc msv có khớp với giá trị tìm kiếm
      if (hoTen.includes(searchValue) || msv.includes(searchValue)) {
        row.style.display = ""; // Hiển thị hàng
      } else {
        row.style.display = "none"; // Ẩn đi hàng
      }
    }
  });
}
locKq();

//-----------------------------------------------------//
// ThÊM SINH VIÊN
//-----------------------------------------------------//

function themSinhVien(){
  window.addEventListener("DOMContentLoaded", function() {
    const sinhVienTable = document.getElementById("data");
    const nutThem = document.getElementById("nut-them");
  
    // Thêm sự kiện click cho nút "Thêm"
    nutThem.addEventListener("click", function() {
      themHangMoi();
    });
  
    // Thêm sự kiện keydown cho ô nhập liệu
    sinhVienTable.addEventListener("keydown", function(event) {
      const target = event.target;
      const isLastRow = target.parentElement.parentElement === sinhVienTable.lastElementChild;
      const isEnterKey = event.key === "Enter";
  
      if (isLastRow && isEnterKey) {
        luuHangMoi(target);
      }
    });
  
    // Hàm thêm một hàng mới vào bảng
    function themHangMoi() {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
      `;
      sinhVienTable.querySelector("tbody").appendChild(newRow);
    }
  
    // Hàm lưu hàng mới
    function luuHangMoi(target) {
        const row = target.parentElement;
        const msv = row.children[0].textContent.trim();
        const hoTen = row.children[1].textContent.trim();
        const tenDangNhap = row.children[2].textContent.trim();
        const email = row.children[3].textContent.trim();
        

        if (msv !== "" && hoTen !== "" && tenDangNhap !== "" && email !== "") {
            // Thực hiện lưu dữ liệu vào cơ sở dữ liệu hoặc xử lý dữ liệu theo nhu cầu
          tableDataList.push( new bang(msv,hoTen,tenDangNhap,email));
          
          //xóa hết các hàng trong tbody
          const tbody = document.querySelector("#data tbody");
          tbody.innerHTML = "";
          //hiển thị các hàng có trong dữ liệu 
          input();
        } else {
            alert("Vui lòng nhập đầy đủ thông tin.");
        }
    }
});
}
themSinhVien();

//-----------------------------------------------------//
// CHỌN HÀNG ĐỂ XÓA
//-----------------------------------------------------//

function chonHangDeXoa(){
  let xoa_ok=false;
  document.getElementById("nut-xoa").addEventListener("click",function(){
    xoa_ok=true;
  });

  window.addEventListener("DOMContentLoaded", function() {
    const table = document.getElementById("data");
    const rows = table.getElementsByTagName("tr");

    Array.from(rows).forEach(row => {
      row.addEventListener("click", function() {
        if (this.classList.contains("selected")) {
          this.classList.remove("selected");
        } else {
          // Xóa lớp "selected" từ tất cả các hàng
          Array.from(rows).forEach(row => {
            row.classList.remove("selected");
          });

          // Thêm lớp "selected" vào hàng được click
          this.classList.add("selected");
        }
      });
    });
  });
  window.addEventListener("DOMContentLoaded", function() {
    const table = document.getElementById("data");
    const rows = table.getElementsByTagName("tr");

        Array.from(rows).forEach(row => {
        row.addEventListener("click", function() {
        const firstCell = this.cells[0].textContent; // Lấy nộidung của ô đầu tiên trong hàng được click
        // So sánh với các hàng trong tableDataList và xóa hàng khớp
        for (let i = 0; i < tableDataList.length; i++) {

            if (tableDataList[i].msv === firstCell && xoa_ok===true) {
                xoa_ok=false;
                rows[i+1].remove();
                tableDataList.splice(i, 1); // Xóa hàng khớp khỏi tableDataList
                break; // Thoát khỏi vòng lặp sau khi xóa hàng
            }
        }
        });
    });
  });
}
chonHangDeXoa();


//----------------------------------------------//
//NÚT SỬA THÔNG TIN SINH VIÊN
//----------------------------------------------//

// function nutSua(){
//   const nutSua = document.getElementById("nut-sua");
//   const tabledata = document.getElementById("data");
//   let ma="";

//   // Lắng nghe sự kiện "click" của nút "Sửa"
//   nutSua.addEventListener("click", function () {
//     const selectedRow = tabledata.querySelector(".selected");

//     if (selectedRow) {
//       const cells = selectedRow.cells;
//       const id_bai_thi=cells[0];
//       // idBaiSua=id_bai_thi.textContent;
//       ma=id_bai_thi.textContent;
//       console.log(id_bai_thi.textContent);

//       // Cho phép chỉnh sửa các ô trong hàng đang được chọn
//       for (let i = 0; i < cells.length; i++) {
//         const cell = cells[i];
//         const input = document.createElement("input");
//         input.value = cell.innerText;
//         cell.innerHTML = "";
//         cell.appendChild(input);
//       }
//     }
//   });

//   // Lắng nghe sự kiện "click" của các hàng dữ liệu trong bảng
//   tabledata.addEventListener("click", function (event) {
//     const clickedRow = event.target.parentNode;

//     // Xóa lớp "selected" khỏi các hàng khác
//     const rows = tabledata.getElementsByTagName("tr");
//     for (let i = 0; i < rows.length; i++) {
//       rows[i].classList.remove("selected");
//     }

//     // Thêm lớp "selected" vào hàng được nhấp vào
//     clickedRow.classList.add("selected");

//     tabledata.addEventListener("keydown", function (event) {
//       const selectedRow = tabledata.querySelector(".selected");
    
//       if (selectedRow && event.key === "Enter") {
//         const cells = selectedRow.cells;
    
//         // Lấy giá trị từ các trường nhập liệu trong hàng đã được chỉnh sửa
//         for (let i = 0; i < cells.length; i++) {
//           const cell = cells[i];
//           const input = cell.querySelector("input");
//           if (input) {
//             const newValue = input.value;
//             cell.innerHTML = newValue;
//           }
//         }

//         // Thêm lại hàng mới sửa vào data
//         const msv = cells[0].textContent.trim();
//         const hoTen = cells[1].textContent.trim();
//         const tenDangNhap = cells[2].textContent.trim();
//         const email = cells[3].textContent.trim();
        
//         for( let i=0;i<tableDataList.length;i++){
//           if( tableDataList[i].msv===ma) {
//             tableDataList.splice(i,1);
//             break;
//           }
//         }

//         if (msv !== "" && hoTen !== "" && tenDangNhap !== "" && email !== "") {
//           // Thực hiện lưu dữ liệu vào cơ sở dữ liệu hoặc xử lý dữ liệu theo nhu cầu
//           tableDataList.push( new bang(msv,hoTen,tenDangNhap,email));

//           //Xóa mọi hàng đang hiển thị ( ở trong tbody)
//           const tbody = document.querySelector("#data tbody");
//           tbody.innerHTML = "";

//           input();
//           console.log(tableDataList);
//         } else {
//             alert("Vui lòng nhập đầy đủ thông tin.");
//         }
//       }
//     });
//   });
// };
// nutSua();

function nutSua(){
  const table = document.getElementById("data");
  const editButton = document.getElementById("nut-sua");
  let selectedRow = null;
  let ma="";

// Hàm chọn hàng
  function selectRow(row) {
      if (selectedRow === row) {
          // Bỏ chọn hàng nếu đã được chọn trước đó
          row.classList.remove("selected");
          selectedRow = null;
        } else {
          // Chọn hàng nếu chưa được chọn
          if (selectedRow) {
            selectedRow.classList.remove("selected");
          }
          row.classList.add("selected");
          selectedRow = row;
        }
      }

    // Hàm sửa hàng
  //   const idBaiSua="";
    function editSelectedRow() {
      if (selectedRow) {
        // Chuyển hàng đang được chọn về chế độ sửa đổi
          const cells = selectedRow.querySelectorAll("td");

          const msv=cells[0];
          // idBaiSua=id_bai_thi.textContent;
          ma=msv.textContent;
          console.log(msv.textContent);

        cells.forEach((cell) => {
          const content = cell.textContent;
          cell.innerHTML = `<input type="text" value="${content}">`;
        });
      }
    }

    // Thêm sự kiện click vào các hàng
    table.addEventListener("click", function (event) {
      const target = event.target;
      if (target.nodeName === "TD") {
        const row = target.parentNode;
        selectRow(row);
      }
    });

    // Thêm sự kiện click vào nút sửa
    editButton.addEventListener("click", function () {
      editSelectedRow();
    });

    // Thêm sự kiện keydown để lưu lại sửa đổi khi nhấn phím Enter
  table.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        if (selectedRow) {
          const cells = selectedRow.querySelectorAll("td");

          const tmp=[];
          cells.forEach((cell) => {
              const input = cell.querySelector("input");
              if (input) {
                  const newValue = input.value;
                  tmp.push(newValue);
                  cell.innerHTML = newValue;
              }
          });
          for( let i =0;i<tableDataList.length;i++){
              if( tableDataList[i].msv===ma){
                  tableDataList.splice(i,1);
                  tableDataList.push(new bang(tmp[0],tmp[1],tmp[2],tmp[3]));
                  break;
              }
          }
          console.log(tableDataList);

        }
      }
  });
}
nutSua();