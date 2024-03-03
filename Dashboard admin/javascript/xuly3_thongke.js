function highlightLink(element) {
    element.classList.toggle('highlight');
  }
class bang{
    constructor(id,ten_ky_thi,so_thi_sinh_tham_gia,ty_le_hoan_thanh,diem_trung_binh){
        this.id=id;
        this.ten_ky_thi=ten_ky_thi;
        this.so_thi_sinh_tham_gia=so_thi_sinh_tham_gia;
        this.ty_le_hoan_thanh=ty_le_hoan_thanh;
        this.diem_trung_binh=diem_trung_binh;
    }
}
const tableDataList=[
    new bang("0001","Luyện tập",100,58,8.98),
    new bang("0002","Giữa kỳ",89,90,7.03),
    new bang("0003","Cuối kỳ",140,99,8.90),
    new bang("0004","Luyện tập",200,89,8.90)
];

function input(){
    const table = document.getElementById("data");
    const tbody = table.querySelector("tbody");
    tableDataList.forEach(tableData => {
        const row = document.createElement("tr");

        const cell1 = document.createElement("td");
        cell1.textContent = tableData.id;
        row.appendChild(cell1);

        const cell2 = document.createElement("td");
        cell2.textContent = tableData.ten_ky_thi;
        row.appendChild(cell2);

        const cell3 = document.createElement("td");
        cell3.textContent = tableData.so_thi_sinh_tham_gia;
        row.appendChild(cell3);

        const cell4 = document.createElement("td");
        cell4.textContent = tableData.ty_le_hoan_thanh;
        row.appendChild(cell4);

        const cell5 = document.createElement("td");
        cell5.textContent = tableData.diem_trung_binh;
        row.appendChild(cell5);

        tbody.appendChild(row);
    });
}
input();