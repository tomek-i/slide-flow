
export type ContentSlide = {
  id: string;
  type: 'content';
  title: string;
  content: string;
};

export type Profile = {
  name: string;
  title: string;
  company: string;
  bio: string;
  techStack: string[];
  socials: {
    github: string;
    linkedin: string;
    website: string;
  };
  location: string;
  funFact: string;
};

export type IntroSlide = {
  id: string;
  type: 'intro';
  profile: Profile;
};

export type Slide = ContentSlide | IntroSlide;
