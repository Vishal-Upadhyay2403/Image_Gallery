FROM python:3.10

WORKDIR /app

EXPOSE 5050

COPY Pipfile ./
COPY Pipfile.lock ./


RUN pip install pipenv
RUN pip install python-dotenv
RUN pip install flask
RUN pip install requests
RUN pip install flask_cors
#RUN pipenv lock --requirements > requirements.txt
RUN pipenv lock --requirements --dev | tee requirements.txt
RUN pip install -r requirements.txt

COPY . ./

CMD ["python", "main.py" ]