# EcoSearch: Simple Presentation and Explanation Guide

This guide is written in plain English. It explains what this project is, why it matters, how it works, and gives you an exact script to say to your professor tomorrow.

---

## 1. What This Project Is in 30 Seconds

Search engines like Google or Bing run on millions of servers in giant data centers. Every single time a user hits "Search", these servers consume electrical power and generate carbon emissions.

EcoSearch is a simulator that shows how a search engine can find the exact same relevant results while cutting energy consumption by over 90%.

### The Library Analogy (Use this to explain it simply):
Imagine you walk into a library with 1,000 books looking for information on "wireless headphones":

- **Linear Search:** You open every single book on every shelf from page 1 to the end, checking for the words. It takes forever and wastes huge amounts of energy.
- **Inverted Index Search:** You use the library catalog or the index at the back of the books. You only pull out books that mention the words, but you still read through all of them to score them.
- **Energy-Aware Search (EcoSearch):** You look at the index, but you start with the rarest word first. As soon as you find 10 great books that answer the question, you stop searching through the rest of the pile. You get the best answers, but you do 90% less work.

---

## 2. The Three Modes Explained Without Jargon

### Mode 1: Linear Search (The Naive Way)
- What it does: Checks all 105 documents in our system one by one, word by word.
- Why it is bad: If a corpus has 10 million documents, checking every single one causes massive CPU usage, server heat, and electricity bills.
- The numbers: Scans 105 out of 105 documents (~19,000 operations).

### Mode 2: Inverted Index (The Standard Search Engine Way)
- What it does: An "inverted index" is simply a lookup table (like the index at the back of a textbook). It maps each word to the list of documents that contain it.
- Why it is better: Instead of checking all 105 documents, it immediately pulls only the ~19 documents that actually contain your search words.
- The numbers: Scans 19 documents (~650 operations), saving ~90% energy compared to linear search.

### Mode 3: Energy-Aware Search (Our Project, EcoSearch)
- What it does: It uses the inverted index, but adds smart early stopping (pruning):
  1. It prioritizes the most informative words first (words that are rare carry more meaning than common words).
  2. It estimates if a document has any chance of beating the best results already found. If not, it skips scoring it completely.
  3. Once it has enough high-quality matches, it stops computing.
- The numbers: Only examines ~10 documents (~390 operations), cutting energy consumption by over 92% compared to linear search, while returning the exact same top results.

---

## 3. How the Energy Numbers are Calculated

If your professor asks: *"How do you calculate energy without a physical power meter plugged into the server?"*

Here is the answer:
1. In computer science research (like Intel RAPL and the Green Software Foundation), energy equals **computational operations** plus **CPU power draw over time**.
2. Every comparison and score calculation requires CPU clock cycles.
3. We count the operations executed (string checks, hash lookups, relevance scoring) and multiply by the energy cost of CPU instructions.
4. We measure the execution time in milliseconds and multiply by a simulated server CPU power rating (25 Watts).
5. The result gives us energy in microjoules (µJ) and Joules (J), and we convert that to estimated carbon emissions (µg CO2e) using the standard electrical grid intensity.

---

## 4. How to Run and Use the Web App

### Starting the App
1. Open your terminal in the project folder.
2. Run:
   ```bash
   npm run dev
   ```
3. Open your browser and go to:
   ```
   http://localhost:3000
   ```

### Screen Layout: What You Are Looking At
- **Top Bar:** Shows the project title, the number of documents in the database (105 docs), and buttons for "Presentation Guide", "History", and "Settings".
- **Search Bar:** A clean input where you can type queries or click one of the pre-made sample buttons (e.g. `wireless headphones`).
- **Segmented Control (Buttons under search bar):**
  - `Compare All 3 Modes`: Displays all three algorithms side-by-side (recommended for your presentation).
  - `Energy-Aware`: Focuses only on our optimized algorithm.
  - `Inverted Index`: Focuses on standard keyword index search.
  - `Linear Search`: Focuses on sequential scan.
- **Top Metrics Cards:** Shows Energy Consumption, Documents Examined, Operations Executed, and Search Latency.
- **Performance Chart:** A bar chart comparing the three algorithms. You can switch between Energy, Operations, and Documents Scanned.
- **Search Results (3 Columns):** Shows the actual articles found by each algorithm, ranked by relevance score.

---

## 5. Step-by-Step Presentation Script for Tomorrow

Follow this script step-by-step in front of your professor:

### Step 1: Introduction (Say this clearly)
> "Good morning Professor. Our project is called EcoSearch. It is an energy-aware search engine simulator. Modern search engines like Google and Bing process billions of queries every day across massive data centers, consuming huge amounts of electricity. Our project demonstrates that by using smart candidate pruning and early termination, a search engine can find the exact same relevant results while reducing computational effort and estimated energy consumption by over 90%."

### Step 2: Show the Live Demo
1. Make sure the mode is set to **"Compare All 3 Modes"**.
2. Click the sample query button: **`wireless headphones`**.
3. Point to the screen and say:
> "Here, we entered the query 'wireless headphones'. EcoSearch executes three different search algorithms simultaneously so we can compare their performance."

### Step 3: Explain the 3 Columns
Point to the three result columns:
1. **Column 1 (Linear Search):**
   > "The first column is Linear Search. It examines all 105 documents in our database sequentially. It takes over 19,000 operations and consumes the most energy. This is our baseline."
2. **Column 2 (Inverted Index):**
   > "The second column is an Inverted Index. Instead of checking every document, it looks up the words in an index and only scores the 19 documents that contain the keywords. It reduces operations down to around 650."
3. **Column 3 (Energy-Aware EcoSearch):**
   > "The third column is our Energy-Aware algorithm. It prioritizes the most specific terms first and stops computing once the top results are solid. It only examined 10 documents and used only 390 operations."

### Step 4: Highlight Result Quality
Point to the top article in all three columns:
> "Notice something critical here: all three algorithms returned the exact same top document: 'Wireless Earbuds vs Over-Ear Headphones'. This proves that Energy-Aware search did not sacrifice result quality; it simply stopped wasting energy on documents that had zero chance of ranking high."

### Step 5: Point to the Charts
Switch to the **Comparison Chart** in the middle of the screen:
> "On this chart, you can clearly see the drop. Linear Search burns the maximum energy, Inverted Index saves around 90%, and Energy-Aware saves over 92% of energy and computational operations."

### Step 6: Conclusion
> "To conclude, EcoSearch proves that algorithmic efficiency directly translates to green computing. By pruning unnecessary evaluations, search infrastructure can save gigawatt-hours of energy and significantly lower its carbon footprint."

---

## 6. How to Answer Common Questions from the Professor

### Question 1: "Does early stopping mean you might miss relevant documents?"
**Answer:**
> "That is a known trade-off called the precision-recall trade-off. However, in web search, users almost never look past the top 10 results. Energy-Aware search uses dynamic thresholding inspired by algorithms like WAND (Weak AND), which ensures that documents with high relevance scores are evaluated first, while low-scoring documents in the long tail are pruned safely."

### Question 2: "Where are the documents stored?"
**Answer:**
> "All documents are stored locally in a structured JSON file containing 105 realistic articles across technology, consumer electronics, and renewable energy. There is no external API or paid cloud dependency; everything runs client-side."

### Question 3: "What ranking formula are you using?"
**Answer:**
> "We use Okapi BM25, which is the industry standard for term-frequency and inverse-document-frequency ranking. It balances how often a term appears in a document against how common that term is across the entire corpus."

### Question 4: "Can the user change the settings?"
**Answer:**
> "Yes. If you click the Settings button in the top right, you can adjust the number of results returned (from 5 to 20), change the pruning aggressiveness from Balanced to Ultra-Eco, and adjust the simulated CPU power rating."
