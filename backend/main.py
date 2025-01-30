import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.views.root import api_router


app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router)


def main():
    uvicorn.run("main:app", port=7777, reload=True)


# Entry point for running the FastAPI app
if __name__ == "__main__":
    main()