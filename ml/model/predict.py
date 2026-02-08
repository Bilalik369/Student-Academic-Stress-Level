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

def predict_stress(factors) :
    pipline : load_model()

    if not pipline :
        return{ "error" : "model not loaded"}
    
    feature_order = [
        'Your Academic Stage',
        'Peer pressure',
        'Academic pressure from your home',
        'Study Environment',
        'What coping strategy you use as a student?',
        'Do you have any bad habits like smoking, drinking on a daily basis?',
        'What would you rate the academic  competition in your student life'
    ]
    x = np.array([[factors.get(f,0) for f in feature_order]])

    predict_stress = pipline.pipeline.predict(X)[0]

    if predicted_stress < 3:
        category = 'Low'
    elif predicted_stress < 5:
        category = 'Moderate'
    elif predicted_stress < 7:
        category = 'High'
    else:
        category = 'Critical'

  