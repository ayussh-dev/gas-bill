(() => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const title = document.getElementById('siteTitle');
  const subtitle = document.getElementById('siteSubtitle');

  function zeroPad(num, size){ return String(num).padStart(size,'0') }

  function resizeCanvas(w,h){ canvas.width = w; canvas.height = h; }

  function fitCanvasToScreen(imgW, imgH){
    const vw = window.innerWidth, vh = window.innerHeight;
    const ratio = Math.min(vw / imgW, vh / imgH);
    const w = Math.round(imgW * ratio), h = Math.round(imgH * ratio);
    resizeCanvas(w,h);
    return {w,h};
  }

  async function loadFramesList(){
    try{
      const fixedResp = await fetch('frames_fixed/frames.json');
      if(fixedResp.ok) return await fixedResp.json();
    }catch(e){}
    try{
      const resp = await fetch('frames/frames.json');
      if(resp.ok) return await resp.json();
    }catch(e){}
    const body = document.body;
    const count = parseInt(body.dataset.frameCount) || 0;
    const pattern = body.dataset.framePattern || 'frame-{index}.jpg';
    if(!count || count <= 0) return null;
    const pad = (pattern.match(/0{2,}/)||['0000'])[0].length;
    const list = [];
    for(let i=1;i<=count;i++){ list.push('frames/' + pattern.replace('{index}', zeroPad(i,pad))); }
    return list;
  }

  function preloadImages(list, onProgress){
    return new Promise((resolve)=>{
      const images = new Array(list.length);
      let loaded=0;
      list.forEach((src,i)=>{
        const img = new Image();
        img.src = src;
        img.onload = ()=>{ loaded++; onProgress(loaded/list.length); images[i]=img; if(loaded===list.length) resolve(images) };
        img.onerror = ()=>{ loaded++; onProgress(loaded/list.length); images[i]=null; if(loaded===list.length) resolve(images) };
      });
    });
  }

  const WATERMARK_CROP = 0.08;
  function drawImageCover(img){
    if(!img) return;
    const cvsW = canvas.width, cvsH = canvas.height;
    const srcW = img.width;
    const srcH = Math.max(1, Math.floor(img.height * (1 - WATERMARK_CROP)));
    const sx = 0, sy = 0;
    const s = Math.max(cvsW / srcW, cvsH / srcH);
    const dw = srcW * s, dh = srcH * s;
    const dx = (cvsW - dw) / 2, dy = (cvsH - dh) / 2;
    ctx.clearRect(0,0,cvsW,cvsH);
    ctx.drawImage(img, sx, sy, srcW, srcH, dx, dy, dw, dh);
  }

  function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }

  function attachScrollHandler(images){
    const total = images.length;
    const DESIRED_VIEWPORT_SCROLLS = 4;
    const totalScrollable = window.innerHeight * Math.max(1, (DESIRED_VIEWPORT_SCROLLS - 1));
    document.body.style.height = (window.innerHeight * DESIRED_VIEWPORT_SCROLLS) + 'px';

    function onScroll(){
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const progress = clamp(scrollTop / totalScrollable, 0, 1);

      // Redirect to main site when animation completes
      if(progress >= 1){
        window.location.href = 'code.html';
      }

      const idx = Math.min(total-1, Math.floor(progress * (total-1)));
      requestAnimationFrame(()=> drawImageCover(images[idx]));
      const t = clamp(progress * 1.25, 0, 1);
      if(title){ title.style.opacity = String(1 - t); title.style.transform = `translateY(${ -t * 20 }px)` }
      if(subtitle){ subtitle.style.opacity = String(1 - t*1.2); subtitle.style.transform = `translateY(${ -t * 8 }px)` }
    }

    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', ()=>{ if(images[0]){ fitCanvasToScreen(images[0].width, images[0].height); onScroll(); } });
    if(images[0]){ fitCanvasToScreen(images[0].width, images[0].height); drawImageCover(images[0]); }
  }

  let started = false;
  async function beginIfNeeded(){
    if(started) return; started = true;
    const list = await loadFramesList();
    if(!list){ console.warn('No frames found (frames/frames.json missing).'); return }
    const images = await preloadImages(list, ()=>{});
    attachScrollHandler(images);
  }

  beginIfNeeded();
  window.addEventListener('scroll', beginIfNeeded, {passive:true, once:true});
  window.addEventListener('wheel', beginIfNeeded, {passive:true, once:true});
  window.addEventListener('touchstart', beginIfNeeded, {passive:true, once:true});

})();