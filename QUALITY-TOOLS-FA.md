# راهنمای ابزارهای کنترل کیفیت رادمهر گروپ

این تنظیمات در شاخه‌ی جداگانه‌ی `quality-tooling/bootstrap` آماده شده‌اند. شاخه‌ی اصلی `main` و سرویس‌های Render تغییر نکرده‌اند.

## ابزارها

| ابزار | کاربرد |
|---|---|
| ESLint | بررسی خطاها و الگوهای مشکل‌دار JavaScript |
| HTML-ESLint | بررسی ساختار HTML، ویژگی‌های دسترس‌پذیری و تصویرهای بدون متن جایگزین |
| Stylelint | بررسی CSS، خطاهای نحوی و هشدارهای تکرار قانون یا ترتیب Specificity |
| Lighthouse CI | اندازه‌گیری Performance، Accessibility، Best Practices و SEO برای صفحات اصلی |
| CodeQL | تحلیل ایستای امنیتی JavaScript |
| Dependabot | پیشنهاد هفتگی به‌روزرسانی وابستگی‌های npm و GitHub Actions |
| npm audit | بررسی آسیب‌پذیری وابستگی‌های ابزار توسعه |

این ابزارها فقط در محیط CI اجرا می‌شوند و به فایل‌های قابل دانلود بازدیدکنندگان سایت اضافه نمی‌شوند.

## اجرای خودکار

Workflowها در GitHub Actions و روی Ubuntu با Node.js 24 اجرا می‌شوند. این تصمیم برای سازگاری با ابزارهای جدید است؛ روی Windows 8.1 لازم نیست Node جدید نصب شود.

- با Push به `main` یا `quality-tooling/bootstrap`، کنترل کیفیت و بررسی DNS/HTTPS اجرا می‌شوند.
- با Pull Request به `main` نیز بررسی‌ها اجرا می‌شوند.
- CodeQL برای هر دو شاخه و به‌صورت هفتگی اجرا می‌شود.
- گزارش‌های Lighthouse و فایل lock موقت به‌صورت GitHub Actions artifact و با ماندگاری ۷ روز نگهداری می‌شوند.

## فرمان‌های محلی

پس از نصب Node.js سازگار و وابستگی‌ها:

```bash
npm run lint:js
npm run lint:html
npm run lint:css
npm run lint
npm run lhci
```

به‌دلیل Windows 8.1، اجرای اصلی فعلاً در GitHub Actions انجام می‌شود.

## نکات شناخته‌شده‌ی خط مبنا

- کلاس‌های CSS از الگوی نام‌گذاری BEM استفاده می‌کنند؛ Stylelint برای این الگو تنظیم شده است.
- چند هشدار مربوط به selectorهای تکراری و ترتیب specificity در CSS فعلی وجود دارد. این موارد هشدار هستند و باید هنگام یکپارچه‌سازی و بازسازی CSS، موردبه‌مورد بازبینی شوند؛ اصلاح خودکار یا `--fix` روی کل stylesheet اجرا نشود.
- چند هشدار no-unused-vars در JavaScript موجود است؛ در حال حاضر خطای مسدودکننده نیستند.
- Lighthouse در نخستین اجرای آزمایشی، صفحات اصلی و داخلی را بررسی کرد و یک هشدار SEO برای صفحه‌ی حریم خصوصی گزارش داد. امتیازها باید از artifact گزارش همان اجرا بررسی شوند.
- نسخه‌های وصله‌شده‌ی `basic-ftp@6.2.1` و `minimatch@11.0.3` با override تثبیت شده‌اند؛ اجرای `npm audit` در خط مبنای اخیر ۰ آسیب‌پذیری گزارش کرد.
- `package-lock.json` فعلاً در هر اجرای CI تولید و به‌عنوان artifact نگهداری می‌شود؛ پیش از ادغام شاخه در `main` باید lockfile نهایی به مخزن اضافه شود تا نسخه‌ی وابستگی‌های انتقالی کاملاً reproducible باشد.

## SonarQube

در این مرحله SonarQube اضافه نشده است. برای پروژه‌ی استاتیک فعلی، ESLint، HTML-ESLint، Stylelint، CodeQL، npm audit و Lighthouse CI پوشش مناسبی می‌دهند. SonarQube/SonarCloud می‌تواند در مرحله‌ی بعد، در صورت بزرگ‌ترشدن پروژه یا نیاز به Quality Gate سازمانی، با حساب و token اختصاصی اضافه شود.

## Lighthouse و SEO

Lighthouse CI ممیزی فنی آزمایشگاهی است؛ جایگزین داده‌های واقعی کاربران یا Google Search Console نیست. پس از تعیین دامنه‌ی نهایی، باید Search Console تأیید شود و وضعیت Indexing، Sitemap، impressions، clicks و Core Web Vitals واقعی جداگانه پیگیری شوند.
