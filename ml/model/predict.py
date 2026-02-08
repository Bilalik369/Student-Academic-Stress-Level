import pikele 
import numpy as np 
import os 




def load_model():
    """Load trained pipeline (preprocessing + model)."""
    model_path = 'ml/model/stress_model.pkl'
    
    if not os.path.exists(model_path):
        print("Model file not found!")
        return None
    
    with open(model_path, 'rb') as f:
        pipeline = pickle.load(f)
    
    return pipeline
    

  