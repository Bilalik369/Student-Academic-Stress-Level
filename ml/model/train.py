import pandas as pd
import os
import pickle
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.abspath(os.path.join(BASE_DIR, "../data/stress_data.csv"))
MODEL_PATH = os.path.join(BASE_DIR, "stress_model.pkl")


def train_model():

    print("Loading dataset...")
    data = pd.read_csv(DATA_PATH)
    data.columns = data.columns.str.strip()

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

    preprocessor = ColumnTransformer([
        ('num', StandardScaler(), numerical_cols),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols)
    ])

    pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('model', RandomForestRegressor(
            n_estimators=200,
            random_state=42
        ))
    ])

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    print("Training model...")
    pipeline.fit(X_train, y_train)

    y_pred = pipeline.predict(X_test)

    print("R² Score:", round(r2_score(y_test, y_pred), 3))
    print("MAE:", round(mean_absolute_error(y_test, y_pred), 3))

    with open(MODEL_PATH, "wb") as f:
        pickle.dump(pipeline, f)

    print(f"Model saved successfully at: {MODEL_PATH}")


if __name__ == "__main__":
    train_model()