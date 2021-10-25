# if-elif-else语句
# 语法：
#   if 条件表达式 :
#       代码块
#   elif 条件表达式 :
#       代码块
#   elif 条件表达式 :
#       代码块
#   elif 条件表达式 :
#       代码块
#   else :
#       代码块
#       
# 执行流程：
#   if-elif-else语句在执行时，会自上向下依次对条件表达式进行求值判断，
#       如果表达式的结果为True，则执行当前代码块，然后语句结束
#       如果表达式的结果为False，则继续向下判断，直到找到True为止
#       如果所有的表达式都是False，则执行else后的代码块
#   if-elif-else中只会有一个代码块会执行

age = 210

# if age > 200 :
#     print('活着可真没劲呢！')
# elif age > 100 :
#     print('你也是老大不小了！')
# elif age >= 60 :
#     print('你已经退休了！')
# elif age >= 30 :
#     print('你已经是中年了！')
# elif age >= 18 :
#     print('你已经成年了！')
# else :
#     print('你还是个小孩！')

age = 68

if age >= 18 and age < 30 :
    print('你已经成年了！')
elif age >= 30 and age < 60 :
    print('你已经中年了！')
elif age >= 60 :
    print('你已经退休了！')