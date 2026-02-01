# Quick Setup Guide

Follow these steps to get your portfolio up and running:

## Initial Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create database and run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional, for admin panel)
python manage.py createsuperuser

# Populate sample data
python manage.py populate_sample_data

# Run Django server
python manage.py runserver
```

The backend will run on `http://localhost:8000`

### 2. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api/
- **Django Admin**: http://localhost:8000/admin

## Admin Panel

To manage projects and skills:
1. Go to http://localhost:8000/admin
2. Log in with your superuser credentials
3. Navigate to Portfolio section
4. Add/edit Projects, Skills, and view Contact Messages

## API Endpoints

- `GET /api/projects/` - Get all projects
- `GET /api/projects/{id}/` - Get specific project
- `GET /api/skills/` - Get skills grouped by category
- `POST /api/contact/` - Submit contact message

## Troubleshooting

### Backend Issues
- Make sure virtual environment is activated
- Check if port 8000 is already in use
- Verify all migrations are applied: `python manage.py migrate`

### Frontend Issues
- Make sure Node.js version is 16+
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Check if port 5173 is already in use

### CORS Issues
- Verify `CORS_ALLOWED_ORIGINS` in `backend/portfolio_backend/settings.py` includes `http://localhost:5173`

