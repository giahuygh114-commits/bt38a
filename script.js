// >>> Thay bằng mã sinh viên của bạn <<<
const STUDENT_ID = "SV123456";

const $ = id => document.getElementById(id);
const area=$("area"), target=$("target"), info=$("info");
let score=0, left=0, timer=null, running=false, locked=false;

$("btnColor").onclick = () => {
  if (locked) return;
  const h = Math.floor(Math.random()*360);
  area.style.background = `hsl(${h} 70% 82%)`;
};
$("btnPlayer").onclick = () => {
  if (locked) return;
  info.textContent = "Người chơi: " + STUDENT_ID;
};

function moveTarget(){
  const w = area.clientWidth - 66, h = area.clientHeight - 66;
  target.style.left = Math.random()*w + "px";
  target.style.top = Math.random()*h + "px";
  target.style.display = "block";
}
target.onclick = () => {
  if (!running) return;
  score++; $("score").textContent = score;
  moveTarget();
};
$("btnStart").onclick = () => {
  if (running) return;
  score = 0; locked = false; running = true;
  $("score").textContent = 0; $("over").style.display = "none";
  left = parseInt($("time").value, 10); $("left").textContent = left;
  info.textContent = "Click vào chấm đỏ càng nhanh càng tốt!";
  $("btnStart").disabled = true; $("time").disabled = true;
  moveTarget();
  timer = setInterval(() => {
    left--; $("left").textContent = left;
    if (left <= 0) endGame();
  }, 1000);
};
function endGame(){
  clearInterval(timer); running = false; locked = true;
  target.style.display = "none";
  $("final").textContent = score;
  $("over").style.display = "flex";
  info.textContent = "Hết giờ! Mọi thao tác đã bị khóa. Tải lại trang để chơi lại.";
  $("btnColor").disabled = true; $("btnPlayer").disabled = true;
  $("btnStart").disabled = true; $("time").disabled = true;
}
