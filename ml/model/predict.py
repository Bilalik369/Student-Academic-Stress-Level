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
        recommendations.append({
            "ayat": "﴿ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ﴾ (الرعد 28)",
            "advice": "استمر على عاداتك الجيدة وركز على الدراسة بهدوء."
        })
    elif predicted_stress < 5:
        recommendations.append({
            "ayat": "﴿ وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا ﴾ (الطلاق 2)",
            "advice": "خذ استراحة قصيرة بين المراجعة واستخدم تقنيات التنفس والاسترخاء."
        })
    elif predicted_stress < 7:
        recommendations.append({
            "ayat": "﴿ فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا ﴾ (الشرح 5-6)",
            "advice": "نظّم جدولك الدراسي واستعمل استراتيجيات فعّالة لإدارة الوقت."
        })
    else:
        recommendations.append({
            "ayat": "﴿ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ﴾ (البقرة 286)",
            "advice": "توكل على الله واطلب المساعدة عند الحاجة من مستشار أو شخص موثوق."
        })
        recommendations.append({
            "ayat": "﴿ وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ ﴾ (النحل 127)",
            "advice": "حاول تخصيص وقت يومي للصلاة أو التأمل لتهدئة العقل."
        })

   
    if factors.get('Peer pressure', 0) > 7:
        recommendations.append({
            "ayat": "﴿ وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ ﴾ (آل عمران 139)",
            "advice": "ضع حدود واضحة مع أصدقائك وخذ استراحة عند الحاجة."
        })


    if factors.get('Academic pressure from your home', 0) > 7:
        recommendations.append({
            "ayat": "﴿ رَبِّ اشْرَحْ لِي صَدْرِي ۝ وَيَسِّرْ لِي أَمْرِي ﴾ (طه 25-26)",
            "advice": "تواصل مع عائلتك واشرح لهم توقعاتك الواقعية."
        })

   
    if str(factors.get('Do you have any bad habits like smoking, drinking on a daily basis?')).lower() == 'yes':
        recommendations.append({
            "ayat": "﴿ وَلَا تُلْقُوا بِأَيْدِيكُمْ إِلَى التَّهْلُكَةِ ﴾ (البقرة 195)",
            "advice": "قلّل من العادات التي تؤثر على صحتك وتركيزك."
        })

    return {
        'stress_level': float(predicted_stress),
        'stress_category': category,
        'recommendations': recommendations
    }


if __name__ == '__main__':
    test_factors = {
        'Your Academic Stage': 'Undergraduate',
        'Peer pressure': 8,
        'Academic pressure from your home': 6,
        'Study Environment': 'Library',
        'What coping strategy you use as a student?': 'Exercise',
        'Do you have any bad habits like smoking, drinking on a daily basis?': 'Yes',
        'What would you rate the academic  competition in your student life': 7
    }

    result = predict_stress(test_factors)

    print(f"Predicted Stress Level: {result['stress_level']:.2f}")
    print(f"Stress Category: {result['stress_category']}")
    print("Recommendations:")
    for rec in result['recommendations']:
        print(f"  - Ayah: {rec['ayat']}")
        print(f"    Advice: {rec['advice']}")
