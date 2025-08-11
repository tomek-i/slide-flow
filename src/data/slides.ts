import type { Slide } from "@/lib/types";

export const initialSlides: Slide[] = [
    {
      id: "1754871819870",
      type: "intro",
      profile: {
        name: "Tom (Tomek) Iwainski",
        title: "Senior Software Engineer",
        company: "SSW",
        bio: "Full-stack engineer passionate about building scalable systems and mentoring junior devs.",
        techStack: ["TypeScript", "Node.js", "C# .NET", "Python", "etc."],
        socials: {
          github: "https://github.com/tomek-i",
          linkedin: "https://www.linkedin.com/in/tomek-iw/",
          website: "https://tomek.au",
        },
      },
    },
    {
      id: "1",
      title: "From Idea to Prototype",
      content: "Turning concepts into reality — the smart way",
      type: "content",
    },
    {
      id: "1754614954077",
      title: "Why Prototype?",
      content:
        "* Validate ideas _before_ investing time & money\n* Communicate vision to team/investors\n* Learn what works (and what doesn’t)\n* Fail fast → improve fast",
      type: "content",
    },
    {
      id: "2",
      title: "The Firebase Studio Approach",
      content:
        "1. **Prompt** – Describe your app idea in natural language\n2. **Blueprint** – Auto-generated app structure & screens\n3. **AI Assistant** – Adjust logic, connect to data\n4. **Code View** – Fine-tune if you’re technical\n5. **Preview & Test** – Click around, collect feedback",
      type: "content",
    },
    {
      id: "3",
      title: "The Core Workflow",
      content:
        "* **Build → Test → Adjust → Repeat**\n* Quick cycles: hours, not weeks\n* Goal: Reach a usable **MVP** fast, not perfection",
      type: "content",
    },
    {
      id: "4",
      title: "Planning Your MVP",
      content:
        "Ask yourself:\n\n* What is the **core problem** I’m solving?\n* What is the **minimum** set of features to prove it works?\n* How will I **measure success**?\n---\n\n\n*  **Rule**: Stick to the plan.\n*  **Avoid**: Adding “just one more feature” endlessly.",
      type: "content",
    },
    {
      id: "5",
      title: "The Rabbit Hole",
      content:
        "* Endless improvements (“gold plating”) slow you down\n* Shiny UI ≠ valuable product\n* User feedback is more important than perfect code in this stage",
      type: "content",
    },
    {
      id: "6",
      title: "Do’s & Don’ts of Prototypes",
      content:
        "✅ Do\n* Keep it simple and focused\n* Use it to test ideas, not ship to production\n* Throw away bad ideas quickly\n* Document what worked and what didn’t\n\n❌ Don’t\n* Use prototype code as your production base\n* Skip planning (“just building” wastes time)\n* Over-engineer early\n* Ignore feedback",
      type: "content",
    },
    {
      id: "1754615436848",
      title: "Why Not Use Prototype Code for Production?",
      content:
        "* AI-generated / rapid code is often:\n     - Messy, unoptimized\n     - Missing security best practices\n     - Hard to maintain\n* Use it as reference, then rebuild cleanly for production",
      type: "content",
    },
    {
      id: "1754615504753",
      title: "From Prototype to Real App",
      content:
        "1. **Validate** the idea works (users care)\n2. **Rebuild** with clean architecture & proper security\n3. **Test** across devices & scenarios\n4. **Launch** gradually with a beta program",
      type: "content",
    },
    {
      id: "1754615547001",
      title: "",
      content: "_A prototype is a sketch, not the house._\n\n_Use it to learn, then build the real thing right._",
      type: "content",
    },
    { id: "1754615769042", title: "Thank You!", content: "", type: "content" },
    { id: "1754615785254", title: "Questions?", content: "", type: "content" },
    {
      id: "1754626539395",
      title: "Wait… is this Inception?",
      content:
        "I used AI to prototype an idea…\n\nThe idea was an app… that makes presentations…\n\nAnd I’m using that app… to give this presentation.",
      type: "content",
    },
  ];