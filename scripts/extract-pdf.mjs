import fs from 'fs';
import path from 'path';
import { PDFParse } from 'pdf-parse';

(async function main(){
  try{
    const repoRoot = process.cwd();
    const dataPath = path.join(repoRoot, 'data', 'characters.json');
    if(!fs.existsSync(dataPath)){
      console.error('data/characters.json not found');
      process.exit(1);
    }
    const characters = JSON.parse(fs.readFileSync(dataPath,'utf8'));
    const names = characters.map(c=>({id:c.id, name:c.name}));

    const pdfFiles = [
      path.join(repoRoot, 'Starmaker Story 【造星物语】汉化问题.pdf'),
      path.join(repoRoot, 'Starmaker+Story+【造星物语】1.7详细攻略（持续更新）.pdf')
    ].filter(p=>fs.existsSync(p));

    if(!fs.existsSync(path.join(repoRoot, 'tmp'))){
      fs.mkdirSync(path.join(repoRoot, 'tmp'));
    }

    const extracted = {};
    for(const n of names) extracted[n.id] = {name:n.name, snippets:[]};

    for(const pdfPath of pdfFiles){
      console.log('Parsing', pdfPath);
      const dataBuffer = fs.readFileSync(pdfPath);
      const parser = new PDFParse({ data: dataBuffer });
      const data = await parser.getText();
      const text = data.text;

      const base = path.basename(pdfPath).replace(/\s+/g,'_');
      const outTxt = path.join(repoRoot, 'tmp', base + '.txt');
      fs.writeFileSync(outTxt, text, 'utf8');
      console.log('Wrote', outTxt);

      // split into reasonable paragraphs
      const paragraphs = text.split(/\n{2,}/).map(p=>p.replace(/\n/g,' ').trim()).filter(Boolean);

      for(const p of paragraphs){
        for(const n of names){
          const re = new RegExp(n.name.replace(/[-/\\^$*+?.()|[\]{}]/g,'\\$&'), 'i');
          if(re.test(p)){
            extracted[n.id].snippets.push({pdf: path.basename(pdfPath), text: p.slice(0,1000)});
          }
        }
      }
    }

    const outJson = path.join(repoRoot, 'tmp', 'characters-extracted.json');
    fs.writeFileSync(outJson, JSON.stringify(extracted, null, 2), 'utf8');
    console.log('Wrote', outJson);

    // generate a summary markdown with only characters that have snippets
    const summaryLines = [];
    for(const id of Object.keys(extracted)){
      const e = extracted[id];
      if(e.snippets && e.snippets.length>0){
        summaryLines.push('## ' + e.name + ' ('+id+')');
        for(const s of e.snippets.slice(0,8)){
          summaryLines.push('- ['+s.pdf+'] ' + (s.text.length>300 ? s.text.slice(0,300)+'...' : s.text));
        }
        summaryLines.push('\n');
      }
    }
    const summaryPath = path.join(repoRoot, 'tmp', 'characters-summary.md');
    fs.writeFileSync(summaryPath, summaryLines.join('\n'), 'utf8');
    console.log('Wrote', summaryPath);
    console.log('Done.');
  }catch(err){
    console.error(err);
    process.exit(1);
  }
})();
