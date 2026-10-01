# 1. List: an ordered group of items
tags = ["python", "fastapi", "sql"]
tags.append("nextjs")
print(tags[0])          # first item: python
print(len(tags))        # how many: 4

# 2. Dict: key → value pairs (like a JS object)
post = {"title": "Hello", "author": "Farzam"}
print(post["title"])    # Hello
post["likes"] = 10      # add a new key

# 3. Loop: go through each item
for tag in tags:
    print("Tag:", tag)

# 4. Function: reusable code
def make_title(text):
    return text.upper()

print(make_title("my first post"))   # MY FIRST POST

# 5. Class: a blueprint for making objects
class Author:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"Hi, I am {self.name}"

a = Author("Farzam", 25)
print(a.greet())        # Hi, I am Farzam
