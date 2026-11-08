# گزارش بررسی مخازن، کیفیت فنی و دسترسی Render — رادمهر گروپ

تاریخ بررسی: ۸ نوامبر ۲۰۲۶  
مخزن قابل دسترسی: `farahnazasgharpour1-glitch/radmehr-group-protofilo-`  
شاخه انتشار فعلی: `main`  
شاخه ابزارهای کنترل کیفیت: `quality-tooling/bootstrap`

## ۱) وضعیت دسترسی به مخازن

- مخزن `radmehr-group-protofilo-` از طریق اتصال GitHub قابل خواندن است.
- مخزن `radmehr-group-portfolio` با URL اعلام‌شده پاسخ 404 می‌دهد و جست‌وجوی مخازن نیز نتیجه‌ای برای آن برنگرداند. بنابراین در این بررسی نتوانستم نسخه قدیمی‌ترِ دارای انیمیشن‌های Lenis/GSAP را از آن مخزن بازیابی یا با نسخه فعلی مقایسه کنم. ممکن است نام مخزن عوض شده، حذف شده یا دسترسی آن محدود شده باشد.
- هیچ تغییری در شاخه `main` یا تنظیمات Render انجام نشده است.

## ۲) وضعیت نسخه فعلی سایت در main

Commit بررسی‌شده: `402afb7492a3427cdc15606da423f38eec5924c3` — `Initial optimized Radmehr Group website`

مشاهدات کد:

- پروژه یک سایت Static HTML/CSS/JavaScript است و در ریشه، `index.html` دارد.
- صفحه اصلی یک بخش تصویری شاخص با کلاس `featured-project` دارد. تصویر اصلی با `loading="eager"` و `fetchpriority="high"` بارگذاری می‌شود و نسخه‌های واکنش‌گرا در `srcset` تعریف شده‌اند.
- منطق منو، تغییر تم، کارت‌های پروژه و کنترل صفحه با JavaScript بومی انجام می‌شود.
- در `js/main.js` گالری `project-showcase` به‌عنوان اسکرول افقی native توصیف شده است؛ کلیدهای جهت‌دار آن را کنترل می‌کنند و اسکرول عمودی صفحه لغو نمی‌شود.
- در نسخه فعلیِ بررسی‌شده، بارگذاری یا فراخوانی اجرایی Lenis، GSAP یا ScrollTrigger دیده نشد. در نتیجه انیمیشن افقیِ متصل به اسکرول عمودی در این نسخه پیاده‌سازی نشده؛ گالری از اسکرول افقی طبیعی استفاده می‌کند.
- CSS شامل انتقال‌ها و افکت‌های hover است، اما بازسازی کامل انیمیشن‌های نسخه قدیمی از روی این مخزن به‌تنهایی ممکن نیست.
- فایل HTML دارای یک توضیح قدیمی درباره «آماده‌سازی اتصال به CDNها» است؛ این توضیح باید در پاک‌سازی بعدی حذف شود تا با معماری واقعی فایل‌ها تناقض نداشته باشد.
- Canonical، Open Graph و JSON-LD فعلاً به `https://radmehr-group-demo.onrender.com/` اشاره دارند. پس از تثبیت دامنه نهایی باید تمام URLهای مطلق SEO یکجا اصلاح شوند.
- تصویر اصلی Hero از اولویت بارگذاری بالا برخوردار است؛ تصاویر پایین صفحه lazy-load شده‌اند. باید در مرورگر واقعی، پاسخ 200 تمام فایل‌های تصویر و نسخه‌های srcset بررسی شود.

## ۳) ابزارهای کنترل کیفیت در شاخه جداگانه

شاخه `quality-tooling/bootstrap` از `main` جداست و شامل پیکربندی‌های زیر است:

- ESLint برای JavaScript
- HTML-ESLint برای HTML
- Stylelint برای CSS
- Lighthouse CI برای Performance، Accessibility، Best Practices و SEO
- CodeQL برای تحلیل امنیتی JavaScript
- Dependabot برای به‌روزرسانی هفتگی npm و GitHub Actions
- `npm audit` برای آسیب‌پذیری وابستگی‌های توسعه

این ابزارها فقط در CI و محیط توسعه اجرا می‌شوند و به فایل‌های دانلودی بازدیدکننده سایت اضافه نمی‌شوند.

### نتیجه آخرین اجرای قابل مشاهده

Workflow: `Quality and Render diagnostics`  
Run: https://github.com/farahnazasgharpour1-glitch/radmehr-group-protofilo-/actions/runs/42451863471

- نصب ابزارهای توسعه: موفق
- npm audit: موفق
- ESLint: موفق
- HTML-ESLint: موفق
- Stylelint: موفق
- بررسی DNS و HTTPS از شبکه GitHub: موفق
- Lighthouse CI: هنگام ثبت این گزارش هنوز در حال اجرا بود؛ بنابراین هیچ امتیاز Lighthouse در این گزارش ادعا نمی‌شود.

Workflow امنیتی CodeQL در آخرین اجرا موفق بوده است:
https://github.com/farahnazasgharpour1-glitch/radmehr-group-protofilo-/actions/runs/42451863497

نکته: در شاخه ابزارها هنوز `package-lock.json` به‌صورت دائمی در مخزن ثبت نشده و در CI به‌صورت موقت تولید می‌شود. پیش از ادغام این شاخه در main باید lockfile بازبینی و commit شود تا نصب وابستگی‌های انتقالی قابل تکرار باشد.

### SonarQube

در این مرحله اضافه‌کردن SonarQube ضروری نیست. برای پروژه استاتیک فعلی، ESLint، HTML-ESLint، Stylelint، CodeQL، npm audit و Lighthouse CI پوشش مناسبی ایجاد می‌کنند. SonarQube/SonarCloud را فقط در صورت رشد پروژه، نیاز به Quality Gate سازمانی یا تحلیل عمیق‌تر کیفیت و تکرار کد اضافه می‌کنیم. اتصال آن به حساب و token اختصاصی نیاز دارد.

## ۴) تشخیص مشکل بازنشدن آدرس Render

آدرس بررسی‌شده:
`https://radmehr-group-v2-preview.onrender.com/`

در سیستم کاربر، درخواست‌های `nslookup` برای دامنه‌های `onrender.com`، سایت قدیمی و سایت جدید Timeout شده‌اند؛ در حالی که درخواست برای `google.com` و `render.com` از همان DNSها پاسخ گرفته است.

در مقابل، job مستقل GitHub Actions با عنوان `Compare Render DNS and HTTPS from GitHub's network` با موفقیت کامل شده است:
- حل DNS سیستم برای `onrender.com`: موفق
- حل DNS سیستم برای زیردامنه Preview: موفق
- Google DNS-over-HTTPS: موفق
- دریافت HTTPS سایت Preview و دریافت HTML: موفق

بنابراین شواهد فعلی نشان می‌دهد دامنه در شبکه GitHub قابل resolve است و سایت از آن شبکه پاسخ HTTPS می‌دهد؛ خطای کاربر به احتمال زیاد مربوط به مسیر DNS یا سیاست/محدودیت شبکه محلی است، نه کد HTML/CSS/JavaScript سایت. این نتیجه محل دقیق محدودیت (مودم، DNS resolver، اپراتور یا مسیر شبکه) را مشخص نمی‌کند.

نکته مهم: خطای DNS قبل از دریافت فایل‌های سایت رخ می‌دهد؛ پس تغییر انیمیشن‌ها یا CSS نمی‌تواند علت مستقیم Timeout در `nslookup` باشد.

## ۵) تصمیم معماری انیمیشن برای نسخه بعد

تا زمان بازیابی مخزن قدیمی، تغییر بصری یا جایگزینی انیمیشن‌ها انجام نشود.

معماری هدف پس از دسترسی به مرجع طراحی:

1. CSS برای transition، opacity، transform و افکت‌های ظریف.
2. JavaScript بومی و IntersectionObserver برای ورود مرحله‌ای متن‌ها، کارت‌ها و تصاویر.
3. حرکت افقی متصل به اسکرول عمودی فقط در بخش «از ایده تا ماندگاری»؛ ابتدا با راهکار بومی سازگار آزمایش شود و اگر کنترل پیچیده لازم بود، GSAP و ScrollTrigger به‌صورت فایل محلی و نسخه ثابت استفاده شوند.
4. Lenis فعلاً اضافه نشود؛ اسکرول طبیعی مرورگر حفظ شود مگر آزمون واقعی نیاز روشنی به آن نشان دهد.
5. از CDN خارجی برای کتابخانه‌های ضروری استفاده نشود.
6. پشتیبانی از `prefers-reduced-motion` و کاهش/حذف افکت‌های غیرضروری در موبایل و دستگاه‌های ضعیف.
7. از تغییرهای پیوسته layout مانند انیمیشن width/height/top/left اجتناب و تا جای ممکن transform/opacity استفاده شود.
8. تصویر Hero با اولویت بالا و تصاویر پایین صفحه lazy-load شوند؛ اندازه‌ها و srcset مطابق viewport انتخاب شوند.

## ۶) چک‌لیست پیش از ادغام یا انتشار

- [ ] بازیابی URL صحیح مخزن `radmehr-group-portfolio` یا ارائه دسترسی/نسخه پشتیبان آن.
- [ ] مقایسه دقیق HTML/CSS/JS نسخه قدیمی دارای انیمیشن با نسخه فعلی.
- [ ] بازسازی افکت‌های مورد تأیید بدون حذف هویت بصری.
- [ ] اجرای ESLint، HTML-ESLint و Stylelint و رسیدگی موردی به هشدارها؛ از auto-fix سراسری CSS استفاده نشود.
- [ ] ثبت و بازبینی `package-lock.json`.
- [ ] بررسی گزارش Lighthouse کامل و تعیین baseline واقعی موبایل/دسکتاپ.
- [ ] بررسی فایل‌های تصویری، ابعاد، فرمت، srcset، preload و پاسخ‌های Network.
- [ ] بررسی فونت Estedad و اطمینان از عدم بارگذاری فونت خارجی.
- [ ] بررسی تمام صفحات، لینک‌ها، فرم تماس، مسیر 404، metadata و sitemap.
- [ ] آزمایش روی موبایل واقعی و مرورگرهای هدف؛ Chrome 109 باید جداگانه بررسی شود.
- [ ] انتشار ابتدا روی Preview؛ فقط پس از تأیید کاربر ادغام در main و Deploy تولیدی.

## ۷) منابع و پیوندهای پروژه

- مخزن قابل دسترسی: https://github.com/farahnazasgharpour1-glitch/radmehr-group-protofilo-
- شاخه کنترل کیفیت: https://github.com/farahnazasgharpour1-glitch/radmehr-group-protofilo-/tree/quality-tooling/bootstrap
- گزارش ابزارها: https://github.com/farahnazasgharpour1-glitch/radmehr-group-protofilo-/blob/quality-tooling/bootstrap/QUALITY-TOOLS-FA.md
- گزارش ممیزی فعلی: https://github.com/farahnazasgharpour1-glitch/radmehr-group-protofilo-/blob/main/AUDIT-FA.md
- اجرای Quality و DNS: https://github.com/farahnazasgharpour1-glitch/radmehr-group-protofilo-/actions/runs/42451863471
- اجرای CodeQL: https://github.com/farahnazasgharpour1-glitch/radmehr-group-protofilo-/actions/runs/42451863497
