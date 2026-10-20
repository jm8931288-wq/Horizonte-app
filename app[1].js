const messages=[
["migrant","Tu historia no termina al cruzar una frontera: todavía quedan páginas hermosas por escribir."],
["migrant","No tienes que resolver toda tu vida hoy; basta con dar el siguiente paso."],
["migrant","Tu dignidad no depende de tu lugar de origen, tu trabajo ni tus documentos."],
["migrant","Pedir ayuda no te hace débil; demuestra que mereces apoyo y dignidad."],
["migrant","Las raíces pueden viajar contigo: conserva lo que te hace ser tú."],
["migrant","Aunque estés lejos de casa, mereces seguridad, respeto y nuevas oportunidades."],
["faith","Que la fe te dé fuerza, la esperanza te dé luz y el amor te recuerde que no estás solo."],
["faith","Aunque hoy no veas el camino completo, puedes dar un paso con confianza."],
["faith","La esperanza es una pequeña luz que acompaña incluso en los días difíciles."],
["faith","Descansa cuando lo necesites. Cuidar el corazón también es avanzar."],
["general","Tu valor no depende de lo lejos que hayas llegado, sino de la fuerza con la que sigues adelante."],
["general","Cada amanecer te recuerda que todavía hay caminos por descubrir."],
["general","Un pequeño avance sigue siendo un avance."],
["general","No tienes que ser fuerte cada minuto; también mereces cuidado."],
["general","Tu pasado es parte de tu historia, pero no escribe todas las páginas del futuro."],
["general","La bondad que recibes puede convertirse en la bondad que compartes."],
["general","Hoy puede ser el comienzo de algo bueno, aunque sea pequeño."],
["general","Tu presencia importa. Tu historia importa. Tú importas."]
];
const verses=[
["Isaías 41:10","No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios."],
["Filipenses 4:13","Todo lo puedo en Cristo que me fortalece."],
["Salmo 46:1","Dios es nuestro refugio y nuestra fuerza, nuestra ayuda segura en momentos de angustia."],
["Josué 1:9","Sé fuerte y valiente; no tengas miedo ni te desanimes."],
["Mateo 11:28","Vengan a mí todos los que están cansados y agobiados, y yo les daré descanso."],
["Romanos 15:13","Que el Dios de la esperanza los llene de alegría y paz en la fe."],
["Salmo 121:8","El Señor cuidará tu salida y tu entrada, desde ahora y para siempre."],
["Proverbios 3:5","Confía en el Señor con todo tu corazón."],
["Salmo 23:4","Aunque camine por valle oscuro, no temeré, porque tú estás conmigo."],
["2 Corintios 12:9","Mi gracia es suficiente para ti, pues mi poder se perfecciona en la debilidad."]
];
let index=0,language="es";
function say(s){document.getElementById("status").textContent=s}
function show(){const m=messages[index%messages.length];document.getElementById("quote").textContent=m[1];const v=verses[index%verses.length];document.getElementById("verse").textContent='“'+v[1]+'” — '+v[0]}
document.getElementById("next").onclick=()=>{index++;show()};
function makeCanvas(){const c=document.createElement("canvas");c.width=1920;c.height=1080;const x=c.getContext("2d"),g=x.createLinearGradient(0,0,1920,1080);g.addColorStop(0,"#9bd5d0");g.addColorStop(.42,"#eeb889");g.addColorStop(.55,"#557d6e");g.addColorStop(1,"#0b292e");x.fillStyle=g;x.fillRect(0,0,c.width,c.height);x.fillStyle="#fff0b6";x.beginPath();x.arc(1450,300,105,0,Math.PI*2);x.fill();x.fillStyle="#315e53";x.beginPath();x.moveTo(0,700);x.lineTo(430,470);x.lineTo(820,720);x.lineTo(1300,500);x.lineTo(1920,720);x.lineTo(1920,1080);x.lineTo(0,1080);x.fill();x.fillStyle="#fff";x.font="bold 58px sans-serif";wrap(x,document.getElementById("quote").textContent,100,500,1650,78);x.font="italic 34px sans-serif";wrap(x,document.getElementById("verse").textContent,100,800,1650,48);x.font="bold 28px sans-serif";x.fillText("HORIZONTE · FE, FUERZA Y ESPERANZA",100,100);return c}
function wrap(ctx,t,x,y,w,h){let line="",yy=y;for(const word of t.split(" ")){let test=line+word+" ";if(ctx.measureText(test).width>w&&line){ctx.fillText(line,x,yy);line=word+" ";yy+=h}else line=test}ctx.fillText(line,x,yy)}
document.getElementById("save").onclick=()=>{const a=document.createElement("a");a.download="horizonte-imagen-hd.png";a.href=makeCanvas().toDataURL("image/png");a.click();say("Imagen HD preparada para descargar.")};
document.getElementById("video").onclick=()=>{const c=makeCanvas();if(!c.captureStream||!window.MediaRecorder){say("Este navegador no admite crear el vídeo aquí. Guarda la imagen HD y usa un editor de vídeo gratuito.");return}try{const rec=new MediaRecorder(c.captureStream(1)),parts=[];rec.ondataavailable=e=>{if(e.data.size)parts.push(e.data)};rec.onstop=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob(parts,{type:"video/webm"}));a.download="horizonte-video-10-segundos.webm";a.click();say("Vídeo de 10 segundos creado en formato WebM, si tu teléfono lo admite.")};rec.start();setTimeout(()=>rec.stop(),10000);say("Creando vídeo. Mantén la página abierta 10 segundos.")}catch(e){say("No se pudo crear el vídeo en este navegador. Puedes guardar la imagen HD.")}};
function shareText(){return document.getElementById("quote").textContent+"\n"+document.getElementById("verse").textContent+"\nHorizonte: fe y esperanza."}
document.getElementById("whatsapp").onclick=()=>open("https://wa.me/?text="+encodeURIComponent(shareText()),"_blank","noopener");
document.getElementById("facebook").onclick=()=>{open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(location.href)+"&quote="+encodeURIComponent(shareText()),"_blank","noopener");say("Facebook compartirá el enlace de esta página cuando Horizonte esté publicado.")};
document.getElementById("share").onclick=async()=>{if(navigator.share){try{await navigator.share({title:"Horizonte",text:shareText(),url:location.href})}catch(e){}}else say("Prueba WhatsApp o Facebook para compartir.")};
function render(kind="all"){const box=document.getElementById("library");box.innerHTML="";if(kind==="bible"){verses.forEach(v=>add(v[1]+" — "+v[0]));return}messages.filter(m=>kind==="all"||m[0]===kind).forEach(m=>add(m[1]));function add(t){const d=document.createElement("div");d.className="item";d.textContent=t;box.appendChild(d)}}
document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>render(b.dataset.filter));
document.getElementById("lang").onchange=()=>say("La selección de idioma es una versión inicial; algunas frases y secciones aún están en español.");
show();render();