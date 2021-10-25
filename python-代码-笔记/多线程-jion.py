import threading
import time
def run(n):
    print('task',n)
    time.sleep(2)
    print('5s')
    time.sleep(2)
    print('3s')
    time.sleep(2)
    print('1s')
if __name__ == '__main__':
    t=threading.Thread(target=run,args=('t1',))
    t.setDaemon(True)    #把子线程设置为守护线程，必须在start()之前设置
    t.start()
    t.join()             #设置主线程等待子线程结束
    print('end')