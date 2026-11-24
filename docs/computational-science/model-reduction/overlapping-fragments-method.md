---
description: 중첩된 fragment의 고유함수를 기저로 사용하여 전체 Kohn–Sham Hamiltonian을 축소하고 관심 에너지 영역의 전자상태를 계산하는 OFM의 원리와 검증 범위를 설명한다.
---

# Overlapping fragments method (OFM)

Overlapping fragments method (OFM)는 전체 시스템을 서로 중첩되는 작은 fragment로 나눈 후, 각 fragment의 고유함수를 새로운 기저로 선택하여 **이미 주어진 전체 시스템의 단일 입자 Hamiltonian을 작은 행렬로 표현하고 대각화하는 방법**이다. Vukmirović와 Wang의 2011년 연구에서는 charge patching method (CPM)로 전체 Kohn–Sham (KS) Hamiltonian을 구축하고 OFM으로 관심 전자상태를 계산하였다.[1,2]

핵심은 독립적인 fragment Hamiltonian을 이어 붙이는 것이 아니라, fragment 계산에서 얻은 **wavefunction을 기저 함수로 재사용**한다는 데 있다. 일반적인 투영 이론은 [Projection methods](projection-methods.md), 유사한 축소 기법은 [Mode-space reduction](mode-space-reduction.md)에 설명되어 있다.

## 1. 계산 대상과 전체 알고리즘

원래 기저의 차원을 $M$, 선택한 fragment 고유함수의 수를 $m$이라 하자. OFM의 세 단계는 다음과 같다.[1, Sec. II, Fig. 1, Eq. (2)]

| 단계 | 계산 내용 | 결과 |
| --- | --- | --- |
| (1) Fragment diagonalization | 각 fragment의 Hamiltonian을 대각화하고 필요한 고유함수를 선택 | 새 기저 $\{\phi_\alpha\}_{\alpha=1}^{m}$ |
| (2) Full Hamiltonian projection | 전체 KS operator의 행렬 원소와 새 기저의 overlap 계산 | 축소 행렬 $H_r,S_r$ |
| (3) Reduced diagonalization | 일반화 고유값 문제 계산 | 전체 시스템의 근사 고유값과 고유함수 |

$$
(H_r)_{\alpha\beta}=\langle\phi_\alpha|\hat H_{\rm full}|\phi_\beta\rangle,
\qquad
(S_r)_{\alpha\beta}=\langle\phi_\alpha|\phi_\beta\rangle,
$$

$$
H_r a_n=E_n S_r a_n,\qquad
|\widetilde\Psi_n\rangle=\sum_{\alpha=1}^{m}a_{\alpha n}|\phi_\alpha\rangle.
$$

여기서 $\alpha,\beta$는 fragment와 그 내부 orbital index를 함께 나타내며, $E_n$은 전체 Hamiltonian에 대한 Ritz value, $a_n$은 축소 기저의 계수이다. 임의의 계수 벡터 $c$에 대해 $c^\dagger S_r c=\|\sum_\alpha c_\alpha\phi_\alpha\|^2$이다. 따라서 기저가 선형독립이면 $S_r$는 양의 정부호이고 $a_n^\dagger S_r a_n=1$로 상태를 정규화한다.[1,7] $m<M$이면 전체 공간보다 작은 부분공간에서 해를 구한다.

**원 논문에서 전체 시스템의 self-consistent field (SCF) 반복은 수행하지 않았다.** CPM으로 만든 Hamiltonian을 고정하고 OFM을 적용하였다. 모든 occupied states를 충분히 재현하여 향후 SCF에 사용할 가능성은 별도로 언급하였다.[1, Secs. I, III.A, V] 따라서 OFM 자체와 CPM의 밀도 예측 성능은 구분하여 평가해야 한다.

## 2. Fragment orbital의 정의와 경계

### (1) 유한 fragment의 고유함수

Fragment $F$에서 얻은 고유함수 $\phi_{Fj}$는 별도로 최적화한 atomic orbital이나 Wannier function이 아니라 해당 fragment Hamiltonian $\hat H_F$의 고유상태이다.

$$
\hat H_F\phi_{Fj}=\epsilon_{Fj}\phi_{Fj}.
$$

원 연구는 fragment 전자밀도도 CPM으로 구성하고, periodic Poisson equation과 local density approximation (LDA)을 이용해 potential을 얻었다. ESCAN의 plane-wave 기반 preconditioned conjugate gradient 알고리즘으로 필요한 상태를 계산하였다.[1, Sec. II] 따라서 원 연구의 fragment diagonalization은 각 fragment의 독립적인 density functional theory (DFT) 자기일관 반복을 뜻하지 않는다.

### (2) Overlap과 hydrogen passivation

Alkane chain의 원래 결합을 가능한 한 잘 표현하도록 여러 크기의 fragment를 비교하였다. 절단된 결합은 hydrogen으로 passivation하였다.[1, Sec. III.A, Fig. 2]

| 분할 방식 | Fragment 분자 | 탄소 원자 $N$개인 사슬의 fragment 수 | Fragment당 점유 가전자 공간 궤도 수 |
| --- | --- | ---: | ---: |
| Monomer | CH$_4$ | $N$ | 4 |
| Dimer | C$_2$H$_6$ | $N-1$ | 7 |
| Trimer | C$_3$H$_8$ | $N-2$ | 10 |

예를 들어 5개 반복 단위의 사슬을 trimer로 나누면 $F_1=(1,2,3)$, $F_2=(2,3,4)$, $F_3=(3,4,5)$이다. 한 fragment에서 잘린 결합은 다른 fragment에 포함될 수 있다. 원 연구의 분할 예시는 [Fig. 2, 원문 p. 094119-4](https://www.osti.gov/servlets/purl/1564765#page=4)에서 확인할 수 있다.

OFM은 core–buffer 방식처럼 중앙부의 밀도만 남기지 않는다. 선택한 fragment wavefunction의 중첩 영역을 유지하고 그 내적을 계산한다. 중첩은 버리는 영역이 아니라 새 기저의 표현력을 높이기 위한 영역이다.[1, Secs. II, III.A]

### (3) Periodic boundary condition과 공간적 절단

원 논문은 유한 분자를 cuboid box에 배치하고 fragment의 Hartree potential을 periodic boundary condition (PBC)에서 계산하였다.[1, Sec. II] 주기적인 결정의 Bloch wavefunction을 임의의 위치에서 자른 것과는 다르다. 세부적인 vacuum thickness, 경계에서의 tapering 또는 다중 $k$-point 설정은 본문에서 확인되지 않았다.

**수학적 해석:** PBC에서 얻은 파동함수를 작은 box 밖에서 0으로 만드는 방식은 일반적으로 안전하지 않다. Smooth cutoff $w(\mathbf r)$를 적용한 경우에도

$$
\nabla^2(w\phi)=w\nabla^2\phi+2\nabla w\cdot\nabla\phi+\phi\nabla^2w
$$

이므로 kinetic energy에 경계 항이 발생한다. 유한 분자의 bound state가 진공에서 충분히 감쇠하는 조건은 이런 문제를 줄이는 데 유리하지만, 이것은 원 논문에서 cutoff 수렴성을 별도로 검증했다는 의미가 아니다. Metallic 또는 periodic solid fragment에 그대로 적용할 경우 경계 처리와 basis completeness를 별도로 검증해야 한다.

## 3. Full Hamiltonian과 fragment coupling

### (1) Full Hamiltonian operator의 구축

원 연구에서 전체 atomic structure와 CPM으로 얻은 전체 potential이 OFM의 입력이다. 개별 fragment의 고유값과 Hamiltonian만으로 전체 시스템의 coupling을 결정하지 않는다.[1, Sec. II; 2, Theory]

원 논문 Eq. (1)의 KS operator를 원자단위계로 쓰면

$$
\hat H_{\rm full}=-\frac12\nabla^2+\hat V_{\rm ion}+V_H[n_{\rm CPM}]+V_{\rm xc}[n_{\rm CPM}]
$$

이다. $n_{\rm CPM}$은 전체 시스템에 대해 조립한 전자 수 밀도, $V_H$는 Hartree potential, $V_{\rm xc}$는 exchange–correlation potential이다. $\hat V_{\rm ion}$ 표기에는 사용하는 pseudopotential의 비국소 항도 포함한다. 위 식은 고정된 밀도에서의 KS operator이며 SCF 수렴을 의미하지 않는다.

### (2) Hamiltonian–wavefunction product

원 논문 Sec. II는 coupling 계산에 사용하는 $H$가 fragment의 것이 아니라 전체 시스템의 KS Hamiltonian임을 명시한다. 실제 구현에서는 각 fragment를 처리하는 processor에 필요한 전체 potential의 real-space grid 값을 전달한 다음, ESCAN의 operator application으로

$$
|\zeta_\beta\rangle=\hat H_{\rm full}|\phi_\beta\rangle
$$

를 계산한다. 이후 서로 다른 fragment의 wavefunction과 $\zeta_\beta$를 사용해

$$
(H_r)_{\alpha\beta}=\langle\phi_\alpha|\zeta_\beta\rangle
$$

를 얻는다. 이 계산은 diagonal element와 off-diagonal element 모두에 적용된다.[1, Sec. II, Fig. 1]

따라서 kinetic energy를 fragment 계산에 다시 더하는 것이 아니다. 첫 번째 kinetic operator는 기저 함수를 구하는 eigenproblem에 들어 있고, 두 번째 operator application은 그 함수를 전체 Hamiltonian의 행렬 원소로 평가하는 계산이다.

국소 potential $\Delta v(\mathbf r)$의 행렬 원소는 정의상

$$
\Delta H_{\alpha\beta}=\int d\mathbf r\,
\phi_\alpha^*(\mathbf r)\Delta v(\mathbf r)\phi_\beta(\mathbf r)
$$

이다. Real-space 위치 표현에서 local potential이 diagonal operator라는 사실은 임의의 orbital 기저에서도 diagonal이라는 뜻이 아니다. 기저 함수가 중첩될 경우 off-diagonal 항이 일반적으로 생긴다. 원 연구도 환경의 electrostatic potential이 on-site energy와 hopping integral 모두에 반영된다는 점을 강조한다.[1, Sec. II 마지막 문단]

### (3) LCAO 표현과 행렬 차원

다음은 원 논문의 plane-wave 구현을 linear combination of atomic orbitals (LCAO)로 표현한 **수학적 재정식화**이다. 동일한 원래 atomic orbital (AO) 기저 $\{\chi_\mu\}_{\mu=1}^{M}$에서 fragment 함수들을 정확히 표현할 수 있다고 가정한다.

$$
|\phi_\alpha\rangle=\sum_{\mu=1}^{M}|\chi_\mu\rangle U_{\mu\alpha},
\qquad U\in\mathbb C^{M\times m}.
$$

전체 AO 행렬 $H_{\mu\nu}=\langle\chi_\mu|\hat H_{\rm full}|\chi_\nu\rangle$, $S_{\mu\nu}=\langle\chi_\mu|\chi_\nu\rangle$에 대해

$$
H_r=U^\dagger H U,\qquad S_r=U^\dagger S U.
$$

예를 들어 $M=12000$이고 $m=300$이면 원래 $12000\times12000$ eigenproblem 대신 $300\times300$ 문제를 푼다. 이는 설명을 위한 수치이며 논문의 계산 조건이 아니다. 선형독립인 변환 기저가 원래 AO 공간 전체를 span하면 동일한 operator에 대한 spectrum은 변하지 않는다. 실제 축소는 기저를 제한할 때 발생한다.

전체 operator의 정보는 여전히 필요하지만, 원래 큰 행렬을 명시적으로 만든 뒤 곱할 필요는 없다. 필요한 matrix elements를 직접 계산하는 원래 OFM의 구현과 blockwise AO projection은 이 점에서 구분된다. 단, fragment의 추가 passivating H에만 존재하는 AO는 원래 전체 AO 기저에 자동으로 대응하지 않는다. 이를 제거하거나 투영할 때 발생하는 기저 오차를 확인해야 한다.

### (4) 중첩 기저와 double counting

Fragment overlap은 Hamiltonian의 합산에 의한 double counting과 다르다. 예를 들어 한 원자당 AO 하나를 사용한다면 앞 절의 세 trimer 기저는

$$
U=\begin{pmatrix}
a_1&0&0\\
a_2&b_2&0\\
a_3&b_3&c_3\\
0&b_4&c_4\\
0&0&c_5
\end{pmatrix}
$$

로 표현할 수 있다. 세 번째 AO가 여러 열에 나타나지만, $\hat H_{\rm full}$은 하나뿐이다. 따라서 $H_{123}+H_{234}+H_{345}$처럼 fragment Hamiltonian을 합산하지 않는다.

두 함수가 각각 정규화되어 있고 완전히 같으면 그에 대한 overlap은

$$
S_r=\begin{pmatrix}1&1\\1&1\end{pmatrix}
$$

가 된다. 이 행렬의 rank는 1이므로 두 열은 물리적으로 독립된 기저 두 개가 아니다. 일반적인 수치 구현에서는 overlap의 작은 고유값과 선형종속성을 검사해야 한다. 중첩 기저를 직교화하는 방법은 [Projection methods](projection-methods.md)를 참고한다. 이 예제는 수학적 설명이며 원 연구의 별도 rank 제거 구현을 주장하지 않는다.

## 4. Reduced spectrum의 물리적 의미

### (1) HOMO에서 기원한 전자상태의 형성

Highest occupied molecular orbital (HOMO)은 각 fragment에서 정의한 하나의 분자 orbital이다. 각 fragment에서 HOMO를 하나씩 선택하면 fragment 수만큼의 후보 함수가 생긴다. 이들이 만드는 부분공간의 차원은 중첩 행렬의 rank와 같다.[1,7] 이것은 전체 시스템의 HOMO 하나를 여러 번 계산한다는 뜻이 아니다.

**설명용 모형:** 동일한 두 fragment의 HOMO energy가 $\epsilon_0$이고 서로 직교하며 coupling이 $t$이면

$$
H_r=\begin{pmatrix}\epsilon_0&t\\t^*&\epsilon_0\end{pmatrix},
\qquad E_\pm=\epsilon_0\pm|t|.
$$

결합 전의 두 degenerate state가 결합 후 서로 다른 에너지의 조합으로 분리된다. 동일한 기저를 가진 주기적 1D nearest-neighbor chain에서는

$$
E(k)=\epsilon_0+2t\cos(ka)
$$

가 성립한다. 여기서 $k$는 사슬 방향 파수, $a$는 반복 거리이고 $t$는 실수 hopping이다. 이러한 모형은 fragment HOMO가 여러 global states로 이루어진 valence manifold를 만들 수 있음을 보여준다. 실제 OFM의 fragment는 일반적으로 비직교이며, disorder가 존재하면 결합 전의 local eigenenergy도 서로 다르다. 모든 HOMO가 원래 정확히 degenerate하다고 가정해서는 안 된다.

### (2) Local energy profile과 LDOS

Local density of states (LDOS)는 에너지와 위치에 따라 전자상태의 공간 분포를 나타낸다. Spin 한 성분에 대해 축소 기저에서 복원한 정규화된 상태로부터 계산하면

$$
D_r(\mathbf r,E)=
\sum_n\left|\sum_\alpha a_{\alpha n}\phi_\alpha(\mathbf r)\right|^2
\delta(E-E_n)
$$

이다. $\delta$는 에너지에 대한 Dirac delta이고, 3D LDOS의 단위는 eV$^{-1}$ Å$^{-3}$이다. 수치 계산에서는 정규화된 broadening을 사용할 수 있다. 각 fragment의 LDOS를 단순히 합한 것이 아니며, 서로 다른 orbital의 cross term이 포함된다.[8,9]

전체 Hamiltonian에서 평가한 local on-site energy와 hopping이 각각 local energy 위치 및 상태의 분리·분포에 영향을 준다. 그러나 비직교 기저에서는 $H_{\alpha\alpha}$ 자체를 직교 tight-binding model의 on-site energy와 동일하게 해석하면 안 된다. 또한 LDOS의 spectral centroid, peak 및 band edge는 일반적으로 서로 다르므로 local HOMO profile과 LDOS의 band edge가 일치한다는 보장은 없다.

### (3) Basis selection과 occupation

HOMO만 선택하는 것은 OFM의 물리적 제약이 아니라 관심 spectral region을 표현하기 위한 수치적 truncation이다. 원 연구는 관심 영역에 따라 낮은 occupied states 또는 frontier occupied states를 선택하였다. 서로 가까운 fragment level을 함께 포함하고, 충분히 큰 level separation에서 자르는 경험적 기준을 제안하였다.[1, Sec. III.B, Figs. 4–6]

서로 다른 fragment의 isolated eigenenergy는 공통 에너지 기준이 없다면 직접 비교할 수 없다. 전체 operator에서 평가한 $\langle\phi_\alpha|\hat H_{\rm full}|\phi_\alpha\rangle$는 공통 기준의 expectation value이다. 다만 이 값만으로 필요한 subspace의 완전성을 보장하지 못한다.

부분공간 차원 $m$이 곧 원래 시스템의 전체 occupied state 수는 아니다. 원 논문은 일부 HOMO만 사용할 경우 전체 전자 수로 occupation을 결정하는 명확한 방법이 없음을 지적한다. Fragment HOMO의 전체 Hamiltonian expectation value보다 위에서 나타나는 첫 상태밀도(density of states, DOS) gap을 활용한 경험적 판별을 기술하였다.[1, Sec. III.B 마지막 문단] Gapless system이나 이종 접합의 일반적인 Fermi-level 결정 알고리즘으로 검증한 것은 아니다.

### (4) Periodic system의 k-point

원 연구의 benchmark는 disordered polymer supercell의 discrete eigenenergy이다. 다중 $k$-point band dispersion에 대한 검증은 제시하지 않았다. 따라서 원문이 crystalline bulk의 모든 $k$에서 성공했거나 명시적으로 특정 k-mesh를 사용했다고 단정하지 않는다.[1, Secs. III–IV]

**일반적인 주기 기저에 대한 수학적 확장:** Translation $\mathbf R$로 연결된 fragment basis와 cell 간 matrix elements $H_r(\mathbf R),S_r(\mathbf R)$가 주어진 경우에는

$$
H_r(\mathbf k)=\sum_{\mathbf R}e^{i\mathbf k\cdot\mathbf R}H_r(\mathbf R),
\qquad
S_r(\mathbf k)=\sum_{\mathbf R}e^{i\mathbf k\cdot\mathbf R}S_r(\mathbf R)
$$

를 구성하고 각 $\mathbf k$에서 일반화 고유값 문제를 풀 수 있다. 이 식은 일반적인 localized basis의 Bloch representation이며[10,11], 원 OFM 논문의 검증 결과는 아니다. 구체적인 convention은 [Wannier functions](wannierization.md)를 참고한다.

## 5. 원 논문의 계산 및 검증

### (1) Fragment 크기와 orbital 수

Alkane은 20개의 C$_{20}$H$_{42}$ 사슬로 구성된 1,240원자 시스템이다. 다음 표는 원 논문 Fig. 3에서 각 fragment의 모든 점유 궤도를 기저로 삼았을 때 보고한 고유값 오차이다. 기준값은 동일한 CPM Hamiltonian을 60 Ry cutoff의 plane-wave 기저에서 대각화하여 얻었다.[1, Sec. III.A]

| Fragment | Fragment당 선택 상태 수 | Valence bottom 부근의 오차 | Valence top 부근의 오차 |
| --- | ---: | ---: | ---: |
| Monomer | 4 | 200 meV 초과 | 약 1 eV |
| Dimer | 7 | 약 10 meV | 약 30 meV |
| Trimer | 10 | 1 meV 미만 | 10 meV 미만 |

같은 연구는 trimer의 최저에너지 궤도 하나를 사용했을 때 가전자대 하단에서 약 30 meV의 오차를 보고했다. Valence top에서는 최고 occupied states 다섯 개가 필요했으며, 상위 두 개에서 네 개만 포함했을 때 정확한 spectrum과의 대응이 어려웠다고 보고하였다.[1, Sec. III.B, Figs. 5–6] 따라서 단순히 orbital을 하나씩 늘리는 방법만으로 원하는 interior spectrum이 항상 개선되지는 않는다.

### (2) 행렬 차원과 energy accuracy

Poly(3-hexylthiophene) (P3HT)에서는 main chain의 thiophene trimer를 사용하였다. Fragment의 hexyl side chain은 propyl로 줄였지만, 전체 구조와 CPM Hamiltonian에서는 원래 side chain을 포함하였다.[1, Sec. IV]

| 계산 대상 | 전체 원자 수 | Fragment 수 | 선택 상태 수/fragment | OFM 차원 | 비교용 6-31G* 기저 차원 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Alkane | 1,240 | 360 | 5 | 1,800 | 7,680 |
| P3HT | 2,510 | 90 | 3 | 270 | 19,720 |

논문의 각 사슬에는 반복 단위가 20개이므로 중첩 trimer는 사슬당 18개이다. Alkane 사슬 20개에서는 $20\times18=360$개, P3HT 사슬 5개에서는 $5\times18=90$개이다.[1, Secs. III–IV] 각 행의 차원은 선택된 함수 수이며, 전체 occupied spectrum을 표현한다는 뜻이 아니다. 6-31G* 차원은 논문에서 제시한 기저 수 비교이며 동일한 정확도의 LCAO 계산 시간 benchmark가 아니다.[1, Sec. IV]

P3HT Fig. 10은 HOMO 하나를 사용했을 때 valence edge 부근 약 30 meV, edge에서 0.7 eV 떨어진 영역 약 120 meV의 eigenenergy 오차를 보고한다. 상위 세 상태를 사용했을 때 10–50 meV로 개선되었으나 네 상태에서는 악화되고, 그보다 많은 상태에서는 비물리적인 gap spectrum이 나타났다.[1, Sec. IV]

**비교 기준:** OFM 자체의 정확도 검증은 동일한 CPM Hamiltonian을 원래 plane-wave 기저에서 푼 결과와의 비교이다. 이를 self-consistent full DFT와 직접 비교하여 OFM과 CPM의 오차를 동시에 검증한 것으로 해석해서는 안 된다.

### (3) Fragment pair cutoff와 계산 시간

원 논문 Sec. III.C는 두 fragment에 속한 원자 사이의 최소 거리를 기준으로 pair를 선정한다. Alkane의 lowest valence states에 대한 Fig. 7에서는 5 Å cutoff에서 수렴을 확인하였다. 앞선 결과에는 7 Å를 사용하였다. 이 cutoff는 해당 시스템과 상태에 한정된다.[1]

Fragment 크기와 밀도를 고정하고, 각 fragment에서 $q$개의 orbital 및 유한한 거리 이내의 pair만 유지한다면, fragment 수 $N_F$에 대해 기저 생성 및 행렬 원소 계산은 대략 선형으로 증가한다. Pair 하나에 대해 최대 $q^2$개의 coupling이 필요하다. 마지막 dense generalized diagonalization의 차원은 $m=qN_F$이고 연산량은 $O(m^3)$이다.

원 논문은 조사한 크기에서는 앞 단계가 더 비싸다고 보고하였으며 마지막 단계에는 LAPACK 또는 ScaLAPACK을 사용하였다. Fig. 9에서 확인되는 cubic diagonalization과 앞 단계의 선형 증가를 구분해야 한다.[1, Secs. II, III.D] 전체 알고리즘이 임의의 시스템 크기에서 엄밀한 asymptotic $O(N)$이라는 주장은 아니다.

## 6. 응용 논문의 DOS와 공간 분포

동일 저자의 별도 2011년 P3HT 연구는 12,024원자 구조의 50개 realization을 대상으로 CPM과 OFM을 결합하였다. 각 thiophene trimer에서 HOMO 하나를 선택하였으며, 2,510원자 구조 10개에서 plane-wave eigenenergy와 비교하였다.[2, Theory, Fig. 1]

| 원문 그림 | 계산 또는 비교 대상 | 해석 범위 |
| --- | --- | --- |
| [Fig. 1 inset](https://www.scl.rs/papers/Vukmirovic_JPCB_2011.pdf#page=2) | OFM과 plane-wave eigenenergy | 고정 Hamiltonian의 spectral accuracy |
| [Fig. 2](https://www.scl.rs/papers/Vukmirovic_JPCB_2011.pdf#page=3) | DOS, coupling 변형 모형 | DOS와 hopping의 관계 |
| [Fig. 3](https://www.scl.rs/papers/Vukmirovic_JPCB_2011.pdf#page=4) | Energy-dependent localization length | 상태의 국소화 |
| [Fig. 4(a–e)](https://www.scl.rs/papers/Vukmirovic_JPCB_2011.pdf#page=4) | On-site profile, wavefunction 계수 분포 및 coupling 변형 | Electrostatic disorder의 역할 |

Fig. 4에서는 원래 비직교 HOMO 기저를 정규직교화한 후의 expansion coefficient를 사용한다. 원래 계수를 $a_n$, 대칭 직교화한 기저의 계수를 $d_n=S_r^{1/2}a_n$이라 하면[2,7] inverse participation ratio (IPR)에 기반한 localization measure는

$$
L_n=\frac{1}{\sum_m |d_{mn}|^4},
\qquad \sum_m|d_{mn}|^2=1
$$

이다. $L_n$은 site 수로 표현한 유효 참여 길이이며, 실제 연속 공간의 길이와 동일하지 않다. Band edge 근처의 hole states는 약 다섯 monomer에 걸쳐 국소화된다고 보고하였다. Fig. 4(a,b)에서 높은 on-site energy의 국소 최대 위치와 hole state의 국소화 위치가 대응하였다. 다른 사슬 간 coupling을 제거하거나 hopping을 일정하게 바꾼 결과를 비교하여 해당 무질서 P3HT의 localization에서 electrostatic fluctuation이 중요함을 논의하였다.[2, Results and Discussion, Figs. 3–4]

[2]의 756원자 보충 시험에서는 세 사슬에 반복 단위가 각각 열 개씩 있는 P3HT를 사용했다. 보충자료 Fig. 1은 CPM과 직접 DFT/LDA로 구성한 두 Hamiltonian의 상태밀도(DOS)를, Fig. 2는 사슬 위치별 on-site 행렬 원소를 비교한다. OFM의 고유값 오차는 본문 Fig. 1 삽도의 2,510원자 시험에서 평가한다. 본문 Fig. 4의 공간 분포는 직교화된 기저에서 계산한 상태별 분포로, 두 방법의 실공간 LDOS를 대조한 자료는 이들 그림에 없다. [보충자료, p. S2](https://doi.org/10.1021/jp1114527.s001)

## 7. 관련 방법과 적용 범위

| 방법 | 실제로 축소하거나 조립하는 대상 | 전체 operator 필요 여부 | 원래 목적 |
| --- | --- | --- | --- |
| CPM | Real-space density motifs | 출력으로 구축 | SCF 없이 근사 KS potential 생성 |
| OFM | 중첩 fragment eigenstate 기저 | 필요 | Global eigenproblem의 차원 축소 |
| Linear-scaling three-dimensional fragment method (LS3DF) | Fragment 밀도와 양자 에너지 항을 부호 가중치로 조합 | 공통 KS potential에 fragment별 표면 passivation 적용 | 조립한 밀도로 전체 정전기 항과 총에너지를 계산하고 SCF 수행 |
| Atomistic mode-space reduction | Reference system의 대표 mode subspace | 해당 원래 행렬 원소 필요 | 관심 energy window의 전자구조 및 수송 |

CPM, LS3DF, mode-space의 근거는 각각 [1,2,3], [4,12], [5,6]이다. OFM과 mode-space는 동일한 projection principle을 공유하지만, 원 논문에서 OFM은 유한 중첩 fragment의 eigenfunctions를, atomistic mode-space는 관심 band spectrum을 표현할 대표 부분공간을 활용한다. [Mode-space reduction](mode-space-reduction.md)을 참고한다.

**적용상의 해석:** OFM에서 전체 시스템의 eigenstates를 구하므로 원리적으로 공간 분포를 분석할 수 있다. 그러나 정확한 charge density와 charge transfer를 구하려면 충분한 occupied manifold와 occupation 정보가 필요하며, 전하 변화가 potential에 미치는 효과를 계산하려면 별도 self-consistency가 필요하다. 원 연구의 결과만으로 metallic junction, non-equilibrium state occupation, finite-bias transport, 다중 k-point band structure 또는 global charge equilibration이 검증되었다고 결론내릴 수 없다.

고정 Hamiltonian에서 OFM을 평가하는 경우에는 먼저 같은 Hamiltonian의 직접 해와 비교해야 한다. 관심 energy interval의 state 수, eigenvalue residual, overlap의 condition, degenerate subspace, spatial LDOS, basis 및 distance cutoff 수렴을 각각 검사하는 것이 합리적이다. 이는 추가 검증을 위한 제안이며 원 논문에서 모두 수행한 절차라는 의미는 아니다.

## 8. 요약

OFM에서 fragment 계산의 출력은 새로운 기저 함수이다. Global Hamiltonian은 별도로 필요하고, 중첩된 함수들 사이의 Hamiltonian 및 overlap matrix를 계산한 뒤 축소 고유값 문제를 푼다. 원 연구의 가속은 CPM의 potential 구축과 OFM의 basis reduction이라는 두 단계에서 발생하였다.

OFM은 fragment Hamiltonian patching이나 density assembly 자체가 아니다. 특정 energy manifold를 표현할 수 있다는 결과와 전체 occupied density, LDOS 또는 charge transfer까지 정확히 재현한다는 주장을 구별해야 한다.

## 9. 참고문헌

1. N. Vukmirović and L.-W. Wang, “Overlapping fragments method for electronic structure calculation of large systems,” *J. Chem. Phys.* **134**, 094119 (2011). [DOI](https://doi.org/10.1063/1.3560956), [저자 원문 공개본](https://arxiv.org/abs/1011.4764), [출판본 PDF](https://www.osti.gov/servlets/purl/1564765). Sec. II 및 Eq. (2): 구현; Sec. III.A–D 및 Figs. 2–9: fragment 선택과 scaling; Sec. IV 및 Fig. 10: P3HT.
2. N. Vukmirović and L.-W. Wang, “Density of States and Wave Function Localization in Disordered Conjugated Polymers: A Large Scale Computational Study,” *J. Phys. Chem. B* **115**, 1792–1797 (2011). [DOI](https://doi.org/10.1021/jp1114527), [PDF](https://www.scl.rs/papers/Vukmirovic_JPCB_2011.pdf). Theory 및 Figs. 1–4.
3. N. Vukmirović and L.-W. Wang, “Charge patching method for electronic structure of organic systems,” *J. Chem. Phys.* **128**, 121102 (2008). [DOI](https://doi.org/10.1063/1.2901965).
4. L.-W. Wang, Z. Zhao, and J. Meza, “Linear-scaling three-dimensional fragment method for large-scale electronic structure calculations,” *Phys. Rev. B* **77**, 165113 (2008). [DOI](https://doi.org/10.1103/PhysRevB.77.165113), Sec. II.
5. G. Mil'nikov, N. Mori, and Y. Kamakura, “Equivalent transport models in atomistic quantum wires,” *Phys. Rev. B* **85**, 035317 (2012). [DOI](https://doi.org/10.1103/PhysRevB.85.035317).
6. F. Ducry, M. H. Bani-Hashemian, and M. Luisier, “Hybrid Mode-Space–Real-Space Approximation for First-Principles Quantum Transport Simulation of Inhomogeneous Devices,” *Phys. Rev. Applied* **13**, 044067 (2020). [DOI](https://doi.org/10.1103/PhysRevApplied.13.044067).
7. Z. Bai, J. Demmel, J. Dongarra, A. Ruhe, and H. van der Vorst, eds., *Templates for the Solution of Algebraic Eigenvalue Problems: A Practical Guide* (SIAM, 2000). [양의 정부호 중첩 행렬과 직교화, §5.7.1](https://www.netlib.org/utk/people/JackDongarra/etemplates/node178.html).
8. Synopsys, *QuantumATK Manual*, “LocalDensityOfStates.” [Notes](https://docs.quantumatk.com/manual/Types/LocalDensityOfStates/LocalDensityOfStates.html).
9. WEST developers, *WEST 6.2.1 Documentation*, “Intro Tutorial 4: Plotting Density of States and Local Density of States.” [LDOS의 평면 적분](https://west-code.org/doc/West/v6.2.1/tutorials/basic/basic_004.html).
10. K. Koepernik, O. Janson, Y. Sun, and J. van den Brink, “Symmetry-conserving maximally projected Wannier functions,” *Phys. Rev. B* **107**, 235135 (2023). [Preprint, Eqs. (1)–(3)](https://arxiv.org/pdf/2111.09652).
11. J. Kuneš, “Wannier Functions and Construction of Model Hamiltonians,” in *The LDA+DMFT approach to strongly correlated materials* (2011). [Chapter 4, Eqs. (5)–(6)](https://www.cond-mat.de/events/correl11/manuscripts/kunes.pdf).
12. Y.-J. Yan et al., “10-Million Atoms Simulation of First-Principle Package LS3DF,” *Journal of Computer Science and Technology* (2024). [Secs. 2.1–2.2](https://jcst.ict.ac.cn/fileup/1000-9000/PDF/JCST-2024-1-4-3011-45.pdf).
