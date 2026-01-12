"""
Simple Vercel serverless handler for testing
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "The Nail Hubs API is running!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Vercel handler
handler = Mangum(app)
