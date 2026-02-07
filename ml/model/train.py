import numpy as np
import pandas as pd 
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
import pickle
import os


def train_model():

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))  
    csv_path = os.path.join(BASE_DIR, "../data/stress_data.csv")
    csv_path = os.path.abspath(csv_path)

    print("CSV Path:", csv_path)


    data = pd.read_csv(csv_path)

    data.columns = data.columns.str.strip()

    print("Columns:")
    print(data.columns)

    print("\nData preview:")
    print(data.head())


  
    if "Timestamp" in data.columns:
        data = data.drop(columns=["Timestamp"])



    target_col = "Rate your academic stress index"


  
    X = data.drop(columns=[target_col])
    y = data[target_col]



    categorical_cols = [
        'Your Academic Stage',
        'Study Environment', 
        'What coping strategy you use as a student?',
        'Do you have any bad habits like smoking, drinking on a daily basis?'
    ]


 
    numerical_cols = [col for col in X.columns if col not in categorical_cols]

   
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numerical_cols),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols)
        ]
    )


    pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('model', RandomForestRegressor(
            n_estimators=100,
            random_state=42
        ))
    ])


    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y,
        test_size=0.2,
        random_state=42
    )


    pipeline.fit(X_train, y_train)



    model_dir = os.path.join(BASE_DIR, "../model")
    os.makedirs(model_dir, exist_ok=True)

    model_path = os.path.join(model_dir, "stress_model.pkl")

    with open(model_path, "wb") as f:
        pickle.dump(pipeline, f)



    train_score = pipeline.score(X_train, y_train)
    test_score = pipeline.score(X_test, y_test)

    print(f"\nTraining R² score: {train_score:.2f}")
    print(f"Test R² score: {test_score:.2f}")
    print(f"Model saved at: {model_path}")


if __name__ == "__main__":
    train_model()
