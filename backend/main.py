import os
from dotenv import load_dotenv
load_dotenv()

from src import create_app

app = create_app()

if __name__ == "__main__":
    app.run(host=os.getenv('HOST'), port=os.getenv('PORT'), debug=True)