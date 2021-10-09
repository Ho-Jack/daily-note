import threading
import time
def func(lock):
    global gl_num
    lock.acquire()
    gl_num += 1
    time.sleep(1)
    print(gl_num)
    lock.release()


if __name__ == '__main__':
    gl_num = 0
    lock = threading.RLock()
    for i in range(5):
        t = threading.Thread(target=func,args=(lock,))
        t.start()