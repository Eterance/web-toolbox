var copyButton1 = document.getElementById("copyButton1");
var copyButton2 = document.getElementById("copyButton2");
var clipboard1 = new ClipboardJS(copyButton1);
var clipboard2 = new ClipboardJS(copyButton2);

clipboard1.on('success', copiedSuccess);
clipboard2.on('success', copiedSuccess);

function copiedSuccess (e) {
    // 使用Bootstrap的Toast组件显示消息提示
    var toast = new bootstrap.Toast(document.getElementById("toastMessage"));
    toast.show();
    e.clearSelection();
}

function encodeURL () {    
    const url = document.getElementById("preEncode").value;
    const isEncodeParentheses = document.getElementById("isEncodeParentheses").checked;
    let encodedURL = encodeURI(url);
    if (isEncodeParentheses) {
        encodedURL = encodedURL.replace(/\(/g, '%28').replace(/\)/g, '%29');
    }
    document.getElementById("postEncode").value = encodedURL;
}

function decodeURL () {    
    const url = document.getElementById("preDecode").value;
    let decodedURL = decodeURIComponent(url);
    document.getElementById("postDecode").value = decodedURL;
}