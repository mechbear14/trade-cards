import React from "react";
import ReactMarkdown from "react-markdown";

import "../BasePage.css";

const article = `
## How to play

In this activity, there are three types of cards:

- A blue card has a software application written on it
- A red card has a concept or terminology in computer science or business related to IT
- A white card has a software tool used to write computer programs

For each type of card, you can respond with any one of the three types and write corresponding type of content on it.
You just need to make sure the content on the card you respond with is related to that on the card you're given.

To find that related information, you must do some research, for example, on the Internet. We will discuss some of the tactics later.

There's no winning or losing in this activity (and thus I don't call it a game). The purpose of this activity is to get to know the world of programming by doing mini-research like this.

## Questions to ask when searching

If you're given a **blue card** (application):
- In what context is that application used?
- What problem is that application trying to solve?
- What are the challenges involved in building that application?
- If you're given a type of application, give a concrete example of that application.
- Are there any applications that are based on a similar idea/principle? What idea/principle is that? (Note though, you can respond with **one card only**.)

If you're given a **red card** (concept/terminology):
- What is the purpose of proposal of this concept/terminology?
- Which field does this concept/terminology belong to?
- What software libraries are available for implementing this concept?
- What are the applications that implement this concept?
- Does this concept inspire other concepts/principles?

If you're given a **white card** (library/framework):
- Go to its website and check its **documentation**, in particular the introduction and example sections (if there are any). Can you tell what this library does?
- What are the applications built with this library?
- What can you build with this library?
- Is this library used for a particular subject (for example, network programming)?
- What background knowledge is assumed in using this library?
- What principle is this library built upon? What is the recommended workflow?

## Conclusion
As you have probably discovered, you don't have to be registered in a season to do this. All you need is a bunch of such cards, and a group of friends who know a bit about programming, or who has done a scientific research before (for example, in a university). Again, the soul of this activity is the process of searching for information. Through this process, we hope you will discover something that you will want to work on in the future.

Happy searching!
`;

function HowToPlay(props){
  return (
    <div className="page article">
      <ReactMarkdown source={article} />
    </div>
  );
}

export default HowToPlay
