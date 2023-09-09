import os
import re

prefix_l_1 = "md_files/knowledge/"

def get_subdirectories(directory):
    subdirectories = [d for d in os.listdir(directory) if os.path.isdir(os.path.join(directory, d))]
    return subdirectories

def get_files_in_directory(directory):
    files = [f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]
    return files

prefix_l_2 = get_subdirectories(prefix_l_1)

all_files = []

for module in prefix_l_2:
    prefix = prefix_l_1 + module + "/"
    for f in get_files_in_directory(prefix):
        all_files.append(prefix + f)

for file in all_files:
    pattern_1 = r'\$(.*?)\$'
    pattern_2 = r'\$\$(.*?)\$\$'
    result = ""
    with open(file) as f:
        result = f.read()
        result = re.sub(pattern_2, r'<div style="text-align: center;"><tex>\1</tex></div>', result, flags=re.DOTALL)
        result = re.sub(pattern_1, r'<tex>\1</tex>', result)

    with open(file.replace("md_files", "docs"), "w") as f:
        f.write(result)
