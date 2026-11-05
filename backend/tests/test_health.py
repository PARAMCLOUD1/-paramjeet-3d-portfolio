from app import create_app


def test_health():
    response = create_app().test_client().get('/api/health')
    assert response.status_code == 200
    assert response.json == {'status': 'ok', 'service': 'paramjeet-portfolio-api'}


def test_cors():
    client = create_app().test_client()
    allowed = client.get('/api/health', headers={'Origin': 'http://localhost:5173'})
    assert allowed.headers['Access-Control-Allow-Origin'] == 'http://localhost:5173'
    denied = client.get('/api/health', headers={'Origin': 'https://unapproved.example'})
    assert 'Access-Control-Allow-Origin' not in denied.headers


def test_health_is_read_only():
    assert create_app().test_client().post('/api/health').status_code == 405
