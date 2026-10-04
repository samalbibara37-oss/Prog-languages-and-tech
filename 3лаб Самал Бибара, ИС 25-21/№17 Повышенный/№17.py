class Library:
    def __init__(self, name):
        self.name = name
        self.__books = []

    # Добавление книги
    def add_book(self, book):
        self.__books.append(book)
        print(f'Книга "{book}" добавлена в библиотеку.')

    # Удаление книги
    def remove_book(self, book):
        if book in self.__books:
            self.__books.remove(book)
            print(f'Книга "{book}" удалена из библиотеки.')
        else:
            print(f'Книга "{book}" не найдена.')

    # Поиск книги по названию
    def search_book(self, book):
        if book in self.__books:
            print(f'Книга "{book}" найдена.')
        else:
            print(f'Книга "{book}" не найдена.')

    # Вывод всех книг
    def show_books(self):
        print("Книги в библиотеке:")
        if len(self.__books) == 0:
            print("Библиотека пуста.")
        else:
            for book in self.__books:
                print("-", book)


# Создание объекта библиотеки
library = Library("Городская библиотека")

# Добавление книг
library.add_book("Война и мир")
library.add_book("Преступление и наказание")
library.add_book("Мастер и Маргарита")

print()

# Вывод всех книг
library.show_books()

print()

# Поиск книги
library.search_book("Война и мир")
library.search_book("Гарри Поттер")

print()

# Удаление книги
library.remove_book("Преступление и наказание")

print()

# Вывод книг после удаления
library.show_books()