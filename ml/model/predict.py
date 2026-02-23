import pickle
import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "stress_model.pkl")


def load_model():
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError("Model file not found. Please train the model first.")

    with open(MODEL_PATH, "rb") as f:
        return pickle.load(f)


MODEL = load_model()


def categorize_stress(score):
    if score < 3:
        return "Low"
    elif score < 5:
        return "Moderate"
    elif score < 7:
        return "High"
    else:
        return "Critical"

def predict_stress(factors):

   
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

 
    score = float(MODEL.predict(X)[0])
    category = categorize_stress(score)

    recommendations = []

    if score < 3:
        recommendations.append({
            "ayat": "﴿ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ﴾ (الرعد 28)",
            "advice": "استمر على عاداتك الجيدة وركز على الدراسة بهدوء."
        })
    elif score < 5:
        recommendations.append({
            "ayat": "﴿ وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا ﴾ (الطلاق 2)",
            "advice": "خذ استراحة قصيرة بين المراجعة واستخدم تقنيات التنفس والاسترخاء."
        })
    elif score < 7:
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
        "stress_level": round(score, 2),
        "stress_category": category,
        "recommendations": recommendations
    }


if __name__ == "__main__":

    test_input = {
        'Your Academic Stage': 'Undergraduate',
        'Peer pressure': 8,
        'Academic pressure from your home': 6,
        'Study Environment': 'Library',
        'What coping strategy you use as a student?': 'Exercise',
        'Do you have any bad habits like smoking, drinking on a daily basis?': 'Yes',
        'What would you rate the academic  competition in your student life': 7
    }

    result = predict_stress(test_input)

    
    print(f"Predicted Stress Level: {result['stress_level']}")
    print(f"Stress Category: {result['stress_category']}")
    print("Recommendations:")
    for rec in result['recommendations']:
        print(f"  - Ayah: {rec['ayat']}")
        print(f"    Advice: {rec['advice']}")