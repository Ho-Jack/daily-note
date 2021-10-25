# 求100以内所有的质数
# 创建一个循环，求1-100以内所有的数
i = 2
while i <= 100:
    
    # 创建一个变量，记录i的状态，默认认为i是质数
    flag = True

    # 判断i是否是质数
    # 获取所有可能成为i的因数的数
    j = 2 
    while j < i:
        # 判断i能否被j整除
        if i % j == 0:
            # i能被j整除，证明i不是质数，修改flag为False
            flag = False
        j += 1
    # 验证结果并输出
    if flag :
        print(i)   

    i += 1