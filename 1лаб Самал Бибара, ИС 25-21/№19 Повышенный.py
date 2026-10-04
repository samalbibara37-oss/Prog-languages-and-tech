import math

a = float(input("Введите первый катет: "))
b = float(input("Введите второй катет: "))

hypotenuse = math.sqrt(a ** 2 + b ** 2)
area = (a * b) / 2
perimeter = a + b + hypotenuse

angle1 = math.degrees(math.atan(a / b))
angle2 = math.degrees(math.atan(b / a))

print("Гипотенуза:", hypotenuse)
print("Площадь:", area)
print("Периметр:", perimeter)
print("Первый острый угол:", angle1)
print("Второй острый угол:", angle2)