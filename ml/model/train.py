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




train_model()
