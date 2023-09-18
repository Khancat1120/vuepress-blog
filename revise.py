import os
import re
import subprocess

prefix_l_1 = "md_files/"

def find_files_in_directory(directory):
    file_list = []

    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            file_list.append(file_path)

    return file_list

all_files = find_files_in_directory(prefix_l_1)

for file in all_files:
    pattern_1 = r'\$(.*?)\$'
    pattern_2 = r'\$\$(.*?)\$\$'
    result = ""
    with open(file) as f:
        result = f.read()
        result = re.sub(pattern_2, r'<div style="text-align: center;"><tex>\1</tex></div>', result, flags=re.DOTALL)
        result = re.sub(pattern_1, r'<smalltex>\1</smalltex>', result)

    new_file = file.replace("md_files", "docs")
    subprocess.run(['chattr', '-i', new_file])
    with open(new_file, "w") as f:
        f.write(result)
    subprocess.run(['chattr', '+i', new_file])