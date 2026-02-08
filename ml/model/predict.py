import pickle
import pandas as pd
import os

def load_model():
   
    script_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(script_dir, 'stress_model.pkl')
    
    if not os.path.exists(model_path):
        print(f"Model file not found at: {model_path}")
        return None
    
    with open(model_path, 'rb') as f:
        pipeline = pickle.load(f)
    
    return pipeline

def predict_stress(factors):
    pipeline = load_model()
    if not pipeline:
        return {"error": "Model not loaded."}

    feature_order = [
        'Your Academic Stage',
        'Peer pressure',
        'Academic pressure from your home',
        'Study Environment',
        'What coping strategy you use as a student?',
        'Do you have any bad habits like smoking, drinking on a daily basis?',
        'What would you rate the academic  competition in your student life'
    ]

    X = pd.DataFrame([factors], columns=feature_order)
    predicted_stress = pipeline.predict(X)[0]

 
    if predicted_stress < 3:
        category = 'Low'
    elif predicted_stress < 5:
        category = 'Moderate'
    elif predicted_stress < 7:
        category = 'High'
    else:
        category = 'Critical'

    
    recommendations = []

   
    if predicted_stress < 3:
        recommendations.append("Keep doing what you're doing; your stress is low.")
    elif predicted_stress < 5:
        recommendations.append("Try to manage stress with small breaks and relaxation techniques.")
    elif predicted_stress < 7:
        recommendations.append("Plan your study schedule and use effective coping strategies.")
    else:
        recommendations.append("Your stress is very high; consider seeking professional support.")

   
    if factors.get('Peer pressure', 0) > 7:
        recommendations.append("Reduce peer pressure by setting boundaries and taking breaks.")

    
    if factors.get('Academic pressure from your home', 0) > 7:
        recommendations.append("Communicate realistic expectations with your family.")

    
    if str(factors.get('Do you have any bad habits like smoking, drinking on a daily basis?')).lower() == 'yes':
        recommendations.append("Consider reducing habits that negatively affect your health or focus.")

  
    coping = str(factors.get('What coping strategy you use as a student?')).lower()
    if coping not in ['exercise', 'meditation', 'sports', 'relaxation']:
        recommendations.append("Try healthy coping strategies like exercise, meditation, or sports.")

    return {
        'stress_level': float(predicted_stress),
        'stress_category': category,
        'recommendations': recommendations
    }


if __name__ == '__main__':
    test_factors = {
        'Your Academic Stage': 'Undergraduate',
        'Peer pressure': 6,
        'Academic pressure from your home': 5,
        'Study Environment': 'Library',
        'What coping strategy you use as a student?': 'Exercise',
        'Do you have any bad habits like smoking, drinking on a daily basis?': 'No',
        'What would you rate the academic  competition in your student life': 6
    }
    
    result = predict_stress(test_factors)
    print(f"Predicted Stress Level: {result['stress_level']:.2f}")
    print(f"Stress Category: {result['stress_category']}")
    print("Recommendations:")
    for rec in result['recommendations']:
        print(f"  - {rec}")
