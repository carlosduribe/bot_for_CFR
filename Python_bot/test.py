import time
import creds as creds
from playwright.sync_api import Playwright, sync_playwright

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=False, slow_mo=50)
    page = browser.new_page()
    page.goto("https://google.com")
    page.type('textarea[name="q"]', "app.cursofuturosresidentes.com")
    page.press('textarea[name="q"]', "Enter")
    page.get_by_text("01. Bienvenidos a Futuros Residentes").click()
    time.sleep (3)
    page.click("img#logo")
    page.fill('input#username', creds.username)
    page.fill('input#password', creds.password)
    page.click('button[type=submit]')