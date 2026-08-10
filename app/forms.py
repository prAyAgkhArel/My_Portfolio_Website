from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length, Email

class ContactForm(FlaskForm):
    first_name = StringField("First Name", validators=[DataRequired(), Length(max=80)])
    last_name = StringField("Last Name", validators=[DataRequired(), Length(max=80)])
    email = StringField("Email", validators=[DataRequired(), Email(), Length(max=120)])
    message = TextAreaField("Message", validators=[DataRequired(), Length(max=2000)])
    # Honeypot field — real users never fill this in; bots usually do
    website = StringField("Website")
    submit = SubmitField("Send Message")