---
description: 박막의 핵생성과 성장 형태를 살펴보고, 반도체 증착 공정에서 물질 수송과 표면 반응이 성장률과 트렌치 내부의 막 두께에 미치는 영향을 설명한다.
---

# 박막 증착 (Thin-film deposition)

반도체 소자에서 금속 배선, 배선 사이의 절연막, 기판 위에 성장시킨 반도체층은 쓰임새가 다르다. 금속 배선은 단차를 지날 때에도 끊김 없이 이어져야 하고, 깊은 구멍의 내벽에 절연막을 입힐 때는 입구에서 바닥까지 필요한 두께를 확보해야 한다. 결정 기판 위에 반도체층을 성장시킨다면 박막의 결정 방향과 격자 변형도 중요하다. 따라서 목표 두께가 같아도 공정을 선택하는 기준은 달라진다.[1,2,3]

## 1. 물질 공급과 박막의 초기 성장

### (1) 공급원에서 기판 표면까지

반도체 공정에서 널리 쓰는 세 증착법은 물질을 공급하는 방식과 막을 형성하는 과정에서 차이가 난다.[1,4,5,6,7]

| 증착법 | 기판에 막이 쌓이는 과정 |
| --- | --- |
| 물리 기상 증착 <br> Physical vapor deposition (PVD) | 고체나 액체 공급원에서 원자나 분자를 물리적으로 방출하면, 그중 기판에 도달한 입자가 표면에 쌓인다.[4,5] |
| 화학 기상 증착 <br> Chemical vapor deposition (CVD) | 막을 구성할 원소를 담은 기체 분자, 즉 **전구체**를 공급한다. 전구체가 화학반응을 거쳐 고체막을 형성한다.[1,8] |
| 원자층 증착 <br> Atomic layer deposition (ALD) | 같은 표면을 서로 다른 반응물에 차례로 노출한다. 각 단계에서 반응할 수 있는 자리가 소모되면 해당 반응이 포화된다.[6,7] |

기판에 도달한 원자나 분자는 표면에 흡착한 뒤 이동하거나 다시 기체로 탈착할 수 있다. 결정 표면에서 이동하던 원자는 기존 결정층의 가장자리에 붙을 수도 있고, 다른 원자들과 모여 새 결정이 자랄 **핵**을 형성할 수도 있다. 기판 온도를 바꾸면 표면 확산과 탈착 속도가 달라진다. 같은 양의 원자를 공급해도 막에 남는 양과 핵이 자라는 모양이 달라질 수 있는 이유이다.[3,4,9]

### (2) 층상 성장과 섬 성장

결정 기판 위의 초기 성장은 **기판이 드러난 채 섬이 먼저 자라는지, 기판을 덮는 층이 먼저 생기는지**로 구분할 수 있다. 평평한 기판의 단위 면적을 박막으로 덮으면 원래 있던 기판 표면은 사라지고, 그 자리에 기판과 막 사이의 계면 및 막의 윗면이 생긴다. 새 계면과 윗면을 만드는 데 드는 자유에너지의 합이 원래 기판 표면의 자유에너지보다 작으면, 변형 에너지를 무시할 수 있는 조건에서 막이 기판 위에 퍼지는 편이 유리하다.[9,10]

| 성장 형태 | 증착 초기의 모습 |
| --- | --- |
| 층상 성장(Frank–van der Merwe) | 이상적인 경우에는 한 층이 옆으로 자라 기판을 덮은 뒤 다음 층이 자란다. |
| 섬 성장(Volmer–Weber) | 기판을 완전히 덮기 전에 서로 떨어진 3차원 섬이 자란다. 섬 사이에는 기판이 드러난다. |
| 층상 성장 후 섬 성장(Stranski–Krastanov) | 얇은 막이 먼저 기판을 덮고, 그 위에 3차원 섬이 생긴다. 이때 기판을 먼저 덮은 막을 **wetting layer**라고 한다. |

세 형태는 성장 순서를 나타낸다. 예를 들어 격자 주기가 다른 두 결정에서는 기판의 격자 주기에 맞추어 자란 wetting layer가 두꺼워질수록 탄성 변형 에너지가 커져 섬 형성이 유리해질 수 있다. 실제 증착에서는 원자의 도달 속도와 표면에서의 이동 속도도 형상에 영향을 준다. 떨어진 섬이 자라는 단계라면 증착량을 면적당 평균 두께로 환산해도 그 두께의 막이 기판 전체를 덮었다고 해석할 수 없다.[9,10]

### (3) 성장률과 막 두께의 위치별 비교

막 두께를 $d$, 증착 시간을 $\tau$라 하면 두 시점 사이의 **평균 증착률**은 다음과 같다. 두께를 nm, 시간을 s로 대입하면 단위는 nm/s이다. 구간 안에서 성장률이 달라져도 이 평균값을 구할 수 있다.[1,7]

$$
\overline{R}_\mathrm{dep}
=\frac{d(\tau_2)-d(\tau_1)}{\tau_2-\tau_1}.
$$

**웨이퍼 내 두께 균일도**를 평가할 때는 중심과 가장자리 등 여러 위치의 평탄부에서 두께를 비교한다. 한 트렌치 안에서는 측벽이나 바닥의 막 두께를 윗면의 막 두께와 비교한다. 이렇게 구한 두께 비를 **step coverage (SC)**, 즉 단차피복성이라 한다. 트렌치의 윤곽을 따라 막 두께가 얼마나 일정한지(conformality) 평가할 때는 깊이에 따른 두께 분포도 살핀다.[1,6]

!!! info "[Measurement]"
    단면에서 윗면 두께 $d_\mathrm{top}$, 측벽 두께 $d_\mathrm{side}$, 바닥 두께 $d_\mathrm{bottom}$을 각각 **그 면에 수직인 방향**으로 측정한다. 여기서는 증착 전 구조의 깊이 $h$와 입구 폭 $w$로 종횡비 $h/w$를 정한다. 종횡비의 영문 표기는 aspect ratio (AR)이다. 길이 단위를 통일하면 아래의 세 비율은 모두 무차원이다.[1,6]

    $$
    SC_\mathrm{side}=\frac{d_\mathrm{side}}{d_\mathrm{top}},\qquad
    SC_\mathrm{bottom}=\frac{d_\mathrm{bottom}}{d_\mathrm{top}},\qquad
    AR=\frac{h}{w}.
    $$

    예를 들어 깊이 1 µm, 폭 100 nm인 트렌치의 윗면, 깊이 절반의 측벽, 바닥 중앙에서 막 두께가 각각 10, 9, 4 nm라고 가정하자. 종횡비는 10이다. 윗면을 기준으로 측벽의 막 두께는 90%, 바닥의 막 두께는 40%이다. 측벽의 값만 기록하면 바닥에 막이 얼마나 얇게 쌓였는지 알 수 없다.[1,6]

## 2. 물리 기상 증착

### (1) 진공 증발 증착과 입사 방향

진공 증발 증착(evaporation)에서는 증착할 물질을 가열해 기화시키고 기판 위에 응축시킨다. 저항 가열 방식은 전류로 가열한 보트나 필라멘트에서 열을 전달하고, 전자빔 방식은 전자빔을 증발원에 집중시켜 재료를 국소적으로 가열한다.[4,5]

<figure markdown="span">
  ![진공 챔버에서 증발원을 가열하고 방출된 물질이 위쪽 기판으로 이동하는 증착 장치](images/evaporation-chamber.jpg)
  <figcaption markdown="1">그림 1. 진공 증발 증착 장치의 예. 아래쪽에서 증발원을 가열하면 방출된 물질이 위쪽 기판으로 향한다.[4,5] 출처: Dipl-ing-metaller, “PVD-CVD,” [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:PVD-CVD.jpg), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). 파일 수정 없음.[11]</figcaption>
</figure>

증발원의 온도를 높이면 증기압이 올라가 방출률이 커진다. 이때 기판에 쌓이는 양을 알려면 기판이 증발원에서 얼마나 떨어져 있고 어느 방향을 향하는지도 알아야 한다. 증발원과 기판 사이의 거리보다 입자의 평균 자유 행로가 충분히 길면, 기체 분자와의 충돌이 드물어 입자가 직선으로 날아간다고 근사할 수 있다.[4,5]

이 조건에서 트렌치의 입구가 증발원과 측벽 사이의 경로를 가리면, 가려진 부분에 직접 도달하는 입자가 줄어든다. 이를 **그림자 효과**(shadowing)라 한다. 따라서 평탄부에서 증착률을 높여도 입구 아래의 얇은 부분은 남을 수 있다. 단차가 있는 금속 배선에서는 단면에서 막이 가장 얇아지는 위치까지 확인해야 한다.[1,2,5]

### (2) 스퍼터링과 방출 수율

스퍼터링(sputtering)에서는 고에너지 입자가 고체 **타깃**에 충돌해 운동량을 전달하면 타깃 원자가 방출된다. 대표적인 장치에서는 플라즈마 속 아르곤 이온($\mathrm{Ar^+}$)이 타깃을 향해 가속되고, 타깃에서 튀어나온 원자 중 일부가 기판에 쌓인다.[12,13]

타깃에 입사한 이온 수를 $N_\mathrm{ion}$, 방출된 타깃 원자 수를 $N_\mathrm{ejected}$라 하면 **스퍼터링 수율** $Y$는 이온 하나당 방출되는 평균 원자 수이다.[12,13]

$$
Y=\frac{N_\mathrm{ejected}}{N_\mathrm{ion}}.
$$

수율은 입사 이온의 에너지에 따라 달라진다. 수율로 알 수 있는 양은 타깃에서 나온 원자 수까지이다. 방출된 원자는 기판으로 이동하는 동안 기체 입자와 충돌해 방향이 바뀔 수 있다. 기판에서 보이는 입사각 분포는 압력과 장비 형상에 따라 달라지므로, 타깃의 수율과 트렌치 바닥의 피복률은 따로 평가한다.[1,12,13]

## 3. 화학 기상 증착

### (1) 물질 전달과 표면 반응의 정상상태 모형

CVD에서는 전구체가 기판 표면까지 이동한 뒤 흡착해 반응하고, 휘발성 부산물이 표면에서 떨어져 나간다. 평탄한 기판의 국소 성장률을 구하는 간단한 모형에서는 이 과정을 **기체에서 표면으로의 물질 전달**과 **표면에서의 전구체 소비**로 나눈다. 성장률을 좌우하는 전구체가 한 종류이고 표면 소비 속도는 그 농도에 비례한다고 가정한다. 기상 반응과 역반응은 무시한다.[1,8]

<figure markdown="span">
  ![반응 기체가 여러 기판을 지나가고 반응기 바깥에서 가열하는 열 CVD 장치](images/thermal-cvd-reactor.svg)
  <figcaption markdown="1">그림 2. 열 CVD 반응기의 한 예. 공급 기체가 가열된 반응기 안의 여러 기판을 지나간다. 실제 반응기 형상과 기체 공급 방식은 공정에 따라 다르다.[1,8] 출처: S-kei의 원도를 Д.Ильин이 벡터화한 “ThermalCVD-en,” [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:ThermalCVD-en.svg), [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). 파일 수정 없음.[14]</figcaption>
</figure>

표면에서 떨어진 주 기류와 표면 바로 위 기체에서의 전구체 수농도를 각각 $C_g$, $C_s$($\mathrm{m^{-3}}$)라 하자. 물질 전달 계수 $h_g$와 일차 표면 반응 계수 $k_s$의 단위는 모두 m/s이다. 단위 시간에 표면의 단위 면적에 도달하는 전구체 수 $J_\mathrm{tr}$와 반응으로 소비된 전구체 수 $J_\mathrm{rxn}$를 각각 양수로 세면 다음과 같다.[1,8]

$$
J_\mathrm{tr}=h_g(C_g-C_s),\qquad
J_\mathrm{rxn}=k_s C_s.
$$

정상상태에서는 표면에 전구체가 누적되지 않으므로 두 플럭스가 같다. 두 식을 같게 놓고 풀면 표면 농도와 공통 플럭스 $J$($\mathrm{m^{-2}\,s^{-1}}$)를 얻는다. 유효 계수 $k_\mathrm{eff}$의 역수는 두 단계 각각의 저항에 해당하는 역수의 합이다.[1,8]

$$
C_s=\frac{h_g}{h_g+k_s}C_g,\qquad
J=k_\mathrm{eff} C_g,\qquad
\frac{1}{k_\mathrm{eff}}=\frac{1}{h_g}+\frac{1}{k_s}.
$$

$J$를 두께 성장률로 바꾸려면 소비된 전구체 한 분자당 고체에 더해지는 평균 부피 $\Omega_\mathrm{inc}$($\mathrm{m^3}$)가 필요하다. 예를 들어 소비된 한 분자에서 원자 하나가 한 원소로 이루어진 막에 편입되고 막의 원자 수밀도가 $n_s$이면 $\Omega_\mathrm{inc}=1/n_s$이다. 막의 밀도와 편입되는 원자 수가 주어졌을 때, 표면에 수직인 방향의 성장률 $R_\mathrm{dep}$은 다음과 같고 단위는 m/s이다.[1,8]

$$
R_\mathrm{dep}=\Omega_\mathrm{inc}J.
$$

### (2) 성장률을 제한하는 단계

| 제한 단계 | 계수의 관계 | 표면에서 일어나는 일 |
| --- | --- | --- |
| 표면 반응 제한 | $k_s\ll h_g$ | 공급에 비해 반응이 느려 $C_s\approx C_g$이다. 따라서 $J\approx k_s C_g$이다.[1,8] |
| 물질 전달 제한 | $h_g\ll k_s$ | 반응이 빨라 표면 근처의 전구체가 고갈된다. $C_s\ll C_g$이고 $J\approx h_g C_g$이다.[1,8] |

두 단계의 속도가 비슷하면 어느 쪽도 생략하기 어렵다. 예를 들어 $h_g=k_s$라면 $C_s=C_g/2$이고 $J=h_g C_g/2$이다. $C_g$와 $h_g$를 고정하고 $k_s$만 두 배로 높여도 새 플럭스는 $2h_g C_g/3$이다. 표면 반응 계수는 두 배가 됐지만 기체에서 표면으로 물질을 전달하는 데에도 시간이 걸리므로, 플럭스는 원래의 $4/3$배가 된다.[1,8]

기판을 가열했을 때 표면 반응이 물질 전달보다 빠르게 가속되는 공정에서는, 낮은 온도에서 온도에 민감하던 성장률이 높은 온도에서 완만하게 변할 수 있다. 이 모형에서 $C_s$는 평탄한 표면 한 위치의 농도이다. 트렌치 안쪽의 피복률을 예측하려면 입구에서 바닥까지 전구체가 이동하면서 측벽 반응으로 얼마나 소모되는지도 알아야 한다.[1,6,8]

### (3) 압력과 플라즈마의 역할

반응기 압력에 따라 상압 공정과 저압 공정을 구분하며, 각각 atmospheric-pressure CVD (APCVD)와 low-pressure CVD (LPCVD)라 부른다. 압력은 기체 내 물질 전달에 영향을 주며, 물질 전달이 성장을 제한할 때에는 위치에 따른 유동 차이가 두께 차이로 이어질 수 있다. 저압에서 물질 전달이 표면 반응에 비해 충분히 빠르면 성장률은 표면 반응에 더 민감해진다.[1,8]

Plasma-enhanced CVD (PECVD)는 플라즈마로 반응을 활성화하는 방법이다. 플라즈마에서 만들어진 반응종을 이용하면 열만으로 반응을 진행할 때보다 낮은 기판 온도에서 증착할 수 있다. 이미 형성한 소자층 때문에 후속 공정의 온도를 낮춰야 할 때 고려할 수 있는 방법이다. 이때에도 얻어진 막의 조성이나 밀도는 별도로 확인한다.[1,2,8]

## 4. 유기금속 화학 기상 증착과 GaN 성장

Metal–organic chemical vapor deposition (MOCVD)은 금속 원소를 유기금속 전구체로 공급하는 CVD 공정이다. 질화갈륨($\mathrm{GaN}$)의 에피택셜 성장에서는 trimethylgallium (TMGa)으로 Ga를, 암모니아($\mathrm{NH_3}$)로 N을 공급할 수 있다. 두 기체를 반응기에 넣은 뒤에는 전구체의 분해, 기상 부반응, 표면으로의 수송을 거쳐 일부가 막 성장에 기여한다.[15,16,17]

이 조합에서 **V/III 공급비**는 V족 원소인 N을 공급하는 암모니아의 몰 유량 $\dot n_{\mathrm{NH_3}}$를 III족 원소인 Ga를 공급하는 TMGa의 몰 유량 $\dot n_{\mathrm{TMGa}}$로 나눈 값이다. 분자 하나에 각각 N과 Ga가 하나씩 있으므로 두 유량을 같은 단위(예를 들어 mol/min)로 나타내면 다음의 무차원 비를 얻는다.[16,17]

$$
(V/III)_\mathrm{in}=\frac{\dot n_{\mathrm{NH_3}}}{\dot n_{\mathrm{TMGa}}}.
$$

암모니아의 유량을 두 배로 늘리는 경우와 TMGa의 유량을 절반으로 줄이는 경우를 비교해 보자. 두 경우 모두 V/III 공급비는 두 배가 되지만, 두 번째 경우에는 단위 시간에 공급하는 Ga의 양도 절반으로 줄어든다. 공급비만 같다고 해서 표면에 도달하는 활성종의 양이나 막의 성장률까지 같아지는 것은 아니다. GaN 성장 결과를 비교할 때에는 두 전구체의 절대 유량, 온도, 압력과 측정한 성장률을 함께 기록한다.[16,17]

## 5. 원자층 증착과 반응의 포화

### (1) 반응물의 순차 공급과 표면 반응

ALD의 각 반쪽 반응은 **자기 제한적**(self-limiting)이다. 한 반응물이 접근할 수 있는 표면 반응 자리를 모두 소모하면, 그 반응물을 더 공급해도 같은 반응은 더 진행되지 않는다. 다음 반응물이 표면의 화학적 상태를 바꾸면 다시 성장할 수 있다. 한 사이클에서 반응하는 자리의 수와 표면에 남는 원자의 수는 표면 화학에 따라 달라지므로, 한 사이클을 결정학적 원자층 하나와 일대일로 대응시킬 수는 없다.[6,7,18]

시간 분할 ALD(temporal ALD)는 같은 반응 공간에 첫 반응물 주입 → 퍼지(purge) → 둘째 반응물 주입 → 퍼지 순서를 반복한다. 퍼지 단계에서는 불활성 기체를 흘리거나 배기하여 남은 기체 반응물과 부산물을 제거한다. 공간 분할 ALD(spatial ALD)에서는 각 반응물을 서로 분리된 영역에 공급한다. 기판과 공급부가 상대적으로 움직이면 기판의 한 지점이 두 영역을 차례로 지난다.[6,7,19]

<figure markdown="span">
  ![ALD에서 반응물 A와 B의 순차 노출과 퍼지, 시간에 따른 흡착과 온도별 사이클당 성장량](images/ald-basics-illustration.svg)
  <figcaption markdown="1">그림 3. 시간 분할 ALD의 순차 표면 반응과 반복 주입 (a, b), 흡착 거동의 여러 예 (c), 온도에 따른 사이클당 성장량의 정성적 예 (d). 곡선은 특정 공정의 실측값이 아니다.[6,7] 출처: Peter M. Piechulla, Riikka L. Puurunen, Mingliang Chen, Aristeidis Goulas, J. Ruud van Ommen, “ALD basics illustration,” [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:ALD_basics_illustration.svg), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). 파일 수정 없음.[20]</figcaption>
</figure>

산화알루미늄($\mathrm{Al_2O_3}$) 증착을 예로 들면 두 반응물을 나누어 쓰는 이유가 분명해진다. 수산기($\mathrm{-OH}$)가 있는 표면에 trimethylaluminum (TMA)을 공급하면 표면의 산소와 Al 사이에 결합이 생기고 메테인($\mathrm{CH_4}$)이 방출된다. 이때 일부 메틸기($\mathrm{-CH_3}$)는 Al에 결합한 채 남는다. 이어서 수증기를 공급하면 남은 메틸기가 물과 반응해 메테인으로 떨어져 나가고, 표면에는 다음 TMA와 반응할 수 있는 수산기가 다시 생긴다. 이 설명은 대표적인 표면 반응을 따라간 것으로, 모든 Al 원자에 같은 수의 메틸기가 남는다고 가정하지 않는다.[21,22]

### (2) 사이클당 성장량과 포화 확인

사이클 수 $N_1$, $N_2$에서 측정한 막 두께를 $d(N_1)$, $d(N_2)$라 하면, 그 구간의 두께 증가량을 사이클 수의 차이로 나누어 **사이클당 성장량**을 구한다. 이 값을 growth per cycle (GPC)이라 하며, 구간 평균은 다음과 같다. 두께를 nm로 측정하면 단위는 nm/cycle이다.[6,7]

$$
\overline{\mathrm{GPC}}=\frac{d(N_2)-d(N_1)}{N_2-N_1}.
$$

사이클 수에 비례해 두께가 늘었다면 그 구간에서는 평균 GPC로 증착 두께를 예측할 수 있다. 각 반쪽 반응이 포화됐는지는 **같은 사이클 수에서 한 반응물의 노출량을 더 늘려도 막 두께가 달라지는지**로 확인한다. 퍼지가 짧아 두 반응물이 섞이거나 높은 온도에서 전구체가 열분해되면, 자기 제한 반응 이외의 경로로도 막이 자랄 수 있다.[6,7,18]

!!! info "[Measurement]"
    온도와 두께 측정 위치를 고정한다. 둘째 반응물의 노출 조건과 퍼지 시간을 유지하면서 첫 반응물의 노출량을 늘려 GPC가 일정해지는 구간을 찾는다. 두 반응물의 역할을 바꾸어 같은 실험을 하고, 퍼지 시간을 늘려도 GPC가 유지되는지 확인한다. 노출 중 반응물 분압이 거의 일정하면 노출량은 **반응물 분압과 접촉 시간의 곱**(Pa·s)으로 비교할 수 있다.[6,7,18]

### (3) 깊은 구조에서의 반응물 노출

깊은 구멍에서는 먼저 입구 근처의 표면이 반응물을 소비한다. 이 부분이 포화되면 뒤이어 들어오는 반응물이 더 안쪽까지 도달할 수 있다. 따라서 평탄부에서 GPC가 이미 일정해진 뒤에도 노출량을 더 늘리면, 윗면 두께는 거의 그대로인 채 측벽 아래쪽의 피복이 개선될 수 있다.[6,7,18]

Hausmann 등은 깊은 구멍이 식각된 실리콘 웨이퍼에 금속 아마이드 전구체와 물을 사용해 산화하프늄과 산화지르코늄을 각각 증착했다. 노출량이 작을 때에는 구멍 위쪽만 덮였고, 노출량을 충분히 늘렸을 때에는 바닥까지 막이 형성됐다. 코팅 전후 구멍의 입구와 바닥 단면을 비교한 사진은 [원문 그림 4](https://gordon.faculty.chemistry.harvard.edu/sites/g/files/omnuum7801/files/gordon/files/aldhf_3.pdf#page=5)에서 볼 수 있다.[6,18]

## 6. 에피택셜 성장과 격자 변형

### (1) 기판과 박막의 결정 방향

에피택시(epitaxy)에서는 기판의 결정 방향에 따라 그 위에서 자라는 결정의 방향이 정해진다. Si 위에 Si를 성장시키는 것처럼 두 재료가 같으면 동종 에피택시(homoepitaxy), 서로 다르면 이종 에피택시(heteroepitaxy)이다. 에피택시는 성장한 층의 결정학적 관계를 설명하므로 여러 증착법으로 구현할 수 있다.[2,3,15,23]

MOCVD가 기체 전구체를 이용하는 데 비해, molecular beam epitaxy (MBE)에서는 보통 초고진공에서 가열된 결정 기판을 향해 원자선이나 분자선을 보낸다. 고체 공급원을 쓰는 MBE 장치에서는 각 증발 셀(effusion cell)의 온도로 공급률을 조절하고, 셔터를 열거나 닫아 해당 원소의 공급을 전환한다. [텍사스 대학교 오스틴의 MBE 장치도, 그림 2.1](https://lase.ece.utexas.edu/introduction-mbe-growth)에서 기판을 향해 배치한 공급원과 셔터의 위치를 볼 수 있다.[3,15,24]

### (2) 격자 불일치와 면내 변형률

이종 에피택시에서는 기판과 박막의 원래 격자 주기가 다를 수 있다. 같은 온도에서 변형되지 않은 박막과 기판의 격자상수를 각각 $a_f$, $a_s$라 하자. 여기서는 같은 면내 방향에서 두 격자 주기가 1 대 1로 대응하고, 기판이 충분히 두꺼워 기판의 격자 주기는 일정하다고 가정한다. **격자 불일치** $f$는 기판의 격자상수를 기준으로 정의한다.[3,25]

$$
f=\frac{a_f-a_s}{a_s}.
$$

반면 막이 성장하면서 얼마나 늘어나거나 줄었는지 알려면 기준 길이를 **변형되기 전 박막**에 두어야 한다. 성장한 막의 면내 격자상수를 $a_\parallel$이라 하면 면내 변형률은 $\varepsilon_\parallel=(a_\parallel-a_f)/a_f$이다. 얇은 막이 계면에서 기판의 면내 주기에 완전히 맞춰진 정합(coherent) 상태에서는 $a_\parallel=a_s$이므로 다음 관계가 성립한다.[3,25]

$$
\varepsilon_\parallel^\mathrm{coherent}
=\frac{a_s-a_f}{a_f}
=-\frac{f}{1+f}.
$$

두 값은 모두 무차원이다. 박막의 원래 격자상수가 더 크면($f>0$) 기판 주기에 맞춘 박막은 면내에서 압축된다($\varepsilon_\parallel<0$). 불일치가 작을 때만 $\varepsilon_\parallel\approx-f$로 근사할 수 있다. 두께가 증가하면 막에 저장되는 탄성 변형 에너지도 커져, 계면에 부정합 전위(misfit dislocation)가 생기면서 변형이 일부 완화될 수 있다. 이때에는 실제 $a_\parallel$로 변형률을 구한다.[3,25]

## 7. 공정 선택과 두께 측정

공정 선택은 소자에서 막이 맡을 역할과 그 역할을 확인할 측정에서 출발한다.[1,2]

| 공정 목표 | 우선 확인할 공정 변수 | 결과를 판별할 관측량 |
| --- | --- | --- |
| 단차를 지나는 금속 배선 형성 | 증발원 또는 타깃에서 오는 입자의 방향과 가려지는 위치 | 윗면과 단차 부근의 단면 두께, 배선이 가장 얇아지는 위치[1,5,13] |
| 웨이퍼에 일정한 두께의 CVD 막 형성 | 기판 온도, 기체 유동, 반응 제한 또는 물질 전달 제한 여부 | 위치별 두께와 증착 시간에 따른 성장률[1,8] |
| 깊은 구조의 내벽에 절연막 형성 | 각 ALD 반응물의 노출량과 퍼지 시간 | 평탄부의 GPC, 측벽의 깊이별 두께, 바닥 피복률[6,7,18] |
| 화합물 반도체의 에피택셜 성장 | 전구체별 유량, 온도, 기판과 박막의 격자 불일치 | 성장률과 조성, 성장층의 결정 방향과 면내 변형률[3,15,16,17,25] |

평탄한 시편에서는 타원편광법(ellipsometry)으로 반사광의 편광 변화를 측정하고, 기판과 박막으로 이루어진 광학 모형에 측정값을 맞추어 두께를 추정할 수 있다. 이때 어느 층의 두께를 구했는지 명시해야 한다. 예를 들어 Si와 증착막 사이에 산화층이 있으면 그 층도 광학 응답에 기여한다. 미세한 구멍의 측벽과 바닥을 평가할 때에는 단면 전자현미경 사진에서 원하는 위치를 골라 막 두께를 측정할 수 있다.[6,18,22]

내벽을 일정한 두께로 **덮는 공정**과 트렌치 내부를 **채우는 공정**은 단면 사진에서 확인할 항목도 다르다. 피복이 목적이면 윗면에서 바닥까지 막이 얼마나 고르게 이어지는지 살핀다. 충전이 목적이면 입구가 먼저 닫히면서 내부에 빈 공간이 남았는지 확인한다. 이후 형상을 가공하는 공정은 [Etching](etching.md)에서 다룬다.[1,2,13]

## 8. 핵심 정리

- 초기 성장에서는 한 층씩 기판을 덮는 층상 성장, 분리된 섬이 먼저 생기는 섬 성장, 얇은 막이 기판을 덮은 뒤 그 위에 섬이 자라는 경우를 구분한다. 평균 증착량과 막의 연속성은 서로 다른 정보를 준다.[9,10]
- PVD에서는 입자가 날아오는 방향에 따라 윗면과 측벽, 바닥에 쌓이는 막의 두께가 달라질 수 있다. CVD의 성장률은 표면으로의 물질 전달과 표면 반응 가운데 어느 단계가 느린지에 민감하다.[1,5,8,13]
- ALD는 순차적인 자기 제한 반응을 이용한다. 깊은 구조를 덮을 때에는 각 반응물의 노출이 바닥에서도 충분한지 깊이별 두께로 확인한다.[6,7,18]
- MOCVD의 V/III 공급비는 반응기에 넣은 전구체의 몰 유량비이다. 성장한 층의 조성과 결정 상태는 별도로 평가하며, 변형률을 구할 때에는 변형되기 전 박막을 기준으로 삼는다.[3,16,17,25]

## 9. 참고문헌

1. J. Hoyt, “Lecture 17: Chemical Vapor Deposition,” *6.774 Physics of Microfabrication: Front-End Processing*, MIT OpenCourseWare (2004), transcript, pp. 1–13. [강의 원문](https://ocw.mit.edu/courses/6-774-physics-of-microfabrication-front-end-processing-fall-2004/1sSADV3Iiuifbp51EEBEB0v15lnIZkjBA_transcript.pdf).
2. S. Pennathur, “Lecture 3,” *ME 141B: The MEMS Class*, University of California, Santa Barbara (2010), slides 3, 9–15, 19–24. [강의 원문](https://sites.engineering.ucsb.edu/~sumita/courses/Courses/ME141B/ME141B_lecture_3_F10.pdf).
3. Laboratory for Advanced Semiconductor Epitaxy, “An Introduction to MBE Growth,” University of Texas at Austin, §§2, 5–7. [기관 원문](https://lase.ece.utexas.edu/introduction-mbe-growth).
4. A. G. Andreou, “Film Deposition,” Johns Hopkins University 520/580.495 (2000), including R. B. Darling, *Physical Vapor Deposition*, pp. 7–31. [강의 원문](https://pages.jh.edu/aandreo1/495/Archives/2002/LectureNotes/FilmDeposition.pdf).
5. C. A. Mack, “Evaporation, parts 1–2,” *CHE323/CHE384 Chemical Processes for Micro- and Nanofabrication* (2013), Lectures 20–21. [Lecture 20](https://www.lithoguru.com/scientist/CHE323/Lecture20.pdf), [Lecture 21](https://www.lithoguru.com/scientist/CHE323/Lecture21.pdf).
6. V. Cremers, R. L. Puurunen, and J. Dendooven, “Conformality in Atomic Layer Deposition: Current Status Overview of Analysis and Modelling,” *Applied Physics Reviews* **6**, 021302 (2019), §§I–III, V–VI. [DOI: 10.1063/1.5060967](https://doi.org/10.1063/1.5060967), [저자 기관 원문](https://backoffice.biblio.ugent.be/download/8614054/8614061).
7. S. M. George, “Atomic Layer Deposition: An Overview,” *Chemical Reviews* **110**, 111–131 (2010), pp. 112–114. [DOI: 10.1021/cr900056b](https://doi.org/10.1021/cr900056b), [대학 공개 사본](https://www.seas.upenn.edu/~nanosop/documents/overviewofALD.pdf).
8. C. A. Mack, “Chemical Vapor Deposition, parts 1–2,” *CHE323/CHE384 Chemical Processes for Micro- and Nanofabrication* (2013), Lectures 24–25. [Lecture 24](https://www.lithoguru.com/scientist/CHE323/Lecture24.pdf), [Lecture 25](https://www.lithoguru.com/scientist/CHE323/Lecture25.pdf).
9. Universität Tübingen, “Thin film growth: Concepts and theory,” ch. 6, §§6.1.1–2, Figs. 6.1–6.4. [강의 원문](https://www.soft-matter.uni-tuebingen.de/teaching/vorlesung_nano_ss24/BM-Nano-Chapter6.pdf).
10. J. E. Prieto and I. Markov, “Stranski-Krastanov mechanism of growth and the effect of misfit sign on quantum dots nucleation,” §I (2017). [arXiv:1706.00235](https://arxiv.org/pdf/1706.00235).
11. Dipl-ing-metaller, “PVD-CVD,” Wikimedia Commons (2010). [그림 원문](https://commons.wikimedia.org/wiki/File:PVD-CVD.jpg), CC BY-SA 3.0.
12. NPTEL, “Lecture 38: Deposition and Fabrication Techniques I,” *Advances in Spintronic Materials, Technology and Devices*, §Sputtering technique. [강의 원문](https://archive.nptel.ac.in/content/storage2/courses/115103039/module16/lec38/6.html).
13. C. A. Mack, “Sputtering, parts 1–2,” *CHE323/CHE384 Chemical Processes for Micro- and Nanofabrication* (2013), Lectures 22–23. [Lecture 22](https://www.lithoguru.com/scientist/CHE323/Lecture22.pdf), [Lecture 23](https://www.lithoguru.com/scientist/CHE323/Lecture23.pdf).
14. S-kei and Д.Ильин, “ThermalCVD-en,” Wikimedia Commons (2022). [그림 원문](https://commons.wikimedia.org/wiki/File:ThermalCVD-en.svg), CC0 1.0.
15. C. G. Fonstad, “Lecture 7: Epitaxy Techniques and Considerations,” *6.772 Compound Semiconductor Devices*, MIT OpenCourseWare (2003), slides 3–7, 13–15. [강의 원문](https://ocw.mit.edu/courses/6-772-compound-semiconductor-devices-spring-2003/8c305146942ad5a5ad1c559a6ecae11c_Lecture7v2.pdf).
16. T. Ciarkowski *et al.*, “Connection between Carbon Incorporation and Growth Rate for GaN Epitaxial Layers Prepared by OMVPE,” *Materials* **12**, 2455 (2019), §§1–3. [DOI: 10.3390/ma12152455](https://doi.org/10.3390/ma12152455), [공개 원문](https://pmc.ncbi.nlm.nih.gov/articles/PMC6695831/).
17. Y. Zhang, Z. Chen, K. Zhang, Z. Feng, and H. Zhao, “Laser-Assisted Metal–Organic Chemical Vapor Deposition of Gallium Nitride,” *physica status solidi (RRL) – Rapid Research Letters*, 2100202 (2021), §§1–2, 4. [DOI: 10.1002/pssr.202100202](https://doi.org/10.1002/pssr.202100202), [공개 원문](https://d-nb.info/1233639382/34).
18. D. M. Hausmann, E. Kim, J. Becker, and R. G. Gordon, “Atomic Layer Deposition of Hafnium and Zirconium Oxides Using Metal Amide Precursors,” *Chemistry of Materials* **14**, 4350–4358 (2002), §§II–IV. [DOI: 10.1021/cm020357x](https://doi.org/10.1021/cm020357x), [저자 기관 원문](https://gordon.faculty.chemistry.harvard.edu/sites/g/files/omnuum7801/files/gordon/files/aldhf_3.pdf).
19. P. Poodt, “Spatial Atomic Layer Deposition for Large-Area and Flexible Electronics,” *NEVAC Blad* **58**(2), 29–31 (2020). [기관 저장소 원문](https://pure.tue.nl/ws/portalfiles/portal/151430173/NEVAC_ALD_Issue_2020_Poodt.pdf).
20. P. M. Piechulla, R. L. Puurunen, M. Chen, A. Goulas, and J. R. van Ommen, “ALD basics illustration,” Wikimedia Commons (2025). [그림 원문](https://commons.wikimedia.org/wiki/File:ALD_basics_illustration.svg), CC BY 4.0.
21. T. Weckman and K. Laasonen, “First principles study of the atomic layer deposition of alumina by TMA–H₂O-process,” *Physical Chemistry Chemical Physics* **17**, 17322–17334 (2015), reactions R1–R3 and §3. [DOI](https://doi.org/10.1039/C5CP01912E), [저자 기관 원문](https://aaltodoc.aalto.fi/server/api/core/bitstreams/0ce3f5b8-4566-4385-a0d9-304030b446e8/content).
22. J. L. Cho, *Engineering Lithium Ion Conducting Thin Film Solid Electrolytes by Atomic Layer Deposition*, UCLA doctoral dissertation (2015), §2.2.4 and Figs. 2.9–2.10, 3.3. [학위논문 원문](https://escholarship.org/content/qt2vr3z5pd/qt2vr3z5pd_noSplash_e57ed5f878ce86c39afadca3aefac7d2.pdf).
23. X. Klemenschits, *Emulation and Simulation of Microelectronic Fabrication Processes*, TU Wien doctoral thesis (2022), §5.1.2. [기관 원문](https://www.iue.tuwien.ac.at/phd/klemenschits/18.html).
24. A. Ptak, “Principles of Molecular Beam Epitaxy,” in *Handbook of Crystal Growth*, 2nd ed., Vol. III, Part A, pp. 161–192 (2015), abstract. [DOI: 10.1016/B978-0-444-63304-0.00004-4](https://doi.org/10.1016/B978-0-444-63304-0.00004-4), [저자 기관 초록](https://research-hub.nlr.gov/en/publications/chapter-4-principles-of-molecular-beam-epitaxy/).
25. S. Smirnov, “Critical Thickness and Dislocations,” §3.1.1, TU Wien doctoral thesis. [기관 원문](https://www.iue.tuwien.ac.at/phd/smirnov/node68.html).
