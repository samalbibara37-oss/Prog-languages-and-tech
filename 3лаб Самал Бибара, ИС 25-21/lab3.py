class Student:
    def __init__(self, name, age, specialty, course):
        self.name = name
        self.age = age
        self.specialty = specialty
        self.course = course

    def show_info(self):
        print("Имя:", self.name)
        print("Возраст:", self.age)
        print("Специальность:", self.specialty)
        print("Курс:", self.course)

    def change_specialty(self, new_specialty):
        self.specialty = new_specialty
        print("Специальность изменена на:", self.specialty)

    def next_course(self):
        if self.course < 4:
            self.course += 1
            print(self.name, "переведен(а) на", self.course, "курс.")
        else:
            print(self.name, "уже учится на 4 курсе.")

    def introduce(self):
        print(
            "Меня зовут", self.name,
            ", мне", self.age,
            "лет, я обучаюсь по специальности",
            self.specialty
        )


student1 = Student("Самал", 20, "Информационные системы", 2)
student2 = Student("Аян", 19, "Экономика", 1)
student3 = Student("Мадина", 21, "Юриспруденция", 3)

print("===== СТУДЕНТ 1 =====")
student1.show_info()

print("\n===== СТУДЕНТ 2 =====")
student2.show_info()

print("\n===== СТУДЕНТ 3 =====")
student3.show_info()

print("\n===== ИЗМЕНЕНИЕ СПЕЦИАЛЬНОСТИ =====")
student1.change_specialty("Программная инженерия")

print("\nИнформация после изменения:")
student1.show_info()

print("\n===== ПЕРЕХОД НА СЛЕДУЮЩИЙ КУРС =====")
student2.next_course()

print("\nИнформация после изменения:")
student2.show_info()

print("\n===== ДОПОЛНИТЕЛЬНЫЙ МЕТОД =====")
student3.introduce()