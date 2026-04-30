import React, { useState, useEffect, useRef } from 'react';
import { GitBranch, Mail, Menu, X, ArrowUpRight } from 'lucide-react';

// ─── 데이터 ───────────────────────────────────────────────────────
const PROFILE = {
  name: '이영준',
  nameEn: 'Lee Youngjun',
  role: '데이터 분석 · 엔지니어링',
  email: 'lyj82890@gmail.com',
  github: 'https://github.com/junny311',
  intro: [
    '데이터 공학적 사고를 기반으로 비즈니스의 효율과 성과를 개선하는 것을 목표로 합니다. 방대한 데이터 속에서 고객의 숨겨진 니즈와 시장 트렌드를 구조화하여, 상품 기획과 마케팅 전략으로 연결하는 데 강점을 가지고 있습니다.',
    'Python 기반 머신러닝·통계 분석 역량과 분산 데이터 파이프라인 설계 경험을 바탕으로, 데이터가 생성·활용되는 전 과정에 대한 엔지니어링 관점을 갖추고 있습니다.',
  ],
};

const CREDENTIALS = [
  { title: 'SQLD',        sub: 'SQL 개발자 자격증',  detail: '한국데이터베이스진흥센터 · 2024.09' },
  { title: 'ADsP',        sub: '데이터분석 준전문가', detail: '한국데이터베이스진흥원 · 2025.03' },
  { title: '운전면허 2종', sub: '2종 보통',            detail: '경찰청' },
];

const SKILLS = [
  {
    label: '분석 · 모델링',
    items: ['Python', 'R', 'SQL', 'Pandas / NumPy', 'Scikit-learn', 'TensorFlow / Keras', 'statsmodels'],
  },
  {
    label: '데이터 엔지니어링',
    items: ['Hadoop HDFS', 'Scrapy / 크롤링', 'Flask', 'FastAPI'],
  },
  {
    label: '시각화',
    items: ['Looker Studio', 'Chart.js', 'React.js'],
  },
  {
    label: '협업 · 도구',
    items: ['Git / GitHub', 'Notion'],
  },
];

const PROJECTS = [
  {
    id: 1,
    num: '01',
    tag: 'Capstone Design',
    title: '부경대학교 탄소발자국 대시보드',
    description: 'IPCC 가이드라인 기반 캠퍼스 온실가스 배출량 정량 산정 및 웹 시각화 시스템.',
    problem: '탄소 배출 데이터가 산발적으로 관리돼 구성원이 직관적으로 현황을 파악할 수 없었고 공식 모니터링 시스템이 부재했습니다.',
    solution: 'IPCC Tier 1 기준으로 전력·차량·폐기물·물·녹지 5개 배출원을 수집·정제하고, Flask REST API + Chart.js + Leaflet.js GIS 히트맵으로 대시보드 구현. SARIMA로 2025년 전력 사용량 예측(약 23,607,322 kWh).',
    result: '2024년 부경대 탄소배출량 10,960.67 tCO₂/년 산정. MACC 분석으로 조명 센서(118,654 원/tCO₂)가 최우선 감축 수단 도출. 타 기관 확장 가능한 범용 구조 설계.',
    techStack: ['Python', 'Flask', 'Pandas', 'SARIMA', 'Chart.js', 'Leaflet.js', 'Tailwind CSS'],
    period: '2025.03 – 06',
    github: 'https://github.com/junny311/carbon-dashboard',
  },
  {
    id: 2,
    num: '02',
    tag: '금융빅데이터',
    title: '다변량 시계열 VKOSPI 예측',
    description: '20년치 금융 데이터(KOSPI200·환율·VIX)로 한국 공포지수 단기 예측 모형을 비교 분석.',
    problem: '다변량 시계열 간 상호작용을 단일 모형으로 포착하기 어렵고, 딥러닝(LSTM)이 전통 시계열 대비 금융 변동성 예측에 우위인지 검증이 필요했습니다.',
    solution: 'ADF 단위근·Johansen 공적분 검정으로 데이터 특성 확인 후, VAR·VECM·LSTM 세 모형에 Expanding Window 방식 1-step Rolling Forecast를 동일 조건에서 적용 및 비교.',
    result: 'VAR RMSE 1.40 · VECM 1.41 · LSTM 1.50 — 전통 시계열이 단기 예측에서 우수함을 입증. VKOSPI↔VIX 선형 동조화(상관 0.83)가 핵심 원인으로 분석됨.',
    techStack: ['Python', 'statsmodels', 'TensorFlow/Keras', 'Pandas', 'VAR', 'VECM', 'LSTM'],
    period: '2025.09 – 12',
    github: 'https://github.com/junny311/finance',
  },
  {
    id: 3,
    num: '03',
    tag: '빅데이터 파이프라인',
    title: '분산 클러스터 기반 실시간 가상자산 분석',
    description: 'Raspberry Pi 클러스터 직접 구축 후 FinBERT 감성 분석 + 시세 지표 통합 투자 인사이트 시스템.',
    problem: '실시간 가상자산 데이터를 단일 서버로 처리하면 병목이 발생하고, 뉴스 감성과 RSI·MACD 시세 지표를 통합 분석하는 도구가 없었습니다.',
    solution: 'Raspberry Pi 2-Tier(Master 1 + Worker 3) 직접 구축. Scrapy로 5개 플랫폼 실시간 수집, Hadoop HDFS + MapReduce 중복 제거 파이프라인. FinBERT 감성 지수·RSI·MACD 결합 후 FastAPI + React 대시보드 + PyQt5 관리 GUI 개발.',
    result: '저전력·고가용성 분산 환경에서 실시간 수집·처리 파이프라인 완성. 금융 도메인 특화 감성 분석과 시세 지표의 통합 인사이트 시스템 구현.',
    techStack: ['Python', 'Hadoop HDFS', 'Scrapy', 'FinBERT', 'FastAPI', 'React', 'PyQt5', 'Raspberry Pi'],
    period: '2025.09 – 12',
    github: 'https://github.com/junny311/hadoop-',
  },
];

const NAV = [
  { id: 'about',    label: '소개' },
  { id: 'skills',   label: '기술' },
  { id: 'projects', label: '프로젝트' },
  { id: 'contact',  label: '연락처' },
];

// ─── FadeIn ──────────────────────────────────────────────────────
function FadeIn({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref}
      className={`transition-all duration-600 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased selection:bg-blue-100">

      {/* ── Nav ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100' : 'bg-transparent'}`}>
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#" className="text-base font-semibold tracking-tight text-gray-900">
            이영준
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV.map(({ id, label }) => (
              <a key={id} href={`#${id}`}
                className="text-base text-gray-500 hover:text-gray-900 transition-colors">
                {label}
              </a>
            ))}
          </div>
          <button className="md:hidden p-1 text-gray-600" onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
            {NAV.map(({ id, label }) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}
                className="text-base text-gray-700 hover:text-gray-900">{label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-14">
        <div className="max-w-5xl mx-auto w-full py-24">
          <p className="text-lg text-blue-600 font-medium mb-6 tracking-wide">
            {PROFILE.role}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-[1.05] mb-8">
            {PROFILE.name}
            <span className="block text-gray-300">{PROFILE.nameEn}</span>
          </h1>
          <p className="text-gray-500 text-xl max-w-xl leading-relaxed mb-10">
            {PROFILE.intro[0]}
          </p>
          <div className="flex items-center gap-6">
            <a href="#projects"
              className="text-lg font-medium text-gray-900 underline underline-offset-4 hover:text-blue-600 transition-colors">
              프로젝트 보기
            </a>
            <span className="text-gray-200">|</span>
            <a href={`mailto:${PROFILE.email}`}
              className="text-lg font-medium text-gray-500 hover:text-gray-900 transition-colors">
              {PROFILE.email}
            </a>
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section className="py-10 px-6 border-t border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-8">
          <span className="text-xl font-bold text-gray-900">부경대학교</span>
          <span className="text-lg text-gray-500">시스템경영공학부 기술데이터공학과</span>
          <span className="text-base text-gray-400 sm:ml-auto">2024.03 – 2026.08 졸업예정 · GPA 3.33 / 4.5</span>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
              {/* 왼쪽: 레이블 + 이력 */}
              <div>
                <p className="text-base font-semibold text-gray-400 uppercase tracking-widest mb-8">About</p>
                <div className="space-y-6">
                  {CREDENTIALS.map((c) => (
                    <div key={c.title} className="border-b border-gray-100 pb-6 last:border-none last:pb-0">
                      <div className="text-lg font-semibold text-gray-900">{c.title}</div>
                      <div className="text-base text-gray-500 mt-1">{c.sub}</div>
                      <div className="text-sm text-gray-400 mt-0.5">{c.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 오른쪽: 소개 */}
              <div className="pt-10">
                {PROFILE.intro.map((t, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed text-lg mb-6 last:mb-0">{t}</p>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="py-24 px-6 border-t border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-base font-semibold text-gray-400 uppercase tracking-widest mb-12">Skills</p>
            <div className="grid md:grid-cols-4 gap-10">
              {SKILLS.map((group, i) => (
                <FadeIn key={group.label} delay={i * 80}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-5">{group.label}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map(skill => (
                      <span key={skill}
                        className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-24 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-base font-semibold text-gray-400 uppercase tracking-widest mb-12">Projects</p>
          </FadeIn>

          <div className="divide-y divide-gray-100">
            {PROJECTS.map((project, i) => (
              <FadeIn key={project.id} delay={i * 60}>
                <div className="py-12 grid md:grid-cols-[120px_1fr] gap-6 md:gap-12 group">
                  {/* 번호 + 기간 */}
                  <div className="pt-0.5">
                    <div className="text-4xl font-bold text-gray-100 leading-none mb-3">{project.num}</div>
                    <div className="text-base text-gray-400">{project.period}</div>
                    <div className="inline-block mt-3 px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded">
                      {project.tag}
                    </div>
                  </div>

                  {/* 내용 */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-lg mb-7 leading-relaxed">{project.description}</p>

                    <div className="space-y-4 mb-7">
                      {[
                        { label: 'Problem', text: project.problem },
                        { label: 'Solution', text: project.solution },
                        { label: 'Result', text: project.result },
                      ].map(row => (
                        <div key={row.label} className="flex gap-5">
                          <span className="shrink-0 w-16 text-sm font-semibold text-gray-400 uppercase tracking-wider pt-0.5">
                            {row.label}
                          </span>
                          <p className={`text-base leading-relaxed ${row.label === 'Result' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                            {row.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {project.techStack.map(tech => (
                        <span key={tech}
                          className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded">
                          {tech}
                        </span>
                      ))}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="ml-auto flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:border-gray-900 hover:text-gray-900 hover:bg-gray-50 transition-all">
                          <GitBranch size={15} /> GitHub <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 px-6 border-t border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-base font-semibold text-gray-400 uppercase tracking-widest mb-8">Contact</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5">
              함께 일해보고 싶으신가요?
            </h2>
            <p className="text-gray-500 text-lg mb-10 max-w-lg leading-relaxed">
              새로운 도전을 즐기며, 데이터로 가치를 만들어낼 수 있는 팀을 찾고 있습니다.
              커피챗이나 프로젝트 협업 제안은 언제든 환영합니다.
            </p>
            <div className="flex flex-wrap gap-6">
              <a href={`mailto:${PROFILE.email}`}
                className="flex items-center gap-2 text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">
                <Mail size={18} /> {PROFILE.email}
              </a>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-lg font-medium text-gray-500 hover:text-gray-900 transition-colors">
                <GitBranch size={18} /> GitHub
                <ArrowUpRight size={15} className="text-gray-400" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-6 px-6">
        <div className="max-w-5xl mx-auto">
          <span className="text-base text-gray-400">
            © {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </div>
  );
}
