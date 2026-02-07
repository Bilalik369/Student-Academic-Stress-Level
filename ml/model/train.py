import numpy as np
import pandas as pd 

from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

import pickle
import os




def train_model():
    
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))  

    
    csv_path = os.path.join(BASE_DIR, "../data/stress_data.csv")

   
    csv_path = os.path.abspath(csv_path)
    print("CSV Path:", csv_path)

    data = pd.read_csv(csv_path)
    print("Data preview:")


    data = data.drop(columns=["Timestamp"])

    target_col = "Rate your academic stress index "

    feature_cols = [col for col in data.columns if col != target_col]
    X= data[feature_cols]
    Y= data[target_col]


    categorical_cols  = ["Your Academic Stage" , 'Study Environment', 'What coping strategy you use as a student?','Do you have any bad habits like smoking, drinking on a daily basis?']
    numerical_cols = [col for col in X.columns if col not in categorical_cols]

    preprocessor = ColumnTransformer(
        transformers = [
            ('num' , StandardScaler() , numerical_cols)
            ('cat' , OneHotEncoder(handel_unknown= 'ignore') , categorical_cols)

        ]
    )
    pipeline = Pipeline([
        ('preprocessor' , preprocessor),
        ('model' , RandomForestRegressor(n_estimators = 100 , random_state=42))
    ])

    X_train , X_test , Y_train , Y_test = train_test_split(test_size=20 , random_state=42)

    pipeline.fit(X_train , Y_train)

    model_dir = os.path.join(BASE_DIR, "../model")
    os.makedirs(model_dir, exist_ok=True)
    model_path = os.path.join(model_dir, "stress_model.pkl")
    with open(model_path, 'wb') as f:
        pickle.dump(pipeline, f)




train_model()
