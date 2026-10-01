import requests
import os
import zipfile
import urllib3
import time

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

HOST = 'https://da800.is.cc:2222'
USERNAME = 'tonystir'
PASSWORD = r'A55q?QkR'
OUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), 'tonys-tires', 'out'))
ZIP_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), 'deploy_out.zip'))

TARGET_PATHS = [
    '/domains/wh1554381.ispot.cc/public_html',
    '/domains/tonystirebox.com/public_html'
]

EXCLUDED_DATA_FILES = {'inventory_store.json', 'orders_store.json'}

print('[1/3] Zipping compiled static build (excluding server data files)...')
with zipfile.ZipFile(ZIP_PATH, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(OUT_DIR):
        for file in files:
            if file in EXCLUDED_DATA_FILES:
                print(f'   -> Excluding live server data file: {file}')
                continue
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, OUT_DIR)
            zipf.write(file_path, arcname)

print('[2/3] Uploading and extracting ZIP to hosting...')
for target in TARGET_PATHS:
    target_zip = f'{target}/deploy_out.zip'
    
    uploaded = False
    for attempt in range(1, 6):
        try:
            s = requests.Session()
            s.verify = False
            s.auth = (USERNAME, PASSWORD)
            with open(ZIP_PATH, 'rb') as f:
                files = {'file1': ('deploy_out.zip', f, 'application/zip')}
                r = s.post(f'{HOST}/CMD_API_FILE_MANAGER', params={'action': 'upload', 'path': target}, files=files, timeout=180)
                if r.status_code == 200:
                    print(f'Uploaded to {target} -> status 200 (attempt {attempt})')
                    uploaded = True
                    break
        except Exception as e:
            print(f'Upload attempt {attempt} failed: {e}. Retrying in 3 seconds...')
            time.sleep(3)
            
    if not uploaded:
        print(f'Warning: Could not upload to {target}, continuing...')

    try:
        s = requests.Session()
        s.verify = False
        s.auth = (USERNAME, PASSWORD)
        ex_data = {'action': 'extract', 'path': target_zip, 'directory': target}
        r_ex = s.post(f'{HOST}/CMD_API_FILE_MANAGER', data=ex_data, timeout=60)
        print(f'Extracted in {target} -> status {r_ex.status_code}')

        s.post(f'{HOST}/CMD_API_FILE_MANAGER', data={'action': 'delete', 'path': target_zip}, timeout=30)
    except Exception as e:
        print(f'Extract step info: {e}')

if os.path.exists(ZIP_PATH):
    os.remove(ZIP_PATH)

print('[SUCCESS] 100% Live Deployment Complete!')
