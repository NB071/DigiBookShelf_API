/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { v4 } = require("uuid");
const path = require("node:path");
require("dotenv").config();

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("book").where({ is_NYT_best_seller: 0 }).del();
  await knex("book").insert([
    {
      id: v4(),
      name: "At Walton Hall",
      description:
        "Some fiction book based on the life of a farmer who decided to abandon his farm and start a new life in a city",
      genre: "Fiction",
      total_pages: 553,
      author: "Nima Bargestan",
      is_NYT_best_seller: 0,
      // Please change the IP address to match your localhost or private IP address.
      cover_image: `${process.env.SERVER_URL}/bookCovers/bookCover_Seed-walton.jpg`,
      purchase_link: "#",
    },
    {
      id: v4(),
      name: "Mastering Blockchain: A deep dive into distributed ledgers, consensus protocols, smart contracts, DApps, cryptocurrencies, Ethereum, and more, 3rd Edition",
      description:
        "Blockchain is the backbone of cryptocurrencies, with applications in finance, government, media, and other industries. With a legacy of providing \
      technologists with executable insights, this new edition of Mastering Blockchain is thoroughly revised and updated to the latest blockchain research with four\
       new chapters on consensus algorithms, Serenity (the update that will introduce Ethereum 2.0), tokenization, and enterprise blockchains. \
      This book covers the basics, including blockchain's technical underpinnings, cryptography and consensus protocols. It also provides you with expert knowledge on \
      decentralization, decentralized application development on Ethereum, Bitcoin, alternative coins, smart contracts, alternative blockchains, and Hyperledger. \
      Further, you will explore blockchain solutions beyond cryptocurrencies such as the Internet of Things with blockchain, enterprise blockchains, tokenization\
      using blockchain, and consider the future scope of this fascinating and disruptive technology. By the end of this book, you will have gained a thorough comprehension\
      of the various facets of blockchain and understand their potential in diverse real-world scenarios.",
      genre: "Computers",
      total_pages: 816,
      author: "Imran Bashir",
      is_NYT_best_seller: 0,
      // Please change the IP address to match your localhost or private IP address.
      cover_image: `${process.env.SERVER_URL}/bookCovers/bookCover_Seed-mastering-blockchain.jpg`,
      purchase_link:
        "https://www.amazon.ca/Mastering-Blockchain-distributed-consensus-cryptocurrencies/dp/1839213191",
    },
    {
      id: v4(),
      name: "12 Rules for Life: An Antidote to Chaos",
      description:
        "Humorous, surprising and informative, Dr. Peterson tells us why skateboarding boys and girls must be left alone, what terrible fate awaits those who\
       criticize too easily, and why you should always pet a cat when you meet one on the street. What does the nervous system of the lowly lobster have to tell us about \
       standing up straight (with our shoulders back) and about success in life? Why did ancient Egyptians worship the capacity to pay careful attention as the highest of\
        gods? What dreadful paths do people tread when they become resentful, arrogant and vengeful? Dr. Peterson journeys broadly, discussing discipline, freedom, adventure\
         and responsibility, distilling the world's wisdom into 12 practical and profound rules for life. The 12 Most Valuable Things Everyone Should Know shatters the modern \
         commonplaces of science, faith and human nature, while transforming and ennobling the mind and spirit of its readers.",
      genre: "Self-help",
      total_pages: 448,
      author: "Jordan B. Peterson",
      is_NYT_best_seller: 0,
      // Please change the IP address to match your localhost or private IP address.
      cover_image: `${process.env.SERVER_URL}/bookCovers/bookCover_Seed-12rules.jpg`,
      purchase_link:
        "https://www.amazon.ca/12-Rules-Life-Antidote-Chaos/dp/0345816021",
    },
    {
      id: v4(),
      name: "Rich Dad Poor Dad: What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not!",
      description:
        "It's been nearly 25 years since Robert Kiyosaki’s Rich Dad Poor Dad first made waves in the Personal Finance arena. It has since become the #1 Personal Finance\
       book of all time... translated into dozens of languages and sold around the world. Rich Dad Poor Dad is Robert's story of growing up with two dads — his real father and the\
        father of his best friend, his rich dad — and the ways in which both men shaped his thoughts about money and investing. The book explodes the myth that you need to earn a \
        high income to be rich and explains the difference between working for money and having your money work for you.",
      genre: "Business",
      total_pages: 336,
      author: "Robert T. Kiyosaki",
      is_NYT_best_seller: 0,
      // Please change the IP address to match your localhost or private IP address.
      cover_image: `${process.env.SERVER_URL}/bookCovers/bookCover_Seed-RichPoorDad.jpg`,
      purchase_link:
        "https://www.amazon.ca/Rich-Dad-Poor-Teach-Middle/dp/1612680194/ref=pd_bxgy_sccl_2/131-6268127-3218305?pd_rd_w=1tIaf&content-id=amzn1.sym.93ae3f3f-3555-4971-a952-df8053b1d375&pf_rd_p=93ae3f3f-3555-4971-a952-df8053b1d375&pf_rd_r=NHGX3ZJX56DVR1AGYWNS&pd_rd_wg=FoiB3&pd_rd_r=0a6360f2-b22d-4f1a-add8-3a44b477919a&pd_rd_i=1612680194&psc=1",
    },
    {
      id: v4(),
      name: "The 48 Laws of Power",
      description:
        "In the book that People magazine proclaimed “beguiling” and “fascinating,” Robert Greene and Joost Elffers have distilled three thousand years of the history of\
       power into 48 essential laws by drawing from the philosophies of Machiavelli, Sun Tzu, and Carl Von Clausewitz and also from the lives of figures ranging from Henry Kissinger to P.T. Barnum.\n\
       Some laws teach the need for prudence (“Law 1: Never Outshine the Master”), others teach the value of confidence (“Law 28: Enter Action with Boldness”), and many recommend absolute self-preserva\
       tion (“Law 15: Crush Your Enemy Totally”). Every law, though, has one thing in common: an interest in total domination. In a bold and arresting two-color package, The 48 Laws of Power is ideal whether\
        your aim is conquest, self-defense, or simply to understand the rules of the game.",
      genre: "Self-help",
      total_pages: 496,
      author: "Robert Greene",
      is_NYT_best_seller: 0,
      // Please change the IP address to match your localhost or private IP address.
      cover_image: `${process.env.SERVER_URL}/bookCovers/bookCover_Seed-rules-power.jpg`,
      purchase_link:
        "https://www.amazon.ca/48-Laws-Power-Robert-Greene/dp/0140280197/ref=pd_bxgy_sccl_1/131-6268127-3218305?pd_rd_w=aqonD&content-id=amzn1.sym.93ae3f3f-3555-4971-a952-df8053b1d375&pf_rd_p=93ae3f3f-3555-4971-a952-df8053b1d375&pf_rd_r=BX6SPKGGPHDV61333W8G&pd_rd_wg=u77Bp&pd_rd_r=12a302f6-63da-4246-9250-f7228eaf476a&pd_rd_i=0140280197&psc=1",
    },
    {
      id: v4(),
      name: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      description:
        "o matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will \
        teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you. The \
        problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change. You do not rise to the level of your goals.\
         You fall to the level of your systems. Here, you'll get a proven system that can take you to new heights. Clear is known for his ability to distill complex topics into simple behaviors that can be easily\
          applied to daily life and work. Here, he draws on the most proven ideas from biology, psychology, and neuroscience to create an easy-to-understand guide for making good habits inevitable and bad habits\
           impossible. Along the way, readers will be inspired and entertained with true stories from Olympic gold medalists, award-winning artists, business leaders, life-saving physicians, and star comedians\
            who have used the science of small habits to master their craft and vault to the top of their field.",
      genre: "Self-help",
      total_pages: 320,
      author: "James Clear",
      is_NYT_best_seller: 0,
      // Please change the IP address to match your localhost or private IP address.
      cover_image: `${process.env.SERVER_URL}/bookCovers/bookCover_Seed-Atomic-habit.jpg`,
      purchase_link:
        "https://www.amazon.ca/Atomic-Habits-Proven-Build-Break/dp/0735211299/ref=pd_bxgy_sccl_2/131-6268127-3218305?pd_rd_w=aqonD&content-id=amzn1.sym.93ae3f3f-3555-4971-a952-df8053b1d375&pf_rd_p=93ae3f3f-3555-4971-a952-df8053b1d375&pf_rd_r=BX6SPKGGPHDV61333W8G&pd_rd_wg=u77Bp&pd_rd_r=12a302f6-63da-4246-9250-f7228eaf476a&pd_rd_i=0735211299&psc=1",
    },
    {
      id: v4(),
      name: "Refactoring: Improving the Design of Existing Code",
      description:
        "Refactoring improves the design of existing code and enhances software maintainability, as well as making existing code easier to understand. Original Agile Manifesto signer and software development \
        thought leader, Martin Fowler, provides a catalog of refactorings that explains why you should refactor; how to recognize code that needs refactoring; and how to actually do it successfully, no matter\
         what language you use.",
      genre: "Computers",
      total_pages: 448,
      author: "Martin Fowler ",
      is_NYT_best_seller: 0,
      // Please change the IP address to match your localhost or private IP address.
      cover_image: `${process.env.SERVER_URL}/bookCovers/bookCover_Seed-Refactoring.jpg`,
      purchase_link:
        "https://www.amazon.ca/Refactoring-Improving-Design-Existing-Code/dp/0134757599/ref=pd_rhf_d_ee_s_pd_sbs_rvi_sccl_1_8/131-6268127-3218305?pd_rd_w=PoKDH&content-id=amzn1.sym.c4b12d63-26ee-451b-a00e-167063525dc5&pf_rd_p=c4b12d63-26ee-451b-a00e-167063525dc5&pf_rd_r=G8Z5TZFXY0ZZBMB7CD63&pd_rd_wg=gVyuh&pd_rd_r=694d53c3-c53a-4348-8655-27d7bced9b6c&pd_rd_i=0134757599&psc=1",
    },
    {
      id: v4(),
      name: "The Psychology of Money: Timeless lessons on wealth, greed, and happiness",
      description:
        "Doing well with money isn’t necessarily about what you know. It’s about how you behave. And behavior is hard to teach, even to really smart people.\n\
        Money―investing, personal finance, and business decisions―is typically taught as a math-based field, where data and formulas tell us exactly what to do.\
         But in the real world people don’t make financial decisions on a spreadsheet. They make them at the dinner table, or in a meeting room, where personal history,\
          your own unique view of the world, ego, pride, marketing, and odd incentives are scrambled together. In The Psychology of Money, award-winning author Morgan Housel\
           shares 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life’s most important topics.",
      genre: "Business",
      total_pages: 256,
      author: "Morgan Housel",
      is_NYT_best_seller: 0,
      // Please change the IP address to match your localhost or private IP address.
      cover_image: `${process.env.SERVER_URL}/bookCovers/bookCover_Seed-PsychMoney.jpg`,
      purchase_link:
        "https://www.amazon.ca/Psychology-Money-Timeless-lessons-happiness/dp/0857197681/ref=pd_bxgy_img_sccl_2/131-6268127-3218305?pd_rd_w=S168y&content-id=amzn1.sym.93ae3f3f-3555-4971-a952-df8053b1d375&pf_rd_p=93ae3f3f-3555-4971-a952-df8053b1d375&pf_rd_r=M7SE139ECKJSFK1Z8Z72&pd_rd_wg=mP0Uk&pd_rd_r=e4a62572-4e27-47f5-833d-54a9a29b5b47&pd_rd_i=0857197681&psc=1",
    },
    {
      id: v4(),
      name: "Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems",
      description:
        "Data is at the center of many challenges in system design today. Difficult issues need to be figured out, such as scalability, consistency, reliability, efficiency, and maintainability.\
         In addition, we have an overwhelming variety of tools, including relational databases, NoSQL datastores, stream or batch processors, and message brokers. What are the right choices for \
         your application? How do you make sense of all these buzzwords? \n\
        In this practical and comprehensive guide, author Martin Kleppmann helps you navigate this diverse landscape by examining the pros and cons of various technologies for processing and storing data.\
         Software keeps changing, but the fundamental principles remain the same. With this book, software engineers and architects will learn how to apply those ideas in practice, and how to make full use of data in modern applications.",
      genre: "Computers",
      total_pages: 611,
      author: "Martin Kleppmann",
      is_NYT_best_seller: 0,
      // Please change the IP address to match your localhost or private IP address.
      cover_image: `${process.env.SERVER_URL}/bookCovers/bookCover_Seed-DesignData-Intensive-app.jpg`,
      purchase_link:
        "https://www.amazon.ca/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321/ref=pd_bxgy_img_sccl_2/131-6268127-3218305?pd_rd_w=M97QF&content-id=amzn1.sym.93ae3f3f-3555-4971-a952-df8053b1d375&pf_rd_p=93ae3f3f-3555-4971-a952-df8053b1d375&pf_rd_r=M7Y9KH04A98JWX8520HQ&pd_rd_wg=AD3k7&pd_rd_r=c77b60b3-15aa-4a50-ab75-089ad2c943bb&pd_rd_i=1449373321&psc=1",
    },
    {
      id: v4(),
      name: "Pragmatic Programmer, The: Your journey to mastery, 20th Anniversary Edition",
      description:
        "The Pragmatic Programmer is one of those rare tech books you’ll read, re-read, and read again over the years. Whether you’re new to the field or an experienced practitioner, you’ll come away with fresh\
         insights each and every time. Dave Thomas and Andy Hunt wrote the first edition of this influential book in 1999 to help their clients create better software and rediscover the joy of coding. \
         These lessons have helped a generation of programmers examine the very essence of software development, independent of any particular language, framework, or methodology, and the Pragmatic\
          philosophy has spawned hundreds of books, screencasts, and audio books, as well as thousands of careers and success stories.",
      genre: "Computers",
      total_pages: 352,
      author: "David Thomas",
      is_NYT_best_seller: 0,
      // Please change the IP address to match your localhost or private IP address.
      cover_image: `${process.env.SERVER_URL}/bookCovers/bookCover_Seed-pragmatic.jpg`,
      purchase_link:
        "https://www.amazon.ca/Pragmatic-Programmer-journey-mastery-Anniversary/dp/0135957052/ref=pd_bxgy_img_sccl_1/131-6268127-3218305?pd_rd_w=pIQ1R&content-id=amzn1.sym.93ae3f3f-3555-4971-a952-df8053b1d375&pf_rd_p=93ae3f3f-3555-4971-a952-df8053b1d375&pf_rd_r=NYW0W46X8HW08ZQKXE4N&pd_rd_wg=uFYB1&pd_rd_r=2815ff4f-7af6-4ccc-b140-3b33312ccc80&pd_rd_i=0135957052&psc=1",
    },
    {
      id: v4(),
      name: "Clean Code: A Handbook of Agile Software Craftsmanship",
      description:
        "Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code.\
         But it doesn’t have to be that way. Noted software expert Robert C. Martin presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship. Martin has teamed up with his \
         olleagues from Object Mentor to distill their best agile practice of cleaning code “on the fly” into a book that will instill within you the values of a software craftsman and make you a better programmer—but only if you work at it.",
      genre: "Computers",
      total_pages: 464,
      author: " Robert Martin",
      is_NYT_best_seller: 0,
      // Please change the IP address to match your localhost or private IP address.
      cover_image: `${process.env.SERVER_URL}/bookCovers/bookCover_Seed-CleanCode.jpg`,
      purchase_link:
        "https://www.amazon.ca/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882/ref=pd_bxgy_img_sccl_1/131-6268127-3218305?pd_rd_w=1BJPe&content-id=amzn1.sym.93ae3f3f-3555-4971-a952-df8053b1d375&pf_rd_p=93ae3f3f-3555-4971-a952-df8053b1d375&pf_rd_r=MJ80CF5Z4F6880PDDTJE&pd_rd_wg=INofb&pd_rd_r=6feb9c4f-8408-431f-8739-06cfe54e56c5&pd_rd_i=0132350882&psc=1",
    },
    {
      id: v4(),
      name: "Cracking the Coding Interview: 189 Programming Questions and Solutions",
      description:
        "I am not a recruiter. I am a software engineer. And as such, I know what it's like to be asked to whip up brilliant algorithms on the spot and then write flawless code on a whiteboard. I've been through this as a candidate and as an interviewer.\n\
        Cracking the Coding Interview, 6th Edition is here to help you through this process, teaching you what you need to know and enabling you to perform at your very best. I've coached and interviewed hundreds of software engineers. The result is this book.\n\
        Learn how to uncover the hints and hidden details in a question, discover how to break down a problem into manageable chunks, develop techniques to unstick yourself when stuck, learn (or re-learn) core computer science concepts, and practice on 189 interview questions and solutions.",
      genre: "Computers",
      total_pages: 706,
      author: "Gayle Laakmann McDowell",
      is_NYT_best_seller: 0,
      // Please change the IP address to match your localhost or private IP address.
      cover_image: `${process.env.SERVER_URL}/bookCovers/bookCover_Seed-Cracking-Code-Interview.jpg`,
      purchase_link:
        "https://www.amazon.ca/Cracking-Coding-Interview-Programming-Questions/dp/0984782850/ref=sr_1_1?crid=19HMEXPII0U4M&keywords=cracking+the+coding+interview&qid=1684375298&s=books&sprefix=coding+inter%2Cstripbooks%2C388&sr=1-1",
    },
    {
      id: v4(),
      name: "Essentialism: The Disciplined Pursuit of Less",
      description:
        "Essentialism is more than a time-management strategy or a productivity technique. It is a systematic discipline for discerning what is absolutely essential, then eliminating everything that is not, so we can make the highest possible contribution toward the things that really matter.\n\
        By forcing us to apply more selective criteria for what is Essential, the disciplined pursuit of less empowers us to reclaim control of our own choices about where to spend our precious time and energy—instead of giving others the implicit permission to choose for us.\n\
        Essentialism is not one more thing—it’s a whole new way of doing everything. It’s about doing less, but better, in every area of our lives. Essentialism is a movement whose time has come.",
      genre: "Self-help",
      total_pages: 288,
      author: "Greg McKeown ",
      is_NYT_best_seller: 0,
      // Please change the IP address to match your localhost or private IP address.
      cover_image: `${process.env.SERVER_URL}/bookCovers/bookCover_Seed-Essentialism.jpg`,
      purchase_link:
        "https://www.amazon.ca/Essentialism-Disciplined-Pursuit-Greg-McKeown/dp/0804137404/ref=sr_1_1?crid=2HTWGLQRE99CO&keywords=Essentialism&qid=1684375540&s=books&sprefix=essentialism%2Cstripbooks%2C105&sr=1-1",
    },
    {
      id: v4(),
      name: "The Intelligent Investor: The Definitive Book on Value Investing",
      description:
        "The greatest investment advisor of the twentieth century, Benjamin Graham, taught and inspired people worldwide. Graham's philosophy of 'value investing' - which shields investors from substantial error and teaches them to develop long-term strategies - has made The Intelligent Investor the stock market bible ever since its original publication in 1949.\n\
        Over the years, market developments have proven the wisdom of Graham's strategies. While preserving the integrity of Graham's original text, this revised edition includes updated commentary by noted financial journalist Jason Zweig, whose perspective incorporates the realities of today's market, draws parallels between Graham's examples and today's financial headlines, and gives readers a more thorough understanding of how to apply Graham's principles.\n\
        Vital and indispensable, this HarperBusiness Essentials edition of The Intelligent Investor is the most important book you will ever read on how to reach your financial goals.",
      genre: "Business",
      total_pages: 640,
      author: "Benjamin Graham",
      is_NYT_best_seller: 0,
      // Please change the IP address to match your localhost or private IP address.
      cover_image: `${process.env.SERVER_URL}/bookCovers/bookCover_Seed-intel-inverstor.jpg`,
      purchase_link:
        "https://www.amazon.ca/Intelligent-Investor-Definitive-Value-Investing/dp/0060555661/ref=sr_1_1?crid=DLVPG6JAFAX1&keywords=intel+investor&qid=1684375720&s=books&sprefix=intel+investor%2Cstripbooks%2C228&sr=1-1",
    },
    {
      id: v4(),
      name: "The Rainbow: Absolutely heartbreaking World War 2 historical fiction based on a true story",
      description:
        "There, on the dusty floorboards, was a piece of paper, folded neatly. A newspaper article, written in German, alongside a faded picture of two men in Nazi uniforms staring at the camera. I was about to place it back in the box of\
         forgotten things when something in the text jumped out at me. My breath caught in my chest. I know that name.\n\
        London, present day. Isla has grown up hearing her beloved grandad’s stories about his life as a child in pre-war Poland and as a young soldier bravely fighting the Germans to protect his people. So she is shocked and heartbroken to\
         find, while collecting photos for his 95th birthday celebration, a picture of her dear grandfather wearing a Nazi uniform. Is everything she thought she knew about him a lie?",
      genre: "Novel",
      total_pages: 340,
      author: "Carly Schabowski",
      is_NYT_best_seller: 0,
      // Please change the IP address to match your localhost or private IP address.
      cover_image: `${process.env.SERVER_URL}/bookCovers/bookCover_Seed-The-Rainbow.jpg`,
      purchase_link:
        "https://www.amazon.ca/Rainbow-Absolutely-heartbreaking-historical-fiction/dp/1800198108/ref=sr_1_1?crid=1I74UD8DS1S00&keywords=the+rainbow&qid=1684375877&s=books&sprefix=the+rainbow%2Cstripbooks%2C824&sr=1-1",
    },
    {
      id: v4(),
      name: "Zero to One: Notes on Startups, or How to Build the Future",
      description:
        "The great secret of our time is that there are still uncharted frontiers to explore and new inventions to create. In Zero to One, legendary entrepreneur and investor Peter Thiel shows how we can find singular ways to create those new things.\n\
        Thiel begins with the contrarian premise that we live in an age of technological stagnation, even if we’re too distracted by shiny mobile devices to notice. Information technology has improved rapidly, but there is no reason why progress should\
         be limited to computers or Silicon Valley. Progress can be achieved in any industry or area of business. It comes from the most important skill that every leader must master: learning to think for yourself.",
      genre: "Business",
      total_pages: 224,
      author: "Peter Thiel",
      is_NYT_best_seller: 0,
      // Please change the IP address to match your localhost or private IP address.
      cover_image: `${process.env.SERVER_URL}/bookCovers/bookCover_Seed-Zero-to-One.jpg`,
      purchase_link:
        "https://www.amazon.ca/Zero-One-Notes-Startups-Future/dp/0804139296/ref=sr_1_1?crid=1T02A1LTRPPN5&keywords=Zero+to+one&qid=1684376081&s=books&sprefix=zero+to+one%2Cstripbooks%2C93&sr=1-1",
    },
    {
      id: v4(),
      name: "Shoe Dog: A Memoir by the Creator of Nike",
      description:
        "Bill Gates named Shoe Dog one of his five favorite books of 2016 and called it “an amazing tale, a refreshingly honest reminder of what the path to business success really looks like. It’s a messy, perilous, and chaotic journey, \
      riddled with mistakes, endless struggles, and sacrifice. Phil Knight opens up in ways few CEOs are willing to do.” Fresh out of business school, Phil Knight borrowed fifty dollars from his father and launched a company with one \
      simple mission: import high-quality, low-cost running shoes from Japan. Selling the shoes from the trunk of his car in 1963, Knight grossed eight thousand dollars that first year. Today, Nike’s annual sales top $30 billion\
      . In this age of start-ups, Knight’s Nike is the gold standard, and its swoosh is one of the few icons instantly recognized in every corner of the world.",
      genre: "Business",
      total_pages: 400,
      author: "Phil Knight",
      is_NYT_best_seller: 0,
      // Please change the IP address to match your localhost or private IP address.
      cover_image: `${process.env.SERVER_URL}/bookCovers/bookCover_Seed-Shoedog.jpg`,
      purchase_link:
        "https://www.amazon.ca/Shoe-Dog-Memoir-Creator-Nike/dp/1501135929/ref=sr_1_1?crid=1QVD8RK90SUOU&keywords=shoe+dog+by+phil+knight&qid=1684376241&s=books&sprefix=Shoe+dog%2Cstripbooks%2C233&sr=1-1",
    },
    {
      id: v4(),
      name: "Sales EQ: How Ultra High Performers Leverage Sales-Specific Emotional Intelligence to Close the Complex Deal",
      description:
        "The sales profession is in the midst of a perfect storm. Buyers have more power―more information, more at stake, and more control over the sales process―than any time in history. Technology is bringing disruptive change at\
         an ever-increasing pace, creating fear and uncertainty that leaves buyers clinging to the status quo. Deteriorating attention spans have made it difficult to get buyers to sit still long enough to “challenge,” “teach,”\
          “help,” give “insight,” or sell “value.” And a relentless onslaught of “me-too” competitors have made differentiating on the attributes of products, services, or even price more difficult than ever.",
      genre: "Business",
      total_pages: 320,
      author: "Jeb Blount",
      is_NYT_best_seller: 0,
      // Please change the IP address to match your localhost or private IP address.
      cover_image: `${process.env.SERVER_URL}/bookCovers/bookCover_Seed-SalesEQ.jpg`,
      purchase_link:
        "https://www.amazon.ca/Sales-Performers-Sales-Specific-Emotional-Intelligence/dp/1119312574/ref=sr_1_1?crid=2U8L451DSYXF9&keywords=sales+EQ&qid=1684376368&s=books&sprefix=sales+eq%2Cstripbooks%2C108&sr=1-1",
    },
    {
      id: v4(),
      name: "HTTP: The Definitive Guide: The Definitive Guide",
      description:
        'Behind every web transaction lies the Hypertext Transfer Protocol (HTTP) --- the language of web browsers and servers, of portals and search engines, of e-commerce and web services. Understanding HTTP is essential for\
         practically all web-based programming, design, analysis, and administration.While the basics of HTTP are elegantly simple, the protocol\'s advanced features are notoriously confusing, because they knit together complex\
          technologies and terminology from many disciplines. This book clearly explains HTTP and these interrelated core technologies, in twenty-one logically organized chapters, backed up by hundreds of detailed illustrations\
           and examples, and convenient reference appendices. HTTP: The Definitive Guide explains everything people need to use HTTP efficiently -- including the \black arts" and "tricks of the trade" -- in a concise and readable\
            manner.In addition to explaining the basic HTTP features, syntax and guidelines, this book clarifies related, but often misunderstood topics, such as: TCP connection management, web proxy and cache architectures, web robots\
             and robots.txt files, Basic and Digest authentication, secure HTTP transactions, entity body processing, internationalized content, and traffic redirection.Many technical professionals will benefit from this book.',
      genre: "Computers",
      total_pages: 656,
      author: "David Gourley",
      is_NYT_best_seller: 0,
      // Please change the IP address to match your localhost or private IP address.
      cover_image: `${process.env.SERVER_URL}/bookCovers/bookCover_Seed-HTTP-Definitive.jpeg`,
      purchase_link:
        "https://www.amazon.ca/HTTP-Definitive-Guide-David-Gourley/dp/1565925092/ref=sr_1_1?crid=2F68G3Q94DKP9&keywords=HTTP+guide&qid=1684376613&s=books&sprefix=http+guide%2Cstripbooks%2C113&sr=1-1",
    },
    {
      id: v4(),
      name: "Introduction to Algorithms, fourth edition",
      description:
        "Some books on algorithms are rigorous but incomplete; others cover masses of material but lack rigor. Introduction to Algorithms uniquely combines rigor and comprehensiveness. It covers a broad range of algorithms in depth, \
        yet makes their design and analysis accessible to all levels of readers, with self-contained chapters and algorithms in pseudocode. Since the publication of the first edition, Introduction to Algorithms has become the leading \
        algorithms text in universities worldwide as well as the standard reference for professionals. This fourth edition has been updated throughout.",
      genre: "Computers",
      total_pages: 1312,
      author: "Thomas H. Cormen",
      is_NYT_best_seller: 0,
      // Please change the IP address to match your localhost or private IP address.
      cover_image: `${process.env.SERVER_URL}/bookCovers/bookCover_Seed-algorithms.jpg`,
      purchase_link:
        "https://www.amazon.ca/Introduction-Algorithms-fourth-Thomas-Cormen/dp/026204630X/ref=sr_1_3?crid=1LHKUNK5F891B&keywords=Algorithms&qid=1684376924&s=books&sprefix=algorithms%2Cstripbooks%2C113&sr=1-3",
    },
  ]);
};
