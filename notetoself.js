window.onload = init;

function init() { //初始化
    var addButton = document.getElementById("add_button"); //新增按鈕
    addButton.onclick = createSticky; //呼叫 createSticky()
}

function getStickiesArray() {
    for (var key in localStorage) {
        addItemToDOM(key, localStorage[key]);
    }
}

function createSticky() {
    var value = document.getElementById("note_text").value; //便利貼的內容
    var colorSelection = document.getElementById("note_color"); //便利貼的顏色
    var selectedIndex = colorSelection.selectedIndex; //選取的便利貼
    var color = colorSelection[selectedIndex].value; //選取的便利貼的顏色
    var currentDate = new Date(); //日期
    var key = "sticky_" + currentDate.getTime(); //key = sticky_日期+時間 (當主鍵)
    var sticky = {
        "value": value,
        "color": color
    };
    localStorage.setItem(key, JSON.stringify(sticky)); //暫存器存入 日期+時間，內容+顏色
    var stickiesArray = getStickiesArray(); //建立stickys
    stickiesArray.push(key); //點擊某張便利貼
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray)); //暫存器存入 全部的stickys
    addStickyToDOM(key, sticky); //在網頁顯示出sticky

}

function deleteSticky(e) {
    var key = "sticky_" + currentDate.getTime(); //key = sticky_日期+時間 (當主鍵)
    localStorage.removeItem(key); //暫存器刪除
    removeStickyToDOM(key);
}

function addStickyToDOM(key, stickyObj) {
    var stickies = document.getElementById('stickies'); //新增一張新便利貼
    var item = document.createElement('li'); //建立清單項目
    item.setAttribute("id", key); //第幾項清單項目
    item.style.backgroundColor = stickyObj.color; //便利貼的顏色 = 暫存器裡儲存的貼紙顏色
    var span = document.createElement('span'); //新增一個區間
    span.setAttribute("class", "sticky"); //區間存入sticky屬性
    span.innerHTML = stickyObj.value; //html加入js裡的sticky物件
    item.appendChild(span); //item加入span子物件
    stickies.appendChild(item); //stickys加入item子物件

    item.onclick = deleteSticky; //呼叫deleteSticky
}

function removeStickyFromDOM(key) {
    var item = document.getElementById(key); //宣告  獲取key的值
    item.parentNode.removeChild(item);
}

function clearStickyNotes() {
    localStorage.clear(); //清除所有暫存器內的值
    var ul = document.getElementById("stickies"); //宣告  獲取items的值  (就是所有的key)
    var stickies = ul.childNodes; //轉換成node型態
    for (var i = stickies.length - 1; i >= 0; i--) { //陸續刪除所有顯示項目清單，-1的原因是： 假如有5個項目，陣列是從0存到4
        ul.removeChild(stickies[i]);

    }
}
