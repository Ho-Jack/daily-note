import threading
import time
def run(n):
    print('task',n)
    time.sleep(1)
    print('3s')
    time.sleep(1)
    print('2s')
    time.sleep(1)
    print('1s')

if __name__ == '__main__':
    t=threading.Thread(target=run,args=('t1',))
    t.setDaemon(True)
    t.start()
    print('end')