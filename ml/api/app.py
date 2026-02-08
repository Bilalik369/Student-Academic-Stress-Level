
from fastapi import FastAPI
from pydantic import BaseModel
from ml.model.predict import predict_stress

app = FastAPI()


class StressInput(BaseModel):
    Your_Academic_Stage: str
    Peer_pressure: float
    Academic_pressure_from_your_home: float
    Study_Environment: str
    Coping_Strategy: str
    Bad_Habits: str
    Academic_Competition: float

@app.post("/predict")
def predict(data: StressInput):
    factors = {
        'Your Academic Stage': data.Your_Academic_Stage,
        'Peer pressure': data.Peer_pressure,
        'Academic pressure from your home': data.Academic_pressure_from_your_home,
        'Study Environment': data.Study_Environment,
        'What coping strategy you use as a student?': data.Coping_Strategy,
        'Do you have any bad habits like smoking, drinking on a daily basis?': data.Bad_Habits,
        'What would you rate the academic  competition in your student life': data.Academic_Competition
    }
    
    result = predict_stress(factors)
    return result
