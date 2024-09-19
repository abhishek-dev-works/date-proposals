<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>Date Proposal App</h1>

<p><strong><a href="https://date-proposals-ke1i.vercel.app/">Live Demo</a></strong></p>

<p><strong>Date Proposal App</strong> is a fun and interactive web application where users can ask and answer date-related questions. The "Yes" and "No" buttons add a playful element, with the "No" button moving around when hovered over to make it harder to click!</p>

<h2>Features</h2>
<ul>
  <li><strong>Dynamic Question Fetching</strong>: The app retrieves date questions from the backend.</li>
  <li><strong>Fun Interactions</strong>: The "No" button moves when hovered, adding a playful twist to the decision-making process.</li>
  <li><strong>Simple UI</strong>: Clean, user-friendly design with two options (Yes/No) for users to respond.</li>
  <li><strong>Animated GIFs</strong>: Funny GIFs for both "Yes" and "Pending" answers enhance the user experience.</li>
  <li><strong>Form Submission</strong>: Responses are submitted to the backend, and users are redirected to a response page.</li>
</ul>

<h2>Technologies Used</h2>
<ul>
  <li><strong>Frontend</strong>: React.js</li>
  <li><strong>Backend</strong>: Axios for API calls</li>
  <li><strong>Material UI</strong>: For UI components like buttons</li>
  <li><strong>CSS</strong>: Styling and layout</li>
  <li><strong>React Router</strong>: For routing between the question and response pages</li>
  <li><strong>TSS-React</strong>: For styling components</li>
</ul>

<h2>Installation</h2>
<p>To get started with the Date Proposal App, follow these steps:</p>
<ol>
  <li><strong>Clone the repository:</strong></li>
  <pre><code>git clone https://github.com/yourusername/date-proposal-app.git</code></pre>
  
  <li><strong>Navigate to the project directory:</strong></li>
  <pre><code>cd date-proposal-app</code></pre>

  <li><strong>Install dependencies:</strong></li>
  <pre><code>npm install</code></pre>

  <li><strong>Start the development server:</strong></li>
  <pre><code>npm start</code></pre>
  <p>The app will now be running on <code>http://localhost:3000</code>.</p>
</ol>

<h2>Usage</h2>
<ol>
  <li>Open the app in your browser.</li>
  <li>Navigate to a specific question by entering the URL like <code>/question/{id}</code>.</li>
  <li>Read the question and choose your answer:
    <ul>
      <li>Click <strong>Yes</strong> to answer affirmatively.</li>
      <li>Hover over <strong>No</strong>, and watch it try to escape your cursor!</li>
    </ul>
  </li>
  <li>Submit your answer to see a response.</li>
</ol>

<h2>Example API Endpoints</h2>
<ul>
  <li><strong>GET</strong> <code>/api/questions/{id}</code>: Fetches the question with the provided ID.</li>
  <li><strong>POST</strong> <code>/api/questions/{id}/answer</code>: Submits the answer for the question.</li>
</ul>

<h2>File Structure</h2>
<pre><code>
date-proposal-app/
│
├── public/               # Static files
├── src/
│   ├── components/
│   │   └── AnswerPage.tsx  # Main component for answering questions
│   ├── App.tsx            # Main app component with routing
│   ├── index.tsx          # Entry point for the React app
│   ├── styles/            # Folder for component-specific styles
│   └── ...
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
</code></pre>

<h2>Key Components</h2>

<h3>AnswerPage.tsx</h3>
<p>The core component where users see the question and interact with the "Yes" and "No" buttons. This component:</p>
<ul>
  <li>Fetches the question from the backend.</li>
  <li>Handles the hover interaction on the "No" button using a <code>do...while</code> loop to ensure it moves away from the cursor.</li>
  <li>Submits the user's answer (Yes/No) to the backend.</li>
</ul>

<h3>useStyles.ts</h3>
<p>Contains styling for the components using <strong>tss-react</strong>. Defines the layout for buttons and the image wrapper.</p>

<h2>Contributing</h2>
<p>Feel free to contribute to the project! You can:</p>
<ul>
  <li>Submit issues to report bugs or suggest features.</li>
  <li>Open pull requests to improve the code or add new functionality.</li>
</ul>

<h2>License</h2>
<p>This project is licensed under the MIT License.</p>


</body>
</html>
