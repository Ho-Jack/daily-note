from threading import Lock,Thread
import time
def work():
    print('work-start')
    global n
    lock.acquire()
    temp = n
    time.sleep(0.1)
    n = temp-1
    print(n)
    lock.release()


if __name__ == '__main__':
    lock = Lock()
    n = 5
    l = []
    for i in range(5):
        p = Thread(target=work)
        l.append(p)
        p.start()
    for p in l:
        p.join()