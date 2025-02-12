import cv2
from pathlib import Path
from matplotlib import pyplot as plt
from IPython.core.display import HTML
from pdf2image import convert_from_path
import deepdoctection as dd


pdf_path = Path.cwd() / "exampledata/CV_SvenHuening.pdf"
images = convert_from_path(pdf_path)
images[0].save("exampledata/CV_SvenHuening.jpg", "JPEG")

image_path = Path.cwd()  / "exampledata/CV_SvenHuening.jpg"

image = cv2.imread(image_path.as_posix())
plt.figure(figsize = (25,17))
plt.axis('off')
plt.imshow(image)