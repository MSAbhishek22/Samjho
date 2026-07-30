const fs = require('fs');
const path = 'b:/Samjho/index.html';
let content = fs.readFileSync(path, 'utf8');

// Remove the duplicate checkBtn line - it's right before ";\n    body.innerHTML = html;"
const target = `      \${demoState.transcript ? \`<button class="btn btn-primary btn-sm hoverable" id="checkBtn" style="margin-top:10px;">\${d.submitLabel}</button>\` : ''}\`;\n    body.innerHTML = html;`;
const replacement = `\`;\n    body.innerHTML = html;`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(path, content, 'utf8');
  console.log('SUCCESS: removed duplicate checkBtn');
} else {
  // Try Windows line endings
  const targetWin = target.replace(/\n/g, '\r\n');
  const replacementWin = replacement.replace(/\n/g, '\r\n');
  if (content.includes(targetWin)) {
    content = content.replace(targetWin, replacementWin);
    fs.writeFileSync(path, content, 'utf8');
    console.log('SUCCESS (CRLF): removed duplicate checkBtn');
  } else {
    // Show what's actually around checkBtn index
    const idx = content.indexOf('checkBtn');
    console.log('Target not matched. Context around checkBtn:');
    console.log(JSON.stringify(content.substring(idx - 50, idx + 200)));
  }
}
