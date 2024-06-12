from FeatureComparisonTemplate import *
from basic import *


def FeatureComparisonWrite(data, icondata):
    FullSpaces = ""
    for (theadName, FeatureData), icon in zip(data.items(), icondata.values()):

        # 반복이 될때마다 초기화
        tbody = ""

        for FeatureName, FeatureSupport in FeatureData.items():
            FeatureSupportTemp = ""

            for idx, x in enumerate(FeatureSupport.values(), start=1):
                
                if idx < len(FeatureSupport.values()):
                    # 먼저 기능 지원여부 먼저 추가
                    status = "supported" if x == "✓" else "not-supported"
                    symbol = "✓" if x == "✓" else "✕"
                    FeatureSupportTemp += tbodyTempInsert().format(
                        Revanced_Extended=status,
                        Revanced_Extended_Supported=symbol
                    )
            
            # 생성된 FeatureSupportTemp를 tbodyTemp에 추가
            tbody += tbodyTemp().format(
                Feature_name=FeatureName, 
                Feature_desc=FeatureSupport["기능 설명"],
                Supported_insert=FeatureSupportTemp
                )
        

        # 헤드 이름추가
        FullSpaces += FullSpacesTemp().format(
            icon=icon,
            title=theadName,
            tbody_text=tbody
            )
    
    # 메인 HTML에 추가
    ALL = initHTML().format(
        FullSpacesInsert=FullSpaces,
        time=CurrentTime()
    )

    # 새로 생성된 HTML을 HTML 파일로 저장
    SaveHTML(
        r"rvx-tips\Feature Comparison\Feature Comparison.html",
        ALL
        )


FeatureComparisonWrite(
    OpenJson(r"rvx-tips\Feature Comparison\Feature Comparison.json"),
    OpenJson(r"rvx-tips\Feature Comparison\Feature Comparison icon.json")
    )