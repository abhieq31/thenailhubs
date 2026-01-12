"""
Vercel Serverless Function Handler for The Nail Hubs API
"""
from mangum import Mangum
from main import app

# Wrap FastAPI app with Mangum for Vercel/AWS Lambda compatibility
# Use auto lifespan to handle startup events properly
handler = Mangum(app, lifespan="auto")
