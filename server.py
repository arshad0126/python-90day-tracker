import http.server
import socketserver
import webbrowser
import threading
import time
import sys

PORT = 8000
DIRECTORY = "."

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"==================================================")
        print(f"🚀 Python 90-Day Tracker Server Started!")
        print(f"👉 Localhost Address: http://localhost:{PORT}")
        print(f"👉 Press CTRL+C in this command window to stop.")
        print(f"==================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...")
            httpd.shutdown()
            sys.exit(0)

def open_browser():
    time.sleep(0.5)
    webbrowser.open(f"http://localhost:{PORT}")

if __name__ == "__main__":
    browser_thread = threading.Thread(target=open_browser)
    browser_thread.daemon = True
    browser_thread.start()
    
    start_server()
