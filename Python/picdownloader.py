from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import sys
import time
import urllib.request

# Runs a headless version of Chrome
option = webdriver.ChromeOptions()
option.add_argument("headless")

# Accesses chromedriver
PATH = "D:\chromedriver_win32\chromedriver.exe"
driver = webdriver.Chrome(PATH, options=option)


# Takes in input from command line, if empty then defaults to test
if len(sys.argv) > 1:
    address = " ".join(sys.argv[1:])
else:
    address = "test"

try:
    # Launches google with the given search address
    driver.get("https://google.com/search?q=" + address)

    # Goes to images for the search result
    link = driver.find_element_by_link_text("Images")
    link.click()

    # Finds and saves the first 20 images
    main = driver.find_element_by_class_name("mJxzWe")
    img_link = main.find_elements_by_tag_name("img")

    for i in range(100):
        img = img_link[i].get_attribute("src")
        urllib.request.urlretrieve(
            img, f"./img/train/{address}/pic{i}.png")


# Makes sure the window is closed
finally:
    driver.quit()
