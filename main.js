// main.js

/**
 * クリップボードにテキストをコピーし、トースト通知を表示する関数
 * @param {string} text コピーする文字列
 */
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('コピーしました！');
        }).catch(err => {
            console.error('クリップボードへのコピーに失敗しました', err);
            showToast('コピーに失敗しました');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showToast('コピーしました！');
        } catch (err) {
            console.error('Fallback: コピーに失敗しました', err);
            showToast('コピーに失敗しました');
        }
        document.body.removeChild(textArea);
    }
}

/**
 * トースト通知を表示する
 * @param {string} message 表示するメッセージ
 */
function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = "show";
    
    setTimeout(function() {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}
