import webbrowser
import os
import time
import subprocess
import sys
import requests

# this works
# if windows machine
if os.name == 'nt':
    chrome_path = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe %s'
    firefox_path = 'C:/Program Files/Mozilla Firefox/firefox.exe %s'

# not sure if this works, need a linux user to test
# if linux machine
elif sys.platform == 'linux' or sys.platform == 'linux2':
    chrome_path = '/usr/bin/google-chrome %s'
    firefox_path = '/usr/bin/firefox %s'

# not sure if this works, need a mac user to test
# if mac machine
elif sys.platform == 'darwin':
    chrome_path = 'open -a /Applications/Google\ Chrome.app %s'
    firefox_path = 'open -a /Applications/Firefox.app %s'

# not Windows, Linux, or Mac - exit
else:
    print("Looking for a Windows, Linux, or Mac OS. Exiting program.")
    sys.exit()


while True:

    print("Enter the number of which sample you'd like to run in the browser:")
    print("1. Hyphenopoly")
    print("2. Compress")
    print("3. Decompress")
    print("4. Poesidon Hashing")
    print("5. SHA-256 Hashing")
    print("6. Zombie Breakout Game")
    print("7. Ball Drop Game")
    print("8. Rocket Game")
    print("9. JS to WASM Calls")
    print("10. Image Processing")
    print("11. Rotating Cube")
    print("12. Exit")

    choice=input()

    if choice == "1":
        url='https://wasmdiff.github.io/Hyphenopoly-master/auto.html'

    elif choice == "2":
        url='https://wasmdiff.github.io/MarcoSelvatici.github.io-master/ref/shrink/compress/auto.html'

    elif choice == "3":
        url='https://wasmdiff.github.io/MarcoSelvatici.github.io-master/ref/shrink/decompress/auto.html'

    elif choice == "4":
        url='https://wasmdiff.github.io/go-iden3-crypto-wasm-master/webtest/auto.html'

    elif choice == "5":
        url='https://wasmdiff.github.io/wasm-bench-crypto-master-original/auto.html'

    elif choice == "6":
        url='https://wasmdiff.github.io/zombie-breakout-master/docs/auto.html'

    elif choice == "7":
        url='https://wasmdiff.github.io/go-wasm-ball-drop-game-master/auto.html'

    elif choice == "8":
        url='https://wasmdiff.github.io/rocket_wasm-master/html/auto.html'

    elif choice == "9":
        url='https://wasmdiff.github.io/perf-wasm-calls-gh-pages/auto.html'

    elif choice == "10":
        url='https://wasmdiff.github.io/wasm-processing-test-master/auto.html'

    elif choice == "11":
        url='https://wasmdiff.github.io/wasm-rotating-cube-master/auto.html'

    elif choice == "12":
        print("\nExited program\n")
        sys.exit()

    else:
        print("\nIncorrect choice, try again.\n")
        continue


    ########## open with webbrowser module ##########
    # this has way less overhead than popen
    try:
        c = webbrowser.get(chrome_path).open(url)
        print("\nOpened sample", choice, "in Chrome")
    except:
        print("\nThere was an error when opening Chrome")
        print("\nExited program\n")
        sys.exit()
    
    print("\nWaiting...\n")
    time.sleep(5)

    try:
        f = webbrowser.get(firefox_path).open(url)
        print("Opened sample", choice, "in Firefox\n")
    except:
        print("There was an error when opening Firefox")
        print("\nExited program\n")
        sys.exit()


################################################# End of Program #################################################


# open with popen
# p=subprocess.Popen("start chrome /new-tab "+url,shell = True)
# p=subprocess.Popen("start firefox /new-tab "+url,shell = True)

# def open_with_chrome(url, times):
#     chrome_path = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe %s'
#     webbrowser.get(chrome_path).open(url)
#     time.sleep(20)
#     os.system("taskkill /im chrome.exe /f")

# def open_with_firefox(url):
#     firefox_path = 'C:/Program Files/Mozilla Firefox/firefox.exe %s'
#     webbrowser.get(firefox_path).open(url)
#     time.sleep(25)
#     os.system("taskkill /im firefox.exe /f")
