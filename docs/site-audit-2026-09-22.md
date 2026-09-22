# 網站版面與搜尋資料查核

日期：2026-09-22。實作、本地版面檢查及 Cloudflare 發布完成；本記錄包含本次實際公開 readback，未完成項目明列於限制。

## 實際觀察

- GitHub 原始版本：`da5e622`。工作目錄原為空，因此使用 clone 同步 `main`。
- GitHub Cloudflare check 指向 `a-chang-website`；公開站 `https://a-chang-website.pages.dev/` 的原 CSS 與 repo 雜湊一致。
- `https://a-chang.org/` 回傳 PHP/WordPress，`a-chang.website` DNS 未解析。原本新版 canonical/OG 指向舊站，會讓分享圖與新頁面 URL 錯置。
- 原 OG JPEG 雖為 1200 × 630，左側中文字卻呈現缺字方框，已目視確認。
- 原商品 CSS 已有三欄，但使用大幅方形圖片；首頁影片則只有右側欄位。原主圖重複 loading 屬性，內頁照片以固定高裁切。

## 完成修改

- 首頁影片獨立全寬、置中 16:9，桌面最大 1120px；保留 YouTube 原始觀看入口。
- 六款商品桌面三欄、平板兩欄、窄手機左右排列；圖片完整顯示，補上用途與一致的資訊層級。
- 共用 CSS 整理為可維護區塊，移除重複斷點；縮小 H1、內容空白與卡片間距；改善頁尾、FAQ、手機導覽與觸控區。
- 紀實影像保留完整比例，手機主圖調整人物裁切位置。圖片尺寸固定以減少版面跳動；首屏 eager/high priority，其餘 lazy。
- 手機選單支援 Escape、點外部、焦點離開與斷點改變時關閉；JS 不可用仍提供導航。
- 媒體頁加入三支可追溯影片與來源；移除公開頁面的「上線前請確認」等內部作業文字。
- metadata 以目前 Pages URL 為預設，`SITE_URL` 可統一切換網域；補齊 WebPage 關聯、OG 尺寸/type/alt、Twitter 分享資訊及真實 404。
- 首頁 VideoObject 日期改為來源所提供的完整帶時區時間；不建立虛構 product offer/rating。

## 來源（以下於本次實際查核）

- https://www.icareushop.com.tw/page/csr_kol ：讀取 HTML 中的公開內容資料，核對三支影片的標題及 ID。僅引用影片縮圖與原始觀看連結，未轉載整頁見證。
- https://www.youtube.com/watch?v=Ep_J2wxElGM ：`uploadDate=2023-01-13T08:01:12-08:00`、`lengthSeconds=199`。
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide ：以 SEO 基礎、可讀內容與來源為主，無另建 AI 專用 schema/llms.txt 的必要。
- https://developers.google.com/search/updates ：FAQ 富摘要不作為本次交付承諾，FAQPage 僅表述可見問答內容。

## OG 資產

`assets/og.jpg`：使用內建 imagegen 修復分享圖片，再轉為 1200 × 630 JPEG（約 103 KiB）。生成規格為保留原工場照片構圖與深綠左欄，修復繁體中文字、使用下列既有品牌文案，無新增成果或見證：

「阿昌清潔庇護工場」「讓一份日常採購」「支持一份工作」「公益紙品・清潔服務・社區關懷」。

這是分享用合成視覺，站內原始工作紀實照片維持原檔。

## 驗證

- `npm run build`、`npm run check`：九頁 + 404、唯一 title/description、canonical、可解析 JSON-LD、FAQ 與 schema 一致、六款產品與 22 則故事、圖片屬性、站內連結、sitemap/robots。
- 專屬 canonical lane：`codex-flypig-ai`，CDP `127.0.0.1:9241`；只檢查公開站／localhost，未操作登入後平台、未切換個人瀏覽器。
- 九頁 × 320、390、768、1024、1280、1440px，共 54 組：沒有橫向溢出，每頁單一 H1，已載入影像無破圖。
- 1440px 商品座標：首排三款、次排三款；首頁影片寬 1120px 置中。
- 390px 選單開啟、Escape 關閉與 FAQ 展開通過。
- 全頁截圖需先捲動讓 lazy media 載入，不能把尚未載入的影像誤判為缺失。

## 限制與後續

- 新站部署於 Pages 並不表示 `a-chang.org` 已切換；DNS、Search Console 與正式網域搬移另需實際操作及確認。
- 聯絡資訊與六款商品資料沿用原 repo。本文未宣稱重新電話查核營運、庫存或社群登入後內容。
- 外部 YouTube 可用性與 Facebook 登入限制取決於外部平台。
- 未修改 Cloudflare build watch paths；README 記錄後續設定所需的來源路徑，不能宣稱 docs-only 平台 gating 已完成。

## 發布記錄

- 程式版本：`7ab2ee14c625a7261a89d847289a8c71fac71fc4`，已推送 `main`。
- Cloudflare Pages check：`completed / success`；部署 ID：`52627609-5158-4c35-a06b-358ee5d46f4f`。
- 公開九頁 HTTP 200、每頁 canonical 正確；OG 為 `image/jpeg`、robots 為純文字、sitemap 為 XML。
- 線上 `style.css`、`site.js`、`assets/og.jpg`、`robots.txt`、`sitemap.xml` 與本次 `dist` 逐位元比對一致。
- `/this-page-does-not-exist/` 實際回傳 HTTP 404，含 noindex 的 404 頁。
- 本地 54 組版面檢查及兩種尺寸全頁截圖完成；最後一次線上瀏覽器連線遇到 `Browser.setDownloadBehavior: Browser context management is not supported`，依身分隔離規則停止該次 UI 操作，未使用其他瀏覽器 fallback。線上確認依 HTTP readback 與部署資產比對，並未聲稱重新截取線上畫面。
- 此發布紀錄後續為 docs-only commit，使用 Cloudflare 官方 `[CF-Pages-Skip]` 前綴避免再次部署；程式與公開輸出不變。[官方說明](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/)。
