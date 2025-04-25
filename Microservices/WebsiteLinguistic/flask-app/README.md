# Flask Application

This is a simple Flask application that demonstrates the basic structure and functionality of a web application using Flask.

## Project Structure

```
flask-app
├── app
│   ├── __init__.py
│   ├── routes.py
│   ├── models.py
│   └── templates
│       └── base.html
├── static
│   ├── css
│   ├── js
│   └── images
├── tests
│   ├── __init__.py
│   └── test_app.py
├── requirements.txt
├── config.py
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd flask-app
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

## Usage

To run the application, use the following command:
```
flask run
```

Make sure to set the `FLASK_APP` environment variable to `app` before running the command.

## Testing

To run the tests, use the following command:
```
pytest
```

## License

This project is licensed under the MIT License. See the LICENSE file for more details.