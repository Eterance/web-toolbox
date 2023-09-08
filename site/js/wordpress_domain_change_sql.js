function generateSQL() {
    var oldDomain = document.getElementById("oldDomain").value;
    var newDomain = document.getElementById("newDomain").value;
    var tablePrefix = document.getElementById("tablePrefix").value;

    var sqlCode = "UPDATE " + tablePrefix + "options SET option_value = replace(option_value, '" + oldDomain + "', '" + newDomain + "') WHERE option_name = 'home' OR option_name = 'siteurl';\n" +
        "UPDATE " + tablePrefix + "posts SET post_content = replace(post_content, '" + oldDomain + "', '" + newDomain + "');\n" +
        "UPDATE " + tablePrefix + "posts SET guid = replace(guid, '" + oldDomain + "', '" + newDomain + "');\n" +
        "UPDATE " + tablePrefix + "posts SET post_excerpt = REPLACE(post_excerpt, '" + oldDomain + "', '" + newDomain + "');\n" +
        "UPDATE " + tablePrefix + "postmeta SET meta_value = replace(meta_value, '" + oldDomain + "', '" + newDomain + "');\n" +
        "UPDATE " + tablePrefix + "termmeta SET meta_value = REPLACE(meta_value, '" + oldDomain + "', '" + newDomain + "');\n" +
        "UPDATE " + tablePrefix + "comments SET comment_content = REPLACE(comment_content, '" + oldDomain + "', '" + newDomain + "');\n" +
        "UPDATE " + tablePrefix + "comments SET comment_author_url = REPLACE(comment_author_url, '" + oldDomain + "', '" + newDomain + "');";

    document.getElementById("sqlCode").textContent = sqlCode;
    Prism.highlightAll();
}
var copyButton = document.getElementById("copyButton");
var clipboard = new ClipboardJS(copyButton);

clipboard.on('success', function(e) {
    // 使用Bootstrap的Toast组件显示消息提示
    var toast = new bootstrap.Toast(document.getElementById("toastMessage"));
    toast.show();
    e.clearSelection();
});