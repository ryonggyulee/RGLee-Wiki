# 한국어 과학 위키 작업 안내

MkDocs와 Material을 사용한다. 새 규칙은 아래 담당 파일 한 곳에 적고, 새 문서와 요청받은 범위에 적용한다.

## 작업 선택

| 요청 | 먼저 볼 스킬 또는 파일 | 결과 |
| --- | --- | --- |
| 메뉴 라벨·순서만 변경 | `mkdocs.yml` | 해당 파일만 수정하고 `./build.sh nav` 실행 |
| 문서 추가·이동·제목·색인·링크 정리 | [maintain-wiki-structure](.agents/skills/maintain-wiki-structure/SKILL.md) | 탐색 경로와 색인을 함께 갱신 |
| 목차 설계·절 재배치 | [outline-wiki-article](.agents/skills/outline-wiki-article/SKILL.md) | 개념의 선후관계에 따라 H2·H3 구성 |
| 구성·독해에 대한 의견만 요청 | [assess-wiki-article](.agents/skills/assess-wiki-article/SKILL.md) | 막히는 위치, 이유, 수정 제안 |
| 한국어 윤문·용어 통일 | [polish-wiki-korean](.agents/skills/polish-wiki-korean/SKILL.md) | 과학적 의미를 보존한 문장 |
| 새 글·전면 개정 / 일부 주장 수정 | [research-and-write-wiki](.agents/skills/research-and-write-wiki/SKILL.md) / [revise-wiki-article](.agents/skills/revise-wiki-article/SKILL.md) | 출처가 있는 본문과 검토 범위 |
| 문서 첫머리 요약 도식 | [illustrate-wiki-summary](.agents/skills/illustrate-wiki-summary/SKILL.md) | 본문의 핵심 관계를 담은 개념도와 근거 |
| 문헌 그림 추가·교체 | [acquire-scientific-images](.agents/skills/acquire-scientific-images/SKILL.md) | 재사용이 허용된 그림과 출처 |
| 사실·인용 대조 / 게시 기록·검사 | [audit-wiki-references](.agents/skills/audit-wiki-references/SKILL.md) / [evaluate-wiki-quality](.agents/skills/evaluate-wiki-quality/SKILL.md) | 원문 대조 결과 / 검증 기록과 빌드 |

요청에 해당하는 항목부터 읽고, 다른 절의 정의나 결론이 필요할 때 범위를 넓힌다.

## 저장소 공통 규칙

- 과학 분야의 이름과 순서는 **Device physics → Material science → Computational science**로 고정한다. 변경에는 소유자의 명시적 요청이 필요하다. 앞에 Home, 뒤에 재현 절차용 Research Note를 둘 수 있다. Material science의 디렉터리명은 `docs/computational-materials-science/`이다.
- 분야 아래에 실제 문서가 있는 주제 그룹을 한 층 둔다. 그룹의 첫 항목은 `index.md`이고, 모든 공개 페이지를 `mkdocs.yml`에 한 번씩 등록한다. 경로·메뉴의 세부 규칙은 구조 유지보수 스킬에 둔다.
- 글의 표기·수식·그림·측정·인용 형식은 [작성 형식](refs/format.md), 한영 표기의 개별 결정은 [용어 색인](refs/terminology.md), 출처의 독립성과 검산 기준은 [조사 원칙](refs/research-workflow.md)을 따른다.
- 과학적 변경은 최종 본문에 대한 독립 사실 검토와 자동 검사를 거친다. 새 글은 전체를, 개정은 마지막 검증본 이후 바뀐 주장과 그 영향을 검토한다. [검증 절차](refs/quality/README.md)에 따라 미확인·불일치 상태에서는 게시를 보류한다.
- 확인·보고·지침·도구 작업에서는 문서 기록을 동기화하지 않는다. 이미 커밋된 문서의 기록 갱신을 요청받으면 해당 경로만 처리한다. 전체 레지스트리 대신 `./quality.sh report --changed` 또는 대상 경로를 조회한다.
- 화면 구성은 Material과 지원되는 Markdown 기능을 우선한다. 메뉴 설정을 간결하게 유지하고 밝은·어두운 테마와 작은 화면에서 가독성을 확인한다.
- 임시 산출물은 무시되는 `experiment/`에 둔다. 작업 트리의 다른 변경을 보존하고, 생성한 사이트·캐시·가상 환경을 커밋에서 제외한다. 의존성은 필요할 때만 추가하고 CI에서 재현할 수 있도록 버전을 고정하고 업그레이드 이유를 남긴다.
- 완료 시 변경 파일, 실행한 검사, 미해결 사항을 알린다. 로컬 미리보기는 `./build.sh serve`, 게시 전 확인은 `./build.sh preflight`를 사용한다. 커밋과 push는 변경 범위를 검토한 뒤 별도로 수행한다.
