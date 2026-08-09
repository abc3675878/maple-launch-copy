(() => {
  "use strict";

  const MESSAGE_SOURCE = "maple-launch-copy";
  let copiedArgument = "";

  function markStatus(status) {
    const apply = () => {
      if (document.documentElement) {
        document.documentElement.dataset.mapleLaunchCapture = status;
      }
    };
    apply();
    if (!document.documentElement) setTimeout(apply, 0);
  }

  function sendToClipboard(url) {
    if (typeof url !== "string" || !url.startsWith("ngm://launch/ ")) return false;
    markStatus("captured");
    window.postMessage({ source: MESSAGE_SOURCE, url }, "*");
    return true;
  }

  // 主流程：使用官網已建立的 NGM 資料重建 Windows/CrossOver 啟動碼。
  function copyFromNgmLayer() {
    const helper = window.NgmLayerHelper;
    const ngm = window.NGM;
    if (!helper?.argument || typeof ngm?.GenerateArgumentWindows !== "function") {
      return false;
    }
    if (helper.argument === copiedArgument) return true;

    try {
      const passarg = new URLSearchParams(helper.argument).get("passarg");
      if (passarg == null) return false;

      const windowsArgument = ngm.GenerateArgumentWindows(
        "launch",
        String(helper.gamecode),
        null,
        null,
        passarg,
        null,
        null,
        null,
        null,
        null,
        null
      );

      if (!windowsArgument) return false;
      copiedArgument = helper.argument;
      return sendToClipboard("ngm://launch/ " + encodeURIComponent(windowsArgument));
    } catch {
      return false;
    }
  }

  markStatus("waiting");
  copyFromNgmLayer();
  const ngmTimer = setInterval(() => {
    if (copyFromNgmLayer()) clearInterval(ngmTimer);
  }, 50);

})();
