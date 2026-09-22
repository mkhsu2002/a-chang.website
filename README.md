# 阿昌清潔庇護工場網站

獨立靜態網站，部署目標為 Cloudflare Pages。

## 本地開發

```sh
npm run build
npm run dev
```

Cloudflare Pages 設定：建置指令 `npm run build`，輸出目錄 `dist`，不需要環境變數。待 DNS 切換至新站後，確認舊 WordPress 頁面轉址、Search Console 網站地圖與正式網域。

## 內容維護

頁面文字與 SEO 資料位於 `build.mjs`；版面位於 `style.css`；影像位於 `assets/`。產品價格、規格、合作方案以實際通路或工場回覆為準。發佈前請由工場確認聯絡電話、地址、營運資訊、商品連結與舊站網址對應。

站內 FAQ 僅記錄有據可查的常見問題；修改回答後須同步更新頁面與 JSON-LD。勿新增未驗證的銷售量、受益人數或當年度成果。

## 搜尋與上線檢核

- 每頁獨立 title、description、canonical、Open Graph、語意標題與麵包屑。
- `robots.txt`、`sitemap.xml` 與 Organization / WebSite / BreadcrumbList / FAQPage 結構化資料。
- `public/_redirects` 收納已確認的舊頁路徑；上線前可依原站匯出擴充轉址表。
- 若新站仍沿用原網域，DNS 指向 Cloudflare Pages 後需確認 HTTPS 與 301 狀態，並向 Google Search Console 提交網站地圖。
