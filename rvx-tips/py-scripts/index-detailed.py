import json
from pprint import pprint

def OpenJson(filename):
    with open(filename, "r", encoding="utf-8") as f:
        return json.load(f)


# JSON 파일 저장 함수
def SaveHTML(filename, data):
    with open(filename, "w", encoding='utf-8') as f:
        f.write(data)

html = """
        <div class="rvx-option" id="%s">
            <div class="rvx-option-title">
                <input type="checkbox" name="rvx-option-title" id="rvx-option-id%s" %s>
                <label for="rvx-option-id%s" data-original-text="%s">
                    <span>%s</span>
                </label>
            </div>

            <div class="rvx-option-desc">
                <span>
                    %s
                </span>
            </div>
            
            <div class="rvx-option-version">
                <span>
                    %s
                </span>
            </div>
            
            <div class="rvx-Detailed-options">
                %s
            </div>
        </div>
        
        <!-- 구분 -->
        <!-- 구분 -->
        """


insert_html = """
                <div class="rvx-option-Detailed-%s">
                    <span>
                        %s
                    </span>
                </div>
"""

new_html = ""
new_insert_html = ""
patches = OpenJson(r"d:\chrome_Downloads\patches (1).json")
idx = 1
for name_index in range(len(patches)):
    if all(item not in patches[name_index]["compatiblePackages"][0]["name"] for item in ["music", "reddit"]):
        title = patches[name_index]["name"]
        title = title.strip()
        desc = patches[name_index]["description"]
        desc = desc.strip()
        use = patches[name_index]["use"]
        versions = patches[name_index]["compatiblePackages"][0]["versions"]
        options = patches[name_index]["options"]
        
        if versions is not None:
            versions_str = "%s ~ %s" % (min(versions), max(versions))
        
        else:
            versions_str = "ALL"
        
        
        if use == True:
            checked = "checked"
        else:
            checked = "".strip()
            
        
        if options is not None and len(options) != 0:
            print(title)
            print(desc)
            print(use)
            print(versions_str)
            print(len(options))

            for i in range(len(options)):
                try:
                    for keys, values in options[i].items():
                        if keys != "values":
                            k_v1 = "%s : %s" % (keys, values)
                            print(k_v1)
                            new_insert_html += insert_html % (keys, k_v1)
                            
                        if keys == "values":
                            print(keys, "▼")
                            new_text = ""
                            if values is not None:
                                for k, v in values.items():
                                    k_v2 = "%s : %s" % (k, v)
                                    print(k_v2)
                                    new_text += k_v2 + "<br>"
                                    
                                new_insert_html += insert_html % (keys, "%s %s" % ("values▼<br>", new_text))
                    
                            else:
                                v = "None\n"
                                print(v)
                                new_insert_html += insert_html % (keys, "valeus : None")
                    
            
                
                except Exception as e:
                    print("오류 발생: %s" % e)
            print('\n', "%s" % '-'*100, '\n')
            
            new_html += html % (f"main-{idx}", idx, checked, idx, title, f"#main-{idx}" + " " + title, desc, versions_str, new_insert_html) + "\n\n"            
            idx += 1
            new_insert_html = ""

# SaveHTML(r"rvx-tips\rvx-patches\anddea-Detailed-test.html", new_html)
# SaveHTML(r"rvx-tips\rvx-patches\inotia00-Detailed-test.html", new_html)


# pprint(new_html)
# pprint(new_html)