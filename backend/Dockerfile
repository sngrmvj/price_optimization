FROM python:3.10-slim

WORKDIR /PriceOps

ENV PYTHONUNBUFFERED=1

COPY requirements.txt /PriceOps/requirements.txt
COPY app /PriceOps/app
COPY main.py /PriceOps/main.py
COPY database.py /PriceOps/database.py
COPY initialize_db.py /PriceOps/initialize_db.py

RUN pip install --no-cache-dir -r /PriceOps/requirements.txt

EXPOSE 7777

CMD ["sh", "-c", "python3 /PriceOps/initialize_db.py && uvicorn main:app --host 0.0.0.0 --port 7777 --http=httptools"]