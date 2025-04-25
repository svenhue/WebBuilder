from app import app

def test_home_page():
    client = app.test_client()
    response = client.get('/')
    assert response.status_code == 200
    assert b'Welcome' in response.data  # Adjust based on actual content

def test_about_page():
    client = app.test_client()
    response = client.get('/about')
    assert response.status_code == 200
    assert b'About Us' in response.data  # Adjust based on actual content

def test_non_existent_page():
    client = app.test_client()
    response = client.get('/non-existent')
    assert response.status_code == 404