# 과학 용어집

1. 모든 문서는 영문 원어와 문맥이 맞는 항목의 표기를 따른다. 영문 H1·메뉴, 직접 인용, 참고문헌 원제, 코드 식별자는 원래 표기를 쓴다.
2. 한국어 전문용어를 문서에서 처음 쓸 때는 ‘전류 밀도(current density)’처럼 영문 전체 명칭을 괄호에 적는다. 약어를 쓸 경우에는 ‘원자층 증착(atomic layer deposition, ALD)’처럼 함께 소개한다. 이후에는 용어집의 표기를 쓴다. 표·그림 설명·알림에서 먼저 나와도 같은 규칙을 적용한다. 영문으로만 쓰는 약어도 처음에는 전체 명칭을 밝힌다.
3. 미등록어는 분야 원문과 위키 용례를 확인한다. 물리량·동작은 뜻이 분명한 한국어로, 고유한 기법·모형·소프트웨어는 관용 명칭으로 쓴다.
4. 공통 표기는 분야별로 원어순으로 등록한다. 한국어 항목을 추가하거나 고칠 때도 `한국어 용어(영문 전체 명칭)`으로 적는다. 뜻이 다르면 문맥을 나누고, 기존 글에는 해당 부분을 개정할 때 반영한다.

## 공통 물리량과 설명어

- **assumption / condition** → 가정 / 조건 · 모형이 전제한 내용과 실험에서 정한 조건을 구분
- **band gap** → 밴드갭 · 에너지 간격. 밴드 가장자리와 구분
- **basis / basis function** → 기저 / 기저 함수 · 선형공간. 화학 계산의 개별 기저 함수와 기저 집합을 구분
- **boundary condition** → 경계 조건 · 약어 PBC를 쓰면 periodic boundary condition을 먼저 정의
- **charge density / electron density** → 전하 밀도 / 전자 밀도 · 전하량과 전자 수 중 어느 양인지 단위로 확인
- **current / current density** → 전류 / 전류 밀도 · 정규화 기준을 함께 표시
- **eigenstate / eigenvalue** → 고유상태 / 고유값 · 에너지 고유값을 다룰 때는 필요에 따라 ‘고유에너지’
- **electric field / voltage** → 전기장 / 전압 · 전기장 방향과 전위차의 부호를 구분
- **electric potential / potential energy** → 전위 / 퍼텐셜 에너지 · 문맥에서 전하당 에너지와 에너지를 구분
- **extraction window** → 추출 구간 · 실험 자료에서 지표를 구하는 범위
- **Hamiltonian** → Hamiltonian · 연산자와 특정 기저에서 얻은 행렬을 구분
- **metric** → 정량 지표 · 측정·평가 문맥. 수학의 거리 함수는 문맥에 맞게 정의
- **overlap matrix** → 중첩 행렬 · 기저 함수 사이의 내적
- **singular value** → 특이값 · 행렬의 특이값을 고유값과 구분
- **wavefunction** → 파동함수 · 전산 코드의 변수·옵션명은 원문 표기

## 소자·공정·재료

- **absorption / adsorption** → 흡수 / 흡착 · 물질 내부와 표면을 구분
- **atomic layer deposition** → ALD · 첫 한국어 설명은 ‘원자층 증착’
- **body effect / subthreshold leakage** → body effect / subthreshold leakage · 현상명은 유지하고 본문에서 발생 조건을 설명
- **compact model** → compact model · 소자 모델링에서 쓰는 모형명
- **depletion mode / enhancement mode** → depletion mode / enhancement mode · 소자 동작 모드의 관용 명칭
- **device split** → 소자군 · 공정 조건을 달리한 비교 집단
- **growth per cycle** → GPC · 처음에 ‘사이클당 성장량’으로 설명. 시간당 성장률과 구분
- **plasma-enhanced atomic layer deposition** → PEALD · 처음에 ‘플라즈마 강화 ALD’로 설명
- **potential-energy surface** → potential-energy surface · 분자 구조와 에너지의 관계를 나타내는 개념명
- **precursor / reactant** → 전구체 / 반응물 · 역할을 특정할 때만 ‘전구체’
- **pulse time / purge time** → 주입 시간 / 퍼지 시간 · 노출량을 시간과 구분
- **self-limiting surface reaction** → 자기 제한적 표면 반응 · 반응 자리의 변화로 포화에 이르는 원리를 설명
- **sweep** → 주사 · 전압 주사처럼 실제로 바꾼 변수를 표시

## 계산·학습 방법

- **density functional theory** → DFT · 영문 전체 명칭으로 첫 정의
- **density of states / local density of states** → DOS / LDOS · 한국어 설명은 ‘상태밀도 / 국소 상태밀도’
- **feature** → feature · 기계학습 모형의 입력 표현. 일반적인 사물의 성질은 ‘특징’
- **fragment** → 분자 조각 · 분자를 나누는 문맥. 원문 기법명 overlapping fragments method는 보존
- **graph neural network** → GNN · 첫 한국어 설명은 ‘그래프 신경망’
- **loss function** → 손실 함수 · 학습에서 최소화하는 함수
- **principal layer** → principal layer · 양자 수송 모형의 층 단위
- **projection** → 투영 · 부분공간으로 투영하는 선형대수 문맥
- **self-consistent field** → SCF · 반복 계산을 설명할 때 ‘자기일관 반복’
- **training / inference** → 학습 / 추론 · 코드 옵션과 라이브러리 이름은 원문 유지

영문 보통명사로 문장을 시작하면 첫 단어만 대문자로 쓴다. `nMOS`, `p-type`, `e3nn`, 기호처럼 대소문자가 이름의 일부이면 그대로 둔다.
