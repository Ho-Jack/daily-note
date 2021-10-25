# 求100以内所有的奇数之和
# 获取所有100以内数
# i = 0
# # 创建一个变量，用来保存结果
# result = 0
# while i < 100 :
#     i += 1
#     # 判断i是否是奇数
#     if i % 2 != 0:
#         result += i

# print('result =',result)

# 获取100以内所有的奇数
# i = 1
# while i < 100:
#     print(i)
#     i += 2

# 求100以内所有7的倍数之和，以及个数
i = 7 
# 创建一个变量，来保存结果
result = 0
# 创建一个计数器，用来记录循环执行的次数
# 计数器就是一个变量，专门用来记录次数的变量
count = 0
while i < 100:
    # 为计数器加1
    count += 1
    result += i
    i += 7    

print('总和为：',result,'总数量为:',count)
