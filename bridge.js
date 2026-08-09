(() => {
  "use strict";

  const MESSAGE_SOURCE = "maple-launch-copy";
  let lastCopied = "";

  function markStatus(status) {
    const apply = () => {
      if (document.documentElement) {
        document.documentElement.dataset.mapleLaunchCopy = status;
      }
    };
    apply();
    if (!document.documentElement) setTimeout(apply, 0);
  }

  function legacyCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    Object.assign(textarea.style, {
      position: "fixed",
      left: "-9999px",
      top: "0",
      opacity: "0"
    });
    (document.body || document.documentElement).appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    if (!copied) throw new Error("execCommand copy failed");
  }

  async function copyText(text) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(text);
    } catch {
      legacyCopy(text);
    }
  }

  markStatus("bridge-ready");

  function showToast(message, isError = false) {
    const oldToast = document.getElementById("maple-launch-copy-toast");
    if (oldToast) oldToast.remove();

    const toast = document.createElement("div");
    toast.id = "maple-launch-copy-toast";
    toast.textContent = message;
    Object.assign(toast.style, {
      position: "fixed",
      top: "18px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: "2147483647",
      padding: "11px 16px",
      borderRadius: "10px",
      color: "#fff",
      background: isError ? "#a52828" : "#176b3a",
      font: "600 14px -apple-system, BlinkMacSystemFont, sans-serif",
      boxShadow: "0 5px 20px rgba(0, 0, 0, .25)",
      pointerEvents: "none"
    });

    (document.body || document.documentElement).appendChild(toast);
    setTimeout(() => toast.remove(), 2600);
  }

  window.addEventListener("message", async (event) => {
    if (event.source !== window || event.data?.source !== MESSAGE_SOURCE) return;

    const url = event.data.url;
    if (typeof url !== "string" || !url.startsWith("ngm://launch")) return;
    if (url === lastCopied) return;

    const quotedUrl = `"${url}"`;

    try {
      await copyText(quotedUrl);
      lastCopied = url;
      markStatus("copied");
      showToast("已複製啟動碼");
    } catch {
      markStatus("copy-failed");
      showToast("自動複製失敗，請允許此擴充功能使用剪貼簿", true);
    }
  });
})();
