import backgroundImage from '../assets/pics/dark-background.png';

type StackPageProps = {
  isDarkMode: boolean;
  onClose: () => void;
};

const stackItems = [
  {
    title: 'Frontend',
    description:
      'JavaScript, TypeScript, React,Tailwind CSS, Vite, Next.js, Vite, MapLibre and responsive layouts',
  },
  {
    title: 'Backend',
    description:
      'Node.js, Express.js, Supabase, REST APIs, PostgreSQL, Python, Java, PHP, MySQL, MongoDB, and OAuth',
  },
  {
    title: 'DevOps',
    description:
      'Docker, CI/CD pipelines, GitHub Actions, Vercel, and Netlify',
  },
  {
    title: 'AI & Learning Machine',
    description:
      'OpenAI, Anthropic, Codex.',
  },
  {
    title: 'Developer Tools',
    description:
      'Git, GitHub, VS Code, JIRA, and ClickUp.',
  },
];

export default function StackPage({ isDarkMode, onClose }: StackPageProps) {
  return (
    <section
      className={`relative min-h-screen w-full overflow-hidden font-instrument select-none transition-colors duration-300 ${
        isDarkMode ? 'bg-black text-white' : 'bg-[#F2F2F2] text-black'
      }`}
    >
      <img
        src={backgroundImage}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-300 animate-background-pan ${
          isDarkMode ? 'opacity-45' : 'opacity-35 invert'
        }`}
      />
      <div
        className={`absolute inset-0 ${
          isDarkMode ? 'bg-black/60' : 'bg-white/60'
        }`}
      />

      <div className="relative z-10 h-screen px-8 py-8 md:px-16 md:py-12">
        <div className="absolute left-12 top-12 origin-top-left scale-[0.5] md:left-24">
          <div className="flex flex-col items-start">
            <p className="text-5xl leading-none tracking-tight md:text-6xl lg:text-[5.5rem]">
              AIKEEN KATE
            </p>
            <p className="ml-28 text-5xl leading-none tracking-tight md:ml-40 md:text-6xl lg:text-[5.5rem]">
              PORTFOLIO
            </p>
          </div>
        </div>

        <div className="pt-28 md:ml-[34vw] md:pt-2">
          <div className="flex items-center gap-5">
            <span className="text-sm leading-none md:text-base">D</span>
            <h1 className="text-4xl leading-none tracking-tight md:text-6xl lg:text-7xl">
              STACK
            </h1>
          </div>
          <div
            className={`mt-3 h-px w-screen ${
              isDarkMode ? 'bg-white/70' : 'bg-black/70'
            }`}
          />
        </div>

        <div className="absolute inset-x-8 bottom-0 top-53 overflow-y-auto pb-24 pr-2 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:left-[40vw] md:right-16 md:top-36 md:pb-32">
          <div className="grid gap-y-14 pt-16 md:grid-cols-[180px_minmax(320px,560px)] md:gap-x-24 md:gap-y-20 md:pt-24">
            {stackItems.map((item) => (
              <div key={item.title} className="grid gap-4 md:contents">
                <h2 className="text-xl font-thin leading-none md:text-2xl">
                  {item.title}
                </h2>
                <p
                  className={`max-w-xl text-lg font-thin leading-relaxed md:text-xl ${
                    isDarkMode ? 'text-white/85' : 'text-black/75'
                  }`}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className={`absolute bottom-32 left-12 z-20 origin-bottom-left -rotate-90 cursor-pointer tracking-widest text-sm transition-colors md:left-24 md:text-base ${
          isDarkMode ? 'hover:text-gray-400' : 'hover:text-[#D0D0D0]'
        }`}
      >
        CLOSE
      </button>
    </section>
  );
}
