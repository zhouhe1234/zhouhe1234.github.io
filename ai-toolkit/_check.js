
(function(){
  "use strict";
  const $ = s => document.querySelector(s);
  const DATA = [
    /* ---- 写作与文案 ---- */
    { cat:"写作与文案", ico:"✍", name:"DeepSeek", free:1, what:"深度思考型对话 AI，写作、改稿、头脑风暴综合能力强", scene:"课程论文思路、公众号初稿、标题头脑风暴、把口语稿改书面语", prompt:"你是新媒体老师。点评下面这条标题：从具体性、情绪钩子、传播力三方面各一句，最后打 1-10 分和一条改法。标题：【在这里贴你的标题】" },
    { cat:"写作与文案", ico:"✍", name:"智谱清言（GLM）", free:0, what:"GLM 系列对话助手，中文写作与长任务规划稳定，Agent 生态丰富", scene:"读书笔记框架、活动策划案初稿、把采访录音要点整理成稿", prompt:"你是校园活动策划。为【读书节】写一份策划案骨架：背景洞察→目标→人群→策略→创意→媒介→效果预估，每步 2-3 句，最后列出 3 个可能被质疑的点。" },
    { cat:"写作与文案", ico:"✍", name:"豆包", free:0, what:"字节系全能助手，中文语料新，图像生成也顺手", scene:"日常问答、生成海报插画素材、轻松风格的文案", prompt:"生成一张竖版插画：大学图书馆场景，扁平风格，紫色系，画面重心在下三分之二，顶部留白放标题。用途：读书节海报背景。" },
    { cat:"写作与文案", ico:"✍", name:"Kimi", free:0, what:"长文本处理见长：一次可以喂几十页 PDF / 论文", scene:"课程阅读材料总结、文献综述初筛、对比多份资料", prompt:"把这份材料总结为：① 3 句话核心结论 ② 5 个要点（每个 ≤30 字）③ 2 个我能写进作业的引用点 ④ 3 个值得追问的问题。材料：[粘贴]" },
    /* ---- 图像与设计 ---- */
    { cat:"图像与设计", ico:"🎨", name:"即梦", free:1, what:"字节系 AI 图像生成，中文提示词友好，海报素材主力", scene:"公众号封面、海报背景、账号头像素材", prompt:"竖版背景插画：一摞书上长出藤蔓，顶端开花发光。扁平插画风，墨绿+米白+金色，画面重心在下 2/3，顶部留白放标题。3:4" },
    { cat:"图像与设计", ico:"🎨", name:"可灵", free:1, what:"快手系 AI 视频与图像生成，图生视频能力强", scene:"把静态海报动起来、短视频空镜素材", prompt:"以这张图为起始帧，生成 5 秒视频：镜头缓慢推近，花瓣轻微飘落，氛围安静。[上传图片后使用]" },
    { cat:"图像与设计", ico:"🎨", name:"Stable Diffusion（本地部署）", free:0, what:"开源图像生成，可本地运行无审查无限额，学习曲线陡", scene:"需要大量定制素材、想深入学 AI 绘画原理", prompt:"进阶方向：学 ControlNet 控图 + LoRA 风格微调。搜索关键词：「SD 本地部署 教程 2026」" },
    { cat:"图像与设计", ico:"🎨", name:"稿定设计", free:1, what:"中文模板设计平台（AI 能力加持），不会设计也能快速出图", scene:"紧急封面图、活动海报套模板、公众号首图", prompt:"用法：搜「读书节海报」→ 选模板 → 改文字换配色 → 下载。配合 AI 生成的插画素材叠加使用效率最高。" },
    /* ---- 视频音频 ---- */
    { cat:"视频音频", ico:"🎬", name:"剪映（专业版）", free:0, what:"剪辑 + AI 全家桶：智能字幕、图文成片、数字人、AI 配音", scene:"课程作业视频、vlog、账号内容制作一站式", prompt:"用法：文本成片功能粘贴口播稿 → 自动配画面与配音 → 手动精修节奏。字幕先用智能识别再人工校对一遍。" },
    { cat:"视频音频", ico:"🎬", name:"通义听悟", free:1, what:"录音转文字 + 按说话人整理 + 章节速览", scene:"采访录音整理、网课转文字、会议纪要", prompt:"上传采访录音后：① 导出带说话人区分的逐字稿 ② 用「章节速览」看结构 ③ 把精彩引语标星，写稿直接引用" },
    { cat:"视频音频", ico:"🎬", name:"必剪", free:0, B站:"官方剪辑工具", what:"B 站官方剪辑器，投稿联动、素材库贴合 B 站生态", scene:"B 站课程作业、知识区视频", prompt:"用法：录屏 + 必剪的自动字幕 + 一键三连引导贴片，30 分钟出一条合格课程展示视频。" },
    /* ---- 学习研究 ---- */
    { cat:"学习研究", ico:"📚", name:"秘塔 AI 搜索", free:0, what:"AI 搜索引擎：结果自动带来源与大纲，学术模式可搜文献", scene:"查资料顺便看来源、快速了解陌生领域框架", prompt:"用法：切「学术」模式搜「议程设置 研究综述」→ 优先点开带期刊来源的结果 → 把大纲导出当复习框架。" },
    { cat:"学习研究", ico:"📚", name:"Anki（配 AI 生成卡组）", free:0, what:"间隔重复记忆软件，配合 AI 批量生成记忆卡", scene:"四六级单词、传播学概念、考研名词解释", prompt:"把下面的概念清单做成 Anki 导入格式（正面：术语；背面：一句话定义+1 个例子）：[粘贴概念清单]。输出 CSV：正面,背面" },
    { cat:"学习研究", ico:"📚", name:"NotebookLM", free:0, what:"Google 的「资料问答」：喂入你的资料，只基于资料回答并给出引用位置", scene:"多篇课程阅读的交叉复习、小组作业资料整合", prompt:"用法：上传 3-5 份课程 PDF → 问「这三份材料的共同结论和分歧点」→ 生成学习指南播客（可当音频复习）。需科学上网。" },
    /* ---- 效率办公 ---- */
    { cat:"效率办公", ico:"⚡", name:"Gamma", free:1, what:"AI 生成 PPT：输入大纲自动排版成幻灯片，设计感在线", scene:"课程展示、小组汇报快速出片", prompt:"主题：【AI 对新媒体行业的影响】。生成 8 页课程展示 PPT：封面→为什么重要→3 个变化→2 个案例→对我们的启示→结尾。风格：简约紫色系，多图少字。需科学上网。" },
    { cat:"效率办公", ico:"⚡", name:"WPS AI", free:1, what:"WPS 内置 AI：文档续写、表格公式生成、PPT 一键生成", scene:"已经用 WPS 写作业，顺手让 AI 帮忙", prompt:"用法：在 WPS 文档里唤起 AI →「根据以下要点扩写成 800 字活动总结：[要点]」→ 表格里直接用自然语言「统计 B 列平均值并标红最高项」。" },
    { cat:"效率办公", ico:"⚡", name:"飞书（智能伙伴）", free:1, what:"文档协作 + AI 伴写 + 多维表格，小组作业神器", scene: "小组作业协同、内容日历管理、采访素材库", prompt:"用法：用多维表格建「选题库」（字段：选题/平台/状态/数据），AI 字段自动总结每条选题的可行性。" },
  ];

  let curCat = "全部";
  const cats = ["全部","写作与文案","图像与设计","视频音频","学习研究","效率办公"];
  const $ = s => document.querySelector(s);
  const esc = s => (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;");

  function freeLabel(f){
    return f===0 ? '<span class="free f0">🟢 免费</span>' : f===1 ? '<span class="free f1">🟡 免费额度</span>' : '<span class="free f2">🔵 付费</span>';
  }
  function render(){
    const q = ($("#search").value||"").trim().toLowerCase();
    const catsBox = $("#cats");
    catsBox.innerHTML = cats.map(c=>'<button class="cat-b'+(c===curCat?" active":"")+'" data-c="'+c+'">'+c+"</button>").join("");
    catsBox.querySelectorAll(".cat-b").forEach(b=>b.onclick=()=>{curCat=b.dataset.c;render();});
    const list = DATA.filter(t=>(curCat==="全部"||t.cat===curCat)&&(!q||(t.name+t.what+t.scene+t.cat).toLowerCase().includes(q)));
    if(!list.length){ $("#list").innerHTML = '<div class="empty">没找到，换个关键词试试</div>'; return; }
    $("#list").innerHTML = list.map((t,i)=>{
      const di = DATA.indexOf(t);
      return '<div class="tool-card"><div class="tc-head"><div class="tc-ico">'+t.ico+'</div><b>'+t.name+'</b>'+freeLabel(t.free)+'</div>'+
        '<p class="tc-what">'+t.what+'</p>'+
        '<p class="tc-scene"><b>大学生场景：</b>'+t.scene+'</p>'+
        (t.prompt ? '<div class="tc-prompt"><div class="tc-prompt-head"><span>示例提示词（可复制改用）</span><button class="cp" data-i="'+di+'">复制</button></div>'+esc(t.prompt)+'</div>' : "")+
        "</div>";
    }).join("");
    $("#list").querySelectorAll(".cp").forEach(b=>{
      b.onclick = ()=>{
        const text = DATA[+b.dataset.i].prompt;
        const done = ()=>{ b.textContent = "已复制"; setTimeout(()=>b.textContent="复制",1400); };
        if(navigator.clipboard) navigator.clipboard.writeText(text).then(done).catch(()=>fallback(text,done));
        else fallback(text,done);
      };
    });
  }
  function fallback(text,done){
    const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select();
    try{ document.execCommand("copy"); done(); }catch(e){}
    ta.remove();
  }
  $("#search").addEventListener("input", render);
  render();
})();
