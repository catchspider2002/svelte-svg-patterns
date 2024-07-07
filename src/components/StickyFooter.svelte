<script>
  let links = [
    {
      prefix:
        "Boost your profile picture on Tinder, LinkedIn, Twitter, Instagram or elsewhere with ",
      title: "photoAI.me",
      suffix: "",
      link: "https://app.photoai.me/?via=naveen-cs",
    },
    {
      prefix: "Save money and use AI to redesign your interior with ",
      title: "InteriorAI.com",
      suffix: " from your laptop or phone",
      link: "https://interiorai.com?via=naveen-cs",
    },
    {
      prefix:
        "Professional business headshots, without a physical photo shoot - ",
      title: "HeadshotPro.com",
      suffix: "",
      link: "https://www.headshotpro.com?via=naveen-cs",
    },
    {
      prefix: "Chat with any PDF with ",
      title: "PDF.ai",
      suffix: " - ask questions, get summaries, find information, and more",
      link: "https://pdf.ai?via=naveen-cs",
    },
    {
      prefix: "Write 100 high quality tweets with ",
      title: "TweetHunter.io",
      suffix: " in less than 1 hour",
      link: "https://tweethunter.io/?via=naveen-cs",
    },
  ];

  let link = links[Math.floor(Math.random() * links.length)];
</script>

<div class="bottomSticky">
  <div>
    {link.prefix}
    <a
      href={link.link}
      rel="noopener noreferrer"
      target="_blank"
      title={link.title}
      >{link.title}
    </a>
    {link.suffix}
  </div>
</div>
