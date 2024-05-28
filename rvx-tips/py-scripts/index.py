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
        </div>
        
        <!-- 구분 -->
        <!-- 구분 -->
        """
                    

new_html = ""
patches = OpenJson(r"d:\chrome_Downloads\patches (2).json")
idx = 1
for name_index in range(len(patches)):
    if all(item not in patches[name_index]["compatiblePackages"][0]["name"] for item in ["music", "reddit"]):
        title = patches[name_index]["name"]
        title = title.strip()
        desc = patches[name_index]["description"]
        desc = desc.strip()
        use = patches[name_index]["use"]

        versions = patches[name_index]["compatiblePackages"][0]["versions"]
        
        if versions is not None:
            versions_str = "%s ~ %s" % (min(versions), max(versions))
        
        else:
            versions_str = "ALL"
        
        
        if use == True:
            checked = "checked"
        else:
            checked = "".strip()
        
        new_html += html % (f"main-{idx}", idx, checked, idx, title, f"#main-{idx}" + " " + title, desc, versions_str) + "\n\n"
        idx += 1

# SaveHTML(r"rvx-tips\rvx-patches\anddea-test.html", new_html)
SaveHTML(r"rvx-tips\rvx-patches\inotia00-test.html", new_html)
