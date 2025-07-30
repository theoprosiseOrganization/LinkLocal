import os
import csv
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Any, Dict, Optional

app = FastAPI()

class LogPayload(BaseModel):
    date: Optional[str] = None
    method: Optional[str] = None
    url: Optional[str] = None
    headers: Optional[Dict[str, Any]] = None
    query: Optional[Dict[str, Any]] = None
    params: Optional[Dict[str, Any]] = None
    body: Optional[Any] = None

def append_log_to_csv(log: LogPayload, filename: str = "log.csv"):
    fieldnames = ['date', 'method', 'url', 'headers', 'query', 'params', 'body']
    file_exists = os.path.isfile(filename)
    with open(filename, 'a', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        if not file_exists or os.stat(filename).st_size == 0:
            writer.writeheader()
        writer.writerow({
            field: str(getattr(log, field, None)) if getattr(log, field, None) is not None else "NULL"
            for field in fieldnames
        })


@app.post("/log")
def add_log_event(payload: LogPayload):
    append_log_to_csv(payload)


@app.get("/logs")
def get_logs(user_id: str, k: int = 3):
    print("GETLOGS")