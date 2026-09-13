import requests
import os
import shutil
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

HOST = 'https://da800.is.cc:2222'
USERNAME = 'tonystir'
PASSWORD = r'A55q?QkR'
OUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), 'tonys-tires', 'out'))
ZIP_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), 'fast_deploy.zip'))

print('[1/3] Zipping Next.js build...')
shutil.make_archive(ZIP_PATH.replace('.zip', ''), 'zip', OUT_DIR)

session = requests.Session()
session.verify = False
session.auth = (USERNAME, PASSWORD)

TARGET_PATHS = [
    '/domains/wh1554381.ispot.cc/public_html',
    '/domains/tonystirebox.com/public_html'
]

print('[2/3] Fast uploading ZIP package to cPanel server...')
for target in TARGET_PATHS:
    with open(ZIP_PATH, 'rb') as f:
        # Upload zip
        session.post(f'{HOST}/CMD_API_FILE_MANAGER', params={'action': 'upload', 'path': target}, files={'file1': ('deploy.zip', f)})
        # Force extract overwrite
        session.post(f'{HOST}/CMD_API_FILE_MANAGER', data={'action': 'extract', 'path': target, 'file': 'deploy.zip', 'overwrite': 'yes'})

if os.path.exists(ZIP_PATH):
    os.remove(ZIP_PATH)

print('[3/3] [SUCCESS] Fast Deployment & Extraction Complete!')
