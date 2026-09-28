
# 📖 雜誌風互動式行程網頁 (Travel Plan Web)

**重點摘要：**
* 本專案為一個「雜誌風」單頁式旅遊行程表。
* 採用「資料與畫面分離」架構，內建視覺化管理後台，無需具備程式基礎即可更新行程。
* 完美支援 GitHub Pages 免費部署，隨時隨地透過連結分享給旅伴。

---

## 📂 專案檔案結構

本專案包含前台總覽、行程管理器與獨立的攻略頁資料：

* **`index.html` (攻略總覽)**：讀取根目錄的 `catalog.js`，列出所有已登錄的旅遊攻略；「設置」可管理首頁標題、背景圖與攻略清單。
* **`admin.html` (行程管理後台)**：可選擇 `WebPage` 中的 JavaScript 資料檔，修改每日行程後匯出並沿用來源檔名。
* **`WebPage/` (攻略頁資料夾)**：每個攻略 HTML 自動讀取同資料夾、同檔名的 JS，例如 `2610.html` 讀取 `2610.js`。
* **`catalog.js` (總覽清單)**：位於與 `index.html` 相同目錄，保存首頁標題、背景圖，以及要顯示的 HTML 檔名、標題、日期、封面圖與說明。
* **`PageSample.html` (新增攻略範本)**：複製到 `WebPage/` 後，HTML 會自動配對同名 JS。

## ✨ 核心特色

1. **長輩友善設計**：大字體、清晰對比、直覺的展開/收合卡片設計，確保閱讀舒適無負擔。
2. **一鍵導航功能**：景點旁附有地標圖示，點擊自動開啟 Google Maps 並帶入精準的地理關鍵字。
3. **免伺服器無痛後台**：透過 `admin.html` 視覺化修改每日標題、氣溫、航班、景點、圖片與貼心提醒，一鍵生成更新代碼，杜絕改錯 HTML 標籤的風險。
4. **沉浸式響應排版**：針對手機螢幕最佳化，滿版背景圖搭配深色漸層與毛玻璃效果，呈現實體旅行雜誌般的質感。

## 🚀 部署與更新指南

### 1. 初始部署 (發布至 GitHub Pages)
1. 將 `index.html`、`admin.html`、`WebPage/` 及其內容上傳至您的 GitHub 儲存庫（如：`dorisliu1101/travel-plan-web`）。
2. 進入該儲存庫的 **Settings** 頁籤，於左側選單點選 **Pages**。
3. 在 Build and deployment 區塊下，將 Branch 設為 `main` (或 `master`) 並點擊 **Save**。
4. 靜待數分鐘，即可透過 `https://dorisliu1101.github.io/travel-plan-web/` 瀏覽您的專屬行程網頁。

### 2. 日常更新行程 (使用管理後台)
1. 在**您的電腦本機端**，以瀏覽器開啟 `admin.html`。
2. 點選資料來源的加號可建立含空白 Day 1 的新行程 JS；支援時可選擇存放位置，不支援時會下載草稿。編輯既有資料則點「選取本機 JS」，選取 `WebPage/` 中的檔案，例如 `2610.js`。
3. 修改每日行程或標題設定後，在「行程設置」的更新檔預覽區查看內容；按頂列磁碟圖示並授權可回寫原檔，或複製／下載更新檔作為備援。
4. 將修改後的 JS 提交到 GitHub，GitHub Pages 才會更新線上網站。
5. 新增攻略時，將 `PageSample.html` 複製到 `WebPage/` 並與資料 JS 使用相同檔名，再到首頁「設置」新增攻略項目。
6. 提交後 GitHub Pages 會自動更新總覽與攻略頁。

### 管理首頁攻略清單
1. 在 `index.html` 點選主標題下方的「設置」，選取本機 `catalog.js` 以啟用回寫。
2. 編輯首頁標題、背景圖，以及攻略標題、日期、說明、HTML 檔名與封面圖片；也可載入其他 `catalog.js`、新增或刪除項目。
3. 按磁碟圖示並授權寫入，或產生預覽後複製／下載 `catalog.js` 作為備援。

管理器支援由管理器匯出的資料型 JS，內容包含 `const itineraryData = [...]`，並可選擇性包含 `const siteSettings = {...}`。直接回寫需使用支援 File System Access API 的瀏覽器並明確授權；GitHub Pages 上的修改仍只會寫到使用者選取的本機檔案，需另行提交至 GitHub 才會更新線上網站。

## 🛠️ 技術棧 (Tech Stack)

* **Frontend UI**: HTML5, Tailwind CSS (CDN)
* **Framework**: Vue.js 3 (CDN)
* **Data Management**: JavaScript Object (JSON structure)
* **Deployment**: GitHub Pages (Static Site Hosting)