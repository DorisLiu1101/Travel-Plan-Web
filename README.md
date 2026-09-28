
# 📖 雜誌風互動式行程網頁 (Travel Plan Web)

**重點摘要：**
* 本專案為一個「雜誌風」單頁式旅遊行程表。
* 採用「資料與畫面分離」架構，內建視覺化管理後台，無需具備程式基礎即可更新行程。
* 完美支援 GitHub Pages 免費部署，隨時隨地透過連結分享給旅伴。

---

## 📂 專案檔案結構

本專案極度輕量，僅由三個核心檔案組成：

* **`index.html` (前台展示頁面)**：採用 Vue 3 + Tailwind CSS 打造的雜誌風互動介面，自動讀取 `data.js` 渲染畫面。
* **`admin.html` (可視化管理後台)**：不需上傳至伺服器，純本地端執行的網頁，提供直覺的表單編輯介面。
* **`data.js` (資料庫檔案)**：存放所有行程的結構化資料（JSON格式），獨立抽離以方便抽換與管理。

## ✨ 核心特色

1. **長輩友善設計**：大字體、清晰對比、直覺的展開/收合卡片設計，確保閱讀舒適無負擔。
2. **一鍵導航功能**：景點旁附有地標圖示，點擊自動開啟 Google Maps 並帶入精準的地理關鍵字。
3. **免伺服器無痛後台**：透過 `admin.html` 視覺化修改每日標題、氣溫、航班、景點、圖片與貼心提醒，一鍵生成更新代碼，杜絕改錯 HTML 標籤的風險。
4. **沉浸式響應排版**：針對手機螢幕最佳化，滿版背景圖搭配深色漸層與毛玻璃效果，呈現實體旅行雜誌般的質感。

## 🚀 部署與更新指南

### 1. 初始部署 (發布至 GitHub Pages)
1. 將 `index.html` 與 `data.js` 上傳至您的 GitHub 儲存庫（如：`dorisliu1101/travel-plan-web`）。
2. 進入該儲存庫的 **Settings** 頁籤，於左側選單點選 **Pages**。
3. 在 Build and deployment 區塊下，將 Branch 設為 `main` (或 `master`) 並點擊 **Save**。
4. 靜待數分鐘，即可透過 `https://dorisliu1101.github.io/travel-plan-web/` 瀏覽您的專屬行程網頁。

### 2. 日常更新行程 (使用管理後台)
1. 在**您的電腦本機端**，對著 `admin.html` 點擊兩下，直接以瀏覽器開啟。
2. 在視覺化表單中，自由新增、刪除或修改行程資訊，或替換全新的 Unsplash 風景大圖網址。
3. 編輯完成後，點擊畫面右上角的 **「產生更新檔案 (data.js)」** 按鈕。
4. 系統會自動滑動至最下方，請複製黑底綠字的**完整代碼**。
5. 回到 GitHub 儲存庫，開啟並編輯 `data.js` 檔案，將剛剛複製的代碼**完全覆蓋**貼上。
6. 點擊 **Commit changes** 儲存。GitHub Pages 會在 1~3 分鐘內自動更新您的前台網頁。

## 🛠️ 技術棧 (Tech Stack)

* **Frontend UI**: HTML5, Tailwind CSS (CDN)
* **Framework**: Vue.js 3 (CDN)
* **Data Management**: JavaScript Object (JSON structure)
* **Deployment**: GitHub Pages (Static Site Hosting)