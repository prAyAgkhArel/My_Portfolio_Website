import os
from flask import Flask 
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_name=None):
    app = Flask(__name__)

    config_name = config_name or os.environ.get("FLASK_ENV", "production")
    config_map = {
        "development": "app.config.DevelopmentConfig",
        "production": "app.config.ProductionConfig",
        "testing": "app.config.TestingConfig",
    }
    app.config.from_object(config_map.get(config_name, "app.config.ProductionConfig"))

    db.init_app(app)
    migrate.init_app(app, db)

    from app.routes import main_bp
    app.register_blueprint(main_bp)

    return app