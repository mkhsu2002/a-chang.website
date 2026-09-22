# 阿昌清潔庇護工場網站

獨立靜態網站，部署於 Cloudflare Pages，無後端、資料庫或執行階段套件。

- 新站：https://a-chang-website.pages.dev/
- GitHub：`main`；Cloudflare Pages 專案：`a-chang-website`
- 2026-09-22 查核：`a-chang.org` 仍為舊 WordPress，不代表本 repo 已部署到該網域。`a-chang.website` 是 repo 名稱，目前未解析為網站。

## 本地開發與檢查

```sh
npm run build
npm run check
npm run dev
```

`build` 輸出九個公開頁面、404、sitemap、robots 及靜態資產到 `dist/`。`check` 檢查唯一標題與摘要、canonical、JSON-LD、FAQ 內容一致性、六款產品、22 則故事、圖片尺寸與站內連結。`dev` 在 http://localhost:4173 提供預覽。

Cloudflare Pages 建置指令為 `npm run build`，輸出目錄為 `dist`。CSS、互動腳本及 OG URL 帶內容雜湊，避免改版後沿用舊資產快取。

## 網域與發布

`SITE_URL` 預設為實際提供新版網站的 `https://a-chang-website.pages.dev`。canonical、OG URL/圖片、組織與頁面 schema、robots 及 sitemap 共用此來源，不指向尚未切換的舊站。

正式切換 `a-chang.org` 時，須先完成 Cloudflare 自訂網域及 DNS，設定 `SITE_URL=https://a-chang.org` 後重新建置；同步驗證 HTTPS、九頁、OG 圖、sitemap、robots、舊網址 301 與不存在頁面 404，再向 Search Console 提交新 sitemap。新舊站網址的轉址亦需一併確認，不可只修改 canonical。

本 repo 沒有 GitHub Actions 或 cron。Cloudflare Git 整合發布狀態以 GitHub `Cloudflare Pages` check 與公開 readback 為準。後續如調整 Cloudflare build watch paths，只納入 `build.mjs`、`style.css`、`stories.json`、`assets/**`、`public/**`、`package.json` 與 `scripts/**`；README/docs-only 更新不應觸發正式建置。此次未更動平台上的 watch paths 設定；純文件紀錄使用 Cloudflare 官方 `[CF-Pages-Skip]` commit 前綴略過建置。

## 內容與版型

| 檔案 | 用途 |
| --- | --- |
| `build.mjs` | 頁面內容、六款紙品、FAQ、SEO 與 schema、靜態建置 |
| `style.css` | 共用版型、桌面／平板／手機斷點 |
| `public/site.js` | 手機選單、Escape 關閉、焦點離開與視窗變化處理 |
| `stories.json` | 22 則歷史故事的照片與原始 Facebook 連結 |
| `assets/` | 既有紀實影像、商品圖與 1200 × 630 OG 分享圖 |
| `public/_redirects` | 已確認的舊網址轉址 |
| `scripts/check.mjs` | 建置後內容與連結檢查 |
| `docs/site-audit-2026-09-22.md` | 本次修改、驗證與仍待確認事項 |

首頁影片獨立置中，最大寬度 1120px、固定 16:9。公益紙品在 768px 以上每排三款，541–767px 每排兩款，540px 以下為單列左圖右文。圖片採 `contain`，保留包裝文字。一般內容頁縮小標題與留白，歷史紀實照片保留原比例，所有頁面都有主要內容跳轉與鍵盤焦點樣式。

媒體頁引用 ICAREU 嚴選「生活微公益」頁面的三支 YouTube 影片，附來源連結；未複製無法驗證的見證或當年度成果。產品價格、庫存、規格及合作方案以通路或工場回覆為準，本站不宣稱即時庫存、不建立虛構價格或評分。

## SEO / GEO / AEO 與分享

- 每頁獨立 title、description、canonical、Open Graph、Twitter Card 與語意標題。
- Organization / WebSite / WebPage（含 AboutPage、ContactPage、CollectionPage）/ BreadcrumbList；商品使用 ItemList。
- FAQ HTML 與 FAQPage 由同一份資料產生，影片日期與長度依 YouTube 實際頁面查核。
- SEO/GEO/AEO 以可讀內容、來源、明確組織與聯絡資訊、可抓取頁面與一致資料為主；不保證排名、AI 引用或 FAQ rich result。
- OG 為實際 JPEG 1200 × 630，提供尺寸、類型與替代文字。圖片有更新時內容雜湊亦會更新。
- 真正的 `404.html` 防止 Cloudflare Pages 對錯誤網址回傳首頁形成 soft 404。

## 歷史內容限制

原站「獨居長輩的故事」提供 22 個故事標題、單張影像與 Facebook 原文連結，未在站內刊載全文。目前保留每則影像與原文連結。Facebook 可能要求登入；取得工場原始文稿或授權匯出後才能補為本站文章。工場歷史人數與行動日期不代表目前成果，勿自行更新。
