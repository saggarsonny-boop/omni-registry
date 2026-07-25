import urllib.request
import json

url = "https://api.indexnow.org/IndexNow"
headers = {
    "Content-Type": "application/json; charset=utf-8"
}

payload = {
    "host": "omni.universaldocument.org",
    "key": "a2b9c3d4e5f67890abcdef1234567890",
    "keyLocation": "https://omni.universaldocument.org/a2b9c3d4e5f67890abcdef1234567890.txt",
    "urlList": [
        "https://omni.universaldocument.org/",
        "https://omni.universaldocument.org/llms.txt"
    ]
}

req = urllib.request.Request(
    url,
    data=json.dumps(payload).encode("utf-8"),
    headers=headers,
    method="POST"
)

print("Dispatching IndexNow crawler notification for omni.universaldocument.org...")
try:
    with urllib.request.urlopen(req) as resp:
        print(f"Response Status Code: {resp.status}")
        print(f"Response Body: {resp.read().decode('utf-8')}")
except Exception as e:
    print(f"Execution Error: {e}")
