# O2 Cleaner

A lightweight browser extension (Add-on) for **(poczta.o2.pl)** that automates inbox management. It automatically selects sponsored emails, closes annoying info banners, and provides a powerful Regex search tool to find and select specific emails instantly.

## 🚀 Features

* **Auto-Mark Sponsored Emails:** Automatically finds and checks the checkbox for emails containing `"/o2"` (sponsored ads) in the background.
* **Auto-Close Banners:** Automatically clicks "Close" (Zamknij) on the large informational/advertising banners that appear above the inbox.
* **Floating Control Panel:** A non-intrusive UI located in the bottom-right corner of your screen.
* **Regex Power Search:** Input any Regular Expression (e.g., `Bank|Faktura`) to instantly find and select all matching emails in the current view.
* **Toggle Switch:** Easily pause or resume the background auto-marking tasks.

## 📂 Project Structure

Your folder should look like this:

```text
o2-cleaner/
│
├── manifest.json   # Configuration file for the browser
├── content.js      # The main logic script
└── README.md       # This documentation

```

## 🛠️ Installation

This is a local extension. You can install it on Chrome, Edge, Brave, or Firefox without going through a store.

### Google Chrome / Edge / Brave

1. Download or clone this repository to a folder on your computer.
2. Open your browser and navigate to:
* **Chrome:** `chrome://extensions`
* **Edge:** `edge://extensions`


3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked**.
5. Select the folder containing these files.
6. Refresh your O2 Poczta tab.

### Mozilla Firefox

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on...**.
3. Select the `manifest.json` file from your project folder.
4. *Note: In Firefox, temporary add-ons are removed when you close the browser completely.*

## 📖 Usage Guide

Once installed, a white panel will appear in the **bottom-right corner** of your O2 Poczta inbox.

### 1. Automatic Cleaning

* **Auto /o2 Checkbox:**
* **Checked:** The script runs every 2 seconds, scanning for new emails. If it finds a sponsored email (marked with `/o2`), it selects it (checks the box) and highlights it in **Light Red**. It also auto-closes info banners.
* **Unchecked:** Background tasks are paused.



### 2. Manual Regex Search

Use the text input field to select emails based on specific criteria.

* **Basic Text:** Type `Netflix` and click **Mark**. All emails containing "Netflix" will be selected.
* **Multiple Keywords (OR):** Type `Uber|Bolt|FreeNow`.
* **Sender Name:** Type the exact sender name.
* **Highlighted Matches:** Emails selected via this manual tool are highlighted in **Light Teal** to distinguish them from ads.

## 📝 Code Reference

If you need to restore the files, here is the source code:

### `manifest.json`

```json
{
  "manifest_version": 3,
  "name": "O2 Poczta Cleaner",
  "version": "2.1",
  "description": "Automates selecting ads and cleaning the O2 inbox.",
  "content_scripts": [
    {
      "matches": ["*://poczta.o2.pl/*"],
      "js": ["content.js"],
      "run_at": "document_end"
    }
  ]
}

```

### `content.js`

*(Paste the final Javascript code provided in our conversation here)*

## ⚠️ Disclaimer

This project is an independent tool created for educational purposes. It is not affiliated with, endorsed by, or connected to **O2** or **Wirtualna Polska**. Use it responsibly.

## 🤝 Contributing

Feel free to fork this project and submit pull requests.
