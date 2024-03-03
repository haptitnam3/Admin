class bang{
    constructor(id_bai,ten_ky_thi,mon_hoc,tg_lam_bai,bat_dau,ket_thuc,phan_loai){
        this.id_bai=id_bai;
        this.ten_ky_thi=ten_ky_thi;
        this.mon_hoc=mon_hoc;
        this.tg_lam_bai=tg_lam_bai;
        this.bat_dau=bat_dau;
        this.ket_thuc=ket_thuc;
        this.phan_loai=phan_loai;
    }
}

function highlightLink(element) {
  element.classList.toggle('highlight');
}
//-----------------------------------------------------//
//  THÊM DỮ LIỆU VÀO BẢNG
//-----------------------------------------------------//

const tableDataList = [
    new bang("0001","Luyện tập", "Cơ sở dữ liệu","30 phút","","","Tự do"),
    new bang("0002","Giữa kỳ", "Kiến trúc máy tính","40 phút","12/04/2024 00:00","12/04/2024 23:59","Có yêu cầu thời gian"),
    new bang("0003","Cuối kỳ", "Lập trình web","40 phút","12/04/2024 00:00","12/04/2024 23:59","Có yêu cầu thời gian"),
    new bang("0004","Luyện tập", "Kiến trúc máy tính","30 phút","","","Tự do")
];
  
// Lấy dữ liệu mảng từ LocalStorage
var DsBaiThiData = localStorage.getItem('DsBaiThiData');

// Kiểm tra dữ liệu tồn tại
if (DsBaiThiData) {
    var DsBaiThi = JSON.parse(DsBaiThiData);
  // Kiểm tra số lượng phần tử trong mảng DsBaiThi
  console.log(DsBaiThi);
  if (DsBaiThi.length > 0) {
    for( let i=0;i<DsBaiThi.length;i++){
        var bai=DsBaiThi[i];
        var mang=Object.values(bai);
        tableDataList.push(new bang(mang[0],mang[1],mang[2],mang[3],mang[4],mang[5],mang[6]));
    }
  }
}

//Hiển thị dữ liệu lưu trong mảng
const table = document.getElementById("data");
const tbody = table.querySelector("tbody");
tableDataList.forEach(tableData => {
    const row = document.createElement("tr");

    const cell1 = document.createElement("td");
    cell1.textContent = tableData.id_bai;
    row.appendChild(cell1);

    const cell2 = document.createElement("td");
    cell2.textContent = tableData.ten_ky_thi;
    row.appendChild(cell2);

    const cell3 = document.createElement("td");
    cell3.textContent = tableData.mon_hoc;
    row.appendChild(cell3);

    const cell4 = document.createElement("td");
    cell4.textContent = tableData.tg_lam_bai;
    row.appendChild(cell4);

    const cell5 = document.createElement("td");
    cell5.textContent = tableData.bat_dau;
    row.appendChild(cell5);

    const cell6 = document.createElement("td");
    cell6.textContent = tableData.ket_thuc;
    row.appendChild(cell6);

    const cell7 = document.createElement("td");
    cell7.textContent = tableData.phan_loai;
    row.appendChild(cell7);

    tbody.appendChild(row);
});

//-----------------------------------------------------//
// LỌC BẢNG KẾT HỢP NHIỀU THÔNG TIN
//-----------------------------------------------------//

window.addEventListener("DOMContentLoaded", function() {
    const table = document.getElementById("data");
    const tbody = table.querySelector("tbody");

    const input = document.getElementById("input-tim-kiem");
    const select = document.getElementById("chon-ky-thi");

    input.addEventListener("input", filterTable);
    select.addEventListener("change", filterTable);

    function filterTable() {
        const keyword = input.value.toLowerCase();
        const selectedOption = select.value.toLowerCase();

        const rows = tbody.querySelectorAll("tr");

        rows.forEach(row => {
            row.style.display = "none"; // Ẩn tất cả các hàng

            const id_bai=row.cells[0].textContent.toLocaleLowerCase();
            const mon_hoc = row.cells[2].textContent.toLowerCase();
            const phan_loai = row.cells[6].textContent.toLowerCase();

            // Kiểm tra xem từ khóa tìm kiếm và phân loại được chọn khớp với hàng hiện tại
            const isKeywordMatch = mon_hoc.includes(keyword) || phan_loai.includes(keyword) || id_bai.includes(keyword);
            const isSelectedOptionMatch = selectedOption === "" || phan_loai === selectedOption;

            if (isKeywordMatch || isSelectedOptionMatch) {
                row.style.display = ""; // Hiển thị hàng nếu khớp
            }
        });
    }
});

//-----------------------------------------------------//
// LỌC BẢNG THEO KỲ THI: LUYỆN TẬP, GIỮA KỲ, CUỐI KÌ
//-----------------------------------------------------//

const select = document.getElementById("chon-ky-thi");
select.addEventListener("change", filterTable);
function filterTable() {
    const selectedValue = select.value;
    // Xóa các hàng hiện tại trong bảng
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    // Lọc và thêm các hàng mới vào bảng
    tableDataList.forEach(tableData => {
        if (selectedValue === "Chọn" || tableData.ten_ky_thi === selectedValue) {
            const row = document.createElement("tr");

            const cell1 = document.createElement("td");
            cell1.textContent = tableData.id_bai;
            row.appendChild(cell1);

            const cell2 = document.createElement("td");
            cell2.textContent = tableData.ten_ky_thi;
            row.appendChild(cell2);

            const cell3 = document.createElement("td");
            cell3.textContent = tableData.mon_hoc;
            row.appendChild(cell3);

            const cell4 = document.createElement("td");
            cell4.textContent = tableData.tg_lam_bai;
            row.appendChild(cell4);

            const cell5 = document.createElement("td");
            cell5.textContent = tableData.bat_dau;
            row.appendChild(cell5);

            const cell6 = document.createElement("td");
            cell6.textContent = tableData.ket_thuc;
            row.appendChild(cell6);

            const cell7 = document.createElement("td");
            cell7.textContent = tableData.phan_loai;
            row.appendChild(cell7);

            tbody.appendChild(row);
        }
    });
}
filterTable();

//-----------------------------------------------------//
//XÓA MỘT HÀNG KHI ĐƯỢC CHỌN
//-----------------------------------------------------//
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

            if (tableDataList[i].id_bai === firstCell && xoa_ok===true) {
                xoa_ok=false;
                rows[i+1].remove();
                tableDataList.splice(i, 1); // Xóa hàng khớp khỏi tableDataList
                break; // Thoát khỏi vòng lặp sau khi xóa hàng
            }
        }
        console.log(tableDataList);
        });
    });
});

//--------------------------------------//
//SỬA BÀI THI
//--------------------------------------//

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

            const id_bai_thi=cells[0];
            // idBaiSua=id_bai_thi.textContent;
            ma=id_bai_thi.textContent;
            console.log(id_bai_thi.textContent);

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
            console.log(tableDataList);

            for( let i =0;i<tableDataList.length;i++){
                if( tableDataList[i].id_bai===ma){
                    tableDataList.splice(i,1);
                    tableDataList.push(new bang(tmp[0],tmp[1],tmp[2],tmp[3],tmp[4],tmp[5],tmp[6]));
                    break;
                }
            }
          }
        }
    });
  }
  nutSua();