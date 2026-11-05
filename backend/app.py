"""Phase 1 API. No contact collection or persistence."""
import os
from flask import Flask, jsonify
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024
    origins = [value.strip() for value in os.getenv(
        'FRONTEND_ORIGINS', 'http://localhost:5173,http://127.0.0.1:5173'
    ).split(',') if value.strip()]
    CORS(app, resources={r'/api/*': {'origins': origins}})

    @app.get('/api/health')
    def health():
        return jsonify(status='ok', service='paramjeet-portfolio-api')

    return app


app = create_app()

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=False)
