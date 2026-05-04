const fs = require('fs');
const path = require('path');

const header = `/**
 * Daily Diary Task Management Project
 * 
 * Developed by: Dammika Madushan Kumara
 * Description: Professionally structured and humanized React component.
 * Part of the advanced Task Management application utilizing modern React Hooks.
 */\n\n`;

const filesToUpdate = [
  'src/context/TaskContext.jsx',
  'src/components/TaskForm.jsx',
  'src/components/TaskItem.jsx',
  'src/components/TaskList.jsx',
  'src/pages/Home.jsx',
  'src/pages/Login.jsx',
  'src/pages/SignUp.jsx',
  'src/main.jsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.startsWith('/**')) {
      fs.writeFileSync(filePath, header + content);
      console.log(`Humanized ${file}`);
    }
  }
});
