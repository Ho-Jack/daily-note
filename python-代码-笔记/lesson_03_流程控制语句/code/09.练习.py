# 获取用户输入的任意数，判断其是否是质数。
num = int(input('输入一个任意的大于1的整数：'))

# 判断num是否是质数，只能被1和它自身整除的数就是质数
# 获取到所有的可能整除num的整数
i = 2
# 创建一个变量，用来记录num是否是质数，默认认为num是质数
flag = True
while i < num:
    # 判断num能否被i整除
    # 如果num能被i整除，则说明num一定不是质数
    if num % i == 0 :
        # 一旦进入判断，则证明num不是质数，则需要将flag修改为false
        flag = False
    i += 1

if flag :
    print(num,'是质数')
else :
    print(num,'不是质数')