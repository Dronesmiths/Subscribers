# Subscribers Engine Integration Guide

Follow these steps to "drag and drop" the subscription engine into any website.

## 1. Setup Google Sheets (The Backend)
1.  Open a new **Google Sheet**.
2.  Go to **Extensions > Apps Script**.
3.  Copy the code from [google-sheet-script.gs](file:///Users/mediusa/Subscribers/google-sheet-script.gs) and paste it into the script editor.
4.  Click **Deploy > New Deployment**.
5.  Select **Web App**.
6.  Set "Who has access" to **Anyone**.
7.  Copy the **Web App URL**.

## 2. Add to Your Website
Copy the following files to your project's directory:
- `src/subscribers.css`
- `src/subscribers.js`

### Add the HTML
Place this where you want the form to appear:
```html
<link rel="stylesheet" href="path/to/subscribers.css">

<div class="sub-engine-container" id="subEngine">
    <div class="sub-header">
        <h2>Stay in the Loop</h2>
        <p>Join our exclusive community and get the latest updates.</p>
    </div>

    <form class="sub-form" id="subscriberForm">
        <div class="input-group">
            <input type="text" name="name" class="sub-input" placeholder="Your Name" required>
        </div>
        <div class="input-group">
            <input type="email" name="email" class="sub-input" placeholder="Your Email" required>
        </div>
        <button type="submit" class="sub-button" id="submitBtn">
            <span>Subscribe Now</span>
            <div class="loading-dots" style="display: none;">
                <span>.</span><span>.</span><span>.</span>
            </div>
        </button>
    </form>
    <div id="statusMsg" class="status-msg"></div>
</div>

<script src="path/to/subscribers.js"></script>
<script>
    new SubscriberEngine({
        formId: 'subscriberForm',
        statusId: 'statusMsg',
        endpoint: 'PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE'
    });
</script>
```

## 3. Customize
- Edit `subscribers.css` to change the colors (variables at the top).
- Change the text in the HTML to match your brand.
