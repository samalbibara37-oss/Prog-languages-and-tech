number = int(input("Введите четырехзначное число: "))

thousands = number // 1000
hundreds = number // 100 % 10
tens = number // 10 % 10
units = number % 10

print("Тысячи:", thousands)
print("Сотни:", hundreds)
print("Десятки:", tens)
print("Единицы:", units)