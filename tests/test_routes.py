def test_home_page(client):
    resp = client.get("/")
    assert resp.status_code == 200
    assert b"Prayag" in resp.data

def test_projects_page(client):
    resp = client.get("/projects")
    assert resp.status_code == 200

def test_skills_page(client):
    resp = client.get("/skills")
    assert resp.status_code == 200

def test_cv_page(client):
    resp = client.get("/cv")
    assert resp.status_code == 200

def test_valid_project_detail(client):
    resp = client.get("/projects/Portfolio")
    assert resp.status_code == 200

def test_invalid_project_returns_404(client):
    resp = client.get("/projects/does-not-exist")
    assert resp.status_code == 404   # this is the security fix from Phase 2 being verified