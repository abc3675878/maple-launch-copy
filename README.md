# Maple Launch Copy

Maple Launch Copy 是提供給 **在 Mac 電腦使用 CrossOver 遊玩台版《新楓之谷：經典版》** 玩家使用的超輕量 Chrome 擴充功能。

台版《新楓之谷：經典版》官網在 macOS 上不會直接啟動 CrossOver Bottle。玩家每次登入並選擇遊戲帳號後，這個擴充功能會在本機讀取官網當次產生的啟動參數，使用官網載入的 `NGM.GenerateArgumentWindows()` 重建 CrossOver 可執行的啟動碼，接著：

- 自動複製完整的 `"ngm://launch/ ..."` 到剪貼簿。
- 在官網上方顯示綠色「已複製啟動碼」。
- 不需要每次開啟 Chrome 開發者工具手動執行程式碼。

> [!IMPORTANT]
> 本工具不會讓 macOS 原生執行遊戲。你仍需自行安裝 CrossOver、建立 Bottle，並在同一個 Bottle 內安裝官方 Nexon Game Manager（NGM）及遊戲所需元件。

## 適用對象

- 使用 Mac 電腦。
- 使用 Chrome 登入《新楓之谷：經典版》官網。
- 使用 CrossOver 執行 Windows 版 NGM／遊戲。
- 已能在 CrossOver 的 Run Command 貼上 `ngm://launch/ ...` 啟動碼。

不適用於 Windows 原生玩家，也不會安裝 CrossOver、NGM 或遊戲本體。

## 使用前準備

開始前請先確認：

1. Mac 已安裝合法版本的 CrossOver。
2. CrossOver 內已建立用來執行遊戲的 Windows Bottle。
3. 該 Bottle 已安裝 Nexon 官方 NGM；只有空 Bottle 無法執行啟動碼。
4. Chrome 可以正常開啟並登入[《新楓之谷：經典版》官網](https://maplestoryclassic.beanfun.com/Main)。

## 安裝擴充功能

1. 從 GitHub Releases 下載最新的 `MapleLaunchCopy-vX.X.X.zip`。
2. 將 ZIP 解壓縮，保留裡面的 `MapleLaunchCopy` 資料夾。
3. 在 Chrome 網址列輸入 `chrome://extensions/`。
4. 開啟右上角的「開發人員模式」。
5. 按「載入未封裝項目」。
6. 選擇解壓縮後的 `MapleLaunchCopy` 資料夾。
7. 確認擴充功能清單顯示 Maple Launch Copy，且開關已啟用。
8. 如果遊戲官網原本已經開啟，請重新整理官網分頁。

更新版本時，請用新版檔案取代舊資料夾，再到 `chrome://extensions/` 按 Maple Launch Copy 卡片上的「重新載入」按鈕，最後重新整理遊戲官網。

## 每次啟動遊戲的完整流程

1. 使用 Chrome 開啟[《新楓之谷：經典版》官網](https://maplestoryclassic.beanfun.com/Main)。
2. 按官網的「啟動遊戲」。
3. 自行完成 beanfun!／Gama Pass 登入與身分驗證。
4. 選擇要使用的遊戲帳號。
5. 按「繼續」。
6. 瀏覽器返回遊戲官網後，等待畫面上方出現綠色「已複製啟動碼」。
7. 開啟 CrossOver，進入已安裝 NGM 的遊戲 Bottle。
8. 開啟 Run Command（執行命令）。
9. 直接貼上剪貼簿內容；內容應是帶雙引號的 `"ngm://launch/ ..."`。
10. 按執行，讓 Bottle 內的 NGM 接手啟動遊戲。

啟動碼包含當次登入的短效驗證資料。每次玩遊戲都應重新登入、重新取得，不要保存或重用舊啟動碼。

## 成功時會看到什麼

登入並按「繼續」後，官網上方會短暫出現：

> 已複製啟動碼

此時不需要打開 Console，也不需要手動選取啟動碼；直接到 CrossOver 貼上即可。

## 常見問題

### 沒有出現「已複製啟動碼」

依序檢查：

1. `chrome://extensions/` 中的 Maple Launch Copy 是否已啟用。
2. 擴充功能版本是否為最新版本。
3. 安裝或更新後是否重新整理過遊戲官網。
4. 是否確實完成遊戲帳號選擇並按下「繼續」。
5. 目前網址是否為 `https://maplestoryclassic.beanfun.com/` 網域。

若官網更新了 NGM 啟動流程，擴充功能可能需要同步更新。

### 顯示已複製，但 CrossOver 沒有啟動

- 確認貼上的是最新一次登入產生的完整內容。
- 確認內容前後的雙引號仍存在。
- 確認正在正確的 CrossOver Bottle 中執行。
- 確認該 Bottle 已安裝官方 NGM，而不是空 Bottle。
- 舊的啟動碼可能已過期，請重新登入取得。

### Chrome 顯示只能在 Windows 使用

這是官網對 macOS 顯示的提示。本擴充功能只負責把 Windows NGM 啟動碼轉交給你在 Mac 上使用的 CrossOver Bottle，不會改變官網的作業系統判斷。

### 可以把啟動碼傳給別人嗎？

不可以。啟動碼含短效驗證資訊，請勿分享、截圖、上傳、貼到 GitHub Issue，或保存在公開位置。

## 權限與隱私

- 擴充功能只會在 `https://maplestoryclassic.beanfun.com/*` 執行。
- `clipboardWrite` 權限只用於將當次轉換完成的啟動碼寫入剪貼簿。
- 不讀取或代填帳號密碼。
- 不使用遠端伺服器。
- 不傳輸、不儲存、不分析啟動碼。
- 不包含廣告、追蹤碼或使用情況分析。

完整說明請見 [PRIVACY.md](PRIVACY.md)。

## 安全回報

可以透過 GitHub Issues 回報問題，但請使用假的測試值，並遵守 [SECURITY.md](SECURITY.md)。不要附上真實啟動碼、存取權杖、密碼、Cookie、遊戲帳號或含有登入資訊的截圖。

## 免責聲明

Maple Launch Copy 是非官方社群工具，與遊戲橘子、beanfun!、Nexon 或 CodeWeavers 無關。

CrossOver 執行方式屬非官方相容性方案，不能保證所有 Mac、CrossOver 版本或遊戲更新皆可正常運作。使用者應自行遵守遊戲、平台及 CrossOver 的服務條款。此專案不包含破解、授權繞過、遊戲巨集、外掛、自動操作或反作弊規避功能。

## 開發與檢查

```bash
node --check bridge.js
node --check capture.js
python3 -m json.tool manifest.json
```

## 授權

[MIT License](LICENSE)
