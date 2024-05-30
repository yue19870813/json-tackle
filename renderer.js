// const setButton = document.getElementById('btn')
// const titleInput = document.getElementById('title')
// setButton.addEventListener('click', () => {
//     const title = titleInput.value
//     window.electronAPI.setTitle(title)
// })

const dropZoneLeft = document.getElementById('drop-zone-left')
// 防止浏览器默认打开文件的行为
dropZoneLeft.addEventListener("dragover", e => e.preventDefault());
dropZoneLeft.addEventListener("drop", e => e.preventDefault());

// 监听左侧区域的 drop 事件
dropZoneLeft.addEventListener('drop', e => {
    const file = e.dataTransfer.files[0];
    window.electronAPI.readFile(file.path, "left")
});

const dropZoneRight = document.getElementById('drop-zone-right')
// 防止浏览器默认打开文件的行为
dropZoneRight.addEventListener("dragover", e => e.preventDefault());
dropZoneRight.addEventListener("drop", e => e.preventDefault());

// 监听右侧区域的 drop 事件
dropZoneRight.addEventListener('drop', e => {
    const file = e.dataTransfer.files[0];
    window.electronAPI.readFile(file.path, "right")
});

// 更新界面上的json内容
window.electronAPI.onUpdateJson((data, flag) => {
    console.log(flag + "##" + data);
    document.getElementById('content-' + flag).innerHTML = data;
})

window.electronAPI.onCompareDiffs((diffs) => {
    if (diffs.length == 0) {
        document.getElementById('change-desc').innerHTML = '两个文件完全相同!';
        return;
    }
    document.getElementById('change-desc').innerHTML = '共有<span class="red-text">' + diffs.length + '</span>处不一致!';
    console.log(diffs);
})

window.electronAPI.onPrint((args) => {
    console.log("####### onPrint #######");
    console.log(args);
})
