class bang{
    constructor(id,cau_hoi,a,b,c,d,dung){
        this.id=id;
        this.cau_hoi=cau_hoi;
        this.a=a;
        this.b=b;
        this.c=c;
        this.d=d;
        this.dung=dung;
    }
}
//Lưu trữ các câu hỏi
const tableDataList= [
    new bang("1","1+1=?","0","1","2","3","C")
];
//Lưu trữ các bài thi
class baiThi{
  constructor(id,ten_ky_thi,mon_hoc,tg_lam_bai,bat_dau,ket_thuc,phan_loai,ds_cau_hoi){
    this.id=id;
    this.ten_ky_thi=ten_ky_thi;
    this.mon_hoc=mon_hoc;
    this.tg_lam_bai=tg_lam_bai;
    this.bat_dau=bat_dau;
    this.ket_thuc=ket_thuc;
    this.phan_loai=phan_loai;
    this.ds_cau_hoi= ds_cau_hoi;
  }
}
const DsBaiThi=[];

// Biến xác định bấm enter để thêm hàng mới hay kết thúc việc sửa hàng 
var enterThemHang=false;
var enterSuaXong=false

input();
function input(){
    const table = document.getElementById("data");
    const tbody = table.querySelector("tbody");
    tableDataList.forEach(tableData => {
        const row = document.createElement("tr");

        const cell1 = document.createElement("td");
        cell1.textContent = tableData.id;
        row.appendChild(cell1);

        const cell2 = document.createElement("td");
        cell2.textContent = tableData.cau_hoi;
        row.appendChild(cell2);

        const cell3 = document.createElement("td");
        cell3.textContent = tableData.a;
        row.appendChild(cell3);

        const cell4 = document.createElement("td");
        cell4.textContent = tableData.b;
        row.appendChild(cell4);

        const cell5 = document.createElement("td");
        cell5.textContent = tableData.c;
        row.appendChild(cell5);

        const cell6 = document.createElement("td");
        cell6.textContent = tableData.d;
        row.appendChild(cell6);

        const cell7 = document.createElement("td");
        cell7.textContent = tableData.dung;
        row.appendChild(cell7);

        tbody.appendChild(row);
    });
}

//----------------------------------------------//
//THÊM CÂU HỎI VÀO BẢNG KHI BẤM NÚT THÊM CÂU HỎI
//---------------------------------------------//

function themCauhoi(){
    window.addEventListener("DOMContentLoaded", function() {
      const QTable = document.getElementById("data");
      const nutThem = document.getElementById("them-cau-hoi");
    
      // Thêm sự kiện click cho nút "Thêm"
      nutThem.addEventListener("click", function() {
        themHangMoi();
      });
    
      // Thêm sự kiện keydown cho ô nhập liệu
      QTable.addEventListener("keydown", function(event) {
        const target = event.target;
        const isLastRow = target.parentElement.parentElement === QTable.lastElementChild;
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
          <td contenteditable="true"></td>
          <td contenteditable="true"></td>
          <td contenteditable="true"></td>
        `;
        QTable.querySelector("tbody").appendChild(newRow);
      }
    
      // Hàm lưu hàng mới
      function luuHangMoi(target) {
          const row = target.parentElement;
          
          const id = row.children[0].textContent.trim();
          const cau_hoi = row.children[1].textContent.trim();
          const a = row.children[2].textContent.trim();
          const b = row.children[3].textContent.trim();
          const c = row.children[4].textContent.trim();
          const d = row.children[5].textContent.trim();
          const dung = row.children[6].textContent.trim();
          
          if (id !== "" && cau_hoi !== "" && a !== "" && b !== "" && c !== "" && d !== "" && dung !== "") {
              // Thực hiện lưu dữ liệu vào cơ sở dữ liệu hoặc xử lý dữ liệu theo nhu cầu
            tableDataList.push( new bang(id,cau_hoi,a,b,c,d,dung));
            
            //xóa hết các hàng trong tbody
            const tbody = document.querySelector("#data tbody");
            tbody.innerHTML = "";
            //hiển thị các hàng có trong dữ liệu 
            input();
            console.log(tableDataList);
          } else {
              alert("Vui lòng nhập đầy đủ thông tin.");
          }
      }
  });
}
themCauhoi();

//----------------------------------------------//
//XÓA CÂU HỎI VÀO BẢNG KHI BẤM NÚT XÓA
//---------------------------------------------//

function chonHangDeXoa(){
    let xoa_ok=false;
    document.getElementById("xoa-cau-hoi").addEventListener("click",function(){
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
  
              if (tableDataList[i].id === firstCell && xoa_ok===true) {
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
//SỬA CÂU HỎI VÀO BẢNG KHI BẤM NÚT SỬA
//---------------------------------------------//

function nutSua(){
  const table = document.getElementById("data");
  const editButton = document.getElementById("sua-cau-hoi");
  let selectedRow = null;

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
    function editSelectedRow() {
      if (selectedRow) {
        // Chuyển hàng đang được chọn về chế độ sửa đổi
        const cells = selectedRow.querySelectorAll("td");
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
            if( tableDataList[i].id===tmp[0]){
              tableDataList.splice(i,1);
              tableDataList.push(new bang(tmp[0],tmp[1],tmp[2],tmp[3],tmp[4],tmp[5],tmp[6]));
              break;
            }
          }
          console.log( tableDataList);
        }
      }
    });
}
nutSua();

//----------------------------------------------//
//LƯU KẾT KẾT ĐỀ THI MỚI TẠO VÀO BẢNG
//---------------------------------------------//

document.getElementById("them-ok").addEventListener("click", function(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
  // Lấy thông tin từ các trường trong biểu mẫu:-----------OK----------
  var id = document.getElementById("input-ma").value;
  var tenKyThi = document.getElementById("ten-ky-thi").value;
  var loaiKyThi = document.getElementById("loai-ky-thi").value;
  var monHoc = document.getElementById("input-mon").value;
  var thoiGianLam = document.getElementById("input-tg-lam").value;
  var thoiGianChoPhepThi = document.getElementById("input-tg-cho-phep").value;
  var thoiGianKetThuc = document.getElementById("input-tg-ket-thuc").value;

  // Thực hiện các hành động khác sau khi lưu đề thi
  // Ví dụ: Gửi thông tin đến máy chủ, chuyển hướng trang, vv.

  var confirmation = confirm("Bạn có chắc chắn muốn lưu không?");
    
    // Xử lý lựa chọn
    if (confirmation) {
      // Nếu người dùng chọn Yes, thực hiện chuyển trang
      DsBaiThi.push(new baiThi(id,tenKyThi,monHoc,thoiGianLam,thoiGianChoPhepThi,thoiGianKetThuc,loaiKyThi,tableDataList));
      console.log(DsBaiThi);

      //Lưu dữ liệu baiThi vào LocalStorage
      localStorage.setItem('DsBaiThiData', JSON.stringify(DsBaiThi));

      alert("Bài thi đã được lưu lại");
      var linkHref = "C:/Users/Admin/OneDrive/Tài liệu/Lap trinh web/BT nhóm web/Admin/Dashboard admin/html/index.html";
      window.location.href = linkHref;
    } else {
      // Nếu người dùng chọn No, thực hiện công việc khác
      // Ví dụ: Hiển thị một thông báo khác, không thực hiện chuyển trang
      alert("Bài thi chưa được lưu lại");
      console.log(DsBaiThi);
    } 
});