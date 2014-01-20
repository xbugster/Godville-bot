import os
import json


VERSION = '1.3.1'
BUILD = 'ba4b80d08b67'
PACKAGE_ID = 'dev'

KEYWORDS = {
    'kango': 'kango',
    'Kango': 'Kango',
    'KangoEngine': 'KangoEngine',
    'KangoBHO': 'KangoBHO'
}


try:
    with open(os.path.join(os.path.abspath(os.path.dirname(__file__)), 'settings.json'), 'r') as f:
        settings = json.load(f)
        KEYWORDS.update(settings.get('keywords', {}))
except IOError:
    pass