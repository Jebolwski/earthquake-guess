from pathlib import Path
import os
from dotenv import load_dotenv

load_dotenv()  # .env dosyasını oku
BASE_DIR = Path(__file__).resolve().parent.parent


SECRET_KEY = 'django-insecure-3ob_osy(_t%**hv&p#pkgq)jdcg+avmj*6f5r!fkf--#)5+l3k'

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',  # Geliştirme ortamında frontend URL'si
]

DEBUG = True

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'api',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'dj_rest_auth',
    'dj_rest_auth.registration',
    'social_django',
]


SOCIALACCOUNT_PROVIDERS = {
    "google": {
        "APP": {
            "client_id": os.getenv("CLIENT_ID"),
            "secret": os.getenv("SECRET"),
        },
    },
}


CORS_ALLOW_ALL_ORIGINS = True

SITE_ID = 3

# REST_USE_JWT = True

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'allauth.account.middleware.AccountMiddleware',
]

AUTHENTICATION_BACKENDS = [
    'api.authentication.UsernameOrEmailBackend',   # bizim özel backend
    'django.contrib.auth.backends.ModelBackend',   # Django'nun default'u
]


REST_FRAMEWORK = {
    'DATETIME_FORMAT': '%d %B %Y %H:%M',
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
}


ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.request',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]


WSGI_APPLICATION = 'backend.wsgi.application'

TEMPLATE_CONTEXT_PROCESSORS = (
    'social_django.context_processors.backends',
    'social_django.context_processors.login_redirect',
)


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}



AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


LOGIN_REDIRECT_URL = "/"

LANGUAGE_CODE = 'en-EN'

TIME_ZONE = 'Europe/Istanbul'

USE_I18N = True

USE_TZ = True

OIDC_RSA_PRIVATE_KEY = "oixr42"

STATIC_ROOT= os.path.join(BASE_DIR,'staticfiles')

STATIC_URL = '/static/'

MEDIA_ROOT = 'media/'

MEDIA_URL = 'media/'


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:3000')
ACCOUNT_DEFAULT_HTTP_PROTOCOL = 'http'  # veya productiondaysa 'https'

EMAIL_BACKEND = os.getenv('EMAIL_BACKEND')
EMAIL_HOST = os.getenv('EMAIL_HOST')
EMAIL_PORT = os.getenv('EMAIL_PORT')
EMAIL_USE_TLS = os.getenv('EMAIL_USE_TLS') == "True"
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')