---
title: Python for Data Engineering: Pipelines, ETL, and Best Practices
date: 2025-03-05
author: James Cowx
excerpt: Build production-grade data pipelines with Python. From extraction to transformation to loading, learn the patterns used at scale.
tags: Python, Data Engineering, ETL, Pipelines
category: IT Tips
---

## Python's Role in Data Engineering

Python dominates data engineering. From Airflow DAGs to Spark jobs, Python is the glue that moves data across modern infrastructure.

## The ETL Pipeline Pattern

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Iterator
import logging

logger = logging.getLogger(__name__)

@dataclass
class PipelineConfig:
    batch_size: int = 1000
    max_retries: int = 3
    timeout: int = 300

class Extractor(ABC):
    @abstractmethod
    def extract(self) -> Iterator[dict]:
        pass

class Transformer(ABC):
    @abstractmethod
    def transform(self, record: dict) -> dict:
        pass

class Loader(ABC):
    @abstractmethod
    def load(self, records: list[dict]) -> int:
        pass

class Pipeline:
    def __init__(self, extractor: Extractor, transformer: Transformer, loader: Loader, config: PipelineConfig):
        self.extractor = extractor
        self.transformer = transformer
        self.loader = loader
        self.config = config

    def run(self) -> int:
        batch = []
        total = 0

        for record in self.extractor.extract():
            try:
                transformed = self.transformer.transform(record)
                batch.append(transformed)
            except Exception as e:
                logger.error(f"Transform failed for record: {e}")
                continue

            if len(batch) >= self.config.batch_size:
                total += self.loader.load(batch)
                batch = []

        if batch:
            total += self.loader.load(batch)

        logger.info(f"Pipeline complete: {total} records processed")
        return total
```

## Real-World Extractor: API Pagination

```python
import requests
from time import sleep

class APIPaginatedExtractor(Extractor):
    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({"Authorization": f"Bearer {api_key}"})

    def extract(self) -> Iterator[dict]:
        page = 1
        while True:
            response = self.session.get(
                f"{self.base_url}?page={page}&per_page=100"
            )
            response.raise_for_status()

            data = response.json()
            if not data["items"]:
                break

            yield from data["items"]
            page += 1

            if "Retry-After" in response.headers:
                sleep(int(response.headers["Retry-After"]))
```

## Data Quality with Great Expectations

```python
import great_expectations as ge
import pandas as pd

def validate_batch(df: pd.DataFrame) -> bool:
    ge_df = ge.from_pandas(df)

    results = ge_df.expect_column_values_to_not_be_null("user_id")
    results &= ge_df.expect_column_values_to_be_in_set(
        "status", ["active", "inactive", "suspended"]
    )
    results &= ge_df.expect_column_values_to_match_regex(
        "email", r"^[^@]+@[^@]+\.[^@]+$"
    )
    results &= ge_df.expect_column_mean_to_be_between(
        "amount", min_value=0, max_value=10000
    )

    if not results.success:
        logger.warning(f"Data quality check failed: {results}")

    return results.success
```

## Incremental Loading Pattern

```python
from datetime import datetime, timedelta

class IncrementalPostgresLoader(Loader):
    def __init__(self, connection_string: str, table: str, watermark_column: str):
        self.conn_string = connection_string
        self.table = table
        self.watermark_col = watermark_column

    def get_watermark(self) -> datetime:
        with psycopg2.connect(self.conn_string) as conn:
            with conn.cursor() as cur:
                cur.execute(f"SELECT MAX({self.watermark_col}) FROM {self.table}")
                result = cur.fetchone()
                return result[0] or datetime(2020, 1, 1)

    def load(self, records: list[dict]) -> int:
        with psycopg2.connect(self.conn_string) as conn:
            with conn.cursor() as cur:
                # UPSERT pattern
                insert_stmt = f"""
                INSERT INTO {self.table} ({', '.join(records[0].keys())})
                VALUES ({', '.join(['%s'] * len(records[0]))})
                ON CONFLICT (id) DO UPDATE SET
                    {', '.join(f'{k}=EXCLUDED.{k}' for k in records[0].keys() if k != 'id')}
                """
                values = [tuple(r.values()) for r in records]
                cur.executemany(insert_stmt, values)
            conn.commit()
        return len(records)
```

## Pipeline Orchestration with Prefect

```python
from prefect import flow, task
from prefect.task_runners import ConcurrentTaskRunner

@task(retries=3, retry_delay_seconds=60)
def extract_users():
    return APIPaginatedExtractor("https://api.example.com/users", API_KEY).extract()

@task
def transform_users(raw_users):
    return [UserTransformer().transform(u) for u in raw_users]

@task
def load_users(users):
    return IncrementalPostgresLoader(DB_URL, "users", "updated_at").load(users)

@flow(task_runner=ConcurrentTaskRunner())
def user_pipeline():
    raw = extract_users()
    transformed = transform_users(raw)
    count = load_users(transformed)
    print(f"Loaded {count} users")
```

## Performance Tips

### 1. Use Generators Everywhere

```python
# Memory-efficient: processes one record at a time
def process_large_file(path: str):
    with open(path) as f:
        for line in f:
            yield parse_line(line)
```

### 2. Parallel Processing with concurrent.futures

```python
from concurrent.futures import ProcessPoolExecutor

def process_file(filepath: str):
    with open(filepath) as f:
        return sum(1 for _ in f)

with ProcessPoolExecutor(max_workers=8) as executor:
    results = executor.map(process_file, file_list)
```

### 3. Polars over Pandas for large datasets

```python
import polars as pl

# Polars is 5-10x faster than Pandas, uses less memory
df = pl.read_csv("huge_file.csv")
result = df.group_by("category").agg(
    pl.col("amount").sum().alias("total"),
    pl.col("amount").mean().alias("avg")
)
```

## Conclusion

Good data engineering is about reliability, not cleverness. Build idempotent pipelines with proper error handling, watermarks for incremental loads, and monitoring. Your future self (and your on-call rotation) will thank you.
