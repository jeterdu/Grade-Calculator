// 這是一個測試用的 script.js 檔案。

alert("第一步：JavaScript 檔案已成功載入並執行！");

document.addEventListener('DOMContentLoaded', () => {

    alert("第二步：HTML 頁面已準備就緒！");

    const calculateButton = document.getElementById('calculateButton');

    if (calculateButton) {
        alert("第三步：「計算」按鈕已成功在 HTML 中找到！");

        calculateButton.addEventListener('click', () => {
            alert("第四步：「計算」按鈕被成功點擊了！");
        });

    } else {
        alert("錯誤：在 HTML 中找不到 ID 為 'calculateButton' 的計算按鈕！請確認 index.html 檔案是否正確。");
    }
});
