---
name: illustrate-wiki-summary
description: 새 과학 문서나 지정한 기존 글의 핵심 관계를 OpenAI Images API로 한 장에 그려 첫 절 앞에 배치한다.
---

# 문서 첫머리 요약 도식

## 도안

대상 글의 도입부·절 제목·결론과 근거 문헌을 읽는다. 독자가 기억해야 할 관계를 한 문장으로 적고 그 관계가 보이는 구도를 고른다. 공정은 상태가 바뀌는 순서로, 두 모형은 같은 조건에서 달라지는 부분을 나란히 그린다. 목차를 상자에 옮기는 데 그치지 않는다.

`experiment/diagrams/<문서 경로>/prompt.txt`에 공개할 개념, 패널 순서, 화살표의 방향과 뜻, 그림에 그대로 쓸 짧은 표기만 적는다. 관계의 근거와 성립 조건은 캡션 작성용으로 따로 기록한다. 작은 화면에서 읽을 수 있게 여백과 대비를 확보한다. 본문 전체나 환경 정보는 전송할 필요가 없다. 측정값·실험 사진·계산 결과가 필요한 그림에는 원자료를 사용한다.

## 생성

저장소 루트에서 [실행 스크립트](scripts/render.py)를 사용한다. 설치된 Codex `imagegen`의 CLI로 OpenAI Images API를 호출한다. 모델은 `gpt-image-2`, 출력은 가로형 PNG 한 장이다. 라이브 실행에 쓸 Python 3.10 이상 환경에 SDK가 없으면 작성용 가상환경을 한 번 준비한다.

```bash
python3.10 -m venv experiment/diagram-venv
experiment/diagram-venv/bin/python -m pip install openai==2.26.0
```

API 키는 비밀 관리자가 실행 프로세스의 `OPENAI_API_KEY`에 주입하도록 한다. Bash에서 직접 설정할 때는 사용자가 **자신의 로컬 터미널**에서 아래처럼 입력하고 같은 셸에서 실행한다. 키를 대화창에 요청하거나 명령 인자·도안·저장소의 파일에 넣지 않는다.

```bash
set +x
IFS= read -rs -p 'OpenAI API key: ' OPENAI_API_KEY
printf '\n'
export OPENAI_API_KEY
```

아래 예시의 도안 경로를 대상 글에 맞춘다. 첫 명령은 키와 네트워크 없이 구성을 확인한다. 두 번째 명령은 실제 그림 생성 요청에만 사용하며 API 요금이 발생한다. 각 결과는 도안 옆의 새 `draft-*/summary.png`에 저장된다. 키가 없으면 도안과 로컬 실행 방법을 전달한다.

```bash
renderer=.agents/skills/illustrate-wiki-summary/scripts/render.py
brief=experiment/diagrams/device-physics/semiconductor-process/atomic-layer-deposition/prompt.txt
experiment/diagram-venv/bin/python -I "$renderer" "$brief"
experiment/diagram-venv/bin/python -I "$renderer" "$brief" --generate
```

## 검토와 배치

PNG를 열어 실제로 그려진 단계·방향·기호·철자를 본문 및 근거와 대조하고 모바일 폭에서도 읽어 본다. 모델이 덧붙인 화살표나 잘못 쓴 라벨이 있으면 도안을 수정한다. 검토할 후보만 해당 주제의 `images/<문서명>-summary.png`로 옮긴다.

도입문 다음, 첫 H2 앞에 [요약 그림 표기 기준](../../../refs/format.md#그림표측정)에 따라 배치한다. 기존 요약 그림을 갱신할 때는 같은 블록을 고친다. 도입부에 번호가 붙은 본문 그림이 있으면 그 그림과 설명 문단을 함께 보존한다. 한국어 대체 텍스트는 보이는 관계를 설명한다. 캡션에는 핵심 관계와 적용 조건, 본문의 근거 인용 번호, `OpenAI gpt-image-2로 생성한 개념도`라는 제작 정보를 담는다. 최종 이미지와 캡션을 함께 [독립 사실 검토와 게시 검사](../../../refs/quality/README.md)에 포함한다.
