from RVXSettingsTemplate import *
from basic import *
import os

def RVXHTMLWrite(SettingsTitle, JsonPath):
    CategoryHTML = ""
    TitleAndDescAndButtonAndImagesContent = ""

    for ID, values in JsonPath.items():
        TitleHTML = "" 
        DescHTML = ""
        ImageHTML = ""
        for keys, values in values.items():
            if keys == "title":
                CategoryHTML += CategoryInsert().format(id_number = "#"+ID, title_text = values)
                TitleHTML += TitleInsert().format(title_text = values)

            if keys == "description":
                for DescValue in values:
                    DescHTML += DescInsert().format(desc_text = DescValue)

            if keys == "image-url":
                for ImageValue in values:
                    ImageHTML += ImagesInsert().format(image_url = ImageValue)


        TitleAndDescAndButtonAndImagesContent += TemplateTitleAndDesc().format(id_values = ID, title = TitleHTML, desc = DescHTML)
        TitleAndDescAndButtonAndImagesContent += TemplateImages().format(images = ImageHTML)

    # 템플렛에 신규 생성된 HTML 추가
    ALL = InitHTML().format(
        title = SettingsTitle.replace(".json", "").replace("-", " "),
        category = TemplateCategory().format(id_values = CategoryHTML),
        TitleAndDescAndButtonAndImagesContent = TitleAndDescAndButtonAndImagesContent,
        time = CurrentTime())
    
    SaveHTML(rf"rvx-tips\settings\{SettingsTitle.replace('.json', '')}.html", ALL)
    print(rf"rvx-tips\settings\{SettingsTitle.replace('.json', '')}.html Saved!")



def main():
    path = os.listdir(r"rvx-tips\py-scripts\RVXSettingWriteScripts\set-json")
    FileList = [file for file in path if file.endswith('.json')]
    print(FileList)

    for x in FileList:
        if x != "Template.json":
            RVXHTMLWrite(
                x, 
                OpenJson(rf"rvx-tips\py-scripts\RVXSettingWriteScripts\set-json\{x}")
                )


main()
