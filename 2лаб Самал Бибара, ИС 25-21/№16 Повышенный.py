import math

a = float(input("Введите первую сторону: "))
b = float(input("Введите вторую сторону: "))
c = float(input("Введите третью сторону: "))

perimeter = a + b + c
semiperimeter = perimeter / 2

area = math.sqrt(
    semiperimeter *
    (semiperimeter - a) *
    (semiperimeter - b) *
    (semiperimeter - c)
)

print("Периметр:", perimeter)
print("Полупериметр:", semiperimeter)
print("Площадь:", area)