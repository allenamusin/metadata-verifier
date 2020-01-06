# metadata-verifier

## Summary

## Description of directories

The `static` folder contains all Javascript and CSS for the app. The core functionality that powers the backend services is in the Django app `pages`.

## Instructions to setup the app for local development

1. Install python modules and active virtualenv:
```
python3 -m venv env
source ./env/bin/activate
pip install -r requirements.txt
```
2. Create a file at `airzus/environment.py` with the contents below and replace only `'PLACEYOURSECRETKEYHERE'`:

```
DATABASES = ENV_DATABASES = {
	'default': {
    		'ENGINE': 'django.db.backends.sqlite3',
    		'NAME': 'mydatabase',
	}
}

SECRET_KEY = ENV_SECRET_KEY = 'PLACEYOURSECRETKEYHERE'
```

3. You can run the Django web server with the following commands and then visit http://127.0.0.1:8000/ to use the app:

```
cd airzus
python manage.py runserver
```

4. You can rebuild the javascript bundle (`bundle.js`) with the following commands:

```
cd static
npm install
./node_modules/.bin/browserify -t [ babelify --presets [ @babel/preset-react @babel/preset-env ] --plugins [@babel/plugin-proposal-class-properties] ] ./index.js -o ./bundle.js
```
