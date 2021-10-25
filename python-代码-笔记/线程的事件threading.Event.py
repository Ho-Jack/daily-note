import threading
import time
event = threading.Event()
def lighter():
    count = 0
    event.set()         #初始者为绿灯
    while True:
        if 5 < count <=10:
            event.clear()  #红灯，清除标志位   将flag设置为 False (阻塞) 6-10
            print("\33[41;lmred light is on...\033[0m]")
        elif count > 10:
            event.set()    #绿灯，设置标志位   将flag设置为 True (不阻塞)  
            count = 0
        else:              # 1-5
            print('\33[42;lmgreen light is on...\033[0m')
        time.sleep(1)
        count += 1

def car(name):
    while True:
        if event.is_set():     #判断是否设置了标志位  flag=True
            print('[%s] running.....'%name)
            time.sleep(1)
        else:                  #flag=False
            print('[%s] sees red light,waiting...'%name)
            event.wait()      #监听flag，True的时候继续执行    
            print('[%s] green light is on,start going...'%name)

startTime = time.time()
light = threading.Thread(target=lighter,)
light.start()

car = threading.Thread(target=car,args=('MINT',))
car.start()
endTime = time.time()
print('用时：',endTime-startTime)