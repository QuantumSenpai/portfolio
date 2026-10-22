import glob

js_files = glob.glob('.next/static/chunks/**/*.js', recursive=True)
print("JS files:", len(js_files))
for f in js_files:
    with open(f, 'r') as fh:
        content = fh.read()
        if 'useMotionValue' in content or 'useMotionTemplate' in content:
            print("Found in:", f)
            idx = content.find('useMotionValue')
            if idx == -1:
                idx = content.find('useMotionTemplate')
            print(content[max(0,idx-200):idx+500])
            break
    if 'useMotionValue' not in content and 'useMotionTemplate' not in content:
        pass  # print("  not in", f)