import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

import logoAsset from "@/assets/raizes-logo-tr.png";
import nookAsset from "@/assets/biblioteca-nook.png";
import eraReacaoImg from "@/assets/era-reacao.png";
import acervoImg from "@/assets/acervo.png";
import comunidadeImg from "@/assets/comunidade.png";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Raízes — um lugar para parar, refletir e pensar" },
      {
        name: "description",
        content:
          "Apresentação do projeto Raízes: um espaço de pausa, leitura e reflexão dentro da igreja. A biblioteca é a estrutura que torna isso possível.",
      },
      {
        property: "og:title",
        content: "Raízes — um lugar para parar, refletir e pensar",
      },
      {
        property: "og:description",
        content:
          "Em um mundo que nos convida a reagir, queremos criar um lugar para parar, ler, refletir e pensar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------------------------------- utils --------------------------------- */

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", visible && "is-visible", className)}
    >
      {children}
    </div>
  );
}

function Overline({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "font-body text-[11px] font-semibold uppercase tracking-[0.35em] text-gold",
        className,
      )}
    >
      {children}
    </p>
  );
}

function Section({
  index,
  eyebrow,
  title,
  intro,
  children,
  wide,
  bordered,
}: {
  index: string;
  eyebrow: string;
  title?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  wide?: boolean;
  bordered?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative mx-auto w-full px-6 py-24 sm:py-32",
        wide ? "max-w-6xl" : "max-w-5xl",
        bordered && "border-t border-line",
      )}
    >
      <Reveal>
        <div className="flex items-center gap-5">
          <span className="font-display text-sm text-gold-deep">{index}</span>
          <span className="h-px w-10 bg-line-strong" />
          <Overline>{eyebrow}</Overline>
        </div>
      </Reveal>
      {title ? (
        <Reveal delay={100}>
          <h2 className="mt-8 max-w-3xl font-display text-4xl font-medium leading-tight text-cream sm:text-5xl">
            {title}
          </h2>
        </Reveal>
      ) : null}
      {intro ? (
        <Reveal delay={180}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream-muted sm:text-lg">
            {intro}
          </p>
        </Reveal>
      ) : null}
      <div className="mt-14">{children}</div>
    </section>
  );
}

function FlowRow({
  label,
  steps,
  highlight,
}: {
  label: string;
  steps: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-6 sm:p-8",
        highlight ? "border-line-strong bg-surface/70" : "border-line/60 bg-transparent",
      )}
    >
      <p
        className={cn(
          "text-[11px] font-semibold uppercase tracking-[0.3em]",
          highlight ? "text-gold" : "text-faint",
        )}
      >
        {label}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
        {steps.map((step, i) => (
          <span key={step} className="flex items-center gap-3">
            {i > 0 && <span className="text-gold-deep" aria-hidden>→</span>}
            <span
              className={cn(
                "font-display text-xl sm:text-2xl",
                highlight ? "text-cream" : "text-faint",
              )}
            >
              {step}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

const pillars = [
  {
    numeral: "I",
    title: "Cristianismo e fé",
    items: ["Bíblia", "Teologia", "História do Cristianismo", "Apologética", "Espiritualidade", "Discipulado"],
  },
  {
    numeral: "II",
    title: "Filosofia e pensamento",
    items: ["Filosofia", "Ética", "Filosofia cristã", "História das ideias", "Ciência e religião", "Cultura"],
  },
  {
    numeral: "III",
    title: "Literatura",
    items: ["Clássicos e contemporâneos", "C. S. Lewis", "Tolstói", "Dostoiévski", "Tolkien", "e a conversa continua"],
  },
  {
    numeral: "IV",
    title: "Desenvolvimento pessoal",
    items: ["Disciplina", "Hábitos", "Relacionamentos", "Liderança", "Maturidade", "Propósito"],
  },
];

const ministries = [
  { name: "Ministério de Jovens", role: "Indicação de livros e clube de leitura." },
  { name: "Pequenos grupos", role: "Leituras ligadas aos temas estudados." },
  { name: "Ministério Infantil", role: "Acervo infantil e incentivo à leitura." },
  { name: "Liderança", role: "Trilhas de formação." },
  { name: "Famílias", role: "Livros sobre educação, casamento e relacionamentos." },
];

const formationItems = [
  "Acompanhar uma ideia",
  "Compreender diferentes perspectivas",
  "Questionar aquilo que pensamos",
  "Desenvolver vocabulário e argumentação",
  "Interpretar melhor o mundo",
  "Lidar com ideias diferentes das nossas",
  "Desenvolver concentração",
  "Formular respostas em vez de apenas reagir",
];

const cultureItems = [
  "Líderes recomendam livros",
  "Jovens conversam sobre livros",
  "Famílias leem juntas",
  "Pequenos grupos leem junto",
  "Pessoas trocam recomendações",
  "Membros descobrem novos autores",
  "Visitantes encontram um espaço acolhedor",
];

const manifestoChain = [
  "A leitura desenvolve a atenção.",
  "A atenção possibilita a reflexão.",
  "A reflexão desenvolve o pensamento.",
  "O pensamento amadurece as convicções.",
  "E convicções maduras produzem pessoas mais conscientes de como vivem, creem e agem.",
];

/* ---------------------------------- page ---------------------------------- */

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink font-body text-cream">
      {/* -------------------------------- hero ------------------------------- */}
      <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
        <div className="aura-hero pointer-events-none absolute inset-0" aria-hidden />
        <Reveal>
          <Overline>Uma proposta para a liderança da igreja</Overline>
        </Reveal>
        <Reveal delay={150}>
          <img
            src={logoAsset.url}
            alt="Raízes — águia, livro aberto e raízes douradas"
            width={512}
            height={512}
            className="mx-auto mt-10 w-[min(72vw,400px)]"
          />
        </Reveal>
        <Reveal delay={320}>
          <p className="pull-quote mx-auto mt-12 max-w-2xl text-3xl text-cream sm:text-4xl md:text-[2.75rem]">
            Em um mundo que nos convida a reagir, um lugar para <em>parar, refletir e pensar</em>.
          </p>
        </Reveal>
        <Reveal delay={480}>
          <div className="mt-16 flex flex-col items-center gap-4">
            <span className="text-[11px] uppercase tracking-[0.3em] text-faint">
              Conheça a proposta
            </span>
            <span className="scroll-line" aria-hidden />
          </div>
        </Reveal>
      </header>

      {/* ----------------------------- 01 · o problema ------------------------ */}
      <Section index="01" eyebrow="O problema" title="O mundo está lendo menos">
        <div className="grid gap-12 sm:grid-cols-2">
          <Reveal>
            <div className="border-l-2 border-line-strong pl-6">
              <p className="stat-value text-6xl md:text-7xl">11,3 milhões</p>
              <p className="mt-4 max-w-xs leading-relaxed text-cream-muted">
                leitores a menos no Brasil entre 2015 e 2024.
              </p>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="border-l-2 border-line-strong pl-6">
              <p className="stat-value text-6xl md:text-7xl">Maioria</p>
              <p className="mt-4 max-w-xs leading-relaxed text-cream-muted">
                em 2024, pela primeira vez na série histórica, os não leitores se tornaram maioria.
              </p>
            </div>
          </Reveal>
        </div>
        <p className="mt-8 text-xs tracking-wide text-faint">
          Fonte: Retratos da Leitura no Brasil — Instituto Pró-Livro (2024).
        </p>

        <Reveal>
          <blockquote className="pull-quote mt-16 max-w-3xl text-2xl text-cream sm:text-3xl">
            Mas o problema não é simplesmente “as pessoas estão lendo menos livros”. O que acontece
            com uma sociedade quando as pessoas têm cada vez menos contato com leitura, reflexão e
            diferentes ideias?
          </blockquote>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-8 font-display text-xl italic text-gold sm:text-2xl">
            É essa pergunta que torna o projeto muito maior do que uma biblioteca.
          </p>
        </Reveal>
      </Section>

      {/* --------------------------- 02 · era da reação ----------------------- */}
      <Section index="02" eyebrow="O diagnóstico" title="Vivemos na era da reação">
        <Reveal>
          <img
            src={eraReacaoImg}
            alt="Um celular brilhando no escuro, ao lado de uma luminária acesa sobre um livro aberto"
            width={1152}
            height={768}
            loading="lazy"
            className="w-full rounded-lg border border-line"
          />
        </Reveal>
        <Reveal>
          <p className="mt-10 max-w-2xl leading-relaxed text-cream-muted">
            Somos constantemente estimulados a consumir, opinar e passar para o próximo conteúdo. As
            redes não são o problema — o desafio é encontrar espaços onde possamos fazer o movimento
            contrário.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5">
          <Reveal>
            <FlowRow
              label="O mundo nos convida a"
              steps={["Ver", "Reagir", "Compartilhar", "Próximo conteúdo"]}
            />
          </Reveal>
          <Reveal delay={140}>
            <FlowRow
              label="Queremos criar espaço para"
              steps={["Parar", "Ler", "Compreender", "Refletir", "Formular"]}
              highlight
            />
          </Reveal>
        </div>
        <Reveal>
          <blockquote className="pull-quote mt-16 max-w-3xl text-2xl text-cream sm:text-3xl">
            “Em um mundo que nos convida a reagir, queremos criar um lugar para{" "}
            <em>parar, refletir e pensar</em>.”
          </blockquote>
        </Reveal>
      </Section>

      {/* -------------------------- 03 · valor da leitura --------------------- */}
      <Section
        index="03"
        eyebrow="A convicção"
        title="A leitura como ferramenta de formação"
        intro="A leitura não serve apenas para adquirir conhecimento. Ela nos ensina a:"
      >
        <ul className="grid gap-x-12 gap-y-5 sm:grid-cols-2">
          {formationItems.map((item, i) => (
            <Reveal key={item} delay={i * 60}>
              <li className="flex items-baseline gap-4">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden />
                <span className="text-lg text-cream-muted">{item}</span>
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal>
          <blockquote className="pull-quote mt-16 border-l-2 border-gold pl-8 text-3xl text-gold-bright sm:text-4xl">
            Não queremos apenas formar leitores. Queremos formar pessoas que pensam.
          </blockquote>
        </Reveal>
      </Section>

      {/* ------------------------- 04 · por que a igreja ---------------------- */}
      <Section index="04" eyebrow="A ponte" title="Por que a igreja deveria se importar?">
        <Reveal>
          <p className="max-w-2xl text-lg leading-relaxed text-cream-muted">
            A igreja não é apenas um lugar de culto. Ela também é um espaço de{" "}
            <span className="text-cream">formação de pessoas</span>. Se queremos pessoas capazes de
            compreender sua fé, dialogar com a cultura, educar seus filhos, liderar, servir e
            participar da sociedade, precisamos também incentivar o desenvolvimento intelectual.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-center">
            <span className="font-display text-4xl text-gold sm:text-5xl">Espiritual</span>
            <span className="text-gold-deep" aria-hidden>·</span>
            <span className="font-display text-4xl text-gold sm:text-5xl">Intelectual</span>
            <span className="text-gold-deep" aria-hidden>·</span>
            <span className="font-display text-4xl text-gold sm:text-5xl">Humana</span>
          </div>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-10 text-center text-sm uppercase tracking-[0.25em] text-faint">
            A leitura como ferramenta de formação nas três dimensões
          </p>
        </Reveal>
      </Section>

      {/* ----------------------------- 05 · a proposta ------------------------ */}
      <Section
        index="05"
        eyebrow="A proposta"
        title="Nossa resposta: criar um lugar de pausa"
        bordered
      >
        <Reveal>
          <blockquote className="pull-quote max-w-3xl text-2xl text-cream sm:text-3xl">
            Não dizemos “vamos criar uma biblioteca”. Dizemos: queremos criar{" "}
            <em>um espaço de pausa, leitura e reflexão dentro da igreja</em>. A biblioteca é a
            estrutura que torna isso possível.
          </blockquote>
        </Reveal>
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <img
              src={nookAsset.url}
              alt="Poltrona vermelha, luminária e estante de livros em iluminação quente"
              width={1152}
              height={768}
              loading="lazy"
              className="w-full rounded-lg border border-line"
            />
          </Reveal>
          <Reveal delay={140}>
            <p className="mb-8 text-sm uppercase tracking-[0.25em] text-faint">
              A experiência é tão importante quanto o acervo
            </p>
            <ul className="space-y-5">
              {[
                "Escolher um livro",
                "Tomar um café",
                "Sentar em uma poltrona",
                "Dedicar tempo a uma ideia",
                "Conversar sobre aquilo que leu",
              ].map((item) => (
                <li key={item} className="flex items-baseline gap-4">
                  <span className="h-px w-6 shrink-0 bg-gold" aria-hidden />
                  <span className="font-display text-2xl text-cream">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* --------------------------- 06 · convidar ---------------------------- */}
      <Section index="06" eyebrow="O público" title="Um espaço que atraia quem ainda não lê">
        <Reveal>
          <blockquote className="pull-quote mx-auto max-w-4xl text-center text-3xl text-gold-bright sm:text-4xl md:text-[2.6rem]">
            “Um leitor procura um livro. <em>Um não leitor precisa ser convidado a descobri-lo</em>.”
          </blockquote>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-12 max-w-2xl text-center leading-relaxed text-cream-muted">
            Não podemos construir um projeto pensando apenas em quem já ama livros. O nosso público
            mais importante pode ser justamente quem ainda não lê. Queremos tornar a leitura
            desejável antes mesmo de torná-la um hábito.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {[
            "O espaço precisa ser bonito.",
            "As capas precisam chamar atenção.",
            "As estantes precisam despertar curiosidade.",
            "O ambiente precisa convidar a pessoa a entrar.",
          ].map((item, i) => (
            <Reveal key={item} delay={i * 90}>
              <div className="rounded-lg border border-line bg-surface/40 p-6 text-center font-display text-xl text-cream">
                {item}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ----------------------------- 07 · o acervo -------------------------- */}
      <Section index="07" eyebrow="A curadoria" title="Um acervo que faça as pessoas quererem ler">
        <Reveal>
          <img
            src={acervoImg}
            alt="Estante de madeira com livros em vinho, dourado e creme, luminária acesa"
            width={1152}
            height={768}
            loading="lazy"
            className="w-full rounded-lg border border-line"
          />
        </Reveal>
        <Reveal>
          <p className="mt-10 max-w-2xl leading-relaxed text-cream-muted">
            Não queremos simplesmente reunir “livros cristãos”. Queremos construir um acervo que
            amplie horizontes.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 100}>
              <div className="h-full rounded-lg border border-line bg-surface/40 p-8">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-lg text-gold-deep">{pillar.numeral}</span>
                  <h3 className="font-display text-2xl text-gold-bright">{pillar.title}</h3>
                </div>
                <p className="mt-5 leading-relaxed text-cream-muted">
                  {pillar.items.map((item, j) => (
                    <span key={item}>
                      {j > 0 && <span className="text-gold-deep" aria-hidden> · </span>}
                      {item}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-12 rounded-lg border border-line-strong bg-surface/60 p-8 text-center">
            <p className="pull-quote text-2xl text-cream sm:text-3xl">
              Menos “10 passos para mudar sua vida”.{" "}
              <em>Mais formação para compreender e transformar a própria vida.</em>
            </p>
          </div>
        </Reveal>
      </Section>

      {/* --------------------------- 08 · ministérios ------------------------- */}
      <Section
        index="08"
        eyebrow="A integração"
        title="A biblioteca não ficará isolada"
        intro="O projeto não será responsabilidade de uma única equipe. Queremos fazer parcerias com os ministérios da igreja."
      >
        <div>
          {ministries.map((ministry, i) => (
            <Reveal key={ministry.name} delay={i * 70}>
              <div className="grid items-baseline gap-2 border-t border-line py-6 sm:grid-cols-[1fr_1.2fr] sm:gap-8">
                <h3 className="font-display text-2xl text-gold sm:text-3xl">{ministry.name}</h3>
                <p className="flex items-baseline gap-3 text-cream-muted">
                  <span className="text-gold-deep" aria-hidden>→</span>
                  {ministry.role}
                </p>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </div>
        <Reveal>
          <blockquote className="pull-quote mt-16 text-center text-2xl text-cream sm:text-3xl">
            O objetivo é <em>fazer o livro circular pela igreja</em>.
          </blockquote>
        </Reveal>
      </Section>

      {/* --------------------------- 09 · a cultura --------------------------- */}
      <Section index="09" eyebrow="O grande sonho" title="Mais do que uma biblioteca: uma cultura">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <img
              src={comunidadeImg}
              alt="Pessoas conversando em poltronas ao redor de uma mesa com livros e café"
              width={1152}
              height={768}
              loading="lazy"
              className="w-full rounded-lg border border-line"
            />
          </Reveal>
          <div>
            <Reveal delay={120}>
              <p className="leading-relaxed text-cream-muted">
                Não queremos apenas criar <span className="text-faint">uma sala + estantes +
                livros</span>. Queremos criar{" "}
                <span className="text-gold-bright">uma cultura de leitura dentro da igreja</span>.
              </p>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {cultureItems.map((item, i) => (
                <Reveal key={item} delay={i * 60}>
                  <li className="flex items-baseline gap-4">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden />
                    <span className="text-cream-muted">{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* --------------------------- 10 · o impacto --------------------------- */}
      <Section index="10" eyebrow="O impacto" title="O que queremos formar?">
        <Reveal>
          <p className="max-w-2xl leading-relaxed text-cream-muted">
            O resultado do projeto não será medido pelo número de livros, nem pelo número de
            empréstimos. O que queremos produzir é:
          </p>
        </Reveal>
        <div className="mt-12 space-y-3">
          {[
            "Pessoas que leem.",
            "Pessoas que pensam.",
            "Pessoas que refletem.",
            "Pessoas que conseguem formular ideias.",
            "Pessoas que conhecem sua fé com maior profundidade.",
            "Pessoas que conseguem dialogar com o mundo ao seu redor.",
          ].map((line, i) => (
            <Reveal key={line} delay={i * 80}>
              <p
                className={cn(
                  "font-display text-3xl sm:text-4xl",
                  i === 5 ? "text-gold-bright" : "text-cream",
                )}
              >
                {line}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------ manifesto ----------------------------- */}
      <section className="relative mx-auto w-full max-w-4xl px-6 pb-8 pt-24 text-center sm:pt-32">
        <div className="aura-soft pointer-events-none absolute inset-0" aria-hidden />
        <Reveal>
          <Overline className="justify-center">Por que este projeto?</Overline>
        </Reveal>
        <div className="relative mt-12 space-y-3">
          {manifestoChain.map((line, i) => (
            <Reveal key={line} delay={i * 90}>
              <p
                className={cn(
                  "font-display leading-snug",
                  i === manifestoChain.length - 1
                    ? "text-xl text-cream-muted sm:text-2xl"
                    : "text-2xl text-cream sm:text-3xl",
                )}
              >
                {line}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="mt-16">
            <div className="gilded-rule mx-auto max-w-xs" />
            <blockquote className="pull-quote mt-12 text-3xl text-gold-bright sm:text-4xl md:text-[2.6rem]">
              Em um mundo que nos convida a reagir, queremos criar um lugar para{" "}
              <em>parar, ler, refletir e pensar</em>.
            </blockquote>
            <p className="mt-10 text-sm uppercase tracking-[0.3em] text-faint">
              Manifesto do projeto Raízes
            </p>
          </div>
        </Reveal>
        <Reveal delay={320}>
          <p className="mx-auto mt-16 max-w-xl font-display text-xl italic leading-relaxed text-cream-muted">
            Queremos uma igreja que não apenas responda ao mundo, mas que também seja capaz de
            compreendê-lo, dialogar com ele e formar pessoas para transformá-lo.
          </p>
        </Reveal>
      </section>

      {/* ------------------------------- footer ------------------------------- */}
      <footer className="mt-16 border-t border-line px-6 py-14">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <img
            src={logoAsset.url}
            alt="Raízes"
            width={128}
            height={128}
            loading="lazy"
            className="w-16"
          />
          <p className="text-xs uppercase tracking-[0.3em] text-faint">
            Raízes · Um projeto de pausa, leitura e reflexão
          </p>
        </div>
      </footer>
    </main>
  );
}
