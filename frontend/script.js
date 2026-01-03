const canvas = document.getElementById('drawingGrid');
const ctx = canvas.getContext('2d');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');

let isDrawing = false;

// 1. Setup the brush style
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill black initially

ctx.strokeStyle = 'white'; // White color drawing
ctx.lineWidth = 12;        // 16 size circle
ctx.lineCap = 'round';     // Makes the line ends round (circular brush)
ctx.lineJoin = 'round';    // Smooths corners

// 2. Drawing Event Listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    draw(e); // Allow drawing dots
}

function draw(e) {
    if (!isDrawing) return;

    // Get mouse position relative to the canvas
    const rect = canvas.getBoundingClientRect();
    
    // We must scale the mouse coordinates because we visually scaled the canvas 
    // to 300px in CSS, but the actual resolution is only 100px.
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Reset path to ensure independent dots work and lines stay smooth
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath(); // Reset path so lines don't connect weirdly later
}

// 3. Save Functionality
saveBtn.addEventListener('click', () => {
    // Convert canvas content to a data URL (base64 string)
    const imageURI = canvas.toDataURL("image/png");

    // Create a temporary link element to trigger the download
    const link = document.createElement('a');
    link.download = 'my-drawing.png';
    link.href = imageURI;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// 4. Clear Functionality
clearBtn.addEventListener('click', () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});