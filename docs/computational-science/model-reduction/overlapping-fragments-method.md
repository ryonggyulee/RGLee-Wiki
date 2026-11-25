---
description: 겹치는 두 분자 조각의 파동함수로 사슬 전체의 전자상태를 구하는 과정을 따라가며 OFM의 원리와 고분자 계산의 정확도를 설명한다.
---

# Overlapping fragments method (OFM)

긴 고분자 사슬에서 전자가 차지한 상태 가운데 에너지가 높은 쪽, 곧 가전자대 상단을 살펴보자. 관심 있는 것은 그 상태의 에너지와 전자가 사슬의 어느 부분에 주로 분포하는지이다. 사슬 전체를 많은 평면파로 표현해 풀 수도 있다. 그런데 관심 있는 전자상태가 짧은 사슬 조각에서 구한 몇 가지 파동함수의 조합으로 잘 표현된다면, 전체 계산에서 정해야 할 값은 **각 파동함수를 얼마씩 섞을지**로 줄어든다. 이 아이디어를 겹치는 분자 조각에 적용한 방법이 overlapping fragments method (OFM)이다.[1,2]

## 1. 겹치는 사슬 조각에서 얻는 파동함수

### (1) 결합을 포함하는 조각의 선택

탄소 네 개가 차례로 연결된 알케인 사슬을 예로 들자. 탄소 1·2와 3·4로 나누면 **2번과 3번 사이의 결합은 어느 조각에도 들어 있지 않다.** 반면 탄소 세 개씩을 묶어 아래처럼 한 자리씩 옮기면, 원래의 모든 탄소–탄소 결합이 적어도 한 조각 안에 남는다. 원 논문은 알케인 사슬에서 조각의 크기와 겹치는 범위를 바꾸어 이 선택이 고유에너지 오차에 미치는 영향을 조사했다.[1] [원 논문의 분할 그림, Fig. 2](https://www.osti.gov/servlets/purl/1564765#page=4)

| 조각 | 포함하는 탄소 | 조각 안에 남는 원래 결합 |
| --- | --- | --- |
| 왼쪽 조각 L | 1, 2, 3 | 1–2, 2–3 |
| 오른쪽 조각 R | 2, 3, 4 | 2–3, 3–4 |

각 조각을 따로 계산할 때 잘린 결합의 끝은 수소로 막는다. 이 수소는 조각을 유한한 분자로 계산하기 위해 붙인다. 나중에 사슬 전체의 에너지를 계산할 때는 원래 사슬의 원자 구조를 사용한다.[1]

### (2) 국소 파동함수에서 전체 상태의 후보로

각 조각에서 전자가 가질 수 있는 에너지와 그에 해당하는 파동함수, 즉 분자 궤도를 구한다. 설명을 위해 관심 에너지에 가까운 궤도를 조각마다 하나씩 고르자. 왼쪽 조각에서 얻은 함수를 $\phi_L$, 오른쪽에서 얻은 함수를 $\phi_R$라고 쓰면, 사슬 전체의 한 전자상태를 다음과 같이 근사할 수 있다.[1,3]

$$
\widetilde\Psi(\mathbf r)=a_L\phi_L(\mathbf r)+a_R\phi_R(\mathbf r).
$$

$\mathbf r$은 공간의 위치이고, 계수 $a_L,a_R$는 두 함수의 상대적인 크기와 위상을 정한다. 탄소 2·3 부근에는 두 함수가 모두 값을 가질 수 있다. 따라서 이곳의 전자 확률밀도를 구하려면 **같은 위치에서 두 파동함수를 먼저 더하고 그 절댓값을 제곱**한다. 두 계수의 상대적인 부호만 바뀌어도 겹치는 곳의 분포가 달라질 수 있다. 이제 필요한 것은 가능한 조합 가운데 어떤 것이 사슬의 전자상태이며, 그 에너지가 얼마인지를 결정하는 일이다.[1,3,4]

## 2. 전체 사슬에서 두 함수의 조합을 정하는 방법

### (1) 두 행렬이 담는 정보

조각 계산은 $\phi_L$과 $\phi_R$의 **모양**을 준다. 두 함수의 조합이 원래 사슬에서 갖는 **에너지**를 평가하려면 원래 사슬 전체의 단일 입자 Hamiltonian $\hat H$가 필요하다. Hamiltonian은 주어진 파동함수에 전자의 운동에너지와 주변 원자·전자에 의한 상호작용을 적용하는 연산자이다. 원 논문에서는 charge patching method (CPM)로 전자 밀도를 근사해 전체 Kohn–Sham (KS) Hamiltonian을 먼저 구성하고, 이 연산자를 고정한 상태에서 OFM을 적용했다.[1,2,5]

조각에서 선택한 함수를 $\phi_i,\phi_j$라 하자. 아래에서 $\langle f|g\rangle$는 같은 공간에 놓인 두 함수의 내적이다. 왼쪽·오른쪽 함수 각각을 정규화하면 두 행렬의 의미를 다음과 같이 읽을 수 있다.[1,3,4]

| 계산할 값 | 같은 함수끼리 ($i=j$) | 다른 함수끼리 ($i\ne j$) |
| --- | --- | --- |
| 중첩 행렬 $S_{ij}=\langle\phi_i\vert\phi_j\rangle$ | 정규화했으므로 1 | 두 함수의 겹침을 나타낸다. 공간이 겹쳐도 부호가 상쇄되면 내적은 0일 수 있다. |
| Hamiltonian 행렬 $H_{ij}=\langle\phi_i\vert\hat H\vert\phi_j\rangle$ | 그 궤도에 전자를 놓았을 때 **전체 환경에서** 평가한 에너지 기댓값 | 전체 Hamiltonian이 두 궤도를 얼마나 결합하는지 나타내는 행렬 원소 |

예를 들어 $H_{LR}$를 얻으려면 오른쪽 함수에 전체 사슬의 $\hat H$를 적용하고, 그 결과와 왼쪽 함수의 내적을 구한다. 이 예에서 공통 탄소 2·3은 두 **기저 함수**에 나타나지만, 전체 Hamiltonian은 원래 탄소 네 개짜리 구조로 한 번만 구성한다. 더 긴 사슬에서 같은 두 조각의 결합을 구할 때는 두 조각 밖에 있는 원자들이 만드는 퍼텐셜도 이 행렬 원소에 반영된다.[1]

??? note "환경이 두 궤도의 결합에 미치는 영향"

    주변 전하 때문에 국소 퍼텐셜 에너지가 $\Delta v(\mathbf r)$만큼 달라졌다고 하자. 기저를 고정하면 $H_{LR}$의 변화는 $\int \phi_L^*(\mathbf r)\Delta v(\mathbf r)\phi_R(\mathbf r)\,d^3r$이다. 두 궤도가 겹치는 곳에 퍼텐셜 변화가 있으면 대각 에너지뿐 아니라 서로 다른 궤도 사이의 결합도 달라질 수 있다.[1,4]

??? note "원 논문에서 전체 Hamiltonian을 준비한 과정"

    원자단위계에서 전체 연산자는 $\hat H=-\nabla^2/2+\hat V_{\rm ion}+V_H[n]+V_{\rm xc}[n]$이다. 첫 항은 운동에너지, $\hat V_{\rm ion}$은 이온의 유사퍼텐셜, $V_H$와 $V_{\rm xc}$는 전자 밀도 $n$에 따른 정전기 및 교환·상관 항이다. 저자들은 작은 기준 구조에서 얻은 밀도 기여분을 모아 $n$을 구성했다. 조각 자체의 궤도를 구할 때도 조각에 대해 밀도를 구성하고, 주기 경계 조건에서 Hartree 퍼텐셜을 계산했다. 그런 다음 local density approximation (LDA), 즉 국소 밀도 근사와 평면파 기반 ESCAN 계산으로 조각의 궤도를 구했다. 전체 구조에 대한 self-consistent field (SCF) 반복은 수행하지 않았다.[1,2,5]

### (2) 계수와 에너지를 함께 구하는 식

찾고 싶은 상태는 전체 사슬에 대한 고유값 방정식 $\hat H\Psi=E\Psi$를 만족한다. 선택한 함수가 두 개뿐이라면 정확한 $\Psi$를 표현하지 못할 수 있다. 대신 근사해 $\widetilde\Psi$를 넣고, 식의 양변을 왼쪽 함수에 대해 비교한 뒤 오른쪽 함수에 대해서도 비교한다. 구체적으로는 각 함수와 양변의 내적이 같도록 계수를 정한다. 왼쪽 함수에 대해 얻는 첫 번째 식은 다음과 같다.[1,3,4]

$$
H_{LL}a_L+H_{LR}a_R=E(S_{LL}a_L+S_{LR}a_R).
$$

오른쪽 함수에서도 같은 방식으로 한 줄을 얻는다. 조각과 궤도의 수가 늘어도 절차는 같다. 전체에서 고른 $m$개 함수에 대한 식을 모으면 **일반화 고유값 문제**가 된다.[1,3]

$$
H a_n=E_n S a_n,\qquad
\widetilde\Psi_n(\mathbf r)=\sum_{j=1}^{m}(a_n)_j\,\phi_j(\mathbf r).
$$

여기서 $H$와 $S$는 각각 $m\times m$ 행렬이다. 해 하나가 에너지 $E_n$과 그 상태를 만드는 계수 벡터 $a_n$을 함께 준다. 함수가 서로 직교하지 않을 때는 $a_n^\dagger S a_n=1$이 실제 파동함수의 정규화 조건이다. $\dagger$는 복소켤레 전치를 뜻한다. 서로 같은 함수를 두 번 골랐다면 조합의 수가 늘지 않는다. 실무에서는 $S$의 고유값을 확인해 선형종속이거나 거의 중복된 함수가 있는지 살핀다.[3,4] [투영과 직교화](projection-methods.md)

### (3) 두 궤도에서 나오는 두 에너지

앞에서 고른 왼쪽 조각과 오른쪽 조각의 궤도를 사용해 실제로 식을 풀어 보자. 계산 과정을 손으로 따라갈 수 있도록 두 궤도의 대각 에너지가 같아 $H_{LL}=H_{RR}=\epsilon$이고, 결합 $t=H_{LR}=H_{RL}$와 중첩 $s=S_{LR}=S_{RL}$가 실수라고 가정한다. $|s|<1$이면 두 정규화된 함수는 선형독립이다. 이때는 **두 함수를 같은 부호로 섞거나 반대 부호로 섞는 조합**이 각각 해가 된다.[3,4]

| 계수의 비 $a_L:a_R$ | 위 식의 첫 줄에 대입한 결과 | 전체 사슬의 근사 에너지 |
| --- | --- | --- |
| $1:1$ | $\epsilon+t=E(1+s)$ | $(\epsilon+t)/(1+s)$ |
| $1:-1$ | $\epsilon-t=E(1-s)$ | $(\epsilon-t)/(1-s)$ |

예를 들어 $\epsilon=0$, $t=-0.24$ eV, $s=0.20$으로 놓으면 같은 부호 조합은 $-0.24/1.20=-0.20$ eV, 반대 부호 조합은 $0.24/0.80=0.30$ eV이다. 두 조합은 같은 조각 함수를 쓰지만, 상대 부호가 달라지면 결합 항의 기여도 $t$에서 $-t$로 바뀐다. 분모 $1+s$와 $1-s$는 두 함수의 합과 차를 각각 정규화할 때 생긴다. 숫자는 원리를 보이기 위해 택한 값이다. 실제 알케인에서의 정확도는 같은 Hamiltonian을 더 큰 기저로 풀어 따로 평가한다.[1,4]

## 3. 조각과 궤도 선택에 따른 오차와 계산량

### (1) 조각의 크기와 관심 에너지

앞의 두 함수는 여러 비율로 섞을 수 있지만, 그 공간에서 얻을 수 있는 선형독립인 고유상태는 최대 두 개이다. 실제 계산에서는 먼저 목표를 정한다. 예를 들어 **가전자대 하단**의 낮은 에너지 상태가 목표라면 조각의 낮은 에너지 궤도부터 시험한다. **가전자대 상단**이 목표라면 점유된 궤도 가운데 에너지가 높은 것부터 고른다. 이때 가장 높은 점유 궤도를 highest occupied molecular orbital (HOMO)이라고 한다. 조각의 HOMO와 에너지가 가까운 다른 궤도들도 목표 상태에 기여할 수 있다.[1,2]

원 논문의 알케인 시험은 각각 탄소 20개를 가진 사슬 20개, 총 1,240원자를 사용했다. 아래 표에서는 조각마다 **모든 점유 가전자 궤도**를 남겼다. 기준값은 같은 전체 Hamiltonian을 에너지 절단값 60 Ry의 평면파 기저에서 푼 결과이다. 이 비교에서 기저를 바꿨을 때 생긴 오차를 읽을 수 있다.[1, Fig. 3]

| 조각의 탄소 수 | 수소로 끝을 막은 분자 | 남긴 궤도 수/조각 | 가전자대 하단 오차 | 가전자대 상단 오차 |
| --- | --- | ---: | ---: | ---: |
| 1 | CH$_4$ | 4 | 200 meV 초과 | 약 1 eV |
| 2 | C$_2$H$_6$ | 7 | 약 10 meV | 약 30 meV |
| 3 | C$_3$H$_8$ | 10 | 1 meV 미만 | 10 meV 미만 |

탄소 하나짜리 조각에는 탄소–탄소 결합이 들어 있지 않다. 둘 또는 셋을 함께 둔 조각에서는 같은 결합에 걸친 궤도를 기저로 쓸 수 있고, 이 시험에서 에너지 오차도 작아졌다. **조각 크기를 고정하고 궤도 수만 줄이면 결과는 에너지 구간에 따라 달랐다.** 탄소 세 개짜리 조각에서 최저 궤도 하나만 썼을 때 하단 오차는 약 30 meV였다. 상단에서는 서로 가까운 점유 궤도 중 두 개에서 네 개만 남기면 기준 상태와의 대응을 찾기 어려웠고, 상위 다섯 개를 함께 남겼을 때 대응이 개선되었다.[1, Figs. 4–6]

### (2) 실제로 줄어드는 행렬 차원과 계산량

중첩되는 세 단위 조각은 반복 단위가 20개인 사슬 한 개에서 18개 나온다. 알케인 예에서 조각마다 궤도 다섯 개를 남기면 최종 행렬의 한 변은 $20\times18\times5=1{,}800$이다. 또 다른 시험 물질인 poly(3-hexylthiophene) (P3HT)에서는 사슬 5개에서 티오펜 고리 세 개짜리 조각을 만들었다. 조각당 궤도 세 개를 골라 $5\times18\times3=270$차원에서 2,510원자 구조의 가전자대 상단을 계산했다. 조각 계산에서 헥실 곁사슬은 프로필로 줄였지만 전체 Hamiltonian에는 원래 곁사슬의 영향을 포함했다.[1, Sec. IV]

P3HT에서 저자들이 보고한 고유에너지 오차는 HOMO 하나를 사용했을 때 가전자대 가장자리 부근에서 약 30 meV, 그보다 0.7 eV 안쪽에서 약 120 meV였다. 상위 세 궤도를 사용하면 비교 구간의 오차는 10–50 meV였고, 네 궤도를 사용했을 때는 대응이 다시 나빠졌다. **관심 구간 안의 상태를 올바르게 짝지을 수 있는지**도 기저를 선택하는 기준이다. 같은 구조를 6-31G* 원자 궤도 기저로 나타낼 때의 함수 수는 알케인 7,680개, P3HT 19,720개이다. 이 두 수는 기저 크기의 비교이며 위 오차의 기준은 평면파 계산이다.[1, Fig. 10 및 Sec. IV]

계산 시간에는 두 부분이 있다. 먼저 각 조각의 궤도를 구하고 가까운 조각 쌍의 행렬 원소를 계산한다. 조각 크기·밀도·조각당 궤도 수와 거리 기준을 고정하면 이 작업량은 조각 수에 대략 비례한다. 원 논문은 두 조각에 속한 원자 사이의 최소 거리로 쌍을 골랐고, 알케인 가전자대 하단에서는 5 Å에서 고유에너지가 수렴했다고 보고했다. 마지막에는 $m$차원 행렬을 대각화한다. 논문에서 사용한 밀집 행렬 해법의 연산량은 $O(m^3)$이었다. 저자들이 시험한 크기에서는 앞부분에 더 많은 시간이 들었다.[1, Figs. 7–9]

## 4. 에너지에서 전자의 공간 분포로

### (1) 한 상태가 퍼진 범위

$E_n$은 상태의 에너지를 알려 주지만 전자가 주로 어디에 있는지는 알려 주지 않는다. 그 위치를 보려면 같은 해에서 얻은 $a_n$으로 $\widetilde\Psi_n$을 복원한다. 위치별 확률밀도는 $|\widetilde\Psi_n(\mathbf r)|^2$이다. 조각들의 파동함수가 겹치므로 원래 계수의 절댓값 제곱을 그대로 각 조각에 전자가 있을 확률로 읽을 수는 없다.[2,3,4]

P3HT 응용 연구에서는 조각마다 HOMO 하나를 고른 뒤, 기저를 서로 직교하도록 바꾸고 계수도 $d_n=S^{1/2}a_n$으로 변환했다. 정규화된 계수에서 각 기저 함수의 비중을 $p_j=|(d_n)_j|^2$라 하면 $\sum_jp_j=1$이다. 저자들이 쓴 **유효 참여 자리 수**는 $L_n=1/\sum_jp_j^2$이다. 한 자리에만 상태가 모이면 $L_n=1$이고, 다섯 자리에 똑같이 퍼지면 $L_n=1/[5(1/5)^2]=5$이다. 이 수는 선택한 직교 기저에서 센 자리 수로, 길이 단위로 잰 거리는 아니다.[2,3]

저자들은 12,024원자로 이루어진 무질서한 P3HT 구조 50개를 분석했다. 가전자대 가장자리의 정공 상태는 반복 단위 약 다섯 개에 걸쳐 국소화되었다고 보고했다. 높은 에너지를 갖는 사슬 위치와 정공 상태가 모이는 위치가 대응했고, 이웃 자리 사이의 결합을 일정한 값으로 바꿔도 주요 국소화 위치가 유지되었다. 저자들은 이를 해당 시료 모형에서 사슬을 따라 달라지는 정전기 퍼텐셜이 중요하다는 근거로 해석했다.[2, Figs. 3–4]

### (2) 상태밀도와 검증 범위

여러 상태를 에너지별로 모으면 density of states (DOS), 즉 상태밀도를 얻는다. 여기에 **각 상태가 특정 위치에 얼마나 분포하는지**를 반영한 양이 local density of states (LDOS), 즉 국소 상태밀도이다. 스핀 한 성분에 대해 정규화한 상태를 사용하면 축소 기저에서 얻는 값은 다음과 같다.[6,7]

$$
D(\mathbf r,E)=\sum_n |\widetilde\Psi_n(\mathbf r)|^2\,\delta(E-E_n).
$$

$\delta$는 각 상태의 기여를 그 에너지에 놓는 디랙 델타 함수이다. 에너지를 eV, 위치를 Å로 쓰면 3차원 LDOS의 단위는 eV$^{-1}$ Å$^{-3}$이다. 따라서 두 방법이 같은 고유에너지를 내는지 확인하는 시험과 같은 위치에서 같은 LDOS를 내는지 확인하는 시험은 서로 다른 자료를 요구한다.[6,7]

| P3HT 연구에서 한 비교 | 확인한 내용 |
| --- | --- |
| 2,510원자 구조 10개에서 **같은 Hamiltonian**을 OFM과 평면파로 각각 대각화 | 선택한 조각 궤도로 가전자대 가장자리의 **고유에너지**를 얼마나 잘 재현하는지 평가했다.[2, Fig. 1 삽도] |
| 756원자 구조에서 CPM과 밀도 범함수 이론, 즉 density functional theory (DFT)로 직접 구한 **서로 다른 Hamiltonian**을 비교 | 전체 DOS와 사슬 위치별 대각 행렬 원소를 비교해 **CPM으로 만든 입력**을 점검했다.[2] [보충자료, p. S2](https://doi.org/10.1021/jp1114527.s001) |
| 12,024원자 구조에서 결합 조건을 바꾸며 공간 분포를 분석 | 정공의 **국소화 원인**을 조사했다. 이 그림은 OFM의 실공간 LDOS를 기준 해와 직접 대조한 결과를 제공하지 않는다.[2, Figs. 2–4] |

일부 궤도만 고르면 얻는 상태도 그 부분공간에 한정된다. **전체 전자 밀도**를 구하려면 점유된 상태들의 확률밀도를 각각의 점유수로 가중해 더해야 한다. 원 연구에서는 일부 HOMO만 남긴 계산의 점유 경계를 추정할 때, 전체 환경에서 평가한 조각 HOMO의 에너지 기댓값보다 위에 처음 나타나는 DOS의 틈을 사용했다. 이 경험적 기준은 무질서한 고분자의 해당 시험에 한정된다. 전하 이동이 다시 퍼텐셜을 바꾸는 문제라면 그 변화까지 반영하는 자기일관 계산도 필요하다.[1,2,5]

## 5. 다른 기저와 경계 조건으로의 확장

아래 항목은 원 논문의 고분자 계산을 다른 전자구조 계산과 연결할 때 필요한 세부 사항이다.

??? note "원자 궤도 기저에서 같은 투영을 구현하는 경우"

    원래의 $M$개 원자 궤도를 $\chi_\mu$, 선택한 조각 함수 $m$개의 전개 계수를 $U_{\mu j}$라 하면 $\phi_j=\sum_\mu\chi_\mu U_{\mu j}$이다. 같은 원자 궤도 기저에서 얻은 전체 Hamiltonian 행렬 $H_0$와 중첩 행렬 $S_0$를 사용하면 $H=U^\dagger H_0U$, $S=U^\dagger S_0U$를 얻는다. $U$의 열이 원래 공간 전체를 생성하고 선형독립이면 기저만 바뀐다. $m<M$이면 표현할 수 있는 공간도 줄어든다. 조각에만 붙인 수소의 원자 궤도는 원래 전체 기저에 직접 대응하지 않으므로 이 전개가 얼마나 정확한지 확인해야 한다. 원 논문의 평면파 구현은 $\hat H\phi_j$와의 내적으로 행렬 원소를 직접 구했다.[1,3,4]

??? note "분자 조각의 경계와 주기 결정에서의 파수"

    원 연구는 유한 분자를 계산 상자에 넣어 조각 함수를 구했다. 결정의 파동함수를 임의의 경계에서 잘라 쓰려면 별도의 검토가 필요하다. 예를 들어 매끄러운 창 함수 $w$를 곱하면 $\nabla^2(w\phi)=w\nabla^2\phi+2\nabla w\cdot\nabla\phi+\phi\nabla^2w$이므로, 창이 변하는 곳에서는 운동에너지를 계산할 때 창의 미분을 포함하는 항이 생긴다. 이 식은 곱의 미분법에서 얻은 것으로, 원 논문이 창 함수의 효과를 시험했다는 뜻은 아니다.[1]

    주기 결정에서 셀 사이의 행렬 원소를 안다면 파수별 계산을 구성할 수 있다. $O(\mathbf R)$가 기준 셀과 격자 벡터 $\mathbf R$만큼 떨어진 셀 사이의 Hamiltonian 또는 중첩 행렬일 때, 한 가지 Bloch 위상 규약에서는 $O(\mathbf k)=\sum_{\mathbf R} e^{i\mathbf k\cdot\mathbf R}O(\mathbf R)$이다. 두 행렬에 같은 규약을 적용해 파수 $\mathbf k$마다 방정식을 푼다. 예를 들어 간격 $a$인 일차원 사슬에서 셀마다 하나의 정규직교 궤도를 놓고, 대각 에너지를 $\epsilon$, 최근접 이웃 사이의 실수 결합을 $t$라 하면 양옆 이웃의 기여를 더해 $E(k)=\epsilon+2t\cos(ka)$를 얻는다. 이 확장은 원 논문이 무질서한 고분자에서 보고한 고유에너지 시험과 구별된다.[1,8,9] [Wannier 기저와 Bloch 표현](wannierization.md)

??? note "분자 조각을 사용하는 다른 계산법과의 차이"

    CPM은 국소 결합 환경의 전자 밀도 기여를 모아 전체 Hamiltonian을 구성한다. OFM은 그 Hamiltonian에서 관심 에너지의 상태를 구한다. Linear-scaling three-dimensional fragment method (LS3DF)는 표면을 처리한 각 조각의 밀도와 양자 에너지 항을 부호 가중치로 조합하고, 전체 밀도에서 정전기 항을 계산하여 자기일관 해를 구한다. [Mode-space reduction](mode-space-reduction.md)도 전체 문제를 작은 공간으로 투영한다. 그 기저는 기준 구조의 관심 에너지 구간을 대표하는 모드에서 고른다.[1,5,10,11,12,13]

## 6. 요약

- **조각 선택**이 기저에 담을 결합을 정한다. 겹치는 조각을 사용하면 한 조각의 경계에서 잘린 결합을 이웃 조각 내부에서 표현할 수 있다.
- **전체 Hamiltonian과 중첩 행렬**이 조각 파동함수를 섞는 계수와 전체 상태의 에너지를 함께 정한다. 계산의 정확도는 선택한 함수들이 관심 상태를 얼마나 잘 표현하는지에 달려 있다.
- **검증 대상**에 맞춰 기준을 고른다. 에너지 오차는 같은 Hamiltonian의 직접 해와 비교한다. 공간 분포 또는 전체 전자 밀도까지 예측하려면 파동함수 또는 점유 상태에 대해서도 근거가 필요하다.

## 7. 참고문헌

1. N. Vukmirović and L.-W. Wang, “Overlapping fragments method for electronic structure calculation of large systems,” *J. Chem. Phys.* **134**, 094119 (2011). [DOI](https://doi.org/10.1063/1.3560956), [저자 원문 공개본](https://arxiv.org/abs/1011.4764), [출판본 PDF](https://www.osti.gov/servlets/purl/1564765). Sec. II 및 Eq. (2): 구현; Sec. III.A–D 및 Figs. 2–9: fragment 선택과 scaling; Sec. IV 및 Fig. 10: P3HT.
2. N. Vukmirović and L.-W. Wang, “Density of States and Wave Function Localization in Disordered Conjugated Polymers: A Large Scale Computational Study,” *J. Phys. Chem. B* **115**, 1792–1797 (2011). [DOI](https://doi.org/10.1021/jp1114527), [PDF](https://www.scl.rs/papers/Vukmirovic_JPCB_2011.pdf). Theory 및 Figs. 1–4.
3. Z. Bai, J. Demmel, J. Dongarra, A. Ruhe, and H. van der Vorst, eds., *Templates for the Solution of Algebraic Eigenvalue Problems: A Practical Guide* (SIAM, 2000). [양의 정부호 중첩 행렬과 직교화, §5.7.1](https://www.netlib.org/utk/people/JackDongarra/etemplates/node178.html).
4. Massachusetts Institute of Technology, *5.61 Physical Chemistry*, Fall 2007, “Molecular Orbital Theory – Part I,” Lecture 28. [일반화 고유값 문제와 두 궤도의 합·차 해, pp. 7–10](https://ocw.mit.edu/courses/5-61-physical-chemistry-fall-2007/b0101a5df1b17809fc75a0256af6aaf6_lecture28to29.pdf).
5. N. Vukmirović and L.-W. Wang, “Charge patching method for electronic structure of organic systems,” *J. Chem. Phys.* **128**, 121102 (2008). [DOI](https://doi.org/10.1063/1.2901965).
6. Synopsys, *QuantumATK Manual*, “LocalDensityOfStates.” [Notes](https://docs.quantumatk.com/manual/Types/LocalDensityOfStates/LocalDensityOfStates.html).
7. WEST developers, *WEST 6.2.1 Documentation*, “Intro Tutorial 4: Plotting Density of States and Local Density of States.” [LDOS의 평면 적분](https://west-code.org/doc/West/v6.2.1/tutorials/basic/basic_004.html).
8. K. Koepernik, O. Janson, Y. Sun, and J. van den Brink, “Symmetry-conserving maximally projected Wannier functions,” *Phys. Rev. B* **107**, 235135 (2023). [Preprint, Eqs. (1)–(3)](https://arxiv.org/pdf/2111.09652).
9. J. Kuneš, “Wannier Functions and Construction of Model Hamiltonians,” in *The LDA+DMFT approach to strongly correlated materials* (2011). [Chapter 4, Eqs. (5)–(6)](https://www.cond-mat.de/events/correl11/manuscripts/kunes.pdf).
10. L.-W. Wang, Z. Zhao, and J. Meza, “Linear-scaling three-dimensional fragment method for large-scale electronic structure calculations,” *Phys. Rev. B* **77**, 165113 (2008). [DOI](https://doi.org/10.1103/PhysRevB.77.165113), Sec. II.
11. G. Mil'nikov, N. Mori, and Y. Kamakura, “Equivalent transport models in atomistic quantum wires,” *Phys. Rev. B* **85**, 035317 (2012). [DOI](https://doi.org/10.1103/PhysRevB.85.035317).
12. F. Ducry, M. H. Bani-Hashemian, and M. Luisier, “Hybrid Mode-Space–Real-Space Approximation for First-Principles Quantum Transport Simulation of Inhomogeneous Devices,” *Phys. Rev. Applied* **13**, 044067 (2020). [DOI](https://doi.org/10.1103/PhysRevApplied.13.044067).
13. Y.-J. Yan et al., “10-Million Atoms Simulation of First-Principle Package LS3DF,” *Journal of Computer Science and Technology* (2024). [Secs. 2.1–2.2](https://jcst.ict.ac.cn/fileup/1000-9000/PDF/JCST-2024-1-4-3011-45.pdf).
