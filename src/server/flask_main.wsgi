#! /usr/bin/env python3

activate_this = "/var/www/remtest/remtest_py/bin/activate_this.py"
with open(activate_this) as file:
    exec(file.read(), dict(__file__=activate_this))

import sys
import logging

PATH = "/var/www/remtest/remtest_server/"

logging.basicConfig(stream=sys.stderr)
sys.path.insert(0, PATH)

from server_core.core import app as application
