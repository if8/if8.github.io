"""用python设计第一个游戏"""

temp = input("不妨猜想一下小甲鱼现在心里想的是哪个数字,")
guess = int(temp)
if guess == 8:
  print("你猜对了")
  print("没有奖品")
else:
  print("猜错了")

print("游戏结束")
