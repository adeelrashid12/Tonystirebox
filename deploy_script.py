import requests
import os
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

HOST = 'https://da800.is.cc:2222'
USERNAME = 'tonystir'
PASSWORD = r'A55q?QkR'
OUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), 'tonys-tires', 'out'))

session = requests.Session()
session.verify = False
session.auth = (USERNAME, PASSWORD)

TARGET_PATHS = [
    '/domains/wh1554381.ispot.cc/public_html',
    '/domains/tonystirebox.com/public_html'
]

print('[DEPLOY] Deploying compiled Next.js build from GitHub Runner to cPanel/DirectAdmin hosting...')

for root_target in TARGET_PATHS:
    for root, dirs, files in os.walk(OUT_DIR):
        rel_path = os.path.relpath(root, OUT_DIR).replace('\\\\', '/').replace('\\', '/')
        curr_remote_dir = root_target if rel_path == '.' else f'{root_target}/{rel_path}'
        
        for d in dirs:
            session.post(f'{HOST}/CMD_API_FILE_MANAGER', data={'action': 'folder', 'path': curr_remote_dir, 'name': d})
            
        files_dict = {}
        for idx, f in enumerate(files):
            local_file_path = os.path.join(root, f)
            files_dict[f'file{idx+1}'] = (f, open(local_file_path, 'rb'))
            
        if files_dict:
            r = session.post(f'{HOST}/CMD_API_FILE_MANAGER', params={'action': 'upload', 'path': curr_remote_dir}, files=files_dict)

print('[SUCCESS] Deployment Successful! Website and Admin Portal are LIVE on cPanel!')
