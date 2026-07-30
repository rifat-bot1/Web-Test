/* ==========================================
   1. THREE.JS 3D PARTICLES BACKGROUND LOGIC
   ========================================== */
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// 3D Particles Field
const geometry = new THREE.BufferGeometry();
const particlesCount = 800;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 12;
}

geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const material = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.7
});

const particlesMesh = new THREE.Points(geometry, material);
scene.add(particlesMesh);
camera.position.z = 3;

// Mouse Movement Effect
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
});

function animate3D() {
    requestAnimationFrame(animate3D);
    particlesMesh.rotation.y = mouseX * 0.3;
    particlesMesh.rotation.x = -mouseY * 0.3;
    renderer.render(scene, camera);
}
animate3D();

/* ==========================================
   2. eFOOTBALL COIN CALCULATOR LOGIC
   ========================================== */
function calculatePrice() {
    const coinInput = document.getElementById('coinInput').value;
    const priceDisplay = document.getElementById('calculatedPrice');
    
    // Base rate: 1 Coin = 0.85 BDT approx
    const rate = 0.85;
    let totalPrice = Math.round(coinInput * rate);
    
    if (coinInput < 100) {
        priceDisplay.innerText = "সর্বনিম্ন ১০০ কয়েন";
    } else {
        priceDisplay.innerText = "৳ " + totalPrice.toLocaleString('bn-BD');
    }
}

/* ==========================================
   3. FLASH SALE COUNTDOWN TIMER
   ========================================== */
function startTimer(duration) {
    let timer = duration, hours, minutes, seconds;
    setInterval(() => {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        document.getElementById('hours').innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? "0" + seconds : seconds;

        if (--timer < 0) {
            timer = duration; // Reset
        }
    }, 1000);
}
startTimer(20000); // 5+ Hours countdown

/* ==========================================
   4. FAQ ACCORDION INTERACTIVITY
   ========================================== */
document.querySelectorAll('.faq-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        item.classList.toggle('active');
        const body = item.querySelector('.faq-body');
        if (item.classList.contains('active')) {
            body.style.display = 'block';
        } else {
            body.style.display = 'none';
        }
    });
});

/* ==========================================
   5. RECENT ORDERS TOAST NOTIFICATION SIMULATOR
   ========================================== */
const sampleOrders = [
    { name: "ঢাকা থেকে রাকিব", coins: "1,040 Coins" },
    { name: "চট্টগ্রাম থেকে তানভীর", coins: "2,130 Coins" },
    { name: "সিলেট থেকে ফারহান", coins: "550 Coins" },
    { name: "বগুড়া থেকে সাকিব", coins: "5,700 Coins" }
];

function showRecentOrderToast() {
    const toast = document.getElementById('orderToast');
    const randomOrder = sampleOrders[Math.floor(Math.random() * sampleOrders.length)];
    
    document.getElementById('toastUser').innerText = randomOrder.name;
    document.getElementById('toastDetails').innerText = `${randomOrder.coins} ক্রয় করেছেন`;
    
    toast.classList.add('active');
    setTimeout(() => {
        toast.classList.remove('active');
    }, 4000);
}

// Show popup every 12 seconds
setInterval(showRecentOrderToast, 12000);

/* ==========================================
   6. CHECKOUT TRIGGER FUNCTION
   ========================================== */
function openCheckout(packName, price) {
    const userId = prompt(`[${packName} - ৳${price}]\nঅর্ডার সম্পূর্ণ করতে আপনার eFootball User ID (Player ID) লিখুন:`);
    if (userId) {
        alert(`ধন্যবাদ! আপনার ID: ${userId}\nপ্যাক: ${packName}\n\nআমাদের সাপোর্ট প্রতিনিধি পেমেন্টের জন্য আপনাকে দিকনির্দেশনা প্রদান করবে।`);
    }
}
