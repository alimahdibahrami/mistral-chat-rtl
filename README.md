# GitHub Copilot Persian RTL

افزونه کروم برای پشتیبانی خودکار از راست‌چین کردن متن فارسی در GitHub Copilot

A Chrome extension that automatically detects Persian text and applies right-to-left (RTL) direction in GitHub Copilot interface.

## ویژگی‌ها (Features)

### 🔍 تشخیص خودکار زبان فارسی (Automatic Persian Text Detection)
- استفاده از الگوریتم پیشرفته برای تشخیص متن فارسی
- بررسی نسبت کاراکترهای فارسی در متن
- پردازش هوشمند محتوای دینامیک

### 🔄 راست‌چین کردن خودکار (Automatic RTL Application)
- اعمال خودکار جهت راست‌به‌چپ برای متن‌های فارسی
- حفظ جهت چپ‌به‌راست برای متن‌های غیرفارسی
- پشتیبانی از انواع عناصر متنی (textarea، input، div و...)

### ⚡ بهینه‌سازی عملکرد (Performance Optimization)
- استفاده از MutationObserver برای تشخیص تغییرات DOM
- Debouncing برای جلوگیری از پردازش مکرر
- پردازش تنها محتوای جدید و تغییریافته

### 🎯 تخصصی برای GitHub Copilot (GitHub Copilot Specific)
- طراحی شده خصوصاً برای محیط GitHub Copilot
- فعال تنها در آدرس `github.com/copilot`
- رابط کاربری فارسی برای کنترل آسان

## فهرست مطالب (Table of Contents)

- [ویژگی‌ها (Features)](#ویژگیها-features)
- [نصب (Installation)](#نصب-installation)
- [استفاده (Usage)](#استفاده-usage)
- [ساختار فایل‌ها (File Structure)](#ساختار-فایلها-file-structure)
- [نحوه کارکرد (How It Works)](#نحوه-کارکرد-how-it-works)
- [توسعه (Development)](#توسعه-development)
- [تست (Testing)](#تست-testing)
- [مجوز (License)](#مجوز-license)
- [تماس (Contact)](#تماس-contact)

## نصب (Installation)

### نصب از طریق Developer Mode

1. ریپازیتوری را کلون کنید:
   ```sh
   git clone https://github.com/alimahdibahrami/mistral-chat-rtl.git
   ```

2. مرورگر Chrome را باز کرده و به آدرس `chrome://extensions/` بروید

3. گزینه "Developer mode" را در گوشه بالا راست فعال کنید

4. روی "Load unpacked" کلیک کرده و پوشه پروژه را انتخاب کنید

5. افزونه نصب شده و آماده استفاده است

## استفاده (Usage)

### استفاده خودکار (Automatic Usage)

1. به سایت GitHub Copilot بروید: `https://github.com/copilot`

2. افزونه به‌طور خودکار متن‌های فارسی را تشخیص داده و راست‌چین می‌کند

3. هیچ تنظیم اضافی نیاز نیست - همه چیز خودکار است!

### کنترل دستی (Manual Control)

- روی آیکون افزونه کلیک کنید
- از دکمه‌های "فعال کردن" و "غیرفعال کردن" استفاده کنید
- تغییرات بلافاصله اعمال می‌شوند

## ساختار فایل‌ها (File Structure)

```
github-copilot-persian-rtl/
├── images/
│   ├── icon16-inactive.png
│   ├── icon48-inactive.png
│   ├── icon128-inactive.png
│   ├── icon16-active.png
│   ├── icon48-active.png
│   ├── icon128-active.png
├── content.js              # اسکریپت تشخیص و اعمال RTL
├── styles.css              # استایل‌های کمکی
├── popup.html              # رابط کاربری افزونه
├── popup.js                # منطق رابط کاربری
├── background.js           # مدیریت پس‌زمینه افزونه
├── manifest.json           # تنظیمات افزونه
├── Vazir.ttf              # فونت فارسی
├── README.md
└── LICENSE
```

### توضیح فایل‌ها:

- `manifest.json`: فایل تنظیمات افزونه شامل مجوزها و تنظیمات
- `content.js`: اسکریپت اصلی تشخیص متن فارسی و اعمال RTL
- `background.js`: مدیریت وضعیت افزونه و اعمال تغییرات روی تب‌های جدید
- `popup.html/js`: رابط کاربری برای کنترل فعال/غیرفعال کردن
- `styles.css`: استایل‌های کمکی و فونت فارسی
- `images/`: آیکون‌های افزونه در حالت‌های مختلف

## نحوه کارکرد (How It Works)

### الگوریتم تشخیص زبان فارسی

```javascript
// محدوده کاراکترهای فارسی در یونیکد
const PERSIAN_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g;

// حداقل درصد کاراکترهای فارسی برای تشخیص
const PERSIAN_THRESHOLD = 0.3; // 30%
```

### نظارت بر تغییرات DOM

- استفاده از `MutationObserver` برای تشخیص محتوای جدید
- Debouncing با تاخیر 300 میلی‌ثانیه برای بهینه‌سازی
- پردازش تنها عناصر تغییریافته

### عملکرد هوشمند

1. **تشخیص**: بررسی نسبت کاراکترهای فارسی در متن
2. **اعمال**: تنظیم `direction: rtl` و `text-align: right`
3. **نظارت**: نظارت مستمر بر تغییرات محتوا
4. **بهینه‌سازی**: جلوگیری از پردازش مکرر عناصر

## توسعه (Development)

### پیش‌نیازها

- مرورگر Google Chrome
- دانش پایه JavaScript و Chrome Extensions API

### راه‌اندازی محیط توسعه

1. فایل‌های پروژه را ویرایش کنید
2. به `chrome://extensions/` بروید
3. روی "Reload" کلیک کنید تا تغییرات اعمال شود
4. تست کنید

### ویژگی‌های قابل توسعه

- **تشخیص زبان‌های بیشتر**: افزودن پشتیبانی از عربی، اردو و...
- **تنظیمات پیشرفته**: آستانه تشخیص قابل تنظیم
- **بهینه‌سازی بیشتر**: کاهش مصرف CPU و RAM

## تست (Testing)

### تست در حالت Developer

1. به `chrome://extensions/` بروید
2. حالت "Developer mode" را فعال کنید
3. افزونه را با "Load unpacked" بارگذاری کنید
4. به `https://github.com/copilot` بروید

### تست عملکرد

1. **تست تشخیص**: متن فارسی تایپ کنید و بررسی کنید RTL اعمال شود
2. **تست عملکرد**: بررسی کنید که افزونه سرعت صفحه را کاهش ندهد
3. **تست UI**: popup را باز کرده و دکمه‌ها را تست کنید

### تست‌های مختلف

```
✅ تشخیص متن فارسی خالص
✅ تشخیص متن ترکیبی فارسی-انگلیسی  
✅ عدم تشخیص متن انگلیسی خالص
✅ عملکرد روی عناصر مختلف (textarea, div, span)
✅ نظارت بر تغییرات دینامیک DOM
```

## مجوز (License)

این پروژه تحت مجوز MIT منتشر شده است - فایل [LICENSE](LICENSE) را برای جزئیات بیشتر ببینید.

## تماس (Contact)

برای هرگونه سوال یا پیشنهاد، با ایمیل alimahdibahrami2001@gmail.com تماس بگیرید.

## تشکر (Acknowledgments)

- تشکر از تیم GitHub برای ارائه سرویس Copilot
- تشکر از جامعه متن‌باز برای حمایت و مشارکت
- تشکر از توسعه‌دهندگان فونت Vazir