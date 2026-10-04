class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.__price = price
        self.quantity = quantity

    # Изменение цены
    def change_price(self, new_price):
        if new_price > 0:
            self.__price = new_price
        else:
            print("Цена должна быть больше 0")

    # Добавление товара на склад
    def add_quantity(self, amount):
        if amount > 0:
            self.quantity += amount
        else:
            print("Количество должно быть больше 0")

    # Расчёт стоимости запасов
    def stock_value(self):
        return self.__price * self.quantity

    # Получение текущей цены
    def get_price(self):
        return self.__price


# Создание трёх объектов
product1 = Product("Ноутбук", 350000, 5)
product2 = Product("Телефон", 200000, 10)
product3 = Product("Наушники", 25000, 20)

# Вывод информации
print("Товар:", product1.name)
print("Цена:", product1.get_price())
print("Количество:", product1.quantity)
print("Стоимость запасов:", product1.stock_value())

print()

print("Товар:", product2.name)
print("Цена:", product2.get_price())
print("Количество:", product2.quantity)
print("Стоимость запасов:", product2.stock_value())

print()

print("Товар:", product3.name)
print("Цена:", product3.get_price())
print("Количество:", product3.quantity)
print("Стоимость запасов:", product3.stock_value())

# Изменение состояния объекта
product1.change_price(330000)
product1.add_quantity(3)

print()
print("После изменения:")
print("Товар:", product1.name)
print("Новая цена:", product1.get_price())
print("Новое количество:", product1.quantity)
print("Новая стоимость запасов:", product1.stock_value())