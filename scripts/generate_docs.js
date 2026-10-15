import fs from 'fs';
import path from 'path';

const categories = [
  'Consumer Electronics',
  'Renewable Energy',
  'Green Computing',
  'Smart Home & IoT',
  'Health & Fitness',
  'Transportation & EVs',
  'Information Retrieval & AI',
  'Environmental Science'
];

const documents = [
  // 1-15: Wireless Headphones & Audio
  {
    id: 1,
    title: "Best Wireless Headphones of 2025: Sound, Battery and ANC Compared",
    category: "Consumer Electronics",
    snippet: "An exhaustive comparison of top wireless headphones featuring adaptive active noise cancellation, lossless Bluetooth codecs, and 50-hour ultra-efficient battery performance.",
    content: "When choosing wireless headphones, consumers prioritize high-fidelity acoustics, ergonomic fit, low-latency audio transmission, and sustainable battery management. The latest flagship wireless headphones incorporate Bluetooth 5.4 LE Audio, which drastically cuts energy consumption during audio streaming. Furthermore, hybrid active noise cancellation (ANC) leverages multi-microphone arrays to counter ambient engine hum and commuter chatter with surgical precision. Our benchmark tests analyze battery life across 40 hours of continuous playback with ANC activated.",
    tags: ["wireless headphones", "bluetooth", "noise cancellation", "battery life", "audio", "anc"],
    date: "2025-01-15",
    readingTime: "5 min read",
    rating: 4.8
  },
  {
    id: 2,
    title: "Eco-Friendly Wireless Headphones Crafted from Recycled Plastics",
    category: "Consumer Electronics",
    snippet: "How modern audio engineering delivers studio sound in wireless headphones using ocean-bound plastics and biodegradable bamboo earcups.",
    content: "Audio manufacturers are embracing circular economy principles. These eco-friendly wireless headphones utilize 85% post-consumer recycled polycarbonate and modular components that allow users to replace ear pads and batteries instead of discarding the entire headset. Sound fidelity remains uncompromising, powered by 40mm bio-cellulose drivers offering warm bass and crisp treble. Their low-power DSP chip maximizes playback duration while reducing standby power drain.",
    tags: ["wireless headphones", "eco-friendly", "recycled materials", "sustainability", "audio gear"],
    date: "2025-02-04",
    readingTime: "4 min read",
    rating: 4.6
  },
  {
    id: 3,
    title: "Wireless Earbuds vs Over-Ear Headphones: The Ultimate Commuter Guide",
    category: "Consumer Electronics",
    snippet: "Evaluating passive noise isolation, wireless latency, pocketability, and spatial audio in true wireless earbuds and full-sized over-ear headphones.",
    content: "Commuters face a constant dilemma: compact true wireless earbuds or immersive over-ear headphones? While in-ear earbuds offer unmatched pocketability, over-ear models provide superior passive acoustic seals and physical space for larger batteries and thermal dissipation. Over-ear wireless headphones can house 800mAh cells capable of lasting a full week of heavy work without a recharge.",
    tags: ["wireless headphones", "earbuds", "noise isolation", "travel tech", "audio comparison"],
    date: "2025-02-18",
    readingTime: "6 min read",
    rating: 4.5
  },
  {
    id: 4,
    title: "Bluetooth Low Energy Audio: How LE Audio Revolutionizes Wireless Headphones",
    category: "Consumer Electronics",
    snippet: "Understanding the LC3 codec and multi-stream audio protocols that double battery life and slash latency in next-gen wireless headphones.",
    content: "Bluetooth Low Energy (LE) Audio represents the most significant leap forward for personal listening in two decades. By adopting the low complexity communication codec (LC3), wireless headphones transmit higher quality audio at half the bitrate of conventional SBC codecs. This architectural efficiency translates directly to lower radio transmitter power, cooler hardware temperatures, and extended listening sessions without requiring larger lithium batteries.",
    tags: ["wireless headphones", "bluetooth le", "codec", "energy efficiency", "audio technology"],
    date: "2025-03-01",
    readingTime: "7 min read",
    rating: 4.9
  },
  {
    id: 5,
    title: "Active Noise Cancelling Explained: How Digital Filtering Silences the World",
    category: "Consumer Electronics",
    snippet: "The mathematics and DSP algorithms behind phase inversion, feed-forward filtering, and real-time noise cancellation in headphones.",
    content: "Active noise cancellation operates on destructive wave interference. Microphones on the exterior and interior of the headphone detect ambient acoustic waves and generate an inverted anti-phase waveform. Digital signal processors (DSPs) execute millions of floating-point calculations per millisecond. Recent energy-aware firmware optimizes DSP clock cycles based on ambient decibel levels, cutting processing overhead when the environment is tranquil.",
    tags: ["noise cancelling", "headphones", "dsp", "audio engineering", "algorithms"],
    date: "2025-01-28",
    readingTime: "5 min read",
    rating: 4.7
  },
  {
    id: 6,
    title: "Studio Monitor Headphones vs Consumer Wireless Headphones",
    category: "Consumer Electronics",
    snippet: "A breakdown of flat frequency responses, harmonic distortion, impedance matching, and why audiophiles still demand wired connections.",
    content: "While wireless headphones emphasize algorithmic sound sculpting, bass boosts, and convenience, professional studio monitor headphones prioritize uncolored transparency. Studio mixing requires absolute accuracy across 20Hz to 20kHz without lossy compression or dynamic DSP limiting. We test wired studio cans against high-end aptX Lossless wireless headphones in a controlled sound booth.",
    tags: ["headphones", "studio monitor", "audiophile", "sound quality", "wireless vs wired"],
    date: "2024-11-12",
    readingTime: "8 min read",
    rating: 4.4
  },
  {
    id: 7,
    title: "Wireless Gaming Headsets with Ultra-Low Latency 2.4GHz Dongles",
    category: "Consumer Electronics",
    snippet: "Minimizing input lag, boom microphone background rejection, and surround sound positioning in competitive wireless headsets.",
    content: "For esports players, a 50ms audio lag can make the difference between victory and defeat. Gaming wireless headphones bypass Bluetooth in favor of proprietary 2.4GHz RF dongles to achieve sub-15ms latency. We analyze battery consumption tradeoffs between high-polling wireless radios and dynamic RGB lighting, illustrating how disabling decorative LEDs doubles battery life.",
    tags: ["gaming", "wireless headphones", "low latency", "esports", "headset"],
    date: "2025-02-10",
    readingTime: "4 min read",
    rating: 4.3
  },
  {
    id: 8,
    title: "Bone Conduction Headphones for Open-Ear Outdoor Running",
    category: "Health & Fitness",
    snippet: "Stay aware of traffic and trail hazards with bone conduction transducers that send acoustic vibrations straight to the inner ear.",
    content: "Bone conduction headphones bypass the eardrum entirely by delivering micro-vibrations through the runner's cheekbones directly to the cochlea. This open-ear design maintains 100% situational awareness for city runners and cyclists. Titanium band construction ensures waterproof durability under intense sweat conditions.",
    tags: ["headphones", "bone conduction", "running", "fitness", "open ear audio"],
    date: "2025-02-22",
    readingTime: "5 min read",
    rating: 4.6
  },
  {
    id: 9,
    title: "Repairability Index: Can You Fix Broken Wireless Headphones Yourself?",
    category: "Consumer Electronics",
    snippet: "Disassembling popular wireless headphones to score glue usage, proprietary screws, replaceable batteries, and spare part availability.",
    content: "Modern consumer electronics often suffer from planned obsolescence due to glued-in lithium pouch cells. When the battery degrades after 500 charge cycles, functional headphones are frequently landfilled. We tear down models from Sony, Bose, Sennheiser, and Fairphone, ranking them on repairability and modular component design.",
    tags: ["wireless headphones", "repairability", "e-waste", "circular economy", "hardware"],
    date: "2024-12-05",
    readingTime: "6 min read",
    rating: 4.7
  },
  {
    id: 10,
    title: "Solar-Powered Wireless Headphones That Charge on Your Daily Walk",
    category: "Renewable Energy",
    snippet: "Integrating flexible Powerfoyle solar cells into headphone headbands for virtually unlimited outdoor battery runtime.",
    content: "Harnessing ambient indoor and outdoor light, self-charging wireless headphones integrate photovoltaic film directly into the outer headband. An hour of bright sunlight delivers up to three hours of high-res audio playback. We assess the energy conversion efficiency and aesthetic durability of solar-harvesting consumer devices.",
    tags: ["solar power", "wireless headphones", "clean energy", "photovoltaic", "green tech"],
    date: "2025-03-05",
    readingTime: "5 min read",
    rating: 4.9
  },

  // 11-25: Renewable Energy & Climate
  {
    id: 11,
    title: "Next-Generation Perovskite Solar Cells Reach 33% Efficiency Record",
    category: "Renewable Energy",
    snippet: "Tandem silicon-perovskite photovoltaic panels break efficiency barriers, transforming rooftop residential solar economics.",
    content: "Commercial silicon solar panels typically max out around 22% sunlight-to-electricity conversion efficiency. Tandem perovskite-on-silicon cells capture both blue and red spectral wavelengths, pushing laboratory efficiency beyond 33.9%. Commercialization hurdles like moisture degradation and thermal stability are being resolved with atomic layer encapsulation.",
    tags: ["solar energy", "perovskite", "renewable energy", "photovoltaics", "clean tech"],
    date: "2025-02-14",
    readingTime: "6 min read",
    rating: 4.9
  },
  {
    id: 12,
    title: "Grid-Scale Energy Storage: Solid-State and Iron-Flow Batteries",
    category: "Renewable Energy",
    snippet: "How non-toxic, long-duration energy storage systems balance intermittent wind and solar power on national utility grids.",
    content: "Renewable energy production peaks during sunny mid-days and windy nights, creating mismatched supply and demand curves. Grid-scale iron-flow batteries and sodium-ion systems offer safe, non-flammable multi-hour energy storage at half the capital expenditure of traditional lithium-ion cobalt formulations. They are essential to eliminating fossil peaker plants.",
    tags: ["energy storage", "renewable energy", "batteries", "grid infrastructure", "clean power"],
    date: "2025-01-30",
    readingTime: "7 min read",
    rating: 4.8
  },
  {
    id: 13,
    title: "Offshore Floating Wind Turbines in Deep Ocean Waters",
    category: "Renewable Energy",
    snippet: "Tapping powerful, persistent offshore winds in deep coastal waters using tension-leg floating platforms and 15MW turbines.",
    content: "Over 80% of world offshore wind potential resides in water depths exceeding 60 meters where fixed-bottom monopiles cannot be economically installed. Floating spar-buoys and tension-leg tethered platforms unlock massive gust corridors off the Pacific and Atlantic coasts. Each 15-megawatt turbine can power 12,000 households with clean electricity.",
    tags: ["wind energy", "offshore wind", "renewable power", "ocean engineering", "sustainability"],
    date: "2025-02-01",
    readingTime: "6 min read",
    rating: 4.7
  },
  {
    id: 14,
    title: "Residential Heat Pumps: Slashing Household Carbon Footprints by 70%",
    category: "Smart Home & IoT",
    snippet: "Thermodynamic heat exchange systems replace gas furnaces, delivering heating and cooling with an astonishing 400% COP efficiency.",
    content: "Unlike gas or oil furnaces that burn fuel to generate heat, electric heat pumps simply move existing ambient thermal energy from outside air or geothermal ground loops into the residence. Operating with a Coefficient of Performance (COP) up to 4.5, they produce four units of heat for every single unit of electrical energy consumed.",
    tags: ["heat pumps", "energy efficiency", "smart home", "electrification", "decarbonization"],
    date: "2024-12-19",
    readingTime: "5 min read",
    rating: 4.6
  },
  {
    id: 15,
    title: "Smart Thermostats and AI Energy Management for Modern Homes",
    category: "Smart Home & IoT",
    snippet: "Predictive HVAC cycling, occupancy sensors, and time-of-use grid integration to reduce electricity bills by 25%.",
    content: "Smart climate controllers continuously model thermal decay rates and weather forecasts to pre-cool or pre-heat living spaces when renewable grid power is cheapest and cleanest. Integrating IoT temperature nodes across individual rooms eliminates wasteful heating of unoccupied zones.",
    tags: ["smart home", "thermostat", "energy saving", "iot", "climate control"],
    date: "2025-01-20",
    readingTime: "4 min read",
    rating: 4.5
  },

  // 16-30: Green Computing, Data Centers & Algorithms
  {
    id: 16,
    title: "Green Computing: Reducing Carbon Footprints in Hyperscale Data Centers",
    category: "Green Computing",
    snippet: "Hardware innovations, direct liquid cooling, and carbon-aware workload scheduling to reduce the environmental toll of cloud computing.",
    content: "Data centers worldwide consume nearly 2% of global electricity, a figure accelerating with the explosion of generative AI models. Green computing strategies address this crisis through dual-phase liquid immersion cooling, waste heat recapture for municipal district heating, and migrating batch computing workloads to geographic regions where renewable solar and wind power currently peak.",
    tags: ["green computing", "data centers", "carbon footprint", "energy efficiency", "cloud computing"],
    date: "2025-02-12",
    readingTime: "8 min read",
    rating: 4.9
  },
  {
    id: 17,
    title: "Energy-Aware Algorithms in Modern Search Engines and Information Retrieval",
    category: "Information Retrieval & AI",
    snippet: "Dynamic pruning, tiered inverted indices, and early-exit query processing designed to curb CPU instruction cycles and Joules per query.",
    content: "Every web search query requires processing millions of candidate documents across clustered server farms. Standard inverted index retrieval scores documents through BM25 or language modeling. However, energy-aware search techniques introduce early termination filters like WAND (Weak AND) and Block-Max WAND, skipping non-competitive document postings. By avoiding exhaustive scoring of irrelevant documents, search engines reduce server CPU energy consumption by up to 75% without compromising top-k search precision.",
    tags: ["energy-aware search", "algorithms", "inverted index", "green computing", "query processing", "bm25"],
    date: "2025-03-02",
    readingTime: "9 min read",
    rating: 5.0
  },
  {
    id: 18,
    title: "Linear Search vs Inverted Index vs Energy-Aware Search: A Comparative Study",
    category: "Information Retrieval & AI",
    snippet: "Empirical benchmarks comparing computational complexity, document scans, clock cycles, and estimated energy draw across search paradigms.",
    content: "This benchmark compares three fundamental search methodologies: Naive Linear Search (O(N) document scans with full string evaluations), Inverted Index Search (lexicon lookups with candidate postings list traversal), and Energy-Aware Pruned Search (candidate scoring with early exit and dynamic relevance bounds). Experimental metrics confirm that energy-aware search curtails floating-point calculations, reduces cache thrashing, and yields drastic energy savings (Joules per query) while preserving search result quality.",
    tags: ["linear search", "inverted index", "energy-aware search", "search algorithms", "benchmarking", "energy consumption"],
    date: "2025-03-10",
    readingTime: "10 min read",
    rating: 5.0
  },
  {
    id: 19,
    title: "Carbon-Aware Computing: Running Software When the Sun Shines",
    category: "Green Computing",
    snippet: "Time-shifting heavy neural network training and batch data pipelines to coincide with zero-carbon solar and wind generation.",
    content: "Grid carbon intensity fluctuates dynamically hour by hour. Carbon-aware computing frameworks query real-time grid emissions telemetry APIs. When carbon intensity spikes due to coal fired peaker plants, non-critical background jobs automatically throttle or pause, resuming execution when solar generation floods the regional grid.",
    tags: ["carbon-aware", "green computing", "software engineering", "sustainability", "energy grid"],
    date: "2025-01-10",
    readingTime: "6 min read",
    rating: 4.8
  },
  {
    id: 20,
    title: "Measuring Software Energy Consumption: From RAPL Hardware Counters to Joules",
    category: "Green Computing",
    snippet: "How software developers profile CPU package power, DRAM energy, and instruction efficiency using Intel RAPL and Linux perf.",
    content: "Historically, programmers optimized exclusively for wall-clock latency or memory consumption. Modern green software engineering utilizes Intel Running Average Power Limit (RAPL) micro-architectural energy counters. Developers can isolate energy consumption down to millijoules for individual function calls, proving that algorithm design directly impacts electrical power draw.",
    tags: ["rapl", "profiling", "green computing", "energy measurement", "cpu power", "joules"],
    date: "2025-02-25",
    readingTime: "7 min read",
    rating: 4.9
  },
  {
    id: 21,
    title: "The Computational Cost of Large Language Models and AI Search",
    category: "Information Retrieval & AI",
    snippet: "Analyzing why generative AI queries consume ten times more watt-hours than traditional keyword search, and how to fix it.",
    content: "A standard web search on an inverted index requires approximately 0.3 watt-hours (around 1,080 Joules) of energy. In contrast, invoking a 70-billion parameter transformer model for search synthesis can consume between 3 to 10 watt-hours per query. Hybrid architectures that route simple factual lookups to lightweight energy-aware search engines preserve computational budgets.",
    tags: ["ai search", "llm", "energy consumption", "computational cost", "search engines"],
    date: "2025-03-08",
    readingTime: "8 min read",
    rating: 4.8
  },
  {
    id: 22,
    title: "Inverted Index Architecture: Postings Lists, Compression, and Skip Pointers",
    category: "Information Retrieval & AI",
    snippet: "Deep dive into inverted index data structures, Elias-Fano encoding, and skip list navigation for sub-millisecond document retrieval.",
    content: "The inverted index remains the backbone of modern web search engines. By mapping unique vocabulary terms to inverted posting lists of document IDs and term frequencies, search engines bypass naive scanning entirely. Skip pointers allow search engines to skip irrelevant blocks during Boolean AND intersections, cutting memory bandwidth consumption.",
    tags: ["inverted index", "data structures", "search engines", "postings list", "algorithms"],
    date: "2024-11-20",
    readingTime: "7 min read",
    rating: 4.7
  },
  {
    id: 23,
    title: "WAND and Block-Max Pruning: Cutting Search Computation Without Losing Top Hits",
    category: "Information Retrieval & AI",
    snippet: "How Weak AND algorithms establish dynamic scoring thresholds that prune 80% of candidate document evaluations safely.",
    content: "In top-k document retrieval, evaluating full BM25 scores for hundreds of thousands of documents containing query words is computationally wasteful. The WAND algorithm assigns upper bounds on the maximum score contribution of each term. Documents whose upper bound cannot surpass the current k-th highest score are discarded instantly before score evaluation.",
    tags: ["wand", "pruning", "energy-aware search", "information retrieval", "optimization"],
    date: "2025-02-15",
    readingTime: "9 min read",
    rating: 4.9
  },
  {
    id: 24,
    title: "Low-Power Microcontrollers and Edge AI in Battery-Operated Sensors",
    category: "Smart Home & IoT",
    snippet: "Deploying quantized neural networks to Cortex-M microcontrollers operating on milliwatts of harvested solar or thermal energy.",
    content: "Edge computing shifts intelligence from power-hungry cloud servers directly onto small embedded chips. TinyML architectures compress 32-bit floating point weights into 8-bit or 4-bit integers. These microcontrollers operate under 10 milliwatts, enabling years of autonomous operation on coin-cell batteries.",
    tags: ["tinyml", "edge ai", "low power", "microcontrollers", "iot"],
    date: "2025-01-05",
    readingTime: "5 min read",
    rating: 4.6
  },
  {
    id: 25,
    title: "Sustainable Web Design: Building Lightweight, Low-Emission Websites",
    category: "Green Computing",
    snippet: "Minimizing JavaScript bundles, optimizing assets, eliminating trackers, and reducing byte transfers across global telecommunication networks.",
    content: "Every megabyte transmitted across the internet expends electrical energy across cellular towers, submarine cables, switches, and client CPUs. Sustainable web design advocates for strict asset budgets, server-side caching, and dark mode interfaces that reduce OLED display power draw.",
    tags: ["sustainable web", "green computing", "frontend", "energy efficiency", "performance"],
    date: "2025-01-18",
    readingTime: "6 min read",
    rating: 4.7
  },

  // 26-40: Electric Vehicles, Clean Transport & Batteries
  {
    id: 26,
    title: "Electric Vehicle Battery Technology: Solid-State Cells Enter Road Testing",
    category: "Transportation & EVs",
    snippet: "Silicon anodes and solid ceramic electrolytes deliver 800-mile driving range and 10-minute ultra-fast charging safety.",
    content: "Liquid electrolyte lithium batteries have approached physical energy density limits. Solid-state lithium-metal batteries replace volatile organic liquids with non-flammable solid ceramic or polymer separators. They allow pure lithium metal anodes, doubling gravimetric energy density to over 450 Wh/kg while virtually eliminating thermal runaway risk.",
    tags: ["electric vehicles", "ev battery", "solid-state", "clean transport", "energy density"],
    date: "2025-02-28",
    readingTime: "7 min read",
    rating: 4.9
  },
  {
    id: 27,
    title: "Vehicle-to-Grid (V2G): Turning Parked Electric Cars into Mobile Power Stations",
    category: "Transportation & EVs",
    snippet: "Bidirectional EV chargers feed stored battery power back into suburban electrical grids during peak evening demand spikes.",
    content: "With millions of electric vehicles parked idle for 95% of their lifespans, their combined battery capacity represents a colossal distributed power reserve. Vehicle-to-Grid (V2G) bidirectional inverters allow car owners to discharge power back into the utility grid during peak pricing hours, earning revenue while fortifying grid stability.",
    tags: ["v2g", "electric vehicles", "grid storage", "renewable energy", "smart charging"],
    date: "2025-01-22",
    readingTime: "6 min read",
    rating: 4.7
  },
  {
    id: 28,
    title: "High-Speed Electric Rail vs Short-Haul Aviation: Emissions Comparison",
    category: "Transportation & EVs",
    snippet: "Why modern 300km/h electrified passenger bullet trains emit 90% less CO2 per passenger-kilometer than commercial jet airliners.",
    content: "Decarbonizing regional intercity travel requires replacing fossil aviation with electrified high-speed rail. High-speed rail corridors powered by regional wind and hydro electricity offer convenient city-center to city-center transit with near-zero direct carbon emissions.",
    tags: ["electric rail", "sustainable travel", "carbon emissions", "transportation", "climate action"],
    date: "2024-11-28",
    readingTime: "5 min read",
    rating: 4.6
  },
  {
    id: 29,
    title: "Aerodynamics and Regenerative Braking: Maximizing EV Range on the Highway",
    category: "Transportation & EVs",
    snippet: "Tire rolling resistance, heat pump cabin conditioning, and regenerative kinetic energy recovery in electric automotive engineering.",
    content: "Electric vehicle range is fundamentally governed by aerodynamic drag coefficients and thermal management efficiency. Regenerative braking recaptures up to 70% of vehicle kinetic energy when decelerating, converting deceleration momentum into battery charge instead of dissipating heat via friction brake pads.",
    tags: ["electric vehicles", "regenerative braking", "energy efficiency", "aerodynamics", "ev range"],
    date: "2025-02-08",
    readingTime: "6 min read",
    rating: 4.5
  },
  {
    id: 30,
    title: "Sodium-Ion Batteries: The Affordable, Cobalt-Free Alternative for Urban EVs",
    category: "Transportation & EVs",
    snippet: "Abundant rock salt chemistry eliminates dependence on scarce lithium, nickel, and cobalt for compact city electric cars.",
    content: "Sodium is over a thousand times more abundant in Earth's crust than lithium. Sodium-ion battery packs offer excellent cold-weather performance and thermal stability. While slightly heavier than high-nickel lithium packs, their rock-bottom manufacturing cost makes budget electric commuting accessible worldwide.",
    tags: ["sodium-ion", "ev battery", "clean tech", "minerals", "electric cars"],
    date: "2025-01-14",
    readingTime: "5 min read",
    rating: 4.6
  },

  // 31-45: Environmental Science, Nature & Circular Economy
  {
    id: 31,
    title: "Ocean Plastic Cleanup Technologies: Autonomous Skimmers and River Barriers",
    category: "Environmental Science",
    snippet: "Deploying solar-powered barrier systems to intercept marine plastic debris at major river mouths before it disperses into ocean gyres.",
    content: "Over 80% of ocean plastic enters through roughly 1,000 global rivers. Automated interceptor catamarans powered entirely by solar panels utilize conveyor belts to scoop floating debris into waste dumpsters autonomously. Combined with ocean surface booms, these initiatives extract thousands of metric tons annually.",
    tags: ["ocean plastic", "cleanup", "environmental science", "marine life", "sustainability"],
    date: "2025-02-17",
    readingTime: "6 min read",
    rating: 4.8
  },
  {
    id: 32,
    title: "Biodegradable Packaging from Seaweed and Mushroom Mycelium",
    category: "Environmental Science",
    snippet: "Replacing expanded polystyrene foam and single-use plastic films with rapid-composting biomaterials.",
    content: "Mycelium composite packaging leverages fungal root networks grown inside agricultural waste molds to form strong, water-resistant cushioning. When discarded, mycelium decomposes naturally in soil within 45 days, enriching soil microbiome diversity rather than persisting for centuries.",
    tags: ["biodegradable", "packaging", "mycelium", "circular economy", "zero waste"],
    date: "2025-01-12",
    readingTime: "5 min read",
    rating: 4.7
  },
  {
    id: 33,
    title: "Direct Air Carbon Capture (DAC): Engineering Artificial Trees",
    category: "Environmental Science",
    snippet: "Solid sorbent filters and geothermal energy systems extracting ambient carbon dioxide directly from open atmosphere.",
    content: "Direct Air Capture (DAC) facilities pass ambient air across chemical sorbent collectors that bind CO2 molecules. The captured carbon is then dissolved in water and injected deep into basalt formations, where it permanently mineralizes into stone over two years.",
    tags: ["carbon capture", "dac", "climate change", "environmental engineering", "net zero"],
    date: "2025-02-03",
    readingTime: "7 min read",
    rating: 4.6
  },
  {
    id: 34,
    title: "Smart Irrigation and Drip Sensors: Saving Billions of Gallons in Agriculture",
    category: "Environmental Science",
    snippet: "Soil moisture telemetry and satellite vegetative indexing cut agricultural water waste by 40% in drought-prone regions.",
    content: "Agriculture accounts for over 70% of freshwater withdrawals globally. Precision drip irrigation systems modulated by wireless soil sensors deliver micro-doses of water directly to root zones during pre-dawn hours, drastically minimizing evaporative losses.",
    tags: ["smart agriculture", "water conservation", "iot sensors", "sustainability", "farming"],
    date: "2024-12-15",
    readingTime: "5 min read",
    rating: 4.5
  },
  {
    id: 35,
    title: "Reforestation via AI-Guided Drone Seeding",
    category: "Environmental Science",
    snippet: "Autonomous drone swarms fire nutrient-encased seed pods across deforested mountain terrains at 100,000 trees per day.",
    content: "Traditional manual tree planting struggles to access remote terrains and steep slopes. Precision forestry drones combine multispectral lidar mapping with pneumatic seed cannons, planting diverse native saplings at twenty times the speed of human teams.",
    tags: ["reforestation", "drones", "ai", "environmental science", "biodiversity"],
    date: "2025-02-26",
    readingTime: "6 min read",
    rating: 4.8
  },

  // 36-50: Health, Smart Devices, Wearables & Lifestyle
  {
    id: 36,
    title: "Continuous Glucose Monitors and Non-Invasive Metabolic Health Trackers",
    category: "Health & Fitness",
    snippet: "Miniaturized wearable sensors illuminate blood glucose trends, sleep recovery, and athletic glycemic optimization.",
    content: "Continuous glucose monitors (CGMs) utilize micro-filaments under the skin to sample interstitial fluid every five minutes. The data synchronizes via Bluetooth Low Energy to smartphone apps, empowering individuals to identify glucose spikes and prevent metabolic dysfunction.",
    tags: ["health tech", "wearables", "metabolism", "sensors", "fitness tracker"],
    date: "2025-01-25",
    readingTime: "6 min read",
    rating: 4.7
  },
  {
    id: 37,
    title: "Circadian Rhythm Smart Lighting: Dynamic Color Temperatures for Better Sleep",
    category: "Smart Home & IoT",
    snippet: "Automating home light spectrums to suppress blue wavelengths at sunset and boost morning cortisol naturally.",
    content: "Exposure to high-temperature 6500K blue light after dark suppresses pineal melatonin secretion and delays REM sleep. Circadian lighting systems automatically shift Kelvin spectrums from invigorating morning sunlight to soothing amber incandescent tones by bedtime.",
    tags: ["smart lighting", "circadian rhythm", "sleep", "smart home", "wellness"],
    date: "2025-02-11",
    readingTime: "5 min read",
    rating: 4.6
  },
  {
    id: 38,
    title: "Wireless Ergonomic Keyboards and Mice: Low-Energy Mesh Protocols",
    category: "Consumer Electronics",
    snippet: "Split ergonomic mechanical keyboards featuring 2.4GHz low-power RF and Bluetooth multi-host switching.",
    content: "Ergonomic computer peripherals reduce repetitive strain injury (RSI) risks during long typing sessions. Ultra-low power microcontroller firmware enables mechanical wireless keyboards to operate for over six months on two AAA batteries.",
    tags: ["keyboards", "ergonomics", "wireless", "workspace", "peripherals"],
    date: "2024-11-18",
    readingTime: "5 min read",
    rating: 4.4
  },
  {
    id: 39,
    title: "Smartwatches with Multi-Band GNSS: GPS Accuracy vs Battery Life",
    category: "Health & Fitness",
    snippet: "Balancing L1 and L5 dual-frequency satellite tracking against smartwatch battery life for trail marathoners.",
    content: "Dual-frequency GPS eliminates multi-path satellite interference in dense downtown canyons and under thick forest canopies. However, multi-band receiver chips draw three times more power, prompting smartwatch engineers to develop dynamic polling algorithms.",
    tags: ["smartwatch", "gps", "battery life", "fitness", "wearables"],
    date: "2025-01-08",
    readingTime: "5 min read",
    rating: 4.5
  },
  {
    id: 40,
    title: "Energy Harvesting in Wearable Tech: Piezoelectric and Thermoelectric Generators",
    category: "Renewable Energy",
    snippet: "Powering body sensors and medical telemetry from body heat dissipation and walking heel strikes.",
    content: "Thermoelectric generators (TEGs) exploit the Seebeck effect to harvest electricity from the temperature difference between human skin and ambient air. Wearable fitness bands powered by TEGs eliminate the need for regular wall charging.",
    tags: ["energy harvesting", "wearables", "thermoelectric", "clean tech", "sensors"],
    date: "2025-02-19",
    readingTime: "6 min read",
    rating: 4.7
  },

  // 41-60: Deep Dive Search Engine Tech & Information Retrieval
  {
    id: 41,
    title: "BM25 Ranking Algorithm: Term Frequency, Document Length, and Saturation",
    category: "Information Retrieval & AI",
    snippet: "How the Okapi BM25 probabilistic relevance formula balances term frequency (TF) and inverse document frequency (IDF).",
    content: "BM25 improves upon classical TF-IDF by introducing saturation parameters k1 and b. Parameter k1 limits the influence of repetitive term frequency, preventing keyword stuffing from dominating relevance, while b penalizes excessively lengthy documents that match words purely by chance.",
    tags: ["bm25", "search algorithms", "information retrieval", "ranking", "tf-idf"],
    date: "2024-10-30",
    readingTime: "8 min read",
    rating: 4.9
  },
  {
    id: 42,
    title: "Dynamic Candidate Filtering in Search Engines: MaxScore vs WAND",
    category: "Information Retrieval & AI",
    snippet: "Comparing dynamic pruning strategies that skip candidate documents without sacrificing top-ranked search precision.",
    content: "Search engines handling web-scale corpora cannot afford to score billions of documents for multi-word queries. MaxScore and WAND partition posting lists into essential and non-essential candidate subsets based on the maximum score an uninspected term can possibly yield. Non-promising documents are pruned prior to scoring, saving immense CPU instructions.",
    tags: ["pruning", "wand", "maxscore", "energy-aware search", "search algorithms"],
    date: "2025-02-06",
    readingTime: "9 min read",
    rating: 5.0
  },
  {
    id: 43,
    title: "Energy Efficiency in Mobile Search: Local Caching and Offline Indexing",
    category: "Information Retrieval & AI",
    snippet: "How mobile operating systems maintain low-power on-device inverted indexes to save cellular radio battery consumption.",
    content: "Activating cellular 5G modems to query remote search cloud servers expends significant mobile battery power. On-device local search indexing utilizing SQLite FTS5 or compact trie indexes answers user queries locally in milliseconds, saving device battery and network bandwidth.",
    tags: ["mobile search", "offline search", "inverted index", "energy efficiency", "caching"],
    date: "2025-01-16",
    readingTime: "6 min read",
    rating: 4.6
  },
  {
    id: 44,
    title: "Vector Search and Approximate Nearest Neighbors: Computational Tradeoffs",
    category: "Information Retrieval & AI",
    snippet: "Examining HNSW graphs, product quantization, and dense retrieval power demands compared to sparse lexical search.",
    content: "Dense vector embeddings capture semantic nuance but require massive floating-point matrix multiplications. Hierarchical Navigable Small World (HNSW) graphs index high-dimensional vectors with sub-linear search time, but their memory footprint and RAM energy draw exceed inverted indices by orders of magnitude.",
    tags: ["vector search", "hnsw", "embeddings", "computational complexity", "ai search"],
    date: "2025-02-27",
    readingTime: "8 min read",
    rating: 4.8
  },
  {
    id: 45,
    title: "Early Termination Heuristics for Real-Time Query Processing",
    category: "Information Retrieval & AI",
    snippet: "Halting search iteration once top result stability metrics are satisfied to conserve compute cycles.",
    content: "When a search engine has already discovered high-confidence matching documents whose scores surpass any theoretical score from the remaining corpus, continuing the scan yields zero user-visible benefit. Adaptive early stopping detects score convergence and terminates search loops early, saving substantial computation.",
    tags: ["early termination", "search optimization", "energy-aware search", "algorithms"],
    date: "2025-03-04",
    readingTime: "7 min read",
    rating: 4.9
  },
  {
    id: 46,
    title: "CPU Power Management: Frequency Scaling and Search Workload Spikes",
    category: "Green Computing",
    snippet: "How Linux CPU governor governors (schedutil, performance, powersave) interact with interactive search latency SLAs.",
    content: "Modern multi-core processors adjust clock frequencies dynamically via DVFS (Dynamic Voltage and Frequency Scaling). Because power scales quadratically with voltage, running cores at peak boost frequencies burns disproportionate energy. Smart search dispatchers run steady-state inverted index traversals at efficient mid-range frequencies.",
    tags: ["cpu power", "dvfs", "green computing", "hardware", "systems architecture"],
    date: "2024-12-22",
    readingTime: "7 min read",
    rating: 4.7
  },
  {
    id: 47,
    title: "EcoSearch: The Architecture of an Energy-Aware Web Search Simulator",
    category: "Information Retrieval & AI",
    snippet: "A comprehensive breakdown of linear scanning, postings list lookups, and candidate pruning for sustainable information retrieval.",
    content: "EcoSearch was engineered to visualize the hidden energy consumption of digital search. By comparing naive linear search (checking every document sequentially), traditional inverted index retrieval, and energy-aware early termination algorithms, EcoSearch computes execution time, document evaluations, and estimated millijoules to prove that algorithmic efficiency directly cuts carbon emissions.",
    tags: ["ecosearch", "energy-aware search", "simulator", "benchmarking", "green computing", "education"],
    date: "2025-03-12",
    readingTime: "6 min read",
    rating: 5.0
  },
  {
    id: 48,
    title: "Zero-Carbon Data Centers: Geothermal and Hydro-Powered Cloud Regions",
    category: "Green Computing",
    snippet: "Locating server campuses adjacent to Nordic hydroelectric fjords and Icelandic volcanic steam reservoirs.",
    content: "Instead of transporting green electricity over hundreds of miles of transmission line losses, cloud providers build data centers directly beside abundant baseload renewable generation. Natural cold ambient air provides year-round passive server cooling.",
    tags: ["data centers", "geothermal", "hydroelectric", "clean energy", "cloud infrastructure"],
    date: "2025-01-02",
    readingTime: "6 min read",
    rating: 4.8
  },
  {
    id: 49,
    title: "Dark Mode and OLED Power Consumption: Does Interface Design Save Energy?",
    category: "Green Computing",
    snippet: "Empirical screen power measurements of white themes versus true black dark mode across AMOLED smartphone displays.",
    content: "OLED displays illuminate individual organic sub-pixels. Displaying pure black pixels requires turning sub-pixels off completely, drawing 0mA. Testing proves that a true dark theme reduces display energy consumption by up to 40% at high ambient brightness.",
    tags: ["dark mode", "oled", "energy saving", "ui design", "mobile displays"],
    date: "2025-02-13",
    readingTime: "4 min read",
    rating: 4.6
  },
  {
    id: 50,
    title: "Carbon Accounting Standards for Software: ISO and Green Software Foundation",
    category: "Green Computing",
    snippet: "Standardizing the Software Carbon Intensity (SCI) specification to audit digital products across Scope 1, 2, and 3 emissions.",
    content: "The Green Software Foundation created the SCI specification to give engineers an actionable metric: grams of CO2 equivalent per functional unit (e.g., per search query or per active user session). It guides architectural tradeoffs between hardware manufacturing emissions and runtime electricity.",
    tags: ["green software", "sci", "carbon accounting", "standards", "sustainability"],
    date: "2024-11-05",
    readingTime: "7 min read",
    rating: 4.7
  }
];

// Generate additional documents programmatically to reach ~80-100 high quality docs
const templates = [
  {
    titlePrefix: "Energy-Efficient Smart",
    topics: ["LED Lighting Systems", "Water Heaters", "Air Purifiers", "Kitchen Appliances", "Window Glazing", "Ceiling Fans", "Smart Plugs", "Solar Powered Security Cameras"],
    category: "Smart Home & IoT",
    tags: ["smart home", "energy efficiency", "iot", "sustainability"]
  },
  {
    titlePrefix: "Advanced Innovations in",
    topics: ["Solar Panel Recycling", "Tidal Stream Turbines", "Geothermal Micro-Drilling", "Biomass Gasification", "Hydrogen Fuel Cells", "Wave Energy Converters", "Nuclear Small Modular Reactors", "Concentrated Solar Power"],
    category: "Renewable Energy",
    tags: ["renewable energy", "clean power", "sustainability", "energy transition"]
  },
  {
    titlePrefix: "Optimizing Performance in",
    topics: ["Inverted Index Query Caching", "BM25 Document Scoring", "Distributed Search Clusters", "Search Snippet Extraction", "Boolean Term Processing", "Document Compression", "Vector Search Sharding", "Garbage Collection in Search Engines"],
    category: "Information Retrieval & AI",
    tags: ["search engines", "information retrieval", "algorithms", "inverted index", "energy-aware search"]
  },
  {
    titlePrefix: "Sustainable Audio:",
    topics: ["Solar Powered Wireless Earbuds", "Recycled Aluminum Over-Ear Headphones", "Ultra-Low Power Audio Codecs", "Modular Repairable Headphones", "Noise Isolating In-Ear Monitors", "Spatial Audio Energy Consumption"],
    category: "Consumer Electronics",
    tags: ["wireless headphones", "audio", "sustainability", "eco-friendly"]
  },
  {
    titlePrefix: "Next-Generation Electric",
    topics: ["Bicycle Commuting Networks", "Urban Delivery Vans", "Electric Cargo Ships", "Modular Battery Swapping Stations", "Autonomous Electric Shuttles", "Electric Aviation Feasibility"],
    category: "Transportation & EVs",
    tags: ["electric vehicles", "clean transport", "sustainability", "batteries"]
  },
  {
    titlePrefix: "Eco-Friendly Frontiers in",
    topics: ["Biodegradable Electronics", "Urban Vertical Farming", "Microplastic Filtration", "Cellular Agriculture", "Atmospheric Water Harvesting", "Passive Solar Architecture"],
    category: "Environmental Science",
    tags: ["environmental science", "sustainability", "green tech", "circular economy"]
  },
  {
    titlePrefix: "Energy Footprint of",
    topics: ["Decentralized Blockchains", "Cloud Gaming Services", "High-Resolution Video Streaming", "Smart Traffic Management", "Autonomous Vehicle Sensor Fusion", "5G Cellular Towers", "Digital Twin Simulations", "Smart Microgrids"],
    category: "Green Computing",
    tags: ["green computing", "energy consumption", "computational cost", "carbon footprint"]
  },
  {
    titlePrefix: "Consumer Guide to",
    topics: ["Zero-Emission Appliances", "Thermal Insulating Curtains", "Solar Backpacks", "Low-Wattage Desktop Monitors", "Recycled Wireless Mice"],
    category: "Consumer Electronics",
    tags: ["consumer tech", "eco-friendly", "energy saving", "electronics"]
  }
];

let curId = 51;
for (const tmpl of templates) {
  for (const topic of tmpl.topics) {
    documents.push({
      id: curId,
      title: `${tmpl.titlePrefix} ${topic}`,
      category: tmpl.category,
      snippet: `A comprehensive evaluation of modern engineering breakthroughs in ${topic.toLowerCase()}, focusing on computational efficiency, sustainability, and real-world performance benchmarks.`,
      content: `Sustainable engineering requires rethinking ${topic.toLowerCase()} from first principles. By minimizing waste, streamlining computational algorithms, and maximizing energy conservation, modern implementations achieve superior results with a fraction of the traditional environmental footprint. Our field tests and architectural evaluations validate notable efficiency gains and durability.`,
      tags: [...tmpl.tags, topic.toLowerCase()],
      date: `2025-0${(curId % 3) + 1}-${10 + (curId % 18)}`,
      readingTime: `${4 + (curId % 4)} min read`,
      rating: +(4.2 + (curId % 8) * 0.1).toFixed(1)
    });
    curId++;
  }
}

const outputPath = path.resolve('src/data/documents.json');
fs.writeFileSync(outputPath, JSON.stringify(documents, null, 2), 'utf-8');
console.log(`Successfully generated ${documents.length} sample documents at ${outputPath}`);
