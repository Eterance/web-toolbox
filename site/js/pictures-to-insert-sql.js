let addedImages = [];
const addedPicsCountControl = document.getElementById("addedPicsCount");
const tableNameControl = document.getElementById("tableName");
const baseUrlControl = document.getElementById("baseUrl");
const isReconstructTableControl = document.getElementById("isReconstructTable");

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;

    if (files.length > 0) {
        // 把每一张图片都添加到 addedImages 数组中
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.startsWith("image/")) {
                addedImages.push(files[i]);
            }
        }
    }
    addedPicsCountControl.textContent = addedImages.length.toString();
}

async function getImageDimensions(objURL) {
    return new Promise((resolve) => {
        var img = new Image();
        img.src = URL.createObjectURL(objURL);
        img.onload = function () {
            var width = img.width;
            var height = img.height;
            resolve({ width, height });
        };
    });
}

async function generateSQL() {
    let sqls = [];
    const dropTableSql = `DROP TABLE IF EXISTS \`${tableNameControl.value}\`;`;
    const createTableSql = `CREATE TABLE IF NOT EXISTS \`${tableNameControl.value}\` (        
    id INTEGER PRIMARY KEY   AUTOINCREMENT,
    name VARCHAR(255),
    url VARCHAR(255),
    size INT,
    width INT,
    height INT,
    ratio DECIMAL(5, 3),
    landscape BOOLEAN,
    near_square BOOLEAN,
    big_size BOOLEAN,
    small_size BOOLEAN,
    mid_size BOOLEAN,
    big_res BOOLEAN,
    small_res BOOLEAN,
    mid_res BOOLEAN,
    bjn BOOLEAN
);`;
    if (isReconstructTableControl.checked)    {
        sqls.push(dropTableSql);
        sqls.push(createTableSql);
    }
    if (addedImages) {
        for (let i = 0; i < addedImages.length; i++) {
            let a = null;
            try {
                const dimensions = await getImageDimensions(addedImages[i]);
                a = dimensions; // 此时 a 包含宽度和高度信息
            } catch (error) {
                console.error('Error:', error);
            }
            const fileName = addedImages[i].name;
            const url = baseUrlControl.value + "/" + encodeURIComponent(fileName);
            const fileSize = addedImages[i].size;
            const width = a.width;
            const height = a.height;
            // 保留三位小数
            const ratio = parseFloat((width / height).toFixed(3));
            const landscape = width > height;
            const nearSquare = ratio > 0.9090909 && ratio < 1.1;
            const bigSize = fileSize > 600000;
            const smallSize = fileSize < 100000;
            const midSize = !bigSize && !smallSize;
            // 短边大于1440
            const bigRes = width > 1440 || height > 1440;
            // 短边小于640
            const smallRes = width < 640 || height < 640;
            const midRes = !bigRes && !smallRes;
            // 名字包含bjn字样
            const bjn = fileName.includes("bjn");
            
            sqls.push(`INSERT INTO \`${tableNameControl.value}\` (name, url, size, width, height, ratio, landscape, near_square, big_size, small_size, mid_size, big_res, small_res, mid_res, bjn) VALUES ('${fileName}', '${url}', ${fileSize}, ${width}, ${height}, ${ratio}, ${landscape}, ${nearSquare}, ${bigSize}, ${smallSize}, ${midSize}, ${bigRes}, ${smallRes}, ${midRes}, ${bjn});`);
        }
        // 保存为 txt 文件
        const sqlsText = sqls.join("\n");
        const blob = new Blob([sqlsText], { type: "text/plain;charset=utf-8" });
        const objectURL = URL.createObjectURL(blob);
        const aTag = document.createElement("a");
        aTag.href = objectURL;
        aTag.download = `${tableNameControl.value}.txt`;
        aTag.click();
        // 释放一个之前已经存在的、通过调用 URL.createObjectURL() 创建的 URL 对象。
        // 当你结束使用某个 URL 对象之后，应该通过调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了。
        URL.revokeObjectURL(objectURL);
    }
    else {
        alert("请先拖放一张图片，然后点击“开始”按钮。");
    }
}

function clearFiles() {
    addedImages = [];
    addedPicsCountControl.textContent = "0";
}