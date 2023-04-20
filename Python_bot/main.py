import creds as creds
from playwright.sync_api import Playwright, sync_playwright

url_login ='https://app.cursofuturosresidentes.com/'
url_specialty = 'https://app.cursofuturosresidentes.com/courses/cirugia-general/'
  
def run(playwright: Playwright) -> None:
  browser = playwright.chromium.launch(headless=False, slow_mo=50)
  page = browser.new_page()
  
  page.goto(url_login)
  page.fill('input#username', creds.username)
  page.fill('input#password', creds.password)
  page.click('button[type=submit]')
 
  new_page = browser.contexts[0].new_page()
  new_page.goto(url_specialty)
  new_page.click("div.ld-expand-button.ld-primary-background")
  page.wait_for_selector("#course-content .ld-expand-content")

  links = page.query_selector_all("#course-content .ld-expand-content a")
  links = [link.get_attribute("href") for link in links]

  with open("links.txt", "w") as file:
    for link in links:
      file.write(link + "\n")
      
  new_page.close()
  page.close()
  browser.close()
  
with sync_playwright() as playwright:
  run (playwright)