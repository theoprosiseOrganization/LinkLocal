import os
import csv
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Any, Dict

app = FastAPI()

class LogPayload(BaseModel):
    date: str
    method: str
    url: str
    headers: Dict[str, Any]
    query: Dict[str, Any]
    params: Dict[str, Any]
    body: Any

def append_log_to_csv(log: LogPayload, filename: str = "log.csv"):
    fieldnames = ['date', 'method', 'url', 'headers', 'query', 'params', 'body']
    file_exists = os.path.isfile(filename)
    with open(filename, 'a', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        if not file_exists or os.stat(filename).st_size == 0:
            writer.writeheader()
        writer.writerow({
            'date': log.date,
            'method': log.method,
            'url': log.url,
            'headers': str(log.headers),
            'query': str(log.query),
            'params': str(log.params),
            'body': str(log.body),
        })


@app.post("/log")
def add_log_event(payload: LogPayload):
    append_log_to_csv(payload)
    print("Log added")


@app.get("/logs")
def get_logs(user_id: str, k: int = 3):
    print("GETLOGS")