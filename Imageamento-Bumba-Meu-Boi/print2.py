import cv2
import numpy as np
import math
from scipy.spatial import distance as dist
import sys
recochoalt = 0.0
recocholar = 0.0
recoboy = 0.0
recoboi = 0.0
IMG = cv2.imread(sys.argv[1])
cv2.namedWindow("image")
POINTS = []
def putPoint(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN:
        cv2.circle(IMG,(x,y),5,(0,255,0),-1)
        POINTS.append((x,y))
cv2.setMouseCallback("image",putPoint)
while(1):
    cv2.imshow("image",IMG)
    tecla = cv2.waitKey(0)
    #print(tecla)
    if tecla == 97:
        if len (POINTS) == 2:
            recochoalt = dist.euclidean(POINTS[0], POINTS[1])
            POINTS = []
    elif tecla == 98:
           #if len (POINTS) == 2:
            recocholar = dist.euclidean(POINTS[0], POINTS[1])
            POINTS = []
    elif tecla == 99:
            #if len (POINTS) == 2:
             recoboi = dist.euclidean(POINTS[0], POINTS[1])
             POINTS = []
    elif tecla == 100:
             #if len (POINTS) == 2:
              recoboy = dist.euclidean(POINTS[0], POINTS[1])
              POINTS = []
    elif tecla == 113:
          break                                    		    

areapixel = recochoalt*recocholar
tamanhorealdopixel = areapixel/5333
alturaboi=(recoboi/tamanhorealdopixel)/100
larguraboi=(recoboy/tamanhorealdopixel)/100

#print(areapixel)
#print(tamanhorealdopixel)
print(alturaboi)
print(larguraboi)

diametro = alturaboi**2
mult = 9*diametro
c = 87.5
largmultconst = larguraboi*c
pesovivo = mult* largmultconst
print(pesovivo)










