## Get the panda package first

import tkinter as tk
from tkinter import filedialog
from tkinter import messagebox
from tkinter import StringVar
import pandas as pd
import csv, json

# Constants
TEXT_COLOR = "white"
BUTTON_COLOR = "green"
BUTTON_WIDTH = 20
BUTTON_HEIGHT = 1
FONT = ('helvetica', 12, 'bold')
#


root= tk.Tk()
root.title("CSV to JSON")
root.resizable(False, False)

canvas1 = tk.Canvas(root, width = 300, height = 300, bg = 'black', relief = 'raised')
canvas1.pack()
fileToConvert = tk.StringVar()
fileToConvert.set("Nothing imported yet.")
fileNameLabel = tk.Label(root, textvariable=fileToConvert, bg = 'black', fg=TEXT_COLOR)
fileNameLabel.config(font=('Times', 12))
canvas1.create_window(150, 60, window=fileNameLabel)

data = {}
def getCSV():
    importedPath = filedialog.askopenfilename()
    if importedPath.lower().endswith('.csv') == False :
        MsgBox = tk.messagebox.askquestion('File extension is not .csv','Are you sure it\'s a csv file?', icon = 'warning')
        if MsgBox == 'no':
            return
    try :
        read_file = pd.read_csv (importedPath)
        lastDirChange = importedPath.rfind('/')
        fileToConvert.set(importedPath[lastDirChange+1:])
    except:
        tk.messagebox.showinfo("Error", "Selected file cannot be converted to JSON", icon = 'error')


    with open(importedPath) as csvFile:
        global data
        csvReader = csv.DictReader(csvFile)
        data = list()
        for row in csvReader:
            data.append(row)
        data = [dict(zip(data[0],row)) for row in data]

importButton = tk.Button(text="Import CSV File", width=BUTTON_WIDTH, height=BUTTON_HEIGHT, 
    command=getCSV, bg=BUTTON_COLOR, fg=TEXT_COLOR, font=FONT)
canvas1.create_window(150, 130, window=importButton)

def convertToJSON():
    if fileNameLabel.cget("text") != "Nothing imported yet.":
        exportPath = filedialog.asksaveasfilename(defaultextension='.json')
        with open(exportPath, 'w') as jsonFile:
            global data
            # data.pop(0)
            json.dump(data, jsonFile)
    else: 
        tk.messagebox.showinfo("Error", "Please import a CSV File before attempting to convert", icon = 'error')


convertButton = tk.Button(text='Convert CSV to JSON', width=BUTTON_WIDTH, height=BUTTON_HEIGHT, 
    command=convertToJSON, bg=BUTTON_COLOR, fg=TEXT_COLOR, font=FONT)
canvas1.create_window(150, 180, window=convertButton)

def exitApplication():
    MsgBox = tk.messagebox.askquestion('Exit','Confirm exit?', icon = 'warning')
    if MsgBox == 'yes':
       root.destroy()
     
exitButton = tk.Button (root, text='Quit', width=BUTTON_WIDTH, height=BUTTON_HEIGHT, 
    command=exitApplication, bg='brown', fg=TEXT_COLOR, font=FONT)
canvas1.create_window(150, 230, window=exitButton)

root.mainloop()