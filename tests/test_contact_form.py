from app import db
from app.models import ContactSubmission

def test_contact_get(client):
    resp = client.get("/contact")
    assert resp.status_code == 200

def test_contact_post_valid_saves_to_db(client, app):
    resp = client.post("/contact", data={
        "first_name": "Test",
        "last_name": "User",
        "email": "test@example.com",
        "message": "Hello, this is a test message.",
        "website": "",  # honeypot, must stay empty
    }, follow_redirects=True)
    assert resp.status_code == 200
    with app.app_context():
        assert ContactSubmission.query.count() == 1

def test_contact_post_honeypot_filled_is_dropped(client, app):
    client.post("/contact", data={
        "first_name": "Bot",
        "last_name": "Spam",
        "email": "bot@spam.com",
        "message": "spam spam spam",
        "website": "http://spammy-link.com",  # bots fill this in
    })
    with app.app_context():
        assert ContactSubmission.query.count() == 0

def test_contact_post_missing_fields_rejected(client):
    resp = client.post("/contact", data={"first_name": "OnlyOne"})
    assert resp.status_code == 200  # re-renders form with validation errors, doesn't 500