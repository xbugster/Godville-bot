# Godville Bot - Automation for the game

##### Interested in updates during development?
##### Want to know when the first release of final version occurs?
#### Star us and stay up to date.

Godville bot currently SHOULD be developed to keep your character healthy as long as you have a potions, allowing for the character to level up faster.

### Requirements

* Compile the extension from source
* Kango Extensions Framework >= 1.3
* Python 2.7

### How To Compile
* git clone https://github.com/xbugster/Godville-bot.git
* cd Godville-bot
* python framework/kango.py build ./

Now the compiler created the directory "output" within this directory you'll find:
chrome(.crx), firefox(.xpi) extension for respective browser.

##### For Google Chrome
Options -> Tools -> Extensions - drag and drop an extension file into the opened window

##### For Mozilla Firefox
Throw an extension into browser

##### For Safari
Throw an extension into browser

### @TODO List
. initializer(we can't call back from page to extension - done as delayed initializer) - done
. character parameters getters - done
. character parameters parsers - done
. add minimal amounts per parameter - under development
. settings page - under development
. start/stop function
. interaction process
. implement better design(it is planed, but postponed due to "business logic" - start first)
. additional features
. collect data about wear available in game
. collect data about skills available
. collect data about monsters available
. auto-fill quiz based on collected data in three previous tasks