import tensorflow as tf

model = tf.keras.models.load_model("app/services/unet_loveda_final.h5")
print("Model loaded successfully")