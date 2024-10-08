from calliopemini import *

number_arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
functions_arr = ["+", "-", "*", "/", "(", ")", "."]
mode_to_select = "num"
current_index = 0
mode = "choose"
to_calculate = ""
to_add = ""

def handle_input():
    global current_index
    global mode_to_select
    global to_add
    if mode == "choose":
        if current_index == 0:
            display.scroll("num")
            current_index = 1
            mode_to_select = "num"
        else:
            display.scroll("func")
            current_index = 0
            mode_to_select = "func"
        
    if mode == "num":
        if current_index < len(number_arr):
            display.show(number_arr[current_index])
            to_add = number_arr[current_index]
            current_index += 1
        else:
            current_index = 0
    if mode == "func":
        if current_index < len(functions_arr):
            display.show(functions_arr[current_index])
            to_add = functions_arr[current_index]
            current_index += 1
        else:
            current_index = 0
            
def getNewValue():
    global current_index
    global mode
    global mode_to_select
    global to_add

    mode_to_select = "num"
    current_index = 0
    mode = "choose"
    to_add = ""

def process_input():
    global to_calculate
    global to_add
    global mode
    global mode_to_select
    if mode == "choose":
        mode = mode_to_select
        mode_to_select = "num"
        handle_input()
    else:
        to_calculate += to_add
        print(to_calculate)
        getNewValue()
        
def reset_all():
    global current_index
    global mode
    global mode_to_select
    global to_add
    global to_calculate

    mode_to_select = "num"
    current_index = 0
    mode = "choose"
    to_add = ""
    to_calculate = ""

def main():
    while True:
        try:
            if button_a.is_pressed():
                if button_b.is_pressed():
                    reset_all()
                handle_input()
                sleep(500)
            elif button_b.is_pressed():
                process_input()
                sleep(1000)
            elif accelerometer.was_gesture("shake"):
                result = eval(to_calculate)
                display.scroll(result)
                reset_all()
        except Exception as e:
            display.scroll("Fehler")
            reset_all()

if __name__ == "__main__":
    main()
