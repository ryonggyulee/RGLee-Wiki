---
name: revise-wiki-article
description: 기존 과학 문서의 특정 주장·수식·사례·인용을 고치거나 한 절을 확장한다.
---

# 국소 개정

`./quality.sh baseline <문서>`로 마지막 검증본을 확인한다. 요청받은 절과 그 전제·기호 정의·종속 결론을 읽고, 의존 범위가 불명확할 때만 문서 전체로 넓힌다.

[조사 원칙](../../../refs/research-workflow.md)으로 바뀐 주장을 대조한다. 기존 인용이 달라진 주장의 범위를 지지하는지 확인한다. [글쓰기 안내](../../../refs/writing.md)에 따라 해당 문단과 필요한 연결·그림 설명·참고문헌을 수정한다. 최종 diff와 재사용할 근거 범위를 `evaluate-wiki-quality`에 넘긴다.
