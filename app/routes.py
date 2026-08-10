from flask import Blueprint, render_template, redirect, url_for, flash
from app import db
from app.models import ContactSubmission
from app.forms import ContactForm

main_bp = Blueprint("main", __name__)

@main_bp.route("/")
def get_home():
    return render_template("index.html")

@main_bp.route("/projects")
def get_projects():
    return render_template("projects.html")

@main_bp.route("/skills")
def get_skills():
    return render_template("skills.html")

@main_bp.route("/cv")
def get_cv():
    return render_template("cv.html")

@main_bp.route("/contact", methods=["GET", "POST"])
def get_contact():
    form = ContactForm()

    if form.validate_on_submit():
        # Honeypot check — if a bot filled the hidden field, silently drop it
        if form.website.data:
            flash("Message sent!", "success")   # pretend success to the bot
            return redirect(url_for("main.get_contact"))

        submission = ContactSubmission(
            first_name=form.first_name.data,
            last_name=form.last_name.data,
            email=form.email.data,
            message=form.message.data,
        )
        db.session.add(submission)
        db.session.commit()

        flash("Thanks for reaching out — I'll get back to you soon!", "success")
        return redirect(url_for("main.get_contact"))

    return render_template("contact.html", form=form)

PROJECT_TITLES = {"Portfolio", "RoomRent", "SignLanguageTranslator", "SmartAttendance"}

@main_bp.route("/projects/<project_title>")
def get_project(project_title):
    if project_title not in PROJECT_TITLES:
        from flask import abort
        abort(404)
    return render_template(f"projects/{project_title}.html")