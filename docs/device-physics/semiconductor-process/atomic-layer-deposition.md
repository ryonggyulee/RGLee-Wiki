---
description: 자기 제한적 표면 반응을 바탕으로 열 ALD의 네 단계, 플라즈마를 이용한 반쪽 반응, 성장량과 트렌치 피복성의 측정 방법을 설명한다.
---

# Atomic layer deposition

원자층 증착, 즉 atomic layer deposition (ALD)은 표면을 두 반응물에 번갈아 노출하여 박막을 성장시키는 방법이다. 첫 반응물이 표면에 결합할수록 **그 반응물이 이용할 수 있는 자리가 줄어든다.** 반응이 포화된 뒤에는 같은 물질을 더 주입해도 흡착량이 거의 늘지 않는다. 둘째 반응물이 표면의 결합 상태를 바꾸면 첫 반응물이 다시 결합할 수 있다. 이 과정을 반복하면 사이클 수로 막 두께를 조절할 수 있다.[1,2,3,4]

## 1. 자기 제한적 표면 반응

표면의 **반응 자리**는 기체 분자가 닿을 수 있고 그 분자와 화학 결합을 형성할 수 있는 위치이다. 첫 반응물 A가 결합할 때마다 남은 자리 수가 줄어든다. 흡착한 전구체의 중심 원자에 붙어 있는 원자나 원자단을 리간드라고 한다. 리간드가 이웃 자리를 가리면 그 자리에도 다른 전구체가 접근하기 어렵다. 주어진 온도에서 A가 이용할 수 있는 자리가 소모되거나 가려지면, A가 계속 도달해도 표면에 새로 결합하는 양은 거의 늘지 않는다. 이것이 한 **반쪽 반응**의 자기 제한성(self-limiting behavior)이다. 포화에 이르러도 표면 전체가 빈틈없는 원자 한 층으로 덮일 필요는 없다.[1,2,3,4]

포화와 퍼지는 시점과 역할이 다르다. 그림 1(c)에서 검은 실선은 **A를 공급하는 동안** 이미 평탄해진다. 이어지는 퍼지에서는 남은 기체를 내보내고, 안정하게 화학 흡착한 물질은 표면에 남긴다. 이 상태에서 A를 다시 넣으면 같은 반쪽 반응의 성장량은 거의 늘지 않는다. 반응물 B를 넣으면 A가 남긴 표면기와 반응하여 다음 A가 결합할 자리를 만든다. 이때 비로소 새 사이클에서 성장이 이어질 수 있다.[1,3,4]

<figure markdown="span">
  ![A 주입·퍼지·B 주입·퍼지에 따른 표면 변화와 분압을 나타낸 도식. 이상적인 흡착량은 A 주입 도중 평탄해지고 퍼지 중에도 유지된다.](images/ald-basics-illustration.svg)
  <figcaption markdown="1">그림 1. (a)는 한 지점에서 겪는 네 단계, (b)는 그 지점이 각 반응물에 노출되는 시간 순서이다. (c)의 검은 실선이 포화되는 시점과 퍼지가 시작되는 시점을 비교할 수 있다. (d)는 온도에 따른 사이클당 성장량의 정성적 예이다. Peter M. Piechulla, Riikka L. Puurunen, Mingliang Chen, Aristeidis Goulas, J. Ruud van Ommen, “ALD basics illustration,” 패널 (a–d). [그림 원본](https://commons.wikimedia.org/wiki/File:ALD_basics_illustration.svg), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). 원본 SVG를 그대로 사용했다.[5]</figcaption>
</figure>

## 2. 열 ALD 한 사이클의 네 단계

산화알루미늄($\mathrm{Al_2O_3}$)을 성장시키는 시간 분할 열 ALD를 예로 든다. 그림 1의 A는 Al을 공급하는 전구체 trimethylaluminum (TMA, $\mathrm{Al(CH_3)_3}$)이고, B는 수증기이다. 출발점은 물과 반응하여 표면에 수산기($\mathrm{-OH}$)가 노출된 성장막이다. 아래 반응식에서 $\mathrm{Me}$는 TMA에 결합한 메틸기($\mathrm{-CH_3}$)를 뜻한다.[1,3,4]

### (1) TMA 주입과 알루미늄의 화학 흡착

TMA가 표면 수산기에 도달하면 메틸기 하나가 수산기의 수소를 받아 메테인($\mathrm{CH_4}$)으로 떨어져 나간다. 표면 산소와 Al 사이에는 새 결합이 생긴다. $\mathrm{S}$를 기존 표면 골격이라 할 때, 수산기 하나에서 일어나는 결합 교환은 다음과 같다.[3,4]

$$
\mathrm{S{-}OH + AlMe_3 \longrightarrow S{-}O{-}AlMe_2 + CH_4}.
$$

이 식은 가능한 결합 방식 하나를 나타낸다. 같은 TMA 분자가 이웃 수산기와도 반응할 수 있으므로, Al 하나에 남는 메틸기 수는 일정하지 않다. 주입이 진행되면 표면에는 Al과 결합한 메틸기가 많아지고, 들어오는 TMA가 접근할 수 있는 수산기는 줄어든다. 이 자리들이 소모되거나 가려지면 더 주입한 TMA는 Al을 거의 추가하지 못한다.[1,3,4]

### (2) 첫 번째 퍼지와 잔류 TMA 제거

TMA 공급을 끊고 불활성 기체를 흘리거나 반응기를 배기한다. 반응하지 않은 기체 TMA와 부산물인 메테인이 반응기 밖으로 나간다. 첫 단계에서 결합한 Al과 그 위의 메틸기는 표면에 남아 다음 반응의 출발점이 된다. 이 퍼지가 짧아 기체 TMA가 남으면 다음에 들어오는 물과 기상에서 만나고, 두 반쪽 반응으로 제어되지 않는 성장분이 더해질 수 있다.[1,3,4]

### (3) 수증기 주입과 수산기 재생

물을 공급하면 표면 Al에 결합해 있던 메틸기가 물의 수소를 받아 메테인으로 빠져나가고, 그 자리에 수산기가 생긴다. 아래 식에서 $\mathrm{S'}$는 반응을 추적하는 Al–메틸 결합을 지탱하는 나머지 표면 구조이다. 식은 메틸기 한 개의 교환을 나타낸다.[3,4]

$$
\mathrm{S'{-}Al{-}Me + H_2O \longrightarrow S'{-}Al{-}OH + CH_4}.
$$

첫 단계에서는 수산기가 소모되었지만, 이 단계에서는 메틸기가 소모된다. 물이 접근하여 교환할 수 있는 메틸기가 줄수록 이 반응도 포화에 가까워진다. 물을 더 주입해도 새로운 Al 공급원은 없다. 표면에 생긴 Al–OH가 다음 TMA 분자를 받아들일 자리가 된다.[3,4]

### (4) 두 번째 퍼지와 다음 사이클의 시작

남은 수증기와 메테인을 내보낸다. 첫 퍼지 뒤의 표면에는 물과 반응할 메틸기가 남았다. 둘째 퍼지 뒤에는 새로 편입된 Al 위에 수산기가 남아 다음 TMA와 반응할 수 있다. 두 퍼지 모두 기체를 분리하지만 서로 다른 표면 상태를 보존한다. 특히 낮은 온도에서는 잔류 물이 빠져나가는 데 시간이 오래 걸릴 수 있어, 첫 퍼지와 둘째 퍼지의 소요 시간을 각각 확인한다.[1,3,4]

## 3. 사이클 반복과 공정 조건의 판정

### (1) 사이클 수에 따른 두께 증가

초기에는 전구체가 노출된 기판과 반응한다. 네 단계를 반복하여 막이 기판을 덮으면, 새로 들어오는 전구체는 성장막의 표면과 반응한다. 이 표면이 매 사이클 비슷한 상태로 돌아오면 두께 증가량도 일정해진다. 이를 사이클당 성장량, 즉 growth per cycle (GPC)으로 나타낸다. 초기에는 기판의 표면기가 달라 이 값이 달라질 수 있다. 예를 들어 TMA–물 공정에서 수소로 종결된 Si 표면은 산화된 Si 표면에 비해 처음 몇 사이클 동안 면적당 Al 축적량이 작을 수 있다.[3,6,7]

!!! info "[Measurement]"
    같은 온도와 주입 조건에서 사이클 수 $N$만 바꾸어 두께 $d(N)$를 측정한다. $N_2>N_1$인 두 지점의 평균은 $\overline{\mathrm{GPC}}=[d(N_2)-d(N_1)]/(N_2-N_1)$이다. 두께를 nm로 재면 단위는 nm/cycle이다. 여러 지점을 측정해 정상 성장 구간의 기울기를 구하고, 초기 핵생성 구간은 따로 읽는다. 두께가 사이클 수에 비례한다는 관찰은 반복당 평균 성장량을 알려 준다. 각 반쪽 반응의 포화는 아래와 같이 노출량을 바꾸는 실험에서 확인한다.[1,3,6,7]

### (2) 반응물별 노출량과 포화 곡선

분자 반응물 A의 노출량은 표면 부근 분압 $p_A(t)$를 노출 시간에 대해 적분한 값이며 단위는 $\mathrm{Pa\,s}$이다. 분압이 거의 일정할 때에는 분압과 노출 시간의 곱으로 근사할 수 있다. 밸브를 열어 둔 시간이 같아도 분압이 다르면 표면이 받는 노출량은 달라진다.[1,2]

!!! info "[Measurement]"
    기판 온도와 사이클 수를 고정한다. 먼저 물 공급과 두 퍼지 조건을 고정하고 TMA 노출량만 늘리면서 GPC를 그린다. TMA 포화 구간을 찾으면 이번에는 TMA를 그 조건으로 고정하고 물 노출량을 늘린다. 각 곡선에서 추가 노출에 따른 GPC 변화가 측정 불확도에 비해 얼마나 작은지 본다. 마지막으로 각 퍼지를 따로 연장한다. 퍼지를 늘릴 때 GPC가 줄어든다면 잔류 반응물의 중첩이 앞서 측정한 성장량에 기여했을 가능성이 있다.[1,3,4]

두께 외에 질량을 측정하면 **한 번의 반쪽 반응**도 추적할 수 있다. Heil 등은 산소 플라즈마를 쓰는 산화알루미늄 공정에서, 다음 산화 단계로 넘어가기 전에 TMA를 소량씩 거듭 주입했다. 수정 진동자 미세저울(quartz crystal microbalance, QCM)로 측정한 질량은 처음에 증가하다가 추가 TMA 주입에도 거의 변하지 않았다. 반면 Groner 등의 58 °C 열 공정에서는 TMA 또는 물 노출을 늘렸을 때 사이클당 질량 증가량의 곡선에 작은 기울기가 남았다. 전자는 한쪽 반응 자리의 소모를, 후자는 저온에서 포화에 완만하게 접근할 수 있음을 보여 준다.[3,4]

### (3) 증착 온도와 ALD window

노출량을 바꾼 포화 곡선과 온도를 바꾼 성장 곡선은 가로축부터 다르다. 그림 1(d)처럼 기판 온도를 바꾸어도 GPC가 거의 일정한 구간을 흔히 **ALD window**라고 부른다. 반면 어떤 온도에서 충분히 노출해 반응을 포화시켜도, 온도에 따라 수산기 밀도가 달라지면 포화 GPC 자체가 변한다. 온도 곡선에서 수평 구간을 찾는 것만으로 두 반쪽 반응의 포화를 판정할 수 없는 이유이다.[1,3,8,9]

낮은 온도에서 GPC가 감소한다면 정해진 주입 시간 동안 반응이 충분히 진행됐는지 살펴본다. 쉽게 응축되는 전구체라면 낮은 온도에서 여러 층이 흡착되어 GPC가 커질 수도 있다. 높은 온도에서는 전구체의 탈착이 성장량을 줄이거나 열분해가 추가 성장을 일으킬 수 있다. 원인을 구분할 때에는 관심 온도에서 반응물별 노출량과 퍼지 시간을 다시 바꿔 본다.[1,2,3]

## 4. 플라즈마 강화 ALD의 공정 순서와 표면 반응

### (1) 산소 플라즈마를 이용한 산화 단계

플라즈마 강화 ALD, 즉 plasma-enhanced atomic layer deposition (PEALD)에서는 방전으로 만든 활성종을 표면 반응에 이용한다. 산화알루미늄의 시간 분할 PEALD에서 산소 플라즈마가 들어가는 시점은 첫 퍼지가 끝난 뒤이다. 같은 Al 전구체를 쓰는 열 공정과 각 단계를 비교하면 다음과 같다.[3,4,8,10]

| 단계 | TMA–물 열 ALD | TMA–산소 플라즈마 PEALD |
| --- | --- | --- |
| 1. 전구체 주입 | TMA가 표면에 Al을 공급하고 메틸기가 남는다. | TMA가 표면에 Al을 공급하고 메틸기가 남는다. |
| 2. 첫 퍼지 | 잔류 TMA와 메테인을 제거한다. | 잔류 TMA와 메테인을 제거한 뒤 플라즈마 단계로 넘어간다. |
| 3. 공반응물 노출 | 물이 Al–메틸 결합과 반응해 메테인을 방출하고 수산기를 만든다. | 산소 플라즈마의 활성종이 메틸기를 산화한다. 표면에는 다음 TMA와 반응할 수산기가 생긴다. |
| 4. 둘째 퍼지 | 잔류 수증기와 메테인을 내보낸다. | 플라즈마 노출을 끝내고 잔류 기체와 산화 부산물을 내보낸다. |

두 공정의 반응 경로 차이는 세 번째 단계의 부산물에서 드러난다. 산소 플라즈마 단계의 배기가스에서는 이산화탄소와 물이 검출되며, 이렇게 생긴 물이 남은 메틸기와 반응해 메테인을 만드는 경로도 있다.[4,8,10]

적외선 분광 측정에서는 TMA 주입 뒤에 메틸기, 산소 플라즈마 노출 뒤에 수산기가 주된 표면기로 관찰되었다. 둘째 퍼지로 기체 부산물을 제거하고 나면 이 수산기가 다음 TMA와 반응한다. 따라서 플라즈마 시간은 앞선 단계에서 남은 리간드를 충분히 제거할 수 있는지를 기준으로 정한다. TMA 노출을 고정한 채 플라즈마 시간에 따른 GPC를 확인하고, 산소 공급 압력과 방전 출력도 함께 기록한다. 산소 분자의 분압만으로 기판에 도달한 라디칼의 양을 알 수 없기 때문이다.[4,8,10,11,12]

산소 플라즈마는 기판 온도가 낮아도 리간드 제거를 촉진할 수 있다. 이때 두께 증가량만 보면 한 사이클에서 얼마나 많은 Al이 막에 들어갔는지 오판할 수 있다. 산화알루미늄 실험에서는 온도에 따라 막 밀도와 수소 함량도 변했다. 열 공정과 PEALD의 저온 성장을 비교할 때는 사이클당 두께와 함께 면적당 Al 축적량, 막 밀도 또는 잔류 수소를 비교한다.[3,8,9]

### (2) 직접형과 원격형 플라즈마

직접형(direct plasma)에서는 기판이 방전 영역에 놓인다. 원격형(remote plasma)에서는 기판에서 떨어진 곳에서 방전을 일으킨 뒤 활성종을 기판으로 보낸다. 두 구성을 구분하는 이유는 중성 라디칼의 화학반응과 에너지를 가진 이온의 충돌이 막에 서로 다른 영향을 줄 수 있기 때문이다. 원격형에서도 장치 구조와 압력에 따라 이온이 기판까지 도달한다. 따라서 ‘원격형’이라는 명칭만으로 이온 노출을 배제할 수 없다.[11,12]

예를 들어 산소 플라즈마로 산화아연을 증착한 실험에서는 직접형과 원격형 사이에 막 조성과 결정성 차이가 나타났고, 직접형에 노출된 고분자 기판에서는 표면 형태의 변화가 관찰되었다. 원격형 산소 플라즈마를 사용한 별도 실험에서는 기판 위치의 이온 에너지와 플럭스를 측정하고, 플라즈마가 방출하는 진공 자외선이 산화막 구조의 전기적 특성에도 영향을 줄 수 있음을 보였다. 열에 민감한 기판의 공정 조건을 정할 때에는 증착 온도와 함께 기판 자체가 플라즈마 노출 후 어떻게 변했는지 확인할 필요가 있다.[11,12]

### (3) 공반응물 선택과 질화물 성장

플라즈마 기체는 어떤 원소가 막에 들어가는지도 결정한다. 같은 Al 전구체인 TMA를 쓰더라도 산소 플라즈마를 쓰면 산화알루미늄을, 암모니아($\mathrm{NH_3}$) 플라즈마를 질소원으로 쓰면 질화알루미늄($\mathrm{AlN}$)을 성장시킬 수 있다. 질화 공정을 설계할 때는 TMA 노출량과 암모니아 플라즈마 노출 시간을 각각 바꾸어 포화를 다시 확인한다. 산화 공정에서 얻은 포화 시간을 질화 공정에 그대로 적용할 근거는 없다.[4,13,14]

## 5. 공간 분할 반응기의 사이클 구현

시간 분할과 공간 분할(spatial ALD)은 **반응물을 분리하는 방식**을 구분한다. 공간 분할에서는 기판의 한 지점이 서로 분리된 공급 영역을 차례로 지나면서 한 사이클을 마친다. 이 구분은 표면을 열 또는 플라즈마로 활성화하는 방식과 독립적이다. 그림 2에서는 회전하는 기판이 전구체 공급구와 플라즈마 공급구 아래를 차례로 지나므로 공간 분할과 PEALD를 함께 구현한다.[2,8,15]

<figure markdown="span">
  ![회전 기판이 전구체와 플라즈마 공급구 아래를 차례로 지나는 반응기, 옆으로 열린 시험 구조의 단면, 덮개를 제거한 뒤의 광학 현미경 사진](images/plasma-spatial-ald-reactor.jpg)
  <figcaption markdown="1">그림 2. 왼쪽 (a)는 회전식 공간 분할 반응기이다. 오른쪽 (b)의 기둥이 덮개를 받쳐 옆으로 열린 얇은 통로를 만든다. 반응물은 이 통로로 들어가며, 증착 뒤 덮개를 제거하면 (c)처럼 입구부터 안쪽까지 관찰할 수 있다. M. L. van de Poll 외, “Excellent conformality of atmospheric-pressure plasma-enhanced spatial atomic layer deposition with subsecond plasma exposure times,” [원문 그림 1](https://doi.org/10.1063/5.0168768), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). PDF에서 원본 이미지를 추출했으며 패널과 표시는 수정하지 않았다.[15]</figcaption>
</figure>

## 6. 고종횡비 구조의 피복성

폭에 비해 깊은 트렌치에서는 반응물이 입구에서 안쪽으로 이동하는 동안 벽과 여러 번 충돌한다. 열 ALD에서는 입구 근처의 반응 자리가 먼저 포화되면 뒤이어 들어오는 전구체가 더 깊은 곳까지 도달할 수 있다. 산소 플라즈마에서는 산소 라디칼이 벽에서 재결합하여 분자 산소가 되는 소실 경로도 있다. 이 경로는 리간드 제거가 끝난 벽에서도 작동할 수 있다. 그 결과 평탄한 표면에서는 충분했던 노출 시간에도 깊은 곳은 반응에 필요한 라디칼을 적게 받을 수 있다. 재결합의 영향은 내벽의 재료와 공정 조건에 따라 달라진다.[2,13,15,16]

<figure markdown="span">
  ![산소를 포함한 플라즈마의 노출 시간이 0.24초, 0.37초, 0.73초로 길어질 때 산화규소와 산화타이타늄 막이 트렌치 안쪽까지 형성되는 두께 곡선](images/plasma-ald-trench-thickness.jpg)
  <figcaption markdown="1">그림 3. 대기압, 100 °C에서 얻은 (a) 산화규소와 (b) 산화타이타늄의 두께 분포이다. 세로 점선은 트렌치 입구이고, 아래 가로축은 입구로부터의 거리를 통로 높이로 나눈 값이다. 각 재료에서 노출 시간이 길수록 막이 더 깊이까지 이어진다. 두 재료의 증착 사이클 수는 서로 다르므로 세로축의 절대 두께로 두 공정의 GPC를 비교할 수는 없다. M. L. van de Poll 외, “Excellent conformality of atmospheric-pressure plasma-enhanced spatial atomic layer deposition with subsecond plasma exposure times,” [원문 그림 2](https://doi.org/10.1063/5.0168768), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). PDF에서 원본 이미지를 추출했으며 축과 데이터는 수정하지 않았다.[15]</figcaption>
</figure>

!!! info "[Measurement]"
    같은 구조에서 입구부터 거리 $x$에 따른 막 두께 $d(x)$를 측정한다. 기준 두께 $d_\mathrm{ref}$를 어디에서 얻었는지 명시하고, 두께가 감소하는 쪽에서 $d(x_{50})=0.5d_\mathrm{ref}$가 되는 위치 $x_{50}$을 읽는다. 기준을 일정하게 유지하면 통로 높이 $h$로 나눈 $x_{50}/h$로 노출 조건별 **절반 두께 침투 깊이**를 비교할 수 있다. 입구 부근 두께가 비슷한데 더 깊은 곳에서 곡선이 갈라지면, 평탄부 GPC로는 보이지 않던 피복 차이가 드러난다.[2,15,16]

그림 3의 실험에서 회전 속도를 바꾸면 기판이 각 공급 영역에 머무는 시간이 함께 달라진다. 따라서 새로운 공정에서 비슷한 두께 분포를 얻었다면 먼저 전구체 공급이 깊은 곳에서도 충분한지 확인한다. 그 조건에서 플라즈마 노출을 늘렸을 때 침투 깊이가 커지는지를 살피면 어느 반쪽 반응이 피복을 제한하는지 구분할 수 있다.[2,15,16]

## 7. 요약

- 열 ALD에서 TMA 반응은 접근 가능한 수산기가 소모되거나 가려지면서 포화된다. 이어서 물이 표면 메틸기와 반응하면 다음 사이클에 필요한 수산기가 생긴다. 두 퍼지는 각 단계에서 남은 기체와 부산물을 내보낸다.
- 사이클 수에 대한 두께의 기울기는 GPC를 준다. TMA 또는 공반응물의 노출량에 대한 GPC 곡선은 각 반쪽 반응의 포화 여부를 보여 준다.
- 산화알루미늄 PEALD에서는 산소 플라즈마가 세 번째 단계에서 메틸기를 산화한다. 라디칼에 의한 표면 반응과 이온·광자에 의한 기판의 변화도 함께 고려한다.
- 공간 분할 반응기에서는 기판의 한 지점이 두 공급 영역을 차례로 지난다. 깊은 구조에서는 입구와 내부가 서로 다른 양의 반응물에 노출될 수 있으므로 깊이별 두께로 피복성을 평가한다.

다른 박막 증착법과의 비교는 [Thin-film deposition](thin-film-deposition.md)에서 다룬다.

## 8. 참고문헌

1. M. Ritala and M. Leskelä, “Atomic Layer Deposition,” in *Handbook of Thin Film Materials*, vol. 1, ch. 2, 103–159 (2002), §§3.1, 7.1.1, Figs. 18–19. [원문](https://nanomembranes.org/wp-content/uploads/2010/10/atomic-layer-deposition-ritala-leskela.pdf).
2. V. Cremers, R. L. Puurunen, and J. Dendooven, “Conformality in atomic layer deposition: Current status overview of analysis and modelling,” *Applied Physics Reviews* **6**, 021302 (2019). [DOI](https://doi.org/10.1063/1.5060967), [기관 원문](https://backoffice.biblio.ugent.be/download/8614054/8614061).
3. M. D. Groner, F. H. Fabreguette, J. W. Elam, and S. M. George, “Low-Temperature Al₂O₃ Atomic Layer Deposition,” *Chemistry of Materials* **16**, 639–645 (2004). [DOI](https://doi.org/10.1021/cm0304546).
4. S. B. S. Heil et al., “Reaction mechanisms during plasma-assisted atomic layer deposition of metal oxides: A case study for Al₂O₃,” *Journal of Applied Physics* **103**, 103302 (2008). [DOI](https://doi.org/10.1063/1.2924406), [기관 원문](https://pure.tue.nl/ws/files/3131857/Metis217673.pdf).
5. P. M. Piechulla, R. L. Puurunen, M. Chen, A. Goulas, and J. R. van Ommen, “ALD basics illustration,” panels (a–d), Wikimedia Commons (2025). [원본 SVG와 저작자 정보](https://commons.wikimedia.org/wiki/File:ALD_basics_illustration.svg), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
6. V. Vandalon and W. M. M. Kessels, “Initial Growth Study of Atomic-Layer Deposition of Al₂O₃ by Vibrational Sum-Frequency Generation,” *Langmuir* **35**, 10374–10382 (2019). [DOI](https://doi.org/10.1021/acs.langmuir.9b01600), [공개 원문](https://pmc.ncbi.nlm.nih.gov/articles/PMC6694409/).
7. J. M. Sturm et al., “Nanoscale topography-capacitance correlation in high-K films: Interface heterogeneity related electrical properties,” *Journal of Applied Physics* **98**, 076104 (2005). [DOI](https://doi.org/10.1063/1.2077840), [기관 원문](https://ris.utwente.nl/ws/files/299120548/1.2077840.pdf).
8. M. A. Mione et al., “Temperature study of atmospheric-pressure plasma-enhanced spatial ALD of Al₂O₃ using infrared and optical emission spectroscopy,” *Journal of Vacuum Science & Technology A* **40**, 062407 (2022). [DOI](https://doi.org/10.1116/6.0002158), [기관 원문](https://pure.tue.nl/ws/portalfiles/portal/228946433/6.0002158.pdf).
9. S. E. Potts et al., “Low Temperature Plasma-Enhanced Atomic Layer Deposition of Metal Oxide Thin Films,” *Journal of The Electrochemical Society* **157**, P66–P74 (2010). [DOI](https://doi.org/10.1149/1.3428705), [기관 원문](https://pure.tue.nl/ws/portalfiles/portal/3361387/Metis238091.pdf).
10. E. Langereis, J. Keijmel, M. C. M. van de Sanden, and W. M. M. Kessels, “Surface chemistry of plasma-assisted atomic layer deposition of Al₂O₃ studied by infrared spectroscopy,” *Applied Physics Letters* **92**, 231904 (2008), Figs. 1–2. [DOI](https://doi.org/10.1063/1.2940598), [기관 원문](https://pure.tue.nl/ws/portalfiles/portal/3195880/Metis217577.pdf).
11. M. Napari et al., “Room-temperature plasma-enhanced atomic layer deposition of ZnO: Film growth dependence on the PEALD reactor configuration,” *Surface and Coatings Technology* **326**, 281–290 (2017). [DOI](https://doi.org/10.1016/j.surfcoat.2017.07.056), [기관 원문](https://jyx.jyu.fi/bitstreams/eb5f3384-3b1c-43a6-9fbc-3e24a7e059d8/download).
12. H. B. Profijt et al., “Ion and Photon Surface Interaction during Remote Plasma ALD of Metal Oxides,” *Journal of The Electrochemical Society* **158**, G88–G91 (2011). [기관 원문](https://pure.tue.nl/ws/portalfiles/portal/3307327/Metis249217.pdf).
13. J. Dendooven et al., “Conformality of Al₂O₃ and AlN Deposited by Plasma-Enhanced Atomic Layer Deposition,” *Journal of The Electrochemical Society* **157**, G111–G116 (2010). [DOI](https://doi.org/10.1149/1.3301664), [기관 서지](https://biblio.ugent.be/publication/977801).
14. P. Mpofu et al., “Surface chemistry in atomic layer deposition of AlN thin films from Al(CH₃)₃ and NH₃ studied by mass spectrometry,” *Journal of Materials Chemistry C* **12**, 12818–12824 (2024). [DOI](https://doi.org/10.1039/D4TC01867B).
15. M. L. van de Poll et al., “Excellent conformality of atmospheric-pressure plasma-enhanced spatial atomic layer deposition with subsecond plasma exposure times,” *Applied Physics Letters* **123**, 182902 (2023), Figs. 1–2, p. 182902-3. [DOI](https://doi.org/10.1063/5.0168768), [기관 원문](https://pure.tue.nl/ws/portalfiles/portal/312359139/182902_1_5.0168768.pdf), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
16. K. Arts et al., “Film Conformality and Extracted Recombination Probabilities of O Atoms during Plasma-Assisted Atomic Layer Deposition of SiO₂, TiO₂, Al₂O₃, and HfO₂,” *Journal of Physical Chemistry C* **123**, 27030–27035 (2019). [DOI](https://doi.org/10.1021/acs.jpcc.9b08176), [기관 원문](https://pure.tue.nl/ws/portalfiles/portal/140456293/acs.jpcc.9b08176.pdf).
