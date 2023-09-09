
// 读取LocalStorage中的历史记录
const randompw = document.getElementById('randomPasswords');
const history = JSON.parse(localStorage.getItem('randomPwHistory')) || [];
const generatedPassword = document.getElementById('generatedPassword');

generatedPassword.addEventListener('input', analyzePassword);

history.forEach(item => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item container';
    listItem.innerHTML = `<span class="timestamp">${item.timestamp} </span> <p class="random-result"> ${item.pw} </p>`;
    randompw.appendChild(listItem);
});

function generatePassword() {
    const passwordLength = parseInt(document.getElementById("passwordLength").value);
    const includeLowercase = document.getElementById("lowercase").checked;
    const includeUppercase = document.getElementById("uppercase").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const includeSpecialCharacters = document.getElementById("specialCharacters").checked;
    const customSpecialCharacters = document.getElementById("customSpecialCharacters").value;
    const excludedCharacters = document.getElementById("excludedCharacters").value;
    const timestamp = new Date().toLocaleString();

    let characters = "";
    let password = "";

    if (includeLowercase) characters += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) characters += "0123456789";
    if (includeSpecialCharacters) characters += customSpecialCharacters;

    // Remove excluded characters
    characters = characters.replace(new RegExp(`[${excludedCharacters}]`, "g"), "");

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }

    generatedPassword.value = password;


    const isSaveHistory = document.getElementById("saveHistory").checked;
    if (isSaveHistory) {
        // 创建一个列表项，显示时间戳和生成的密码
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item container';
        listItem.innerHTML = `<span class="timestamp">${timestamp} </span> <p class="random-result"> ${password} </p>`;
        randompw.insertBefore(listItem, randompw.firstChild); // 将新项插入到顶部
        // 确保randompw中的列表项最多保留100个
        while (randompw.children.length >= 100) {
            randompw.removeChild(randompw.lastChild); // 删除最旧的列表项
        }

        // 将历史记录添加到LocalStorage
        history.unshift({ timestamp, pw: password });
        // 确保历史记录最多保留100个密码项
        if (history.length > 100) {
            history.pop(); // 删除最旧的密码项
        }
        localStorage.setItem('randomPwHistory', JSON.stringify(history));
    }
    analyzePassword();
}

function confirmClearHistory() {
    // 弹出确认框
    const confirmed = confirm(clearPasswordHistoryConfirm);

    if (confirmed) {
        // 如果用户确认清除历史记录，执行清除操作
        clearHistory();
    }
}

function clearHistory() {
    // 清除历史记录并更新页面
    localStorage.removeItem('randomPwHistory');
    randompw.innerHTML = '';

    // 显示toast消息
    const toast = new bootstrap.Toast(document.getElementById('toastMessage'));
    toast.show();
}
var copyButton = document.getElementById("copyButton");
var clipboard = new ClipboardJS(copyButton);

clipboard.on('success', function (e) {
    // 使用Bootstrap的Toast组件显示消息提示
    var toast = new bootstrap.Toast(document.getElementById("toastMessage-copied"));
    toast.show();
    e.clearSelection();
});

function analyzePassword() {
    const [timeInSeconds, attemptsToCrack] = crackTimeCalculate(generatedPassword.value, cpuCountInput.value, coreCountInput.value, cpuClockInput.value);

    var crackTimeElement = document.getElementById("crackTime");
    var attemptsToCrackElement = document.getElementById("attemptsToCrack");

    crackTimeElement.innerHTML = maxCrackTime + `${convertTime(timeInSeconds * 1000)}`;
    attemptsToCrackElement.innerHTML = maxAttemptsToCrack + `${integerToScientificNotation(attemptsToCrack)}`;

    updateStrengthMeter(timeInSeconds);
}

function integerToScientificNotation(number) {
    // 先将整数转换成字符串
    let numberString = number.toString();
    // 计算数字的长度
    const numberLength = numberString.length;
    // 如果数字长度小于等于5，直接返回原始数字的字符串形式
    if (numberLength <= 5) {
        return numberString;
    }
    // 将整数转换成科学计数法表示的字符串
    numberString = number.toExponential(3);

    // 分离底数和指数部分
    const [mantissa, exponent] = numberString.split("e");

    // 返回格式化后的科学计数法表示
    return `${parseFloat(mantissa).toFixed(3)}×10<sup>${parseInt(exponent)}</sup>`;
}

function crackTimeCalculate(password, littleCoreFreq = 0, littleCoreCount = 0, cpuClockFrequency = 3.7, coreCount = 6, cpuCount = 1) {
    const characterSets = [
        'abcdefghijklmnopqrstuvwxyz',
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        '0123456789',
        '!@#$%^&*()_+-=[]{}|;:,.<>?'
    ];

    let totalPossibilities = 0;

    // 计算密码中包含的字符集的总可能性
    for (const charSet of characterSets) {
        let charSetInPassword = false;
        for (const char of password) {
            if (charSet.includes(char)) {
                charSetInPassword = true;
                break;
            }
        }
        if (charSetInPassword) {
            totalPossibilities += charSet.length;
        }
    }

    const passwordLength = password.length;
    const possibilities = Math.pow(totalPossibilities, passwordLength);
    const attemptsToCrack = possibilities;

    // 转换单位为秒
    const cpuClockFrequencyHz = (cpuClockFrequency * coreCount + littleCoreFreq * littleCoreCount) * cpuCount * 1e9; // 转换为赫兹
    const timeInSeconds = attemptsToCrack / cpuClockFrequencyHz;

    return [timeInSeconds, attemptsToCrack];
}

function convertTime(milliseconds) {
    //时间单位在 html 中定义
    for (const unit of timeUnits) {
        if (milliseconds >= unit.duration) {
            const value = (milliseconds / unit.duration).toFixed(3); // 保留三位小数
            return `${value} ${unit.label}`;
        }
    }

    return `${milliseconds.toFixed(3)} ${ms}`; // 如果输入的时间小于1毫秒
}

function getPasswordStrength(crackTimeSeconds) {
    let stage = 0;
    let progressBarPercent = 0;
    let fakePercent = 0;

    const aDay = 24 * 60 * 60;
    const aYear = 365 * aDay;
    const aCentury = 100 * aYear;
    const solarSystemRemainLife = 50 * 10000 * 10000 * aYear;
    const protonDecay = (10 ** 34) * aYear;
    const blackHoleLife = (10 ** 65) * aYear;
    if (crackTimeSeconds < aDay) {
        // 弱：小于1天
        //0-20 (0-25)
        stage = 0;
        let percent = Math.pow(crackTimeSeconds / aDay, 1 / 8);
        progressBarPercent = percent * 0.2;
        fakePercent = percent * 0.25;
    } else if (crackTimeSeconds < 3 * aYear) {
        // 中等：大于1天但小于3年
        //20-40 (25-50)
        stage = 1;
        let percent = (crackTimeSeconds - aDay) / (3 * aYear - aDay);
        progressBarPercent = 0.2 + percent * 0.2;
        fakePercent = 0.25 + percent * 0.25;
    } else if (crackTimeSeconds < aCentury) {
        // 强：大于3年但小于100年
        //40-60 (50-75)
        stage = 2;
        let percent = (crackTimeSeconds - (3 * aYear)) / (aCentury - (3 * aYear));
        progressBarPercent = 0.4 + percent * 0.2;
        fakePercent = 0.5 + percent * 0.25;
    } else if (crackTimeSeconds < solarSystemRemainLife) {
        // 极强：大于100年但小于50亿年
        //60-80 (75-100)
        stage = 3;
        let percent = log10Percent(aCentury, crackTimeSeconds, solarSystemRemainLife);
        progressBarPercent = 0.6 + percent * 0.2;
        fakePercent = 0.75 + percent * 0.25;
    } else if (crackTimeSeconds < protonDecay) {
        // 大于50亿年但小于10^34年
        //80-90 (100-200)
        stage = 4;
        let percent = log10Percent(solarSystemRemainLife, crackTimeSeconds, protonDecay);
        progressBarPercent = 0.8 + percent * 0.1;
        fakePercent = 1 + percent;
    } else if (crackTimeSeconds < blackHoleLife) {
        // 大于10^34年但小于10^65年
        //90-100 (200-300)
        stage = 5;
        let percent = log10Percent(protonDecay, crackTimeSeconds, blackHoleLife);
        progressBarPercent = 0.9 + percent * 0.1;
        fakePercent = 2 + percent;
    } else {
        //100 (>300)
        stage = 6;
        let percent = Math.log10(crackTimeSeconds / blackHoleLife) * 0.5;
        progressBarPercent = 1;
        fakePercent = 3 + percent;
    }
    return [stage, progressBarPercent, fakePercent];
}

function log10Percent(zeroPoint, numerator, denominator) {
    let true_numerator = Math.log10(numerator / zeroPoint);
    let true_denominator = Math.log10(denominator / zeroPoint);
    return true_numerator / true_denominator;
}

function updateStrengthMeter(crackTimeInSeconds) {
    const [strengthStage, progressBarPercent, fakePercent] = getPasswordStrength(crackTimeInSeconds);
    const progressBar = document.getElementById("strength-bar");
    const strengthLabel = document.getElementById("strength-label");

    let strengthString = `${pwStrength}${(fakePercent * 100).toFixed(3)}% `;
    progressBar.style.width = `${progressBarPercent * 100}%`;

    switch (strengthStage) {
        case 0:
            progressBar.classList.remove("bg-success", "bg-danger");
            progressBar.classList.add("bg-danger");
            strengthLabel.textContent = `${strengthString}${weak}`;
            break;
        case 1:
            progressBar.classList.remove("bg-success", "bg-danger");
            progressBar.classList.add("bg-warning");
            strengthLabel.textContent = `${strengthString}${medium}`;
            break;
        case 2:
            progressBar.classList.remove("bg-success", "bg-warning", "bg-danger");
            progressBar.classList.add("bg-success");
            strengthLabel.textContent = `${strengthString}${strong}`;
            break;
        case 3:
            progressBar.classList.remove("bg-warning", "bg-danger");
            progressBar.classList.add("bg-success");
            strengthLabel.textContent = `${strengthString}${ultraStrong}`;
            break;
        case 4:
            progressBar.classList.remove("bg-success", "bg-warning", "bg-danger");
            progressBar.classList.add("bg-critical");
            strengthLabel.textContent = `${strengthString}${endOfTheSolarSystem}`;
            break;
        case 5:
            progressBar.classList.remove("bg-success", "bg-warning", "bg-danger");
            progressBar.classList.add("bg-critical");
            strengthLabel.textContent = `${strengthString}${protonDecay}`;
            break;
        case 6:
            progressBar.classList.remove("bg-success", "bg-warning", "bg-danger");
            progressBar.classList.add("bg-critical");
            strengthLabel.textContent = `${strengthString}${endOfTheBlackHole}`;
            break;
    }

}

// 获取选择框和输入框的引用
const presetConfigSelect = document.getElementById("presetConfig");
const cpuCountInput = document.getElementById("cpuCount");
const coreCountInput = document.getElementById("coreCount");
const cpuClockInput = document.getElementById("cpuClock");
const littleCoreCount = document.getElementById("littleCoreCount");
const littleCoreClock = document.getElementById("littleCoreClock");

// 创建一个对象来存储不同预设配置的参数
var configParameters = {
    "intel8086": { cpuCount: 1, coreCount: 1, cpuClock: 0.005, littleCoreCount: 0, littleCoreClock: 0 },
    "pc-weak": { cpuCount: 1, coreCount: 2, cpuClock: 3.9, littleCoreCount: 0, littleCoreClock: 0 },
    "pc-medium": { cpuCount: 1, coreCount: 6, cpuClock: 3.7, littleCoreCount: 0, littleCoreClock: 0 },
    "pc-strong": { cpuCount: 1, coreCount: 16, cpuClock: 3.5, littleCoreCount: 0, littleCoreClock: 0 },
    "mac-1": { cpuCount: 1, coreCount: 12, cpuClock: 3.54, littleCoreCount: 0, littleCoreClock: 0 },
    "phone-1": { cpuCount: 1, coreCount: 2, cpuClock: 3.46, littleCoreCount: 4, littleCoreClock: 2.02 },
    "gaming-console": { cpuCount: 1, coreCount: 8, cpuClock: 3.66, littleCoreCount: 0, littleCoreClock: 0 },
    "workstation": { cpuCount: 1, coreCount: 56, cpuClock: 1.9, littleCoreCount: 0, littleCoreClock: 0 },
    "server-intel": { cpuCount: 2, coreCount: 60, cpuClock: 1.9, littleCoreCount: 0, littleCoreClock: 0 },
    "server-amd": { cpuCount: 2, coreCount: 128, cpuClock: 2.25, littleCoreCount: 0, littleCoreClock: 0 },
    "supercomputer-1": { cpuCount: 32000, coreCount: 12, cpuClock: 2.2, littleCoreCount: 0, littleCoreClock: 0 },
    "supercomputer-2": { cpuCount: 40960, coreCount: 260, cpuClock: 1.45, littleCoreCount: 0, littleCoreClock: 0 },
};

// 添加事件监听器，以便在选择项更改时更新输入框的值
presetConfigSelect.addEventListener("change", function () {
    var selectedConfig = presetConfigSelect.value;
    var selectedParameters = configParameters[selectedConfig];
    if (selectedParameters) {
        cpuCountInput.value = selectedParameters.cpuCount;
        coreCountInput.value = selectedParameters.coreCount;
        cpuClockInput.value = selectedParameters.cpuClock;
        littleCoreCount.value = selectedParameters.littleCoreCount;
        littleCoreClock.value = selectedParameters.littleCoreClock;
    }
    analyzePassword();
});

// 添加事件监听器，以便在用户修改输入框时将预设配置更改为“自定义”
cpuCountInput.addEventListener("input", changeCustom);
coreCountInput.addEventListener("input", changeCustom);
cpuClockInput.addEventListener("input", changeCustom);
littleCoreCount.addEventListener("input", changeCustom);
littleCoreClock.addEventListener("input", changeCustom);

function changeCustom() {
    presetConfigSelect.value = "custom";
    analyzePassword();
}

// 初始时根据默认选择设置输入框的值
var initialSelectedConfig = presetConfigSelect.value;
var initialSelectedParameters = configParameters[initialSelectedConfig];
if (initialSelectedParameters) {
    cpuCountInput.value = initialSelectedParameters.cpuCount;
    coreCountInput.value = initialSelectedParameters.coreCount;
    cpuClockInput.value = initialSelectedParameters.cpuClock;
    littleCoreCount.value = initialSelectedParameters.littleCoreCount;
    littleCoreClock.value = initialSelectedParameters.littleCoreClock;
}