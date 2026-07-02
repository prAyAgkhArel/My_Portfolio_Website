from flask import Flask, render_template, request, url_for, redirect, flash, session
app = Flask(__name__)


@app.route('/')
def get_home():
    return render_template("index.html")

@app.route('/projects')
def get_projects():
    return render_template('projects.html')

@app.route('/skills')
def get_skills():
    return render_template('skills.html')

@app.route('/contact', methods=['GET', 'POST'])
def get_contact():
    if request.method == 'POST':
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        email = request.form.get('email')
        message = request.form.get('message')
        
        with open('Emails/email.txt', mode='a') as file:
            file.write(f"{first_name} {last_name}, Email: {email}, Message: {message}\n")
        
    return render_template('contact.html')

@app.route('/cv')
def get_cv():
    return render_template('cv.html')

@app.route('/projects/<project_title>')
def get_project(project_title):
    return render_template(f'projects/{project_title}.html')

print(app.url_map)

if __name__ == "__main__":
    app.run(debug=True)






