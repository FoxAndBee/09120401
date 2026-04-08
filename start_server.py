import http.server
import socketserver

PORT = 8087

handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), handler) as httpd:
    print(f"Server running at http://localhost:{PORT}/")
    httpd.serve_forever()
